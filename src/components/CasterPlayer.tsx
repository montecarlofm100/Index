import React, { useState, useEffect, useRef } from 'react';
import { Radio, RefreshCw, ExternalLink, Sparkles, Volume2, ShieldCheck } from 'lucide-react';
import { RADIO_CONFIG } from '../config/radioConfig';

interface CasterPlayerProps {
  className?: string;
}

export const CasterPlayer: React.FC<CasterPlayerProps> = ({ className = '' }) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    setIsLoaded(false);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className={`w-full bg-[#181822]/95 border border-[#D71940]/40 rounded-3xl p-4 shadow-xl shadow-[#D71940]/10 flex flex-col space-y-3 ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D71940] animate-pulse shadow-[0_0_8px_#D71940]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider font-heading flex items-center gap-1.5">
            <span>Señal Oficial Caster.fm</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#D71940]/30 text-[#FF5478] border border-[#D71940]/40 font-mono">
              HTTPS Seguro
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReload}
            title="Recargar reproductor"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <a
            href="https://cupido.ismyradio.com"
            target="_blank"
            rel="noreferrer"
            title="Abrir web oficial"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#D5AD70] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Caster.fm Official Web Player */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 min-h-[140px] flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#15151e] z-10 space-y-2">
            <RefreshCw className="w-5 h-5 text-[#FF5478] animate-spin" />
            <span className="text-[11px] text-white/60">Conectando con tu señal en Caster.fm...</span>
          </div>
        )}

        <iframe
          key={iframeKey}
          ref={iframeRef}
          src="https://cupido.ismyradio.com/player"
          title="Cupido Radio - Reproductor Oficial Caster.fm"
          onLoad={() => setIsLoaded(true)}
          className="w-full h-36 border-0 rounded-2xl"
          allow="autoplay; encrypted-media"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Footer information */}
      <div className="flex items-center justify-between text-[11px] text-white/50 pt-1 border-t border-white/5">
        <div className="flex items-center gap-1 text-[#D5AD70]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D5AD70]" />
          <span>Token Caster.fm autenticado</span>
        </div>

        <a
          href="https://cupido.ismyradio.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white underline text-[10px]"
        >
          cupido.ismyradio.com
        </a>
      </div>
    </div>
  );
};
