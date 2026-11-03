import React, { useState } from 'react';
import { RefreshCw, Radio, Sparkles, Maximize2, Minimize2 } from 'lucide-react';

interface CasterPlayWidgetProps {
  className?: string;
}

export const CasterPlayWidget: React.FC<CasterPlayWidgetProps> = ({ className = '' }) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 select-none ${className}`}>
      {/* If Minimalist Mode (Default: Solo el Icono de Play del Widget) */}
      {!isExpanded ? (
        <div className="relative flex flex-col items-center">
          {/* Subtle Outer Pulsing Halo */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#D71940]/50 to-[#FF5478]/50 blur-xl animate-pulse pointer-events-none" />

          {/* Glowing Circular Button Frame */}
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-tr from-[#D71940] via-[#FF5478] to-[#FF6B8B] shadow-[0_10px_35px_rgba(215,25,64,0.55)] transition-transform duration-200 hover:scale-105 active:scale-95 flex items-center justify-center">
            {/* Circular Viewport masking only the Play button of Caster.fm */}
            <div className="w-full h-full rounded-full bg-[#16161e] overflow-hidden relative flex items-center justify-center border-2 border-white/20 shadow-inner">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#181822] z-10">
                  <RefreshCw className="w-6 h-6 text-white animate-spin" />
                </div>
              )}

              {/* Caster.fm Iframe Cropped to only show the Play button */}
              <iframe
                key={iframeKey}
                src="https://cupido.ismyradio.com/player"
                title="Cupido Radio Caster Player"
                onLoad={() => setIsLoading(false)}
                className="absolute top-0 left-0 w-[300px] h-[80px] border-0 pointer-events-auto"
                style={{
                  clipPath: 'circle(36px at 38px 40px)',
                  transform: 'scale(1.08)',
                  transformOrigin: '38px 40px',
                }}
                allow="autoplay"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Direct status text */}
          <span className="text-[11px] text-white/50 tracking-wide mt-2 font-medium">
            Toca el botón rojo para iniciar la señal
          </span>
        </div>
      ) : (
        /* Expanded mode (if broadcaster wants to inspect the full Caster.fm widget) */
        <div className="w-full max-w-sm p-3.5 rounded-2xl bg-[#181822] border border-[#D71940]/40 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-white/70 px-1">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D71940] animate-pulse" />
              Widget Caster.fm Oficial
            </span>
            <button
              onClick={handleReload}
              title="Recargar widget"
              className="p-1 hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full h-28 rounded-xl overflow-hidden bg-black/60 border border-white/10">
            <iframe
              key={iframeKey}
              src="https://cupido.ismyradio.com/player"
              title="Cupido Radio Caster Player Full"
              className="w-full h-full border-0"
              allow="autoplay"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}

      {/* Tiny discreet toggle for expanding/collapsing if needed */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-[10px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1 pt-0.5"
      >
        {isExpanded ? (
          <>
            <Minimize2 className="w-2.5 h-2.5" />
            <span>Volver a solo icono de Play</span>
          </>
        ) : (
          <>
            <Maximize2 className="w-2.5 h-2.5" />
            <span>Ver controles completos</span>
          </>
        )}
      </button>
    </div>
  );
};
