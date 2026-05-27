import dynamic from "next/dynamic";
import HomeManager from "@/components/HomeManager";
import { getServices } from "@/lib/api";

const ParticlesBackground = dynamic(() => import("@/components/ParticlesBackground"), { 
  ssr: false 
});
export default async function Home() {
  const services = await getServices();

  return (
    <main className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-fly-dark text-white selection:bg-fly-cyan/30 selection:text-white pb-16">
      {/* El fondo interactivo */}
      <ParticlesBackground />

      {/* Client-side Manager for Interactions */}
      <HomeManager services={services} />
    </main>
  );
}