import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { LangProvider } from "@/lib/i18n";
import appCss from "../styles.css?url";

const APP_NAME = "GAMEFER";
const SITE = "https://gamef3r.com";
const DESC =
  "Media kit y booking de GameFer y TheGameF3R. 1.83M combinados en YouTube. Patrocinios para marcas en Latinoamérica.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: DESC },
      { name: "theme-color", content: "#0E0909" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: DESC },
      { property: "og:image", content: `${SITE}/og.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE}/og.jpg` },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Syne:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="es" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-background text-foreground">
        <PreviewHostBridge />
        <AuthProvider>
          <LangProvider>
            <Outlet />
          </LangProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
