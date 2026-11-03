import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { RADIO_CONFIG } from '../config/radioConfig';
import {
  Download,
  Share2,
  PlusSquare,
  X,
  CheckCircle2,
  Smartphone,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  PackageCheck,
  Sparkles
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedApkLink, setCopiedApkLink] = useState(false);
  const [tab, setTab] = useState<'phone' | 'apk'>('apk');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://cupidoradio.netlify.app';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(currentUrl)}`;
  const pwaBuilderUrl = `https://www.pwabuilder.com/?url=${encodeURIComponent(currentUrl)}`;
  const apkUrl = RADIO_CONFIG.apkDownloadUrl || 'https://raw.githubusercontent.com/cupidoradio/cupidoradio/refs/heads/main/cupidoradio.apk';

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyApkLink = async () => {
    try {
      await navigator.clipboard.writeText(apkUrl);
      setCopiedApkLink(true);
      setTimeout(() => setCopiedApkLink(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#150D20] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#181424]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cupido-red/20 flex items-center justify-center text-cupido-pink">
              <i className="fa-brands fa-android text-lg text-emerald-400"></i>
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                Descargar & Instalar Cupido Radio en Android
              </h3>
              <p className="text-[11px] text-gray-400">
                Instalación directa o generación de APK
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch: Móvil vs Generar APK */}
        <div className="flex border-b border-white/10 bg-[#120B1B] text-xs">
          <button
            onClick={() => setTab('phone')}
            className={`flex-1 py-3 font-bold text-center transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              tab === 'phone'
                ? 'border-cupido-red text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>1. Instalar en tu Celular (Directo)</span>
          </button>
          <button
            onClick={() => setTab('apk')}
            className={`flex-1 py-3 font-bold text-center transition-all border-b-2 flex items-center justify-center gap-1.5 ${
              tab === 'apk'
                ? 'border-cupido-red text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5 text-cupido-pink" />
            <span>2. Descargar archivo APK</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 overflow-y-auto space-y-4 text-center">
          {tab === 'phone' ? (
            <>
              {/* Logo + Slogan */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/Cupido-Color-192.png"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://i.ibb.co/hRpQ4YwB/Cupido-Color.png';
                  }}
                  alt="Cupido Radio"
                  className="w-16 h-16 rounded-full object-contain shadow-lg shadow-cupido-red/30"
                />
                <div>
                  <h4 className="text-base font-black text-white">
                    Cupido Radio Android App
                  </h4>
                  <p className="text-xs text-cupido-pink font-semibold">
                    "La que te enamora" · Transmisión 24/7
                  </p>
                </div>
              </div>

              {/* Install trigger button if chromium supports it */}
              {isInstallable && (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:opacity-95 active:scale-95 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>¡Instalar Ahora en este Dispositivo!</span>
                </button>
              )}

              {/* QR Code to scan directly from Android Phone */}
              <div className="p-4 rounded-2xl bg-white flex flex-col items-center justify-center max-w-[210px] mx-auto shadow-xl">
                <img
                  src={qrCodeUrl}
                  alt="Escanear QR para instalar en tu celular"
                  className="w-40 h-40 rounded-lg"
                />
                <span className="text-[10px] font-black text-gray-900 mt-2 uppercase tracking-wider flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-cupido-red" />
                  Escanea con tu cámara
                </span>
              </div>

              {/* Copy Link Bar */}
              <div className="flex items-center gap-2 p-2 bg-black/40 border border-white/10 rounded-2xl text-left">
                <span className="text-[11px] font-mono text-gray-300 truncate flex-1 px-2 select-all">
                  {currentUrl}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Pasos en Android */}
              <div className="space-y-2.5 text-left pt-1">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs space-y-2">
                  <span className="font-black text-emerald-400 flex items-center gap-2 text-xs">
                    <i className="fa-brands fa-android text-sm"></i>
                    Pasos sencillos para instalar en Android (Chrome):
                  </span>
                  <ol className="text-gray-300 text-[11px] space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>
                      <strong>Importante:</strong> Si abriste el enlace desde WhatsApp o Facebook, toca <strong>"Abrir con..."</strong> en los 3 puntos (⋮) y elige <strong>Chrome</strong>.
                    </li>
                    <li>
                      Ya en Google Chrome, toca los 3 puntos (⋮) arriba a la derecha.
                    </li>
                    <li>
                      Selecciona <strong>"Instalar aplicación"</strong> (o <strong>"Añadir a la pantalla de inicio"</strong>).
                    </li>
                    <li>
                      ¡Listo! Tendrás el icono oficial de <strong>Cupido Radio</strong> en el menú de aplicaciones de tu teléfono.
                    </li>
                  </ol>
                </div>

                {/* iPhone Safari (Alternativa) */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-bold text-gray-300 flex items-center gap-1.5 text-[11px]">
                    <i className="fa-brands fa-apple text-sm text-gray-200"></i>
                    En iPhone / iPad (Safari):
                  </span>
                  <p className="text-gray-400 leading-relaxed text-[11px]">
                    Toca el botón <Share2 className="w-3 h-3 inline text-cupido-pink" /> <strong>Compartir</strong> en la barra inferior y luego <PlusSquare className="w-3 h-3 inline text-cupido-pink" /> <strong>"Añadir a pantalla de inicio"</strong>.
                  </p>
                </div>
              </div>
            </>
          ) : (
            /* Tab: Descargar APK Oficial Directo */
            <div className="text-left space-y-3.5 text-xs">
              {/* Tarjeta Destacada de Descarga Directa */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cupido-red/25 via-cupido-surface to-cupido-pink/20 border border-cupido-red/40 text-white space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cupido-pink font-black text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>APK Oficial de Cupido Radio</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                    v1.0 Oficial
                  </span>
                </div>

                <p className="text-[11px] text-gray-200 leading-relaxed">
                  Descarga directa e instantánea del instalador <strong>.APK</strong> para cualquier celular o tablet Android.
                </p>

                {/* Botón Principal de Descarga Directa */}
                <a
                  href={apkUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="cupidoradio.apk"
                  className="flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 active:scale-98 text-white font-black text-sm shadow-xl shadow-emerald-950/50 transition-all cursor-pointer group"
                >
                  <Download className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <span>Descargar cupidoradio.apk</span>
                </a>
              </div>

              {/* Copiar enlace directo del APK */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-gray-300 text-[11px] block">
                  Enlace directo del archivo APK (para compartir):
                </span>
                <div className="flex items-center gap-2 p-1.5 bg-black/50 border border-white/10 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-300 truncate flex-1 px-2 select-all">
                    {apkUrl}
                  </span>
                  <button
                    onClick={handleCopyApkLink}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                  >
                    {copiedApkLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copiar enlace</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Pasos de Instalación en Android */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-white text-xs flex items-center gap-1.5">
                  <i className="fa-brands fa-android text-emerald-400 text-sm"></i>
                  <span>¿Cómo instalarlo en tu teléfono Android?</span>
                </span>
                <ol className="text-gray-300 text-[11px] space-y-1.5 list-decimal list-inside leading-relaxed pl-1">
                  <li>
                    Pulsa el botón verde <strong>"Descargar cupidoradio.apk"</strong> arriba.
                  </li>
                  <li>
                    Abre el archivo descargado desde tu panel de notificaciones o la carpeta <strong>Descargas</strong>.
                  </li>
                  <li>
                    Si tu teléfono muestra una alerta de seguridad, pulsa <strong>"Descargar de todos modos"</strong> o activa <strong>"Permitir desde esta fuente"</strong>.
                  </li>
                  <li>
                    Pulsa <strong>"Instalar"</strong> y listo: ¡Cupido Radio quedará instalada con audio en segundo plano!
                  </li>
                </ol>
              </div>

              {/* Alternativa PWABuilder para Google Play Store */}
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-[11px] text-gray-400">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-300">¿Quieres empaquetar para Google Play Store?</span>
                  <a
                    href={pwaBuilderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-cupido-pink hover:underline font-bold"
                  >
                    <span>PWABuilder</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#181424] border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            Cupido Radio · App Oficial Android
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
