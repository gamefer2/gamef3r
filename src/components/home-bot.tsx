import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";
import { Section } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUDIENCE, EMAIL, PACKAGES, STATS } from "@/lib/content";
import { pkgDesc, pkgInc, pkgName, useLang } from "@/lib/i18n";
import { formatUsd } from "@/lib/utils";

function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums text-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-elevated">
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Audience() {
  const { t } = useLang();
  return (
    <Section id="audiencia" kicker={t.audKicker} title={t.audTitle} note={t.audNote}>
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="mb-5 text-sm font-medium text-foreground">{t.audAge}</h3>
          <div className="space-y-4">
            {AUDIENCE.age.map((r) => (
              <Bar key={r.label} label={r.label} pct={r.pct} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-sm font-medium text-foreground">{t.audGeo}</h3>
          <div className="space-y-4">
            {AUDIENCE.geo.map((r) => (
              <Bar key={r.label} label={r.label} pct={r.pct} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-sm font-medium text-foreground">{t.audGender}</h3>
          <div className="space-y-4">
            <Bar label={t.audMen} pct={79} />
            <Bar label={t.audWomen} pct={21} />
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Fortnite {STATS.fortniteVideos} · Among Us {STATS.amongUsVideos} ·
            Minecraft {STATS.minecraftVideos}
          </p>
        </div>
      </div>
    </Section>
  );
}

export function Packages() {
  const { t } = useLang();
  return (
    <Section id="patrocinios" kicker={t.pkgKicker} title={t.pkgTitle} note={t.pkgNote}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PACKAGES.map((pkg) => (
          <article
            key={pkg.id}
            className="flex flex-col rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold">{pkgName(t, pkg.id)}</h3>
              {pkg.featured && <Badge variant="accent">{t.pkgFeatured}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{pkgDesc(t, pkg.id)}</p>
            <p className="mt-4 text-xs text-subtle">{pkgInc(t, pkg.id)}</p>
            <div className="mt-auto flex items-end justify-between pt-6">
              <div>
                <p className="text-xs text-muted-foreground">{t.pkgFrom}</p>
                <p className="font-display text-2xl font-semibold tabular-nums">
                  {formatUsd(pkg.price)}
                </p>
              </div>
              <Button asChild size="sm">
                <Link to="/reservar" search={{ paquete: pkg.id }}>
                  {t.pkgSelect}
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Process() {
  const { t } = useLang();
  const steps = [
    { t: t.p1t, d: t.p1d },
    { t: t.p2t, d: t.p2d },
    { t: t.p3t, d: t.p3d },
    { t: t.p4t, d: t.p4d },
  ];
  return (
    <Section kicker={t.processKicker} title={t.processTitle}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.t} className="rounded-lg bg-card p-5 shadow-[var(--shadow-border)]">
            <h3 className="font-display text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function CtaBand() {
  const { t } = useLang();
  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-xl bg-elevated px-6 py-10 shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:px-10">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            {t.footerCta}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.footerLead}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/reservar">
              {t.ctaReservar}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${EMAIL}`}>
              <Mail />
              {EMAIL}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
