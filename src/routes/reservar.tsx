import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy as CopyIcon, Mail } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ReservarWizard } from "@/components/reservar-wizard";
import { Button } from "@/components/ui/button";
import { type PackageId } from "@/lib/content";
import {
  bookingGmail,
  bookingMailto,
  computeQuote,
  deliverBooking,
  useBooking,
  type SubmittedBooking,
} from "@/lib/booking";
import { lineLabel } from "@/lib/booking-labels";
import { useLang, type Copy } from "@/lib/i18n";
import { formatUsd } from "@/lib/utils";

const PACKAGE_IDS: PackageId[] = [
  "mention",
  "integration",
  "dedicated",
  "shorts",
  "pack360",
];

export const Route = createFileRoute("/reservar")({
  validateSearch: (s: Record<string, unknown>): { paquete?: string } => {
    if (typeof s.paquete === "string" && s.paquete.length > 0) {
      return { paquete: s.paquete };
    }
    return {};
  },
  component: ReservarPage,
});

function bookingMessage(t: Copy, booking: SubmittedBooking) {
  const lines = booking.lines
    .map((l) => `• ${lineLabel(t, l.label)}: ${formatUsd(l.amount)}`)
    .join("\n");
  return [
    `${t.confirmRef}: ${booking.ref}`,
    `${t.bookBrand}: ${booking.brand}`,
    `${t.bookContact}: ${booking.contact}`,
    `${t.bookEmail}: ${booking.email}`,
    `${t.bookSite}: ${booking.site}`,
    `${t.bookCountry}: ${booking.country}`,
    `${t.bookProduct}: ${booking.product}`,
    `${t.bookGoal}: ${booking.goal}`,
    `${t.bookDates}: ${booking.date}`,
    `${t.bookNotes}: ${booking.notes}`,
    "",
    lines,
    `${t.quoteTotal}: ${formatUsd(booking.total)}`,
  ].join("\n");
}

function ReservarPage() {
  const { t } = useLang();
  const search = Route.useSearch();
  const { draft, setPackage, toggleAddon, patch, submit, reset } = useBooking();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState<SubmittedBooking | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [delivery, setDelivery] = useState<"sent" | "mailto" | null>(null);

  useEffect(() => {
    if (search.paquete && PACKAGE_IDS.includes(search.paquete as PackageId)) {
      setPackage(search.paquete as PackageId);
    }
  }, [search.paquete, setPackage]);

  const quote = computeQuote(draft.packageId, draft.addons);

  function nextFrom1() {
    if (!draft.packageId) {
      setErrors({ package: t.required });
      return;
    }
    setErrors({});
    setStep(2);
  }

  function nextFrom2() {
    const e: Record<string, string> = {};
    if (!draft.brand.trim()) e.brand = t.required;
    if (!draft.contact.trim()) e.contact = t.required;
    if (!draft.email.trim()) e.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) e.email = t.invalidEmail;
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep(3);
  }

  function nextFrom3() {
    const e: Record<string, string> = {};
    if (!draft.product.trim()) e.product = t.required;
    if (!draft.goal.trim()) e.goal = t.required;
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep(4);
  }

  async function onSubmit() {
    const last = submit();
    if (!last) return;
    setSending(true);
    const result = await deliverBooking(last, bookingMessage(t, last));
    setDelivery(result);
    setDone(last);
    setSending(false);
  }

  if (done) {
    return (
      <div className="min-h-dvh">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {t.confirmKicker}
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight">
            {t.confirmTitle}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {delivery === "sent" ? t.confirmLead : t.confirmMailto}
          </p>
          <div className="mt-10 rounded-xl bg-card p-6 shadow-[var(--shadow-border)] print:shadow-none">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {t.confirmRef}
            </p>
            <p className="mt-1 font-display text-3xl font-semibold tracking-tight">
              {done.ref}
            </p>
            <dl className="mt-6 space-y-2 text-sm">
              <Row k={t.bookBrand} v={done.brand} />
              <Row k={t.bookContact} v={done.contact} />
              <Row k={t.bookEmail} v={done.email} />
              {done.lines.map((l) => (
                <Row key={l.label} k={lineLabel(t, l.label)} v={formatUsd(l.amount)} />
              ))}
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">{t.quoteTotal}</span>
              <span className="font-display text-2xl font-semibold tabular-nums">
                {formatUsd(done.total)}
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <Button asChild>
              <a href={bookingGmail(done, bookingMessage(t, done))} target="_blank" rel="noopener noreferrer">
                <Mail />
                {t.confirmMail}
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(bookingMessage(t, done));
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2000);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? <Check /> : <CopyIcon />}
              {copied ? t.confirmCopied : t.confirmCopy}
            </Button>
            <Button asChild variant="outline">
              <a href={bookingMailto(done, bookingMessage(t, done))}>{t.confirmOtherMail}</a>
            </Button>
            <Button onClick={() => window.print()} variant="outline">
              {t.confirmPrint}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                reset();
                setDone(null);
                setCopied(false);
                setDelivery(null);
                setStep(1);
              }}
            >
              {t.confirmAnother}
            </Button>
            <Button asChild variant="ghost">
              <Link to="/">{t.confirmHome}</Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <ReservarWizard
      t={t}
      draft={draft}
      errors={errors}
      step={step}
      quote={quote}
      sending={sending}
      setPackage={setPackage}
      toggleAddon={toggleAddon}
      patch={patch}
      nextFrom1={nextFrom1}
      nextFrom2={nextFrom2}
      nextFrom3={nextFrom3}
      onSubmit={onSubmit}
      setStep={setStep}
    />
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
