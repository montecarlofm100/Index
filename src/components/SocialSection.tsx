import React from 'react';
import { RADIO_CONFIG } from '../config/radioConfig';

export const SocialSection: React.FC = () => {
  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-card rounded-3xl p-8 sm:p-12 text-center border border-white/10">
        <span className="text-xs font-bold uppercase tracking-widest text-cupido-pink">
          Nuestras Redes
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1">
          Síguenos en <span className="text-cupido-red">@cupidoradiopy</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-lg mx-auto mt-2">
          Fotos de cabina, videos de locutores y la mejor comunidad musical.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
          {/* Instagram */}
          <a
            href={RADIO_CONFIG.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white/5 hover:bg-pink-600/20 border border-white/10 flex flex-col items-center gap-2 group transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform shadow-md">
              <i className="fa-brands fa-instagram"></i>
            </div>
            <span className="font-bold text-white text-sm">Instagram</span>
            <span className="text-xs text-gray-400">@cupidoradiopy</span>
          </a>

          {/* TikTok */}
          <a
            href={RADIO_CONFIG.social.tiktok}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 flex flex-col items-center gap-2 group transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-xl border border-white/20 group-hover:scale-110 transition-transform shadow-md">
              <i className="fa-brands fa-tiktok"></i>
            </div>
            <span className="font-bold text-white text-sm">TikTok</span>
            <span className="text-xs text-gray-400">@cupidoradiopy</span>
          </a>

          {/* Facebook */}
          <a
            href={RADIO_CONFIG.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-white/5 hover:bg-blue-600/20 border border-white/10 flex flex-col items-center gap-2 group transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform shadow-md">
              <i className="fa-brands fa-facebook-f"></i>
            </div>
            <span className="font-bold text-white text-sm">Facebook</span>
            <span className="text-xs text-gray-400">Cupido Radio Py</span>
          </a>
        </div>
      </div>
    </section>
  );
};
