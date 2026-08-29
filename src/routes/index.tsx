import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { About, Hero } from "@/components/home-top";
import { Brands, Ecosistema, Redes, Work } from "@/components/home-mid";
import { Audience, CtaBand, Packages, Process } from "@/components/home-bot";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <Hero />
      <About />
      <Ecosistema />
      <Brands />
      <Work />
      <Redes />
      <Audience />
      <Packages />
      <Process />
      <CtaBand />
      <SiteFooter />
    </div>
  );
}
