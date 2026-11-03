import React, { useState } from 'react';
import { CupidoLogo } from './CupidoLogo';
import { useRadio } from '../context/RadioContext';
import { RADIO_CONFIG } from '../config/radioConfig';
import { Radio, Moon, Share2, Download, Globe, ExternalLink, QrCode } from 'lucide-react';

interface HeaderBarProps {
  onOpenStreamConfig: () => void;
  onOpenInstallModal: () => void;
  onOpenQRModal: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onOpenStreamConfig,
  onOpenInstallModal,
  onOpenQRModal,
}) => {
  const { isPlaying, playbackState, sleepTimer, setSleepTimer } = useRadio();
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Cupido Radio',
      text: '¡Escucha Cupido Radio en vivo! La música que te enamora con las mejores baladas y canciones de amor.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User dismissed share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      } catch {
        // fallback
      }
    }
  };

  return (
    <header className="relative z-30 w-full px-4 pt-3 pb-2 flex items-center justify-between border-b border-white/5 bg-[#101014]/90 backdrop-blur-md">
      {/* Brand Zone */}
      <div className="flex items-center gap-2.5">
        <CupidoLogo size="sm" variant="horizontal" showSlogan={false} />
      </div>

      {/* Status & Actions Zone */}
      <div className="flex items-center gap-2">
        {/* Live Badge */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 ${
            isPlaying
              ? 'bg-[#D71940]/20 text-[#FF5478] border border-[#D71940]/40'
              : playbackState === 'loading' || playbackState === 'reconnecting'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-white/5 text-white/50 border border-white/10'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isPlaying
                ? 'bg-[#D71940] shadow-[0_0_8px_#D71940] animate-pulse'
                : playbackState === 'loading' || playbackState === 'reconnecting'
                ? 'bg-amber-400 animate-ping'
                : 'bg-white/30'
            }`}
          />
          <span>
            {isPlaying
              ? 'EN VIVO'
              : playbackState === 'loading'
              ? 'CARGANDO'
              : playbackState === 'reconnecting'
              ? 'CONECTANDO'
              : 'EN PAUSA'}
          </span>
        </div>

        {/* Sleep timer trigger */}
        <div className="relative">
          <button
            onClick={() => setShowSleepMenu(!showSleepMenu)}
            aria-label="Temporizador de apagado"
            title="Temporizador de apagado"
            className={`min-h-[38px] min-w-[38px] rounded-xl flex items-center justify-center transition-all ${
              sleepTimer !== null
                ? 'bg-[#D5AD70]/20 text-[#D5AD70] border border-[#D5AD70]/30'
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4" />
            {sleepTimer !== null && (
              <span className="text-[10px] font-mono font-bold ml-1 text-[#D5AD70]">
                {sleepTimer}m
              </span>
            )}
          </button>

          {/* Sleep timer dropdown */}
          {showSleepMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#191920] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-xs space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase text-white/40 tracking-wider">
                Apagar automáticamente
              </div>
              {[15, 30, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => {
                    setSleepTimer(mins);
                    setShowSleepMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                    sleepTimer === mins
                      ? 'bg-[#D71940] text-white font-semibold'
                      : 'hover:bg-white/10 text-white/80'
                  }`}
                >
                  <span>En {mins} minutos</span>
                </button>
              ))}
              {sleepTimer !== null && (
                <button
                  onClick={() => {
                    setSleepTimer(null);
                    setShowSleepMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-[#FF5478] hover:bg-white/10 transition-colors border-t border-white/10 mt-1"
                >
                  Cancelar temporizador
                </button>
              )}
            </div>
          )}
        </div>

        {/* Direct Link to official stream site */}
        <a
          href={RADIO_CONFIG.website}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir sitio web oficial"
          title="Abrir transmisión oficial en radio.free-shoutcast.com"
          className="min-h-[38px] px-2.5 rounded-xl bg-[#D5AD70]/15 hover:bg-[#D5AD70]/25 text-[#D5AD70] border border-[#D5AD70]/30 flex items-center gap-1 transition-colors text-xs font-semibold"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Web Stream</span>
        </a>

        {/* Stream Settings Button */}
        <button
          onClick={onOpenStreamConfig}
          aria-label="Configurar Señal de Radio"
          title="Configurar Señal y Servidor de Streaming"
          className="min-h-[38px] min-w-[38px] rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
        >
          <Radio className="w-4 h-4" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          aria-label="Compartir Radio"
          title={copiedShare ? '¡Enlace copiado!' : 'Compartir Cupido Radio'}
          className="min-h-[38px] min-w-[38px] rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors relative"
        >
          <Share2 className="w-4 h-4" />
          {copiedShare && (
            <span className="absolute -bottom-7 right-0 text-[10px] whitespace-nowrap bg-[#D71940] text-white px-2 py-0.5 rounded-md shadow-md animate-in fade-in">
              ¡Copiado!
            </span>
          )}
        </button>

        {/* QR Code Quick Button */}
        <button
          onClick={onOpenQRModal}
          aria-label="Código QR"
          title="Escanear Código QR para probar en tu teléfono"
          className="min-h-[38px] px-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#D5AD70] hover:text-white flex items-center gap-1 transition-colors text-xs"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">QR</span>
        </button>

        {/* Install PWA Button */}
        <button
          onClick={onOpenInstallModal}
          aria-label="Instalar App"
          title="Instalar en tu teléfono"
          className="min-h-[38px] px-2.5 rounded-xl bg-[#D71940]/15 hover:bg-[#D71940]/25 text-[#FF5478] border border-[#D71940]/30 flex items-center gap-1.5 transition-colors text-xs font-semibold"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">App</span>
        </button>
      </div>
    </header>
  );
};
