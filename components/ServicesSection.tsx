
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
        <section className="relative z-10 py-10 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Section Header */}
            <div className="text-center mb-16 relative">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${isWeb ? 'bg-fly-cyan/10' : 'bg-fly-orange/10'} rounded-full blur-3xl pointer-events-none`} />

                <h2 className="relative text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                    {title}
                </h2>
                <div className={`h-1 w-24 mx-auto rounded-full bg-gradient-to-r ${gradient}`} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => {
                    const accentColor = isWeb ? 'text-fly-cyan' : 'text-fly-orange';
                    const borderColor = isWeb ? 'group-hover:border-fly-cyan/30' : 'group-hover:border-fly-orange/30';
                    const bgGradient = isWeb ? 'from-fly-cyan/5 to-transparent' : 'from-fly-orange/5 to-transparent';

                    return (
                        <div
                            key={service.id}
                            className={`group relative p-8 rounded-[2rem] border border-white/5 bg-fly-dark/40 backdrop-blur-sm 
                transition-all duration-500 ease-out hover:-translate-y-2 ${borderColor} hover:shadow-2xl overflow-hidden`}
                        >
                            {/* Background Gradient Blob */}
                            <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${bgGradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            {/* Icon Container */}
                            <div className={`relative w-14 h-14 mb-8 rounded-2xl flex items-center justify-center 
                    bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`w-7 h-7 ${accentColor}`}
                                >
                                    <path d={service.iconPath || "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0"} />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <div className={`text-xs font-bold uppercase tracking-widest mb-3 opacity-60 ${accentColor}`}>
                                    {category === 'web' ? 'Digital' : 'Aéreo'}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">
                                    {service.description}
                                </p>

                                {service.link && (
                                    <Link
                                        href={service.link}
                                        className="inline-flex items-center text-sm font-bold text-white/70 group-hover:text-white transition-colors"
                                    >
                                        Explorar
                                        <svg className={`ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform ${accentColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
