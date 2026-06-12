import { getServiceBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import ServiceContactForm from '@/components/ServiceContactForm';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);
  
  if (!service) {
    return {
      title: 'Servicio no encontrado',
    };
  }

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: service.link,
    },
    openGraph: {
      type: 'website',
      locale: 'es_MX',
      siteName: 'FLYDEV',
      title: `${service.title} | FLYDEV`,
      description: service.description,
      url: service.link,
    },
    twitter: {
      card: 'summary',
      title: `${service.title} | FLYDEV`,
      description: service.description,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const isWeb = service.category === 'web';
  const accentColor = isWeb ? 'text-fly-cyan' : 'text-fly-orange';
  const borderAccent = isWeb ? 'border-fly-cyan' : 'border-fly-orange';
  const gradientText = isWeb ? 'from-fly-cyan to-white' : 'from-fly-orange to-white';
  const shadowAccent = isWeb ? 'shadow-[0_0_40px_rgba(34,211,238,0.2)]' : 'shadow-[0_0_40px_rgba(249,115,22,0.2)]';
  const buttonBgHover = isWeb ? 'hover:bg-fly-cyan/20' : 'hover:bg-fly-orange/20';
  const bgGradientRadial = isWeb ? 'from-fly-cyan/30' : 'from-fly-orange/30';

  return (
    <div className="min-h-[100dvh] bg-fly-dark text-white selection:bg-white/10 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-30 pointer-events-none bg-gradient-radial ${bgGradientRadial} to-transparent`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-20 pointer-events-none bg-gradient-radial ${bgGradientRadial} to-transparent`} />
      
      {/* Navigation */}
      <nav className="relative z-50 w-full p-6 lg:px-12 flex justify-start items-center">
        <Link href="/" className="group flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300">
          <svg className="w-5 h-5 text-gray-400 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-semibold tracking-wide text-gray-300 group-hover:text-white transition-colors">Volver</span>
        </Link>
      </nav>

      <main className="relative z-10 flex-grow container mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Icon & Visuals */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end animate-in fade-in zoom-in duration-700">
          <div className={`relative w-64 h-64 md:w-96 md:h-96 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center p-12 ${shadowAccent} transition-all duration-700 group`}>
            <div className={`absolute inset-0 rounded-[3rem] opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-radial ${bgGradientRadial} to-transparent`} />
            <svg 
              className={`w-full h-full ${accentColor} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transform group-hover:scale-110 transition-transform duration-700 ease-out`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.iconPath} />
            </svg>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="mb-8 flex items-center gap-4">
            <span className={`px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-[0.2em] ${accentColor}`}>
              {service.category === 'web' ? 'Área Digital' : 'Sector Aéreo'}
            </span>
            <div className={`h-[1px] flex-grow bg-gradient-to-r from-white/20 to-transparent`} />
          </div>
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-br ${gradientText} leading-tight drop-shadow-sm tracking-tighter`}>
            {service.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-12 max-w-2xl">
            {service.description}
          </p>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a href="#contacto" className={`px-8 py-4 rounded-full font-bold text-white bg-white/5 border ${borderAccent}/50 ${buttonBgHover} transition-all duration-300 ${shadowAccent} flex items-center gap-3 group`}>
              <span>Solicitar Presupuesto</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <span className="text-sm text-gray-500 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
               Respuesta en menos de 24hs
            </span>
          </div>
        </div>
      </main>

      {/* Extended Information Section (Mocked for WOW effect) */}
      <section className="relative z-10 bg-[#0f172a]/60 backdrop-blur-md border-t border-white/5 py-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col gap-6 group">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${accentColor} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">Alta Eficiencia</h3>
                        <p className="text-gray-400 leading-relaxed font-light">Optimizamos cada aspecto para garantizar tiempos de respuesta mínimos y máxima eficiencia en cada fase del proyecto.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 group">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${accentColor} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">Estándar Premium</h3>
                        <p className="text-gray-400 leading-relaxed font-light">Implementamos las mejores prácticas y estándares de la industria para asegurar resultados profesionales de primer nivel.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 group">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${accentColor} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">Soporte Continuo</h3>
                        <p className="text-gray-400 leading-relaxed font-light">Estaremos a tu lado en cada etapa del proyecto, asegurando resultados excepcionales a lo largo del tiempo.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ServiceContactForm isWeb={isWeb} serviceTitle={service.title} />
    </div>
  );
}
