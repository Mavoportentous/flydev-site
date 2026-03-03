import Link from 'next/link';
import ParticlesBackground from '@/components/ParticlesBackground';

export default function NotFound() {
    return (
        <main className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-fly-dark text-white selection:bg-fly-cyan/30 selection:text-white px-6">
            {/* Fondo Interactivo */}
            <ParticlesBackground />

            {/* Background Glows decorativos */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-fly-cyan/10 rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-fly-orange/10 rounded-full blur-[120px] pointer-events-none opacity-40 animate-pulse" />

            {/* Contenedor Principal con Glassmorphism */}
            <div className="relative z-10 w-full max-w-2xl p-8 md:p-16 rounded-[3rem] border border-white/10 bg-[#0f172a]/50 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-700">

                {/* Icono animado */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8 rounded-3xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner group">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-fly-cyan/20 to-fly-orange/20 animate-spin-slow opacity-50 blur-md"></div>
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-white/80 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                <div className="inline-block mb-4">
                    <span className="text-fly-cyan text-sm md:text-base font-black uppercase tracking-[0.3em] bg-fly-cyan/10 py-2 px-6 rounded-full border border-fly-cyan/20">
                        Error 404
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-6 font-geist">
                    Página no encontrada
                </h1>

                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md">
                    El horizonte está despejado, pero la ruta que buscas no existe o se encuentra <strong className="text-white font-semibold">actualmente en construcción.</strong>
                </p>

                <Link
                    href="/"
                    className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Volver a Inicio</span>
                </Link>

            </div>
        </main>
    );
}
