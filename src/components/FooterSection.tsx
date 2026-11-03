import React from 'react';
import { RADIO_CONFIG } from '../config/radioConfig';
import { Radio, Download, QrCode } from 'lucide-react';

interface FooterSectionProps {
  onOpenStreamConfig?: () => void;
  onOpenInstallModal?: () => void;
  onOpenQRModal?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenStreamConfig,
  onOpenInstallModal,
  onOpenQRModal,
}) => {
  return (
    <footer className="bg-cupido-surface border-t border-white/10 py-10 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <img
            src="/Cupido-Color-192.png"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://i.ibb.co/hRpQ4YwB/Cupido-Color.png';
            }}
            alt="Cupido Radio"
            className="w-9 h-9 object-contain rounded-full shadow-md"
          />
          <div className="flex flex-col leading-none">
            <span className="font-black text-white text-base tracking-tight">CUPIDO RADIO</span>
            <span className="text-[9px] text-gray-400 font-semibold tracking-tight -mt-0.5">
              {RADIO_CONFIG.slogan}
            </span>
          </div>
        </div>

        {/* Enlaces de Utilidad */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-400">

          {RADIO_CONFIG.apkDownloadUrl && (
            <a
              href={RADIO_CONFIG.apkDownloadUrl}
              target="_blank"
              rel="noreferrer"
              download="cupidoradio.apk"
              className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-semibold text-emerald-400/90"
              title="Descargar instalador APK para Android"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Descargar APK</span>
            </a>
          )}
          {onOpenQRModal && (
            <button
              onClick={onOpenQRModal}
              className="hover:text-cupido-pink transition-colors inline-flex items-center gap-1"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Código QR</span>
            </button>
          )}
          {onOpenStreamConfig && (
            <button
              onClick={onOpenStreamConfig}
              className="hover:text-cupido-pink transition-colors inline-flex items-center gap-1"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Ajustes de Servidor</span>
            </button>
          )}
        </div>

        <div className="flex flex-col sm:items-end gap-1 text-[11px]">
          <p>
            WhatsApp:{' '}
            <a
              href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 font-bold hover:underline"
            >
              {RADIO_CONFIG.whatsappFormatted}
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} Cupido Radio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
