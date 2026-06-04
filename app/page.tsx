// app/page.tsx
import { getServices } from "@/lib/api";
// Importamos el wrapper que acabamos de crear
import ClientParticles from "@/components/ClientParticles";

export default async function Home() {
   const services = await getServices();
   
   return (
     <main>
       {/* Usamos el componente de cliente que maneja el ssr: false */}
       <ClientParticles />
       
       {/* ... el resto del código de nuestra página ... */}
     </main>
   );
}