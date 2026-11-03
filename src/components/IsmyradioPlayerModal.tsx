import React from 'react';
import { X, ExternalLink, Radio, Sparkles } from 'lucide-react';
import { CupidoLogo } from './CupidoLogo';

interface IsmyradioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IsmyradioPlayerModal: React.FC<IsmyradioPlayerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#191920] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#121216]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D71940]/20 flex items-center justify-center text-[#FF5478]">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-heading">
                Reproductor Oficial ismyradio.com
              </h3>
              <p className="text-[11px] text-white/50">
                Transmisión en directo Caster.fm
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content with embedded player */}
        <div className="p-5 flex flex-col items-center text-center space-y-4 overflow-y-auto">
          <CupidoLogo size="md" variant="icon-only" />

          <div>
            <h4 className="text-base font-bold text-white font-heading">
              Cupido Radio en Vivo
            </h4>
            <p className="text-xs text-[#D5AD70] italic">
              "La música que te enamora"
            </p>
          </div>

          {/* Embedded Caster.fm Player Iframe */}
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 min-h-[140px] flex items-center justify-center p-2">
            <iframe
              src="https://cupido.ismyradio.com/player"
              title="Cupido Radio ismyradio Web Player"
              className="w-full h-32 border-0 rounded-xl"
              allow="autoplay"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="text-xs text-white/60 leading-relaxed">
            Este reproductor se conecta directamente con tu cuenta autorizada de Caster.fm mediante tu token oficial.
          </p>

          <a
            href="https://cupido.ismyradio.com"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D71940] to-[#FF5478] hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#D71940]/25 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Abrir en ventana completa (cupido.ismyradio.com)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
