import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import es from "./copy-es.json";
import en from "./copy-en.json";

export type Lang = "es" | "en";

const copy = { es, en };

export type Copy = typeof es;

type Ctx = {
  lang: Lang;
  t: Copy;
  toggle: () => void;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("gf-lang");
    if (stored === "en") setLang("en");
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      window.localStorage.setItem("gf-lang", next);
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ lang, t: copy[lang], toggle }),
    [lang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export function pkgName(t: Copy, id: string) {
  switch (id) {
    case "mention":
      return t.pkgMention;
    case "integration":
      return t.pkgInt;
    case "dedicated":
      return t.pkgDed;
    case "shorts":
      return t.pkgShorts;
    case "pack360":
      return t.pkg360;
    default:
      return id;
  }
}

export function pkgDesc(t: Copy, id: string) {
  switch (id) {
    case "mention":
      return t.pkgMentionDesc;
    case "integration":
      return t.pkgIntDesc;
    case "dedicated":
      return t.pkgDedDesc;
    case "shorts":
      return t.pkgShortsDesc;
    case "pack360":
      return t.pkg360Desc;
    default:
      return "";
  }
}

export function pkgInc(t: Copy, id: string) {
  switch (id) {
    case "mention":
      return t.pkgMentionInc;
    case "integration":
      return t.pkgIntInc;
    case "dedicated":
      return t.pkgDedInc;
    case "shorts":
      return t.pkgShortsInc;
    case "pack360":
      return t.pkg360Inc;
    default:
      return "";
  }
}

export function socialName(t: Copy, id: string) {
  switch (id) {
    case "youtube":
      return t.socialYoutube;
    case "tiktok":
      return t.socialTiktok;
    case "instagram":
      return t.socialInstagram;
    case "x":
      return t.socialX;
    default:
      return id;
  }
}
