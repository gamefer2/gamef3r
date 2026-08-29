import { create } from "zustand";
import { ADDONS, EMAIL, FORMSUBMIT_ID, PACKAGES, type AddonId, type PackageId } from "./content";
import { formatUsd } from "./utils";

export type BookingDraft = {
  packageId: PackageId | null;
  addons: AddonId[];
  brand: string;
  contact: string;
  email: string;
  site: string;
  country: string;
  product: string;
  goal: string;
  date: string;
  notes: string;
};

export type QuoteLine = { label: string; amount: number };

export type SubmittedBooking = BookingDraft & {
  ref: string;
  submittedAt: string;
  subtotal: number;
  total: number;
  lines: QuoteLine[];
};

const empty: BookingDraft = {
  packageId: null,
  addons: [],
  brand: "",
  contact: "",
  email: "",
  site: "",
  country: "",
  product: "",
  goal: "",
  date: "",
  notes: "",
};

export function computeQuote(
  packageId: PackageId | null,
  addons: AddonId[],
): { subtotal: number; total: number; lines: QuoteLine[] } {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  if (!pkg) return { subtotal: 0, total: 0, lines: [] };

  const lines: QuoteLine[] = [{ label: pkg.id, amount: pkg.price }];
  let subtotal = pkg.price;
  let percent = 0;

  for (const id of addons) {
    const addon = ADDONS.find((a) => a.id === id);
    if (!addon) continue;
    if (addon.kind === "flat") {
      lines.push({ label: id, amount: addon.amount });
      subtotal += addon.amount;
    } else {
      percent += addon.amount;
    }
  }

  let total = subtotal;
  for (const id of addons) {
    const addon = ADDONS.find((a) => a.id === id);
    if (addon?.kind === "percent") {
      const amt = Math.round(subtotal * addon.amount);
      lines.push({ label: id, amount: amt });
      total += amt;
    }
  }

  void percent;
  return { subtotal, total, lines };
}

export function makeRef() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `GF-${n}`;
}

type Store = {
  draft: BookingDraft;
  last: SubmittedBooking | null;
  setPackage: (id: PackageId) => void;
  toggleAddon: (id: AddonId) => void;
  patch: (p: Partial<BookingDraft>) => void;
  reset: () => void;
  submit: () => SubmittedBooking | null;
};

export const useBooking = create<Store>()((set, get) => ({
  draft: empty,
  last: null,
  setPackage: (id) => set((s) => ({ draft: { ...s.draft, packageId: id } })),
  toggleAddon: (id) =>
    set((s) => {
      const has = s.draft.addons.includes(id);
      return {
        draft: {
          ...s.draft,
          addons: has
            ? s.draft.addons.filter((a) => a !== id)
            : [...s.draft.addons, id],
        },
      };
    }),
  patch: (p) => set((s) => ({ draft: { ...s.draft, ...p } })),
  reset: () => set({ draft: empty, last: null }),
  submit: () => {
    const { draft } = get();
    if (!draft.packageId) return null;
    const q = computeQuote(draft.packageId, draft.addons);
    const last: SubmittedBooking = {
      ...draft,
      ref: makeRef(),
      submittedAt: new Date().toISOString(),
      ...q,
    };
    set({ last, draft: empty });
    if (typeof window !== "undefined") {
      const prev = JSON.parse(
        window.localStorage.getItem("gf-bookings") || "[]",
      ) as SubmittedBooking[];
      window.localStorage.setItem(
        "gf-bookings",
        JSON.stringify([last, ...prev].slice(0, 20)),
      );
    }
    return last;
  },
}));

export function bookingMailto(booking: SubmittedBooking, message: string) {
  const subject = `GAMEFER ${booking.ref} · ${booking.brand} · ${formatUsd(booking.total)}`;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

export function bookingGmail(booking: SubmittedBooking, message: string) {
  const subject = `GAMEFER ${booking.ref} · ${booking.brand} · ${formatUsd(booking.total)}`;
  const q = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: EMAIL,
    su: subject,
    body: message,
  });
  return `https://mail.google.com/mail/?${q.toString()}`;
}

export async function deliverBooking(
  booking: SubmittedBooking,
  message: string,
): Promise<"sent" | "mailto"> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        name: booking.contact,
        email: booking.email,
        message,
        _subject: `GAMEFER ${booking.ref} · ${booking.brand} · ${formatUsd(booking.total)}`,
        _template: "table",
        _captcha: "false",
        _replyto: booking.email,
        referencia: booking.ref,
        marca: booking.brand,
        contacto: booking.contact,
        mail: booking.email,
        sitio: booking.site,
        pais: booking.country,
        producto: booking.product,
        objetivo: booking.goal,
        fecha: booking.date,
        notas: booking.notes,
        total: formatUsd(booking.total),
      }),
    });
    if (!res.ok) throw new Error("send failed");
    const data = (await res.json()) as { success?: string | boolean };
    if (data.success === true || data.success === "true") return "sent";
    throw new Error("send failed");
  } catch {
    return "mailto";
  } finally {
    clearTimeout(timer);
  }
}
