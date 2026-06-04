// components/ClientParticles.tsx
"use client";

import dynamic from "next/dynamic";

// Aquí sí está permitido usar ssr: false porque es un Client Component
const ParticlesBackground = dynamic(
  () => import("@/components/ParticlesBackground"),
  { ssr: false }
);

export default function ClientParticles() {
  return <ParticlesBackground />;
}