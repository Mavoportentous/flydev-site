import ParticlesBackground from "@/components/ParticlesBackground";
import HomeManager from "@/components/HomeManager";
import { getServices } from "@/lib/api";

export default async function Home() {
  const services = await getServices();

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-fly-dark text-white">
      {/* El fondo interactivo */}
      <ParticlesBackground />

      {/* Client-side Manager for Interactions */}
      <HomeManager services={services} />
    </main>
  );
}