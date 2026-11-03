import React from 'react';
import { RADIO_CONFIG } from '../config/radioConfig';

export const WhatsAppCabinaSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=¡Hola%20Cupido%20Radio!%20Quiero%20pedir%20esta%20canción%20y%20mandar%20un%20saludo:`;

  return (
    <section id="pedidos" className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/80 via-cupido-card to-cupido-surface border border-emerald-500/30 p-8 sm:p-12 shadow-2xl">
        {/* Large watermark background icon */}
        <i className="fa-brands fa-whatsapp absolute -bottom-10 -right-10 text-white/5 text-[220px] pointer-events-none select-none"></i>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <i className="fa-solid fa-bolt"></i> Cabina en Vivo
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white">
              ¡Pide tu canción o envía tu saludo en vivo!
            </h2>

            <p className="text-gray-300 text-sm sm:text-base max-w-xl">
              Mándanos un mensaje de texto o una nota de voz al WhatsApp. Nuestros locutores leerán tu dedicatoria al aire.
            </p>

            <p className="text-lg font-black text-emerald-300 pt-1">
              <i className="fa-brands fa-whatsapp mr-1 text-xl"></i> {RADIO_CONFIG.whatsappFormatted}{' '}
              <span className="text-gray-400 font-normal text-sm">(WhatsApp Cupido)</span>
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center gap-3 transform hover:-translate-y-1 transition-all"
          >
            <span>MANDAR MENSAJE AHORA</span>
            <i className="fa-solid fa-paper-plane text-emerald-100"></i>
          </a>
        </div>
      </div>
    </section>
  );
};
