import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Mail, Youtube } from "lucide-react";
import { socialName, useLang } from "@/lib/i18n";
import { EMAIL, SOCIAL_REACH } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#kit", key: "navKit" as const },
  { href: "/#ecosistema", key: "ecoKicker" as const },
  { href: "/#trabajo", key: "navTrabajo" as const },
  { href: "/#redes", key: "redesKicker" as const },
  { href: "/#patrocinios", key: "navPatrocinios" as const },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.23 10.16 21.2 2h-1.65l-6.05 7.08L8.66 2H2.4l7.31 10.71L2.4 22h1.65l6.39-7.48L15.34 22H21.6l-7.37-11.84Zm-2.26 2.65-.74-1.06L4.64 3.3h2.54l4.75 6.82.74 1.06 6.17 8.85h-2.54l-5.09-7.22Z"
      />
    </svg>
  );
}

export function SocialGlyph({
  id,
  className,
}: {
  id: (typeof SOCIAL_REACH)[number]["id"];
  className?: string;
}) {
  if (id === "youtube") return <Youtube className={className} />;
  if (id === "instagram") return <Instagram className={className} />;
  if (id === "tiktok") return <TikTokIcon className={className} />;
  return <XIcon className={className} />;
}

export function SiteHeader() {
  const { t, toggle, lang } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onBook = pathname.startsWith("/reservar");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-foreground"
        >
          <img
            src="/media/gamefer-avatar.png"
            alt=""
            className="size-8 rounded-sm object-cover"
          />
          GAMEFER
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors duration-[var(--motion-quick)] hover:text-foreground"
            >
              {t[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center sm:flex">
            {SOCIAL_REACH.slice(0, 3).map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={socialName(t, s.id)}
                className="grid size-11 place-items-center text-muted-foreground transition-colors duration-[var(--motion-quick)] hover:text-foreground"
              >
                <SocialGlyph id={s.id} className="size-4" />
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={toggle}
            className="grid size-11 place-items-center rounded-md text-xs font-semibold tracking-wide text-muted-foreground transition-colors duration-[var(--motion-quick)] hover:text-foreground"
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {t.langLabel}
          </button>
          {!onBook && (
            <Button asChild size="sm">
              <Link to="/reservar">{t.ctaReservar}</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/media/gamefer-avatar.png"
              alt=""
              className="size-10 rounded-md object-cover"
            />
            <p className="font-display text-2xl font-extrabold tracking-tight">
              GAMEFER
            </p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t.footerCopy}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:text-foreground"
          >
            <Mail className="size-4" />
            {EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {SOCIAL_REACH.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              {socialName(t, s.id)}
            </a>
          ))}
          <a href={`mailto:${EMAIL}`} className="hover:text-foreground">
            {t.footerMail}
          </a>
        </div>
      </div>
    </footer>
  );
}

export function Section({
  id,
  kicker,
  title,
  note,
  children,
  className,
}: {
  id?: string;
  kicker?: string;
  title?: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24", className)}>
      <div className="mx-auto max-w-6xl">
        {(kicker || title) && (
          <header className="mb-10 max-w-2xl">
            {kicker && (
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {kicker}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            )}
            {note && (
              <p className="mt-3 text-sm text-muted-foreground">{note}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
