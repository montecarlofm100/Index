import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { RADIO_CONFIG } from '../config/radioConfig';
import { Radio, X, Check, ExternalLink, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface StreamConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StreamConfigModal: React.FC<StreamConfigModalProps> = ({ isOpen, onClose }) => {
  const {
    currentStream,
    availableStreams,
    selectStream,
    setCustomStream,
    customStreamUrl,
    reconnect,
    isLoading,
  } = useRadio();

  const [inputUrl, setInputUrl] = useState(customStreamUrl || '');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) {
      setFeedback('Por favor introduce una URL válida.');
      return;
    }

    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      setFeedback('La URL debe comenzar con https:// (o http://)');
      return;
    }

    setCustomStream(inputUrl.trim());
    setFeedback('¡URL guardada y activada exitosamente!');
    setTimeout(() => {
      setFeedback(null);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#191920] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121216]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D71940]/20 flex items-center justify-center text-[#FF5478]">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-heading">
                Señal de Streaming & Transmisión
              </h3>
              <p className="text-xs text-white/50">
                Configuración en directo de Cupido Radio
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

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-white/80">
          {/* Note about new Shoutcast server */}
          <div className="p-4 rounded-2xl bg-[#D5AD70]/10 border border-[#D5AD70]/20 text-[#FFF2D6]">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-[#D5AD70] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs leading-relaxed">
                <span className="font-semibold text-white block">Servidor Oficial en Vivo:</span>
                <p className="text-white/80">
                  La señal principal está conectada directamente al servidor Shoutcast HD sobre HTTPS seguro:
                </p>
                <div className="p-2 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] text-[#D5AD70] select-all truncate mt-1">
                  https://s1.free-shoutcast.com/stream/18354
                </div>
              </div>
            </div>
          </div>

          {/* Select available streams */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3 block">
              Señales de Audio Disponibles
            </label>
            <div className="space-y-2.5">
              {availableStreams.map((stream) => {
                const isSelected = currentStream.id === stream.id;
                return (
                  <button
                    key={stream.id}
                    onClick={() => selectStream(stream.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#D71940]/15 border-[#D71940] shadow-lg shadow-[#D71940]/10'
                        : 'bg-white/5 border-white/5 hover:border-white/15 hover:bg-white/10'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${isSelected ? 'text-[#FF5478]' : 'text-white'}`}>
                          {stream.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
                          {stream.bitrate}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 line-clamp-2">
                        {stream.description}
                      </p>
                      <p className="text-[11px] font-mono text-white/40 truncate">
                        {stream.url}
                      </p>
                    </div>
                    <div className="shrink-0 mt-1">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#D71940] flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-white/20" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Stream Input Form */}
          <div className="pt-2 border-t border-white/10">
            <label className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2 block">
              Ingresar URL Directa de Caster.fm / Icecast
            </label>
            <form onSubmit={handleSaveCustom} className="space-y-3">
              <div className="relative">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://shoutcast.caster.fm:XXXX/listen.mp3"
                  className="w-full px-4 py-3 bg-black/40 border border-white/15 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D71940] transition-colors font-mono"
                />
              </div>

              {feedback && (
                <div className="text-xs text-[#FF5478] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{feedback}</span>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#D71940] to-[#FF5478] hover:opacity-90 active:scale-[0.98] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-[#D71940]/25 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Guardar y Activar Transmisión
                </button>
                <button
                  type="button"
                  onClick={reconnect}
                  disabled={isLoading}
                  className="py-2.5 px-4 bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white text-xs font-medium rounded-xl transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  Reconectar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#121216] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
