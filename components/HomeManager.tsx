
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
            <div className="container mx-auto animate-in fade-in zoom-in duration-500">
                <div className="sticky top-4 z-50 mb-8 px-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/70 hover:text-white transition-colors hover:bg-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-medium">Volver a Inicio</span>
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
        <div className="relative z-10 w-full h-full min-h-[80vh] flex flex-col items-center justify-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Headlines */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 text-center">
                FLY<span className="text-fly-cyan">DEV</span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto mb-12 text-center">
                Desarrollo web de alto impacto y cinematografía aérea profesional.
                <br />
                <span className="text-white/60 text-xs uppercase tracking-widest mt-4 block">Selecciona tu experiencia</span>
            </p>

            {/* Spotlight Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">

                {/* Web Dev Card */}
                <SpotlightCard
                    spotlightColor="rgba(34, 211, 238, 0.4)"
                    className="group cursor-pointer w-full max-w-[200px] md:max-w-[400px] aspect-square !bg-white/10 backdrop-blur-md border-white/10"
                    onClick={() => setView('web')}
                >
                    <div className="p-6 h-full flex flex-col items-center text-center justify-between">
                        <div className="w-16 h-16 bg-fly-cyan/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fly-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-fly-cyan transition-colors">
                            Web
                        </h3>

                        <p className="text-gray-300 text-sm leading-snug">
                            Apps &<br />E-Commerce
                        </p>

                        <div className="mt-2 text-fly-cyan text-sm font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            Entrar →
                        </div>
                    </div>
                </SpotlightCard>

                {/* Drone Services Card */}
                <SpotlightCard
                    spotlightColor="rgba(249, 115, 22, 0.4)"
                    className="group cursor-pointer w-full max-w-[200px] md:max-w-[400px] aspect-square !bg-white/10 backdrop-blur-md border-white/10"
                    onClick={() => setView('drone')}
                >
                    <div className="p-6 h-full flex flex-col items-center text-center justify-between">
                        <div className="w-16 h-16 bg-fly-orange/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fly-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-fly-orange transition-colors">
                            Drone
                        </h3>

                        <p className="text-gray-300 text-sm leading-snug">
                            Video 4K &<br />Fotogrametría
                        </p>

                        <div className="mt-2 text-fly-orange text-sm font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            Entrar →
                        </div>
                    </div>
                </SpotlightCard>

            </div>
        </div>
    );
}
