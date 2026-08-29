import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { Section } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src="/media/hero-forest.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:pt-24">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t.heroKicker}
          </p>
          <h1 className="font-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl">
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t.heroLead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/reservar">
                {t.heroCtaPrimary}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#trabajo">{t.heroCtaSecondary}</a>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
          <div className="rounded-xl bg-card p-2 shadow-portrait">
            <img
              src="/media/gamefer-avatar.png"
              alt="GameFer"
              className="aspect-square w-full rounded-lg object-cover"
            />
          </div>
          <div className="mt-3 flex items-center justify-between px-1 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-3.5" />
              {t.aboutFrom}
            </span>
            <span className="font-medium text-accent">1.39M</span>
          </div>
        </div>
      </div>
      <div className="relative border-t border-border bg-background/80">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          <Stat label={t.statSubs} value="1.39M" />
          <Stat label={t.statVideos} value="1M" />
          <Stat label={t.statRank} value="40.5K" />
          <Stat label={t.statViews} value="139M" />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-6 sm:px-6">
      <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-display text-3xl font-semibold tracking-tight">
        {value}
      </dd>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  const items = [
    { year: "2014", text: t.tl2014 },
    { year: "2018–20", text: t.tlFortnite },
    { year: "2020–22", text: t.tlAmong },
    { year: "2022–24", text: t.tlMinecraft },
    { year: "2026", text: t.tlNow },
  ];
  return (
    <Section id="kit" kicker={t.aboutKicker} title={t.aboutTitle}>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-base text-muted-foreground sm:text-lg">{t.aboutBody}</p>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {t.aboutBody2}
          </p>
          <p className="mt-6 text-sm text-subtle">{t.aboutCode}</p>
        </div>
        <ol className="space-y-0">
          {items.map((item, i) => (
            <li
              key={item.year}
              className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-border py-4"
            >
              <span className="font-display text-sm font-semibold text-accent">
                {item.year}
              </span>
              <p className="text-sm text-muted-foreground">{item.text}</p>
              <span className="sr-only">{i + 1}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
