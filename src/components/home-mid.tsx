import { ArrowRight } from "lucide-react";
import { Section, SocialGlyph } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BRANDS,
  CHANNELS,
  F3R_HITS,
  SOCIALS,
  SOCIAL_REACH,
  VIDEOS,
} from "@/lib/content";
import { socialName, useLang } from "@/lib/i18n";
import { formatCompact } from "@/lib/utils";

export function Ecosistema() {
  const { t } = useLang();
  return (
    <Section id="ecosistema" kicker={t.ecoKicker} title={t.ecoTitle} note={t.ecoNote}>
      <div className="grid gap-4 md:grid-cols-2">
        {CHANNELS.map((ch) => (
          <a
            key={ch.id}
            href={ch.href}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] hover:shadow-[var(--shadow-border-hover)]"
          >
            <div className="relative aspect-video overflow-hidden bg-elevated">
              <img
                src={ch.thumb}
                alt=""
                className={
                  ch.id === "gamefer"
                    ? "size-full object-cover object-top"
                    : "size-full object-cover"
                }
              />
            </div>
            <div className="p-5">
              <Badge variant="outline">
                {ch.id === "gamefer" ? t.ecoGameferRole : t.ecoF3rRole}
              </Badge>
              <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
                {ch.handle}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {ch.id === "gamefer" ? t.ecoGameferDesc : t.ecoF3rDesc}
              </p>
              <p className="mt-4 text-sm text-foreground">
                <span className="font-display text-lg font-semibold tabular-nums">
                  {ch.subs}
                </span>{" "}
                {t.ecoSubs}
                <span className="mx-2 text-subtle">·</span>
                <span className="tabular-nums">{ch.videos}</span> {t.ecoVideos}
              </p>
              <p className="mt-4 text-sm font-medium text-accent">
                {t.ecoOpen}
                <ArrowRight className="ml-1 inline size-3.5" />
              </p>
            </div>
          </a>
        ))}
      </div>
      <p className="mt-8 text-sm font-medium text-foreground">{t.ecoHits}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {F3R_HITS.map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] hover:shadow-[var(--shadow-border-hover)]"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={v.thumb}
                alt=""
                className="size-full object-cover transition-transform duration-[var(--motion-slow)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <Badge variant="outline">{v.game}</Badge>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {formatCompact(v.views)}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug text-foreground">
                {v.title}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

export function Brands() {
  const { t } = useLang();
  return (
    <Section id="marcas" kicker={t.brandsKicker} title={t.brandsTitle} note={t.brandsNote}>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
        {BRANDS.map((name) => (
          <span
            key={name}
            className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {name}
          </span>
        ))}
        <span className="text-sm text-muted-foreground">{t.brandsMore}</span>
      </div>
    </Section>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <Section id="trabajo" kicker={t.workKicker} title={t.workTitle}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((v) => (
          <a
            key={v.id}
            href={`https://www.youtube.com/watch?v=${v.id}`}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] hover:shadow-[var(--shadow-border-hover)]"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={v.thumb}
                alt=""
                className="size-full object-cover transition-transform duration-[var(--motion-slow)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <Badge variant="outline">{v.game}</Badge>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {formatCompact(v.views)}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug text-foreground">
                {v.title}
              </p>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-8">
        <Button asChild variant="outline">
          <a href={SOCIALS.youtube} target="_blank" rel="noreferrer">
            {t.workCta}
            <ArrowRight />
          </a>
        </Button>
      </div>
    </Section>
  );
}

export function Redes() {
  const { t } = useLang();
  return (
    <Section id="redes" kicker={t.redesKicker} title={t.redesTitle} note={t.redesNote}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SOCIAL_REACH.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col rounded-xl bg-card p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] hover:shadow-[var(--shadow-border-hover)]"
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              <SocialGlyph id={s.id} className="size-4" />
              <span className="text-sm">{socialName(t, s.id)}</span>
            </span>
            <span className="mt-4 font-display text-3xl font-semibold tracking-tight">
              {s.count}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">{s.handle}</span>
            <span className="mt-4 text-sm font-medium text-accent">{t.redesFollow}</span>
          </a>
        ))}
      </div>
    </Section>
  );
}
