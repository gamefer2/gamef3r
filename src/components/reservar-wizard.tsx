import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ADDONS, PACKAGES, type AddonId, type PackageId } from "@/lib/content";
import type { BookingDraft } from "@/lib/booking";
import { addonLabel, lineLabel } from "@/routes/reservar";
import { pkgDesc, pkgInc, pkgName, type Copy } from "@/lib/i18n";
import { cn, formatUsd } from "@/lib/utils";

type Quote = { lines: { label: string; amount: number }[]; total: number };

export function ReservarWizard({
  t,
  draft,
  errors,
  step,
  quote,
  sending,
  setPackage,
  toggleAddon,
  patch,
  nextFrom1,
  nextFrom2,
  nextFrom3,
  onSubmit,
  setStep,
}: {
  t: Copy;
  draft: BookingDraft;
  errors: Record<string, string>;
  step: number;
  quote: Quote;
  sending: boolean;
  setPackage: (id: PackageId) => void;
  toggleAddon: (id: AddonId) => void;
  patch: (p: Partial<BookingDraft>) => void;
  nextFrom1: () => void;
  nextFrom2: () => void;
  nextFrom3: () => void;
  onSubmit: () => void;
  setStep: (n: number) => void;
}) {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{t.bookTitle}</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">{t.bookLead}</p>

        <ol className="mt-8 flex gap-2 text-xs uppercase tracking-[0.14em] text-subtle">
          {[t.bookStep1, t.bookStep2, t.bookStep3, t.bookStep4].map((label, i) => (
            <li
              key={label}
              className={cn(
                "flex-1 border-t-2 pt-2",
                i + 1 <= step ? "border-accent text-accent" : "border-border",
              )}
            >
              {label}
            </li>
          ))}
        </ol>

        {step === 1 && (
          <div className="mt-8 space-y-3">
            {PACKAGES.map((pkg) => {
              const selected = draft.packageId === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setPackage(pkg.id)}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-xl bg-card p-4 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)]",
                    selected && "shadow-[var(--shadow-border-hover)] ring-1 ring-accent",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                      selected ? "bg-accent text-accent-foreground" : "bg-elevated",
                    )}
                  >
                    {selected && <Check className="size-3" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-display text-lg font-semibold">
                        {pkgName(t, pkg.id)}
                      </span>
                      <span className="font-display text-lg tabular-nums">
                        {formatUsd(pkg.price)}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {pkgDesc(t, pkg.id)}
                    </span>
                    <span className="mt-2 block text-xs text-subtle">{pkgInc(t, pkg.id)}</span>
                  </span>
                </button>
              );
            })}
            {errors.package && <p className="text-sm text-destructive">{errors.package}</p>}
            <div className="flex justify-end pt-4">
              <Button onClick={nextFrom1}>
                {t.bookNext}
                <ArrowRight />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form
            className="mt-8 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              nextFrom2();
            }}
          >
            <Field label={t.bookBrand} error={errors.brand} value={draft.brand} onChange={(v) => patch({ brand: v })} />
            <Field label={t.bookContact} error={errors.contact} value={draft.contact} onChange={(v) => patch({ contact: v })} />
            <Field label={t.bookEmail} type="email" error={errors.email} value={draft.email} onChange={(v) => patch({ email: v })} />
            <Field label={t.bookSite} value={draft.site} onChange={(v) => patch({ site: v })} />
            <Field label={t.bookCountry} value={draft.country} onChange={(v) => patch({ country: v })} />
            <NavRow onBack={() => setStep(1)} nextLabel={t.bookNext} backLabel={t.bookBack} />
          </form>
        )}

        {step === 3 && (
          <form
            className="mt-8 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              nextFrom3();
            }}
          >
            <Field label={t.bookProduct} error={errors.product} value={draft.product} onChange={(v) => patch({ product: v })} />
            <div className="grid gap-2">
              <Label htmlFor="goal">{t.bookGoal}</Label>
              <Textarea id="goal" value={draft.goal} onChange={(e) => patch({ goal: e.target.value })} />
              {errors.goal && <p className="text-sm text-destructive">{errors.goal}</p>}
            </div>
            <Field label={t.bookDates} type="date" value={draft.date} onChange={(v) => patch({ date: v })} />
            <div className="grid gap-2">
              <Label htmlFor="notes">{t.bookNotes}</Label>
              <Textarea id="notes" value={draft.notes} onChange={(e) => patch({ notes: e.target.value })} />
            </div>
            <fieldset className="mt-2">
              <legend className="mb-3 text-sm font-medium text-muted-foreground">{t.bookAddons}</legend>
              <div className="space-y-2">
                {ADDONS.map((a) => {
                  const on = draft.addons.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md bg-card px-3 py-2 shadow-[var(--shadow-border)]"
                    >
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleAddon(a.id)}
                        className="size-4 accent-[var(--color-accent)]"
                      />
                      <span className="text-sm">{addonLabel(t, a.id)}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <NavRow onBack={() => setStep(2)} nextLabel={t.bookNext} backLabel={t.bookBack} />
          </form>
        )}

        {step === 4 && (
          <div className="mt-8">
            <div className="rounded-xl bg-card p-6 shadow-[var(--shadow-border)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">{draft.brand || "—"}</h2>
                {draft.packageId && <Badge>{pkgName(t, draft.packageId)}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">
                {draft.contact} · {draft.email}
              </p>
              {draft.product && <p className="mt-3 text-sm">{draft.product}</p>}
              {draft.goal && <p className="mt-2 text-sm text-muted-foreground">{draft.goal}</p>}
              <ul className="mt-6 space-y-2 border-t border-border pt-4">
                {quote.lines.map((l) => (
                  <li key={l.label} className="flex items-baseline justify-between text-sm">
                    <span className="text-muted-foreground">{lineLabel(t, l.label)}</span>
                    <span className="tabular-nums">{formatUsd(l.amount)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm">{t.quoteTotal}</span>
                <span className="font-display text-2xl font-semibold tabular-nums">
                  {formatUsd(quote.total)}
                </span>
              </div>
              <p className="mt-4 text-xs text-subtle">{t.quoteNote}</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Button variant="outline" onClick={() => setStep(3)}>
                <ArrowLeft />
                {t.bookBack}
              </Button>
              <Button onClick={onSubmit} disabled={sending}>
                {sending ? t.bookSending : t.bookSubmit}
                <ArrowRight />
              </Button>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function NavRow({
  onBack,
  nextLabel,
  backLabel,
}: {
  onBack: () => void;
  nextLabel: string;
  backLabel: string;
}) {
  return (
    <div className="mt-2 flex flex-wrap justify-between gap-3">
      <Button type="button" variant="outline" onClick={onBack}>
        <ArrowLeft />
        {backLabel}
      </Button>
      <Button type="submit">
        {nextLabel}
        <ArrowRight />
      </Button>
    </div>
  );
}
