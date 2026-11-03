import React from 'react';
import { RADIO_CONFIG, CUPIDO_ASSETS } from '../config/radioConfig';
import { CupidoLogo } from '../components/CupidoLogo';
import {
  Heart,
  Radio,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  ExternalLink,
  Sliders
} from 'lucide-react';

interface AboutViewProps {
  onOpenStreamConfig: () => void;
  onOpenInstallModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenStreamConfig,
  onOpenInstallModal,
}) => {
  return (
    <div className="flex flex-col min-h-full px-4 py-4 space-y-6 max-w-2xl mx-auto w-full select-none">
      {/* Header Profile */}
      <div className="text-center flex flex-col items-center space-y-3">
        <CupidoLogo size="lg" variant="full" showSlogan={true} />
        <p className="text-xs text-white/70 max-w-md leading-relaxed">
          {RADIO_CONFIG.description}
        </p>
      </div>

      {/* Hero Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-xl h-44 sm:h-52">
        <img
          src={CUPIDO_ASSETS.heroBanner}
          alt="Cupido Radio La música que te enamora"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-[#101014]/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[10px] font-semibold text-[#D5AD70] uppercase tracking-wider block">
            Nuestra Esencia
          </span>
          <h3 className="text-lg font-bold text-white font-heading">
            Baladas que tocan las fibras del alma
          </h3>
          <p className="text-xs text-white/70 mt-0.5 line-clamp-2">
            Transmitiendo emociones, serenatas y el soundtrack del amor para oyentes de habla hispana en todo el planeta.
          </p>
        </div>
      </div>

      {/* Valores e Identidad */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-[#181820] border border-white/5 space-y-2 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-[#D71940]/20 text-[#FF5478] flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h4 className="text-xs font-bold text-white font-heading">100% Romántica</h4>
          <p className="text-[11px] text-white/60 leading-snug">
            Cero distracciones. Solo las mejores canciones de amor seleccionadas tema por tema.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#181820] border border-white/5 space-y-2 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-[#D5AD70]/20 text-[#D5AD70] flex items-center justify-center">
            <Radio className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-white font-heading">Señal Continua</h4>
          <p className="text-[11px] text-white/60 leading-snug">
            Transmisión digital 24 horas ininterrumpidas optimizada para bajo consumo de batería.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#181820] border border-white/5 space-y-2 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-white font-heading">Cercanía Total</h4>
          <p className="text-[11px] text-white/60 leading-snug">
            Línea directa con los oyentes para complacencias al aire al instante vía WhatsApp.
          </p>
        </div>
      </div>

      {/* Ficha Técnica de Transmisión */}
      <div className="p-5 rounded-3xl bg-[#181820] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#D5AD70]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">
                Ficha Técnica de Transmisión
              </h4>
              <p className="text-[11px] text-white/50">
                Parámetros de conexión y servidores
              </p>
            </div>
          </div>

          <button
            onClick={onOpenStreamConfig}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-[#D5AD70] flex items-center gap-1 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Configurar</span>
          </button>
        </div>

        <div className="divide-y divide-white/5 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-white/50">Plataforma de emisión:</span>
            <span className="font-semibold text-white">Free-Shoutcast DNAS 2.6 HD</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-white/50">Servidor oficial (HTTPS):</span>
            <a
              href="https://s1.free-shoutcast.com/stream/18354"
              target="_blank"
              rel="noreferrer"
              className="text-[#FF5478] hover:text-white font-semibold flex items-center gap-1 font-mono text-xs transition-colors"
            >
              <span>s1.free-shoutcast.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D5AD70]" />
            </a>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-white/50">Teléfono / WhatsApp:</span>
            <span className="font-mono text-white font-medium">{RADIO_CONFIG.whatsappFormatted}</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-white/50">Segundo plano & Pantalla bloqueada:</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Soportado (MediaSession API)
            </span>
          </div>
        </div>
      </div>

      {/* Plan de Publicación en Google Play Store & Apple App Store */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1d1b28] to-[#121217] border border-indigo-500/30 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-heading">
              Preparación para Google Play Store & Apple App Store
            </h4>
            <p className="text-[11px] text-indigo-300/70">
              Ruta directa para compilar y publicar en tiendas
            </p>
          </div>
        </div>

        <p className="text-xs text-white/70 leading-relaxed">
          Esta aplicación cuenta con arquitectura <strong>PWA nativa</strong> y código modular listo para empaquetarse como aplicación nativa para Android (<code className="text-indigo-300">.aab / .apk</code>) e iOS (<code className="text-indigo-300">IPA</code>).
        </p>

        <div className="space-y-2 text-xs text-white/80 pt-1">
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              1
            </span>
            <p>
              <strong>Prueba Inmediata en Teléfonos:</strong> Puedes instalar la aplicación ahora mismo desde el navegador usando el botón <em>"Instalar App"</em> en Android y Safari en iPhone.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              2
            </span>
            <p>
              <strong>Empaquetado Android (Play Store):</strong> Mediante <strong>Capacitor</strong> o <strong>TWA (Trusted Web Activity)</strong> con Bubblewrap / PWA Builder, se genera el archivo Android App Bundle listo para subir a Google Play Console.
            </p>
          </div>

          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
              3
            </span>
            <p>
              <strong>Empaquetado iOS (App Store):</strong> A través del proyecto Capacitor iOS generado, se compila con Xcode activando la capacidad <em>"Background Audio Modes"</em> para audio ininterrumpido en iOS.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onOpenInstallModal}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-xs shadow-md shadow-indigo-950/40 flex items-center justify-center gap-2 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>Probar Instalación en este Teléfono</span>
          </button>
        </div>
      </div>

      {/* Auditoría de Funciones */}
      <div className="p-5 rounded-3xl bg-[#181820] border border-white/5 space-y-3">
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Estado de Funcionalidades
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Reproducción en un solo toque</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Sin duplicación al navegar</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Reconexión automática de red</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Controles pantalla bloqueada (MediaSession)</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp directo (+595 976 937 937)</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Grilla de programas y locutores</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Temporizador de apagado nocturno</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="w-4 h-4 text-[#D5AD70] shrink-0" />
            <span>URL Caster.fm definitiva (Configurable)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
