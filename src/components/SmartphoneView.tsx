import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { RADIO_CONFIG } from '../config/radioConfig';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  Download,
  QrCode,
  Music,
  Radio,
  Calendar,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Heart
} from 'lucide-react';

interface SmartphoneViewProps {
  onOpenInstallModal: () => void;
  onOpenQRModal: () => void;
  onOpenStreamConfig: () => void;
}

export const SmartphoneView: React.FC<SmartphoneViewProps> = ({
  onOpenInstallModal,
  onOpenQRModal,
  onOpenStreamConfig,
}) => {
  const {
    isPlaying,
    isLoading,
    playbackState,
    togglePlay,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    currentSongTitle,
    currentShow,
    programs,
  } = useRadio();

  const [activeTab, setActiveTab] = useState<'player' | 'schedule' | 'whatsapp'>('player');
  const [loved, setLoved] = useState(false);

  const whatsappBaseUrl = `https://wa.me/${RADIO_CONFIG.whatsappNumber}`;

  return (
    <div className="min-h-screen bg-cupido-base text-white flex flex-col justify-between max-w-md mx-auto relative overflow-hidden select-none pb-24">
      {/* Luces de fondo ambientales */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-cupido-red/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 -right-20 w-64 h-64 bg-cupido-pink/15 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* TOP BAR SMARTPHONE */}
      <header className="sticky top-0 z-30 glass-nav border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/Cupido-Color-192.png"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://i.ibb.co/hRpQ4YwB/Cupido-Color.png';
            }}
            alt="Cupido Radio"
            className="w-10 h-10 object-contain rounded-full shadow-lg"
          />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-black tracking-tight text-white">
              CUPIDO<span className="text-cupido-red"> RADIO</span>
            </span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight mt-0.5">
              {RADIO_CONFIG.slogan}
            </span>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex items-center gap-2">
          {/* Indicador EN VIVO */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cupido-red/15 border border-cupido-red/30 text-[10px] font-black uppercase text-cupido-red">
            <span className={`w-2 h-2 rounded-full bg-cupido-red ${isPlaying ? 'animate-ping' : ''}`}></span>
            <span>EN VIVO</span>
          </div>



          <button
            onClick={onOpenQRModal}
            title="Código QR"
            className="p-2 rounded-full bg-white/5 text-gray-300 hover:text-white border border-white/10 text-xs"
          >
            <QrCode className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL SEGÚN PESTAÑA */}
      <main className="flex-1 px-4 py-4 overflow-y-auto">
        {/* PESTAÑA 1: PLAYER PRINCIPAL SMARTPHONE */}
        {activeTab === 'player' && (
          <div className="flex flex-col items-center justify-between min-h-[calc(100vh-170px)] py-2 gap-4">
            {/* CARÁTULA Y LOGO OFICIAL (Cuadro transparente, sin 128K, Hi-Fi DIGITAL) */}
            <div className="relative w-76 h-76 my-auto flex items-center justify-center">
              <div className="relative z-10 w-70 h-70 rounded-3xl p-3 bg-black/30 backdrop-blur-md border border-white/15 shadow-2xl flex flex-col items-center justify-center">
                <img
                  src="/Cupido-Color-512.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.ibb.co/hRpQ4YwB/Cupido-Color.png';
                  }}
                  alt="Cupido Radio"
                  className={`w-62 h-62 object-contain rounded-full shadow-2xl transition-transform duration-500 ${
                    isPlaying ? 'scale-105' : 'scale-95 opacity-90'
                  }`}
                />

                {/* Badge Hi-Fi flotante */}
                <div className="absolute -bottom-3 px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[10px] font-black tracking-widest uppercase text-cupido-pink shadow-lg">
                  Hi-Fi DIGITAL
                </div>
              </div>
            </div>

            {/* CAJA SONANDO AHORA + PROGRAMA AL AIRE */}
            <div className="w-full glass-card rounded-2xl p-4 border border-white/10 text-center shadow-lg space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-cupido-pink">
                <span className={`w-1.5 h-1.5 rounded-full bg-cupido-red ${isPlaying ? 'animate-pulse' : ''}`} />
                <span>SONANDO AHORA:</span>
              </div>

              <h2 className="text-base font-black text-white truncate text-glow px-2">
                {currentSongTitle || 'Conectando con la señal en vivo...'}
              </h2>

              <p className="text-xs text-gray-300 truncate">
                <span className="text-cupido-red font-bold">Programa:</span>{' '}
                {currentShow ? currentShow.title : 'Baladas & Románticos Inolvidables'}
              </p>

              {/* Ecualizador animado mini */}
              <div className="flex items-end justify-center gap-1.5 h-8 pt-2">
                <span className={`w-1.5 bg-cupido-red rounded-full transition-all ${isPlaying ? 'animate-wave-1' : 'h-2'}`} />
                <span className={`w-1.5 bg-cupido-pink rounded-full transition-all ${isPlaying ? 'animate-wave-2' : 'h-4'}`} />
                <span className={`w-1.5 bg-white rounded-full transition-all ${isPlaying ? 'animate-wave-3' : 'h-6'}`} />
                <span className={`w-1.5 bg-cupido-pink rounded-full transition-all ${isPlaying ? 'animate-wave-4' : 'h-3'}`} />
                <span className={`w-1.5 bg-cupido-red rounded-full transition-all ${isPlaying ? 'animate-wave-5' : 'h-5'}`} />
              </div>
            </div>

            {/* CONTROLES PRINCIPALES SMARTPHONE */}
            <div className="w-full flex flex-col items-center gap-3">
              {/* Botón Central Play/Pause Gigante */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setLoved(!loved)}
                  aria-label="Me gusta"
                  className={`w-12 h-12 rounded-full glass-card border border-white/10 flex items-center justify-center transition-all ${
                    loved ? 'text-cupido-red scale-110' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${loved ? 'fill-cupido-red text-cupido-red' : ''}`} />
                </button>

                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-cupido-red via-cupido-pink to-rose-500 hover:scale-105 active:scale-95 text-white flex items-center justify-center text-3xl shadow-2xl shadow-cupido-red/60 transition-transform cursor-pointer"
                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner animate-spin text-2xl"></i>
                  ) : (
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play ml-1'}`}></i>
                  )}
                </button>

                <a
                  href={`${whatsappBaseUrl}?text=¡Hola%20Cupido%20Radio!%20Estoy%20escuchando%20la%20radio%20desde%20la%20app%20y%20quiero%20pedir%20un%20tema:`}
                  target="_blank"
                  rel="noreferrer"
                  title="Pedir tema por WhatsApp"
                  className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>

              {/* Control Táctil de Volumen */}
              <div className="w-full max-w-xs flex items-center gap-3 px-3 py-2 bg-white/5 rounded-2xl border border-white/5">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  className="text-gray-400 hover:text-white"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-cupido-red" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  aria-label="Control de volumen"
                  className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cupido-red"
                />

                <span className="text-[10px] font-mono text-gray-400 w-7 text-right">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>

              {/* Botón Acción Destacado WhatsApp */}
              <a
                href={`${whatsappBaseUrl}?text=¡Hola%20Cupido%20Radio!%20Quiero%20pedir%20este%20tema%20en%20vivo:`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <i className="fa-brands fa-whatsapp text-lg"></i>
                <span>Pedir Canción en Vivo ({RADIO_CONFIG.whatsappFormatted})</span>
              </a>
            </div>
          </div>
        )}

        {/* PESTAÑA 2: PROGRAMACIÓN SMARTPHONE */}
        {activeTab === 'schedule' && (
          <div className="space-y-4 pb-6">
            <div className="text-center py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cupido-pink bg-cupido-pink/10 px-3 py-1 rounded-full border border-cupido-pink/20">
                Parrilla Oficial
              </span>
              <h2 className="text-xl font-black text-white mt-2">
                Programación Cupido
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                La música que te acompaña las 24 horas del día.
              </p>
            </div>

            <div className="space-y-3">
              {programs.map((prog) => {
                const isCurrent = currentShow?.id === prog.id;

                return (
                  <div
                    key={prog.id}
                    className={`glass-card rounded-2xl p-4 border-l-4 ${prog.borderColor || 'border-cupido-red'} transition-all ${
                      isCurrent
                        ? 'ring-2 ring-cupido-red/60 bg-cupido-red/10 shadow-lg shadow-cupido-red/20'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-black uppercase ${prog.badgeTextColor || 'text-cupido-red'} ${prog.badgeColor || 'bg-cupido-red/20'} px-2.5 py-0.5 rounded-full flex items-center gap-1`}>
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-cupido-red animate-ping" />}
                        <span>{prog.timeSlot}</span>
                      </span>

                      <i className={`${prog.iconClass || 'fa-solid fa-radio'} text-cupido-pink text-sm`}></i>
                    </div>

                    <h3 className="text-base font-black text-white">{prog.title}</h3>

                    {isCurrent && (
                      <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider text-cupido-red bg-cupido-red/20 px-2 py-0.5 rounded">
                        ¡AL AIRE AHORA!
                      </span>
                    )}

                    <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
                      <span>{prog.statusCategory || 'Al Aire'}</span>
                      <span className={`${prog.badgeTextColor || 'text-cupido-pink'} font-bold flex items-center gap-1`}>
                        <i className="fa-solid fa-heart text-[9px]"></i>
                        <span>{prog.highlightText || 'En Vivo'}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PESTAÑA: CABINA WHATSAPP & REDES SMARTPHONE */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-4 pb-6">
            <div className="glass-card rounded-3xl p-6 text-center border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 to-cupido-surface space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-3xl shadow-xl shadow-emerald-500/20">
                <i className="fa-brands fa-whatsapp"></i>
              </div>

              <h2 className="text-xl font-black text-white">
                Cabina Oficial Cupido Radio
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Envía tus mensajes de voz, dedicatorias y pedidos de temas musicales directamente a los locutores de la radio.
              </p>

              <p className="text-base font-black text-emerald-300 py-1">
                {RADIO_CONFIG.whatsappFormatted}
              </p>

              <div className="space-y-2 pt-2">
                <a
                  href={`${whatsappBaseUrl}?text=¡Hola%20Cupido%20Radio!%20Quiero%20pedir%20una%20canción:`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                >
                  <i className="fa-solid fa-music"></i>
                  <span>Pedir una Canción</span>
                </a>

                <a
                  href={`${whatsappBaseUrl}?text=¡Hola%20Cupido%20Radio!%20Quiero%20enviar%20un%20saludo%20especial:`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/10"
                >
                  <i className="fa-solid fa-heart text-cupido-pink"></i>
                  <span>Enviar Saludo de Amor</span>
                </a>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="glass-card rounded-2xl p-4 border border-white/10 space-y-3">
              <h3 className="text-xs font-black text-white uppercase tracking-wider text-center">
                Síguenos en Redes Sociales
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={RADIO_CONFIG.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-pink-600/20 text-center flex flex-col items-center gap-1 border border-white/5"
                >
                  <i className="fa-brands fa-instagram text-xl text-pink-400"></i>
                  <span className="text-[10px] font-bold text-white">Instagram</span>
                </a>
                <a
                  href={RADIO_CONFIG.social.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-center flex flex-col items-center gap-1 border border-white/5"
                >
                  <i className="fa-brands fa-tiktok text-xl text-white"></i>
                  <span className="text-[10px] font-bold text-white">TikTok</span>
                </a>
                <a
                  href={RADIO_CONFIG.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-blue-600/20 text-center flex flex-col items-center gap-1 border border-white/5"
                >
                  <i className="fa-brands fa-facebook-f text-xl text-blue-400"></i>
                  <span className="text-[10px] font-bold text-white">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MINI PLAYER FLOTANTE EN CASO DE ESTAR EN OTRA PESTAÑA */}
      {activeTab !== 'player' && (
        <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-3 z-40">
          <div className="bg-cupido-surface/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 shadow-2xl flex items-center justify-between gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-cupido-red to-cupido-pink text-white flex items-center justify-center shrink-0 shadow-md"
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play ml-0.5'} text-sm`}></i>
            </button>
            <div className="flex-1 truncate" onClick={() => setActiveTab('player')}>
              <p className="text-[9px] font-black text-cupido-pink uppercase">SONANDO AHORA:</p>
              <p className="text-xs font-bold text-white truncate">{currentSongTitle || 'Cupido Radio en Vivo'}</p>
            </div>
            <button
              onClick={() => setActiveTab('player')}
              className="text-[10px] font-bold text-cupido-pink px-2 py-1 rounded bg-cupido-pink/10"
            >
              Ver Player
            </button>
          </div>
        </div>
      )}

      {/* BARRA DE NAVEGACIÓN INFERIOR (BOTTOM TAB BAR SMARTPHONE) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-cupido-surface/98 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex items-center justify-around">
        <button
          onClick={() => setActiveTab('player')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'player'
              ? 'text-cupido-pink font-black scale-105'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Radio className="w-5 h-5" />
          <span className="text-[10px] font-bold">En Vivo</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
            activeTab === 'schedule'
              ? 'text-cupido-pink font-black scale-105'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-bold">Horarios</span>
        </button>

        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'whatsapp'
              ? 'text-emerald-400 font-black scale-105'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </button>
      </nav>
    </div>
  );
};
