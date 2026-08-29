export const EMAIL = "gamefer2@gmail.com";
export const FORMSUBMIT_ID = "d31b0b9589d905b8cbf5596937e0c41d";

export const SOCIALS = {
  youtube: "https://www.youtube.com/@GameFer",
  youtubeF3r: "https://www.youtube.com/@TheGameF3R",
  tiktok: "https://www.tiktok.com/@gamefer2",
  instagram: "https://www.instagram.com/gameferyt/",
  x: "https://x.com/TheGameFer",
  facebook: "https://www.facebook.com/gamefer2/",
} as const;

export const SOCIAL_REACH = [
  {
    id: "youtube" as const,
    href: SOCIALS.youtube,
    handle: "@GameFer",
    count: "1.39M",
  },
  {
    id: "tiktok" as const,
    href: SOCIALS.tiktok,
    handle: "@gamefer2",
    count: "1M",
  },
  {
    id: "instagram" as const,
    href: SOCIALS.instagram,
    handle: "@gameferyt",
    count: "40.5K",
  },
  {
    id: "x" as const,
    href: SOCIALS.x,
    handle: "@TheGameFer",
    count: "6.6K",
  },
];

export const CHANNELS = [
  {
    id: "gamefer" as const,
    href: SOCIALS.youtube,
    handle: "@GameFer",
    subs: "1.39M",
    videos: "789",
    thumb: "/media/yt-sonic.jpg",
  },
  {
    id: "thegamef3r" as const,
    href: SOCIALS.youtubeF3r,
    handle: "@TheGameF3R",
    subs: "437K",
    videos: "30",
    thumb: "/media/yt-f3r-bingo.jpg",
  },
];

export const STATS = {
  subscribers: 1_390_000,
  views: 139_121_107,
  videos: 789,
  years: 12,
  guatemalaRank: 20,
  fortniteVideos: 407,
  fortniteViews: 70_033_407,
  amongUsVideos: 225,
  minecraftVideos: 59,
} as const;

export const BRANDS = [
  "Epic Games",
  "HONOR",
  "Claro Guatemala",
  "McDonald’s Guatemala",
  "Frito-Lay",
  "Sprite Colombia",
  "Shaka Laka",
] as const;

export type Video = {
  id: string;
  title: string;
  views: number;
  year: string;
  thumb: string;
  game: string;
};

export const F3R_HITS: Video[] = [
  {
    id: "tbT-5eilGi8",
    title: "What's inside Bluey's Minecraft Bingo secret base?",
    views: 2_800_000,
    year: "2023",
    thumb: "/media/yt-f3r-bingo.jpg",
    game: "TheGameF3R",
  },
  {
    id: "VpgU5Bv6JUk",
    title: "¿Qué hay dentro de la base secreta de Bluey en Minecraft?",
    views: 2_700_000,
    year: "2023",
    thumb: "/media/yt-f3r-bluey.jpg",
    game: "TheGameF3R",
  },
  {
    id: "oxzR7cK5PTw",
    title: "Enterré al Monstruo Morado de Rainbow Friends por 24 horas",
    views: 990_000,
    year: "2022",
    thumb: "/media/yt-f3r-rainbow.jpg",
    game: "TheGameF3R",
  },
];

export const VIDEOS: Video[] = [
  {
    id: "2Yb19yL7a4w",
    title: "Sobrevive en un bloque Minecraft con Sonic.exe",
    views: 593_000,
    year: "2022",
    thumb: "/media/yt-sonic.jpg",
    game: "Minecraft",
  },
  {
    id: "inRCeAzKzIA",
    title: "I tried gem codes in 99 Nights in the Woods 2026",
    views: 321_000,
    year: "2026",
    thumb: "/media/yt-99nights.jpg",
    game: "99 Nights",
  },
  {
    id: "IxzTHTB9J3U",
    title: "Debunking 10 Minecraft Creepypasta Myths",
    views: 265_000,
    year: "2022",
    thumb: "/media/yt-creepypasta.jpg",
    game: "Minecraft",
  },
  {
    id: "1lJWLHIMLTg",
    title: "We entered the new Fungle map in Among Us",
    views: 90_000,
    year: "2023",
    thumb: "/media/yt-fungle.jpg",
    game: "Among Us",
  },
  {
    id: "_zh2sHYM0P0",
    title: "Desmintiendo 10 Hacks Super OP en Minecraft",
    views: 78_000,
    year: "2022",
    thumb: "/media/yt-hacks.jpg",
    game: "Minecraft",
  },
  {
    id: "3HdxKChkpAw",
    title: "Probé los juegos más raros de Pomni The Amazing Digital Circus",
    views: 49_000,
    year: "2024",
    thumb: "/media/yt-pomni.jpg",
    game: "Digital Circus",
  },
];

export type PackageId =
  | "mention"
  | "integration"
  | "dedicated"
  | "shorts"
  | "pack360";

export type Package = {
  id: PackageId;
  price: number;
  featured?: boolean;
};

export const PACKAGES: Package[] = [
  { id: "mention", price: 90 },
  { id: "integration", price: 280 },
  { id: "dedicated", price: 640, featured: true },
  { id: "shorts", price: 360 },
  { id: "pack360", price: 1080 },
];

export type AddonId = "extraShort" | "stories" | "pinned" | "exclusive" | "rush";

export const ADDONS: {
  id: AddonId;
  kind: "flat" | "percent";
  amount: number;
}[] = [
  { id: "extraShort", kind: "flat", amount: 56 },
  { id: "stories", kind: "flat", amount: 36 },
  { id: "pinned", kind: "flat", amount: 18 },
  { id: "exclusive", kind: "percent", amount: 0.2 },
  { id: "rush", kind: "percent", amount: 0.25 },
];

export const AUDIENCE = {
  age: [
    { label: "13–17", pct: 38 },
    { label: "18–24", pct: 34 },
    { label: "25–34", pct: 18 },
    { label: "35+", pct: 10 },
  ],
  gender: [
    { label: "Hombres", pct: 79 },
    { label: "Mujeres", pct: 21 },
  ],
  geo: [
    { label: "México", pct: 32 },
    { label: "Guatemala", pct: 14 },
    { label: "España", pct: 11 },
    { label: "Colombia", pct: 9 },
    { label: "Argentina", pct: 8 },
    { label: "EE.UU.", pct: 7 },
    { label: "Otros LATAM", pct: 19 },
  ],
};

export const TIMELINE = [
  { year: "2014", key: "start" },
  { year: "2018–20", key: "fortnite" },
  { year: "2020–22", key: "among" },
  { year: "2022–24", key: "minecraft" },
  { year: "2026", key: "now" },
] as const;
