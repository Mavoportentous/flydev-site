
// lib/api.ts

// Define the shape of a Service item
export interface Service {
  id: number;
  title: string;
  description: string;
  iconPath: string; // SVG path data
  link?: string;
  category: 'web' | 'drone';
}

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// Mock data with Icons (Lucide/Heroicons style paths)
const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    title: "Desarrollo Web a Medida",
    description: "Sitios web de alto rendimiento, optimizados para SEO y diseñados para convertir visitantes en clientes.",
    category: "web",
    link: "/servicios/desarrollo-web",
    iconPath: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" // coding/link abstraction
  },
  {
    id: 2,
    title: "E-Commerce",
    description: "Tiendas en línea robustas y seguras que simplifican la gestión de tus productos y ventas.",
    category: "web",
    link: "/servicios/ecommerce",
    iconPath: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" // shopping cart
  },
  {
    id: 3,
    title: "Fotogrametría con Drones",
    description: "Modelos 3D precisos y mapas ortomosaicos para construcción, agricultura y topografía.",
    category: "drone",
    link: "/servicios/fotogrametria",
    iconPath: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" // cube/3d structure
  },
  {
    id: 4,
    title: "Inspección Técnica Aérea",
    description: "Revisión de infraestructuras de difícil acceso con drones equipados con cámaras de alta resolución.",
    category: "drone",
    link: "/servicios/inspeccion",
    iconPath: "M2 12h20M2 12l5-5m-5 5l5 5M22 12l-5-5m5 5l-5 5" // activity/scan (simplified) -> changed to a scope-like or scan path in next iteration if needed, this is just placeholder
  },
  {
    id: 5,
    title: "Video Corporativo 4K",
    description: "Producción audiovisual cinematográfica para destacar tu marca desde ángulos imposibles.",
    category: "drone",
    link: "/servicios/video-drone",
    iconPath: "M23 7l-7 5 7 5V7zM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" // video camera
  },
  {
    id: 6,
    title: "Aplicaciones Web Progresivas (PWA)",
    description: "La experiencia de una app nativa directamente en el navegador, accesible en cualquier dispositivo.",
    category: "web",
    link: "/servicios/pwa",
    iconPath: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" // paper plane / navigation
  }
];

export async function getServices(): Promise<Service[]> {
  // If no API URL is provided, return mock data
  if (!API_URL) {
    console.warn("WordPress API URL not configured. Using mock data.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_SERVICES;
  }

  try {
    // Ideally query by tag or category for 'services'
    // This is a placeholder fetch - structure depends on actual WP setup
    const response = await fetch(`${API_URL}/wp/v2/posts?categories=services&_embed`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }

    const posts = await response.json();

    // Transform WP posts to Service interface
    // Note: This mapping will need adjustment based on actual WP response structure (ACF fields, etc.)
    return posts.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]+>/g, ''), // Strip HTML tags
      category: post.categories.includes(1) ? 'web' : 'drone', // Placeholder logic
      link: `/servicios/${post.slug}`
    }));

  } catch (error) {
    console.error("Error fetching services:", error);
    return MOCK_SERVICES; // Fallback to mock data on error
  }
}
