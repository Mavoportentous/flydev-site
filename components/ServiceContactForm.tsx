"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/actions/sendEmail";

interface ServiceContactFormProps {
  isWeb: boolean;
  serviceTitle: string;
}

export default function ServiceContactForm({ isWeb, serviceTitle }: ServiceContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const accentColor = isWeb ? 'text-fly-cyan' : 'text-fly-orange';
  const borderAccent = isWeb ? 'focus:border-fly-cyan/50' : 'focus:border-fly-orange/50';
  const bgAccent = isWeb ? 'bg-fly-cyan' : 'bg-fly-orange';
  const shadowAccent = isWeb ? 'hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      details: formData.get('details') as string,
      serviceTitle,
    };

    const result = await sendContactEmail(data);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Ocurrió un error inesperado.');
    }
  };

  return (
    <section id="contacto" className="relative z-10 py-24 px-6 scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Comencemos tu proyecto
          </h2>
          <p className="text-gray-400 text-lg">
            Solicita un presupuesto para <strong className={`font-semibold ${accentColor}`}>{serviceTitle}</strong>. 
            Te responderemos a la brevedad.
          </p>
        </div>

        <div className={`p-8 md:p-12 rounded-[2.5rem] bg-[#0f172a]/60 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden`}>
          {/* Subtle Glow */}
          <div className={`absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none rounded-full bg-gradient-radial ${isWeb ? 'from-fly-cyan/30' : 'from-fly-orange/30'} to-transparent`} />
          
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
              <div className={`w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 ${accentColor}`}>
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
              <p className="text-gray-400 text-lg">Nos pondremos en contacto contigo pronto.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-sm font-medium text-gray-500 hover:text-white transition-colors"
              >
                Enviar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required 
                    className={`w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none transition-colors ${borderAccent}`}
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Correo Electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required 
                    className={`w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none transition-colors ${borderAccent}`}
                    placeholder="tucorreo@empresa.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-medium text-gray-400 ml-1">Empresa / Proyecto (Opcional)</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company"
                  className={`w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none transition-colors ${borderAccent}`}
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="details" className="text-sm font-medium text-gray-400 ml-1">Detalles de tu Solicitud</label>
                <textarea 
                  id="details" 
                  name="details"
                  required 
                  rows={4}
                  className={`w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none transition-colors resize-none ${borderAccent}`}
                  placeholder="Cuéntanos brevemente qué necesitas..."
                />
              </div>

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className={`mt-4 w-full py-5 rounded-2xl font-bold text-white bg-white/10 border border-white/10 hover:bg-white/20 transition-all duration-300 ${shadowAccent} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3`}
              >
                {status === 'submitting' ? (
                  <>
                    <svg className={`animate-spin h-5 w-5 ${accentColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Solicitar Presupuesto</span>
                    <svg className={`w-5 h-5 ${accentColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
