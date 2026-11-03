import React from 'react';
import { useRadio } from '../context/RadioContext';

interface HeroPlayerSectionProps {
  onOpenInstallModal?: () => void;
}

export const HeroPlayerSection: React.FC<HeroPlayerSectionProps> = ({ onOpenInstallModal }) => {
  const { isPlaying, isLoading, playbackState, togglePlay, volume, setVolume } = useRadio();

  const getStatusText = () => {
    if (isLoading) return 'Conectando señal...';
    if (isPlaying) return '¡En vivo ahora mismo!';
    if (playbackState === 'error') return 'Error de conexión';
    return 'Lista para sonar';
  };

  return (
    <section id="inicio" className="relative pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cupido-red/20 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 -right-28 w-[400px] h-[400px] bg-cupido-pink/15 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título y Descripción */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cupido-red/10 border border-cupido-red/30">
              <span className="w-2.5 h-2.5 rounded-full bg-cupido-red animate-pulse"></span>
              <span
                className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ backgroundColor: '#000000', color: '#ffffff' }}
              >
                Transmitiendo 24/7 En Vivo
              </span>
            </div>


          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="text-white">
              RÓMANTICA 24/7
            </span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Las baladas más íntimas, los clásicos de colección y la mejor compañía musical. Conéctate a la señal oficial de Cupido Radio.
          </p>
        </div>

        {/* DISTRIBUCIÓN: CUADRO 1:1 A LA IZQUIERDA Y CUADRO DEL VOLUMEN A LA DERECHA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-center">
          {/* COSTADO IZQUIERDO: RECUADRO SEÑAL DIGITAL HD EN FORMATO 1:1 CON BOTÓN PLAY GIGANTE */}
          <div className="w-full aspect-square max-w-sm mx-auto glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between text-center border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-36 h-36 bg-cupido-red/20 rounded-full blur-2xl pointer-events-none"></div>

            {/* Botón Play Circular Gigante (formato idéntico a la captura) */}
            <div className="relative pt-2">
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-tr from-cupido-red to-cupido-pink blur-xl transition-all duration-700 ${
                  isPlaying ? 'opacity-80 scale-125 animate-pulse' : 'opacity-40'
                }`}
              ></div>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pausar transmisión' : 'Reproducir transmisión'}
                className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-cupido-red via-cupido-pink to-rose-500 hover:scale-105 active:scale-95 text-white flex items-center justify-center text-4xl shadow-2xl shadow-cupido-red/60 transition-transform cursor-pointer group"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner animate-spin text-3xl"></i>
                ) : (
                  <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play ml-1'} group-hover:scale-110 transition-transform`}></i>
                )}
              </button>
            </div>

            {/* Datos Señal Digital */}
            <div className="space-y-1">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                SEÑAL DIGITAL Hi-Fi
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {getStatusText()}
              </h3>
              <p className="text-[11px] text-cupido-pink font-bold">
                Transmisión 24 Horas Online
              </p>
            </div>

            {/* Ecualizador Animado en cápsula inferior */}
            <div className="flex items-end justify-center gap-2 h-14 w-full px-6 py-2 bg-black/40 rounded-2xl border border-white/10 mb-1">
              <span
                className={`w-2 bg-cupido-red rounded-full transition-all ${
                  isPlaying ? 'animate-wave-1' : 'h-3'
                }`}
              ></span>
              <span
                className={`w-2 bg-cupido-pink rounded-full transition-all ${
                  isPlaying ? 'animate-wave-2' : 'h-6'
                }`}
              ></span>
              <span
                className={`w-2 bg-white rounded-full transition-all ${
                  isPlaying ? 'animate-wave-3' : 'h-10'
                }`}
              ></span>
              <span
                className={`w-2 bg-cupido-pink rounded-full transition-all ${
                  isPlaying ? 'animate-wave-4' : 'h-5'
                }`}
              ></span>
              <span
                className={`w-2 bg-cupido-red rounded-full transition-all ${
                  isPlaying ? 'animate-wave-5' : 'h-8'
                }`}
              ></span>
            </div>
          </div>

          {/* COSTADO DERECHO: CUADRO 1:1 CON EL LOGO OFICIAL, TEXTO Y EL PANEL DEL VOLUMEN */}
          <div className="w-full aspect-square max-w-sm mx-auto glass-card rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-between text-center border border-white/15 shadow-2xl shadow-cupido-red/20 relative overflow-hidden">
            {/* Logo Central Oficial con alas y corazón */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-tr from-cupido-red to-cupido-pink blur-xl transition-all duration-700 ${
                  isPlaying ? 'opacity-40 scale-110' : 'opacity-15'
                }`}
              ></div>
              <img
                src="/Cupido-Color-512.png"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://i.ibb.co/hRpQ4YwB/Cupido-Color.png';
                }}
                alt="Cupido Radio Logo"
                className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-full shadow-2xl drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">CUPIDO RADIO</h3>
              <p className="text-xs font-black uppercase tracking-widest text-cupido-pink">
                Hi-Fi DIGITAL
              </p>
            </div>

            {/* Panel de Control de Volumen con barra y altavoz */}
            <div className="flex items-center justify-center gap-3 w-full px-6 mb-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Control de volumen"
                className="w-full h-2 bg-gray-700/80 rounded-lg appearance-none cursor-pointer accent-cupido-red"
              />
              <i className="fa-solid fa-volume-high text-xs text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
