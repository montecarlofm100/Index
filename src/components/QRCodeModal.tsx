import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Smartphone, ExternalLink, Sparkles, Download } from 'lucide-react';
import { CupidoLogo } from './CupidoLogo';
import { RADIO_CONFIG } from '../config/radioConfig';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Real URL currently active in the user's browser
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const apkUrl = RADIO_CONFIG.apkDownloadUrl || 'https://raw.githubusercontent.com/cupidoradio/cupidoradio/refs/heads/main/cupidoradio.apk';
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(currentUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#191920] border border-white/10 rounded-3xl p-5 shadow-2xl text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex justify-center pt-2">
          <CupidoLogo size="sm" variant="icon-only" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white font-heading">
            Escanear para Probar en tu Teléfono
          </h3>
          <p className="text-xs text-[#D5AD70]">
            Apunta la cámara de tu teléfono móvil aquí
          </p>
        </div>

        {/* Big White QR Code */}
        <div className="p-3 bg-white rounded-2xl max-w-[220px] mx-auto shadow-2xl flex flex-col items-center">
          <img
            src={qrImageUrl}
            alt="Código QR Cupido Radio"
            className="w-48 h-48 rounded-lg"
          />
          <div className="flex items-center gap-1 text-[10px] text-black/70 font-semibold uppercase tracking-wider mt-1.5">
            <QrCode className="w-3.5 h-3.5 text-[#D71940]" />
            <span>Escanea con tu cámara</span>
          </div>
        </div>

        {/* Copy Link Row */}
        <div className="space-y-1.5 text-left">
          <span className="text-[11px] text-white/50 block px-1">
            Enlace activo en vivo:
          </span>
          <div className="flex items-center gap-2 p-1.5 bg-black/50 border border-white/10 rounded-xl">
            <span className="text-xs font-mono text-white/70 truncate flex-1 px-2 select-all">
              {currentUrl}
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#D71940] hover:bg-[#FF5478] text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-left text-xs space-y-2 text-white/70">
          <div className="flex items-start gap-2">
            <Smartphone className="w-4 h-4 text-[#FF5478] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-snug">
              <strong>En Android:</strong> Abre la cámara o Chrome, escanea o pega el enlace y toca los 3 puntos (⋮) &rarr; <em>"Instalar aplicación"</em>.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Smartphone className="w-4 h-4 text-[#D5AD70] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-snug">
              <strong>En iPhone (Safari):</strong> Abre la cámara o Safari, toca <em>Compartir</em> abajo &rarr; <em>"Añadir a pantalla de inicio"</em>.
            </p>
          </div>
        </div>

        {/* Direct APK Download Button */}
        <a
          href={apkUrl}
          target="_blank"
          rel="noreferrer"
          download="cupidoradio.apk"
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Descargar cupidoradio.apk Directo</span>
        </a>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
