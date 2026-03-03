
// components/ServicesSection.tsx
import { Service } from "@/lib/api";
import Link from "next/link";

interface ServicesSectionProps {
    services: Service[];
    category: 'web' | 'drone';
    title: string;
}

export default function ServicesSection({ services, category, title }: ServicesSectionProps) {
    const isWeb = category === 'web';
    const gradient = isWeb ? 'from-fly-cyan to-fly-cyan/50' : 'from-fly-orange to-fly-orange/50';

    return (
        <section className="relative z-10 py-16 px-6 max-w-[90rem] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Ambient Background Glows */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 ${isWeb ? 'bg-fly-cyan' : 'bg-fly-orange'}`} />
            <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 ${isWeb ? 'bg-fly-cyan' : 'bg-fly-orange'}`} />

            {/* Section Header */}
            <div className="text-center mb-20 relative z-10">
                <div className={`inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg ${isWeb ? 'shadow-fly-cyan/10' : 'shadow-fly-orange/10'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8 ${isWeb ? 'text-fly-cyan' : 'text-fly-orange'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isWeb ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                    </svg>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 tracking-tight drop-shadow-sm">
                    {title}
                </h2>
                <div className={`h-1.5 w-32 mx-auto rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_15px_rgba(255,255,255,0.1)]`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 relative z-10">
                {services.map((service, index) => {
                    const accentColor = isWeb ? 'text-fly-cyan' : 'text-fly-orange';
                    const hoverAccent = isWeb ? 'group-hover:text-fly-cyan' : 'group-hover:text-fly-orange';
                    const borderColor = isWeb ? 'group-hover:border-fly-cyan/40' : 'group-hover:border-fly-orange/40';
                    const shadowColor = isWeb ? 'group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]' : 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]';
                    const iconBg = isWeb ? 'bg-fly-cyan/10 group-hover:bg-fly-cyan/20' : 'bg-fly-orange/10 group-hover:bg-fly-orange/20';
                    const iconBorder = isWeb ? 'border-fly-cyan/20 group-hover:border-fly-cyan/50' : 'border-fly-orange/20 group-hover:border-fly-orange/50';

                    return (
                        <div
                            key={service.id}
                            className={`group relative p-10 rounded-[2.5rem] border border-white/10 bg-[#0f172a]/40 backdrop-blur-xl 
                transition-all duration-500 ease-out hover:-translate-y-3 ${borderColor} ${shadowColor} overflow-hidden flex flex-col`}
                        >
                            {/* Decorative Background Blob */}
                            <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none ${isWeb ? 'bg-fly-cyan' : 'bg-fly-orange'}`} />

                            {/* Icon Container */}
                            <div className={`relative w-20 h-20 mb-8 rounded-[1.5rem] flex items-center justify-center 
                    ${iconBg} border ${iconBorder} transition-all duration-500 shadow-inner group-hover:scale-110`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`w-10 h-10 ${accentColor} transform group-hover:rotate-6 transition-transform duration-500`}
                                >
                                    <path d={service.iconPath || "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0"} />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex-grow flex flex-col">
                                <div className={`text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-70 ${accentColor}`}>
                                    {category === 'web' ? 'Área Digital' : 'Sector Aéreo'}
                                </div>

                                <h3 className={`text-3xl font-bold text-white mb-5 ${hoverAccent} transition-colors duration-300`}>
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-lg leading-relaxed mb-10 group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                                    {service.description}
                                </p>

                                {service.link && (
                                    <div className="pt-6 mt-auto border-t border-white/5">
                                        <Link
                                            href={service.link}
                                            className={`inline-flex items-center justify-between w-full p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 ${hoverAccent} group/btn`}
                                        >
                                            <span className="font-bold tracking-wide">Explorar Servicio</span>
                                            <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors`}>
                                                <svg className={`w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform ${accentColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
