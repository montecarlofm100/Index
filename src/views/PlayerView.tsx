import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { CupidoLogo } from '../components/CupidoLogo';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { RADIO_CONFIG, CUPIDO_ASSETS } from '../config/radioConfig';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  MessageCircle,
  Share2,
  RefreshCw,
  Radio,
  Heart,
  Globe,
  Sliders,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface PlayerViewProps {
  onOpenStreamConfig: () => void;
  onNavigateToProgramacion: () => void;
  onNavigateToContacto: () => void;
  onOpenIsmyradioModal: () => void;
  onOpenQRModal: () => void;
}

export const PlayerView: React.FC<PlayerViewProps> = ({
  onOpenStreamConfig,
  onNavigateToProgramacion,
  onNavigateToContacto,
  onOpenIsmyradioModal,
  onOpenQRModal,
}) => {
  const {
    isPlaying,
    isLoading,
    playbackState,
    errorMessage,
    currentShow,
    volume,
    isMuted,
    currentStream,
    togglePlay,
    setVolume,
    toggleMute,
    reconnect,
    selectStream,
  } = useRadio();

  const [loved, setLoved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = async () => {
    const text = `¡Escucha ${RADIO_CONFIG.name}! "${RADIO_CONFIG.slogan}". Baladas de amor en vivo las 24 horas.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: RADIO_CONFIG.name,
          text: text,
          url: RADIO_CONFIG.website,
        });
      } catch {
        // dismissed
      }
    } else {
      try {
        await navigator.clipboard.writeText(RADIO_CONFIG.website);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      } catch {
        // fallback
      }
    }
  };

  const handleWhatsAppSongRequest = () => {
    const message = encodeURIComponent(
      '¡Hola Cupido Radio! Les escucho desde la aplicación y quiero pedir una canción romántica:'
    );
    window.open(`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full px-4 py-3 sm:py-5 space-y-4 max-w-md mx-auto w-full select-none">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center w-full">
        <CupidoLogo size="lg" variant="full" showSlogan={true} />

        {/* Current Show Indicator */}
        {currentShow && (
          <button
            onClick={onNavigateToProgramacion}
            className="mt-3 group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs text-white/80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5478] animate-pulse" />
            <span className="text-white/60">Al aire:</span>
            <span className="font-semibold text-white group-hover:text-[#FF5478] transition-colors truncate max-w-[170px]">
              {currentShow.title}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-[#D5AD70] text-[11px]">{currentShow.timeSlot}</span>
          </button>
        )}
      </div>

      {/* Center Official Banner */}
      <div className="relative w-full max-w-[310px] sm:max-w-[340px] flex flex-col items-center my-1 space-y-2.5">
        {/* Ambient Romantic Backdrop Glow */}
        <div
          className={`absolute -inset-2 rounded-3xl blur-3xl transition-opacity duration-700 pointer-events-none ${
            isPlaying ? 'opacity-40 bg-[#D71940]' : 'opacity-15 bg-[#FF5478]'
          }`}
        />

        {/* Outer Banner Frame */}
        <div
          className={`relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D71940]/30 bg-[#17171e] transition-transform duration-500 ${
            isPlaying ? 'scale-100 shadow-[0_12px_45px_rgba(215,25,64,0.45)]' : 'scale-[0.99]'
          }`}
        >
          {/* Main Official Banner Artwork */}
          <img
            src={CUPIDO_ASSETS.coverAlbum}
            alt="Cupido Radio 24/7 Música Romántica"
            className={`w-full h-full object-cover transition-all duration-700 ${
              isPlaying ? 'scale-105 filter brightness-105' : 'filter brightness-100'
            }`}
          />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
            {/* Live Indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-semibold tracking-wider uppercase text-white shadow-md">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying
                    ? 'bg-[#D71940] shadow-[0_0_8px_#D71940] animate-pulse'
                    : 'bg-white/40'
                }`}
              />
              <span>{isPlaying ? 'EN VIVO' : 'SEÑAL ONLINE'}</span>
            </div>

            {/* Favorite / Heart Reaction */}
            <button
              onClick={() => setLoved(!loved)}
              aria-label="Guardar en favoritos"
              className="min-h-[34px] min-w-[34px] rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-transform active:scale-90 shadow-md"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  loved ? 'fill-[#FF5478] text-[#FF5478]' : 'text-white/80'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Clean Show & Visualizer Pill */}
        <div className="w-full px-3.5 py-2.5 rounded-2xl bg-[#181822]/90 border border-white/10 flex items-center justify-between gap-2 shadow-sm">
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[10px] font-medium text-[#D5AD70] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#D5AD70]" />
              <span>Emisión Romántica 24/7</span>
            </div>
            <h3 className="text-xs font-bold text-white truncate font-heading mt-0.5">
              {currentShow ? currentShow.title : 'Baladas & Recuerdos'}
            </h3>
            <p className="text-[11px] text-white/60 truncate">
              {currentShow ? `Con ${currentShow.host}` : 'Cupido Radio'}
            </p>
          </div>

          {/* Dynamic Sound Visualizer */}
          <AudioVisualizer isPlaying={isPlaying} variant="inline" barCount={4} />
        </div>
      </div>

      {/* Error / Offline Alert banner */}
      {errorMessage && (
        <div className="w-full p-3.5 rounded-2xl bg-[#D71940]/15 border border-[#D71940]/30 text-white text-xs space-y-2.5 animate-in fade-in">
          <div className="flex items-start gap-2">
            <Radio className="w-4 h-4 text-[#FF5478] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white block">Estado de la transmisión:</span>
              <p className="text-white/80 leading-relaxed text-[11px]">{errorMessage}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
            <button
              onClick={reconnect}
              className="px-3 py-1.5 rounded-xl bg-[#D71940] text-white font-medium hover:opacity-90 active:scale-95 text-[11px] flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              Reintentar
            </button>
            <button
              onClick={onOpenIsmyradioModal}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-[11px] flex items-center gap-1.5"
            >
              <Radio className="w-3 h-3 text-[#FF5478]" />
              Reproductor ismyradio
            </button>
            <button
              onClick={() => selectStream('stream-romantic-backup')}
              className="px-3 py-1.5 rounded-xl bg-[#D5AD70]/20 hover:bg-[#D5AD70]/30 text-[#FFF2D6] font-medium text-[11px] flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#D5AD70]" />
              Baladas de Respaldo
            </button>
          </div>
        </div>
      )}

      {/* Main Play / Pause Circle Button - Visible y Directo */}
      <div className="flex flex-col items-center justify-center pt-1">
        <div className="relative">
          {/* Subtle Outer Pulsing Halo when playing */}
          {isPlaying && (
            <div className="absolute -inset-3.5 rounded-full bg-gradient-to-r from-[#D71940]/50 to-[#FF5478]/50 blur-xl animate-pulse" />
          )}

          <button
            onClick={togglePlay}
            disabled={isLoading}
            aria-label={isPlaying ? 'Pausar transmisión' : 'Reproducir transmisión en vivo'}
            className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl focus:outline-none ${
              isPlaying
                ? 'bg-gradient-to-br from-[#1c1c24] to-[#121217] border-2 border-[#D71940] text-white hover:border-[#FF5478] active:scale-95 shadow-[0_8px_30px_rgba(215,25,64,0.45)]'
                : 'bg-gradient-to-tr from-[#D71940] via-[#FF5478] to-[#FF6B8B] text-white hover:brightness-110 active:scale-95 shadow-[0_10px_35px_rgba(215,25,64,0.55)]'
            }`}
          >
            {isLoading ? (
              <RefreshCw className="w-8 h-8 animate-spin text-white" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </button>
        </div>

        {/* Direct status text */}
        <span className="text-[11px] text-white/50 tracking-wide mt-2 font-medium">
          {isLoading
            ? 'Conectando con la señal...'
            : isPlaying
            ? 'Tocá para pausar'
            : 'Toca el botón para escuchar en vivo'}
        </span>
      </div>

      {/* Volume Slider & Controls */}
      <div className="w-full bg-[#181820]/80 border border-white/5 rounded-2xl p-3 flex items-center gap-3">
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          className="min-h-[40px] min-w-[40px] rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-[#FF5478]" />
          ) : volume < 0.5 ? (
            <Volume1 className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>

        <div className="flex-1 flex flex-col justify-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Control de volumen"
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D71940]"
          />
        </div>

        <span className="text-[11px] font-mono text-white/50 w-8 text-right tabular-nums">
          {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
        </span>
      </div>

      {/* Quick Action CTA: WhatsApp Song Request + Share */}
      <div className="w-full grid grid-cols-2 gap-2.5 pt-1">
        {/* WhatsApp Song Request */}
        <button
          onClick={handleWhatsAppSongRequest}
          className="min-h-[46px] px-3.5 rounded-2xl bg-emerald-600/90 hover:bg-emerald-600 active:scale-[0.98] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="truncate">Pedir Canción</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="min-h-[46px] px-3.5 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white text-xs font-medium flex items-center justify-center gap-2 transition-all border border-white/5 relative"
        >
          <Share2 className="w-4 h-4 text-[#D5AD70]" />
          <span>{copiedShare ? '¡Copiado!' : 'Compartir'}</span>
        </button>
      </div>

      {/* Active Stream Tag & Switch */}
      <div className="w-full flex items-center justify-between text-[11px] text-white/40 pt-1 border-t border-white/5">
        <span className="truncate">
          Señal: <span className="text-white/70">{currentStream.name}</span>
        </span>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <a
            href="https://radio.free-shoutcast.com/site/91965"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-white hover:underline flex items-center gap-0.5"
            title="Abrir portal web oficial"
          >
            <span>Portal Web</span>
            <ExternalLink className="w-3 h-3 text-[#D5AD70]" />
          </a>
          <button
            onClick={onOpenStreamConfig}
            className="text-[#D5AD70] hover:underline flex items-center gap-1"
          >
            <Sliders className="w-3 h-3" />
            <span>Señales</span>
          </button>
        </div>
      </div>
    </div>
  );
};
