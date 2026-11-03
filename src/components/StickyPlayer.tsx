import React from 'react';
import { useRadio } from '../context/RadioContext';
import { RADIO_CONFIG } from '../config/radioConfig';

export const StickyPlayer: React.FC = () => {
  const { isPlaying, togglePlay, currentSongTitle } = useRadio();

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-cupido-surface/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        {/* Izquierda: Logo y Nombre */}
        <div className="flex items-center gap-3 shrink-0">
          <img
            src="/Cupido-Color-192.png"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://i.ibb.co/hRpQ4YwB/Cupido-Color.png';
            }}
            alt="Cupido Radio"
            className="w-11 h-11 object-contain rounded-full shadow-md shrink-0"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xs font-black text-white tracking-wide">CUPIDO RADIO</span>
            <span className="text-[10px] text-cupido-pink font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cupido-red animate-ping"></span> EN VIVO
            </span>
          </div>
        </div>

        {/* CENTRO: CANCIÓN AL AIRE + BOTÓN PLAY */}
        <div className="flex-1 max-w-2xl mx-1 sm:mx-4 flex items-center justify-center gap-3 sm:gap-4 min-w-0">
          {/* Botón Play/Pause */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-cupido-red to-cupido-pink hover:scale-105 active:scale-95 text-white flex items-center justify-center text-lg shadow-lg shadow-cupido-red/40 cursor-pointer shrink-0 transition-all"
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play ml-0.5'}`}></i>
          </button>

          {/* CAJA DESTACADA EN EL CENTRO CON EL ARTISTA Y CANCIÓN */}
          <div className="flex-1 min-w-0 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-2xl flex items-center gap-3 overflow-hidden shadow-inner backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-cupido-red/20 flex items-center justify-center text-cupido-pink shrink-0">
              <i className={`fa-solid fa-music text-xs ${isPlaying ? 'animate-bounce' : ''}`}></i>
            </div>
            <div className="text-left truncate flex-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-cupido-pink flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full bg-cupido-red ${isPlaying ? 'animate-pulse' : ''}`}></span>
                SONANDO AHORA:
              </p>
              <h5 className="text-xs sm:text-sm font-black text-white truncate text-glow">
                {currentSongTitle || 'Conectando con la transmisión...'}
              </h5>
            </div>
          </div>
        </div>

        {/* Derecha: Botón WhatsApp Pedir Tema */}
        <div className="shrink-0 flex items-center">
          <a
            href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=¡Hola%20Cupido%20Radio!%20Quiero%20pedir%20un%20tema%20en%20vivo:`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span className="hidden md:inline">Pedir Tema</span>
          </a>
        </div>
      </div>
    </div>
  );
};
