
"use client";

import { useState } from "react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ServicesSection from "@/components/ServicesSection"; // We will update this to accept props
import { Service } from "@/lib/api";

interface HomeManagerProps {
    services: Service[];
}

export default function HomeManager({ services }: HomeManagerProps) {
    const [view, setView] = useState<'home' | 'web' | 'drone'>('home');

    const filteredServices = view === 'home'
        ? []
        : services.filter(s => s.category === view);

    const handleBack = () => {
        setView('home');
    };

    if (view !== 'home') {
        return (
            <div className="container mx-auto animate-in fade-in zoom-in duration-500 max-w-7xl">
                <div className="sticky top-4 z-50 mb-8 mt-4 px-6 flex justify-start">
                    <button
                        onClick={handleBack}
                        className="group flex items-center gap-3 px-6 py-3 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-white/80 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-white/5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-semibold tracking-wide">Volver a Inicio</span>
                    </button>
                </div>

                <ServicesSection
                    services={filteredServices}
                    category={view}
                    title={view === 'web' ? 'Proyectos Web' : 'Servicios Drone'}
                />
            </div>
        );
    }

    return (
        <div className="relative z-10 w-full h-full min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fly-cyan/10 rounded-full blur-[100px] pointer-events-none opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fly-orange/10 rounded-full blur-[100px] pointer-events-none opacity-50" />

            {/* Headlines */}
            <div className="text-center mb-16 relative z-10 max-w-3xl mx-auto">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-6 drop-shadow-sm">
                    FLY<span className="bg-clip-text text-transparent bg-gradient-to-r from-fly-cyan to-blue-500">DEV</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10">
                    Desarrollo web de alto impacto y cinematografía aérea profesional.
                </p>
                <div className="inline-block relative">
                    <span className="text-white/80 text-sm md:text-base font-bold uppercase tracking-[0.3em] bg-white/5 py-2 px-6 rounded-full border border-white/10 backdrop-blur-sm">
                        Selecciona tu experiencia
                    </span>
                </div>
            </div>

            {/* Spotlight Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl place-items-center relative z-10">

                {/* Web Dev Card */}
                <SpotlightCard
                    spotlightColor="rgba(34, 211, 238, 0.4)"
                    className="group cursor-pointer w-full max-w-[340px] md:max-w-none md:aspect-[4/3] !bg-[#0f172a]/60 backdrop-blur-xl border-white/10 hover:border-fly-cyan/30 transition-all duration-500 shadow-2xl hover:shadow-fly-cyan/20"
                    onClick={() => setView('web')}
                >
                    <div className="p-8 md:p-12 h-full flex flex-col items-center text-center justify-center gap-6 relative overflow-hidden">
                        {/* Subtle background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-fly-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-fly-cyan/10 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-fly-cyan/20 transition-all duration-500 shrink-0 border border-fly-cyan/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-fly-cyan transform group-hover:rotate-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>

                        <div className="flex flex-col gap-2 relative z-10">
                            <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-fly-cyan transition-colors duration-300">
                                Digital
                            </h3>
                            <p className="text-gray-400 font-medium md:text-lg">
                                Apps & Plataformas Web
                            </p>
                        </div>

                        <div className="absolute bottom-8 flex items-center gap-2 text-fly-cyan font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                            <span>Ingresar al área digital</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Drone Services Card */}
                <SpotlightCard
                    spotlightColor="rgba(249, 115, 22, 0.4)"
                    className="group cursor-pointer w-full max-w-[340px] md:max-w-none md:aspect-[4/3] !bg-[#0f172a]/60 backdrop-blur-xl border-white/10 hover:border-fly-orange/30 transition-all duration-500 shadow-2xl hover:shadow-fly-orange/20"
                    onClick={() => setView('drone')}
                >
                    <div className="p-8 md:p-12 h-full flex flex-col items-center text-center justify-center gap-6 relative overflow-hidden">
                        {/* Subtle background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-fly-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-fly-orange/10 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-fly-orange/20 transition-all duration-500 shrink-0 border border-fly-orange/20 shadow-[0_0_30px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_50px_rgba(249,115,22,0.2)]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-fly-orange transform group-hover:-rotate-3 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <div className="flex flex-col gap-2 relative z-10">
                            <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-fly-orange transition-colors duration-300">
                                Aéreo
                            </h3>
                            <p className="text-gray-400 font-medium md:text-lg">
                                Video 4K & Fotogrametría
                            </p>
                        </div>

                        <div className="absolute bottom-8 flex items-center gap-2 text-fly-orange font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                            <span>Ingresar al área aérea</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </SpotlightCard>

            </div>
        </div>
    );
}
