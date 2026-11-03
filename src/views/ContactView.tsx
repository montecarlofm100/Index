import React, { useState } from 'react';
import { RADIO_CONFIG } from '../config/radioConfig';
import {
  MessageCircle,
  Instagram,
  Facebook,
  Globe,
  Phone,
  Send,
  Heart,
  Music,
  Share2,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

export const ContactView: React.FC = () => {
  // Dedication form state
  const [fromName, setFromName] = useState('');
  const [toName, setToName] = useState('');
  const [songName, setSongName] = useState('');
  const [loveMessage, setLoveMessage] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(RADIO_CONFIG.whatsappFormatted);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSendDedicationWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [
      '💌 *DEDICATORIA PARA CUPIDO RADIO*',
      fromName.trim() ? `• *De:* ${fromName.trim()}` : null,
      toName.trim() ? `• *Para:* ${toName.trim()}` : null,
      songName.trim() ? `• *Canción solicitada:* ${songName.trim()}` : null,
      loveMessage.trim() ? `• *Mensaje:* "${loveMessage.trim()}"` : null,
      'Escuchando Cupido Radio en vivo: La música que te enamora.'
    ].filter(Boolean);

    const fullText = encodeURIComponent(parts.join('\n'));
    window.open(`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${fullText}`, '_blank');
  };

  const handleQuickWhatsApp = (topic: string) => {
    let text = '';
    if (topic === 'musica') {
      text = 'Hola Cupido Radio (+595 976 937 937), quiero pedir una canción romántica: ';
    } else if (topic === 'saludo') {
      text = 'Hola Cupido Radio, les mando un saludo especial a todo el equipo y a los oyentes enamorados.';
    } else {
      text = 'Hola Cupido Radio, me comunico desde la aplicación oficial.';
    }
    window.open(`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-full px-4 py-4 space-y-6 max-w-2xl mx-auto w-full select-none">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Línea Directa con la Emisora</span>
        </div>
        <h2 className="text-2xl font-bold text-white font-heading">
          Contacto & Dedicatorias
        </h2>
        <p className="text-xs text-white/60">
          Escríbenos, pide tu canción favorita y envíanos tu mensaje de amor
        </p>
      </div>

      {/* Primary WhatsApp Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-[#18231e] to-[#121217] border border-emerald-500/30 shadow-xl shadow-emerald-950/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider block">
                WhatsApp Oficial
              </span>
              <span className="text-lg font-bold text-white font-mono">
                {RADIO_CONFIG.whatsappFormatted}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyNumber}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors text-xs flex items-center gap-1.5"
              title="Copiar número"
            >
              {copiedNumber ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-xs shadow-md shadow-emerald-900/40 flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Chatear</span>
            </a>
          </div>
        </div>

        {/* Quick Launchers */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
          <button
            onClick={() => handleQuickWhatsApp('musica')}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center gap-2"
          >
            <Music className="w-4 h-4 text-[#FF5478] shrink-0" />
            <span className="text-xs text-white/90 truncate font-medium">Pedir una canción</span>
          </button>
          <button
            onClick={() => handleQuickWhatsApp('saludo')}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-left transition-colors flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-[#D5AD70] shrink-0" />
            <span className="text-xs text-white/90 truncate font-medium">Saludos al aire</span>
          </button>
        </div>
      </div>

      {/* Formulario de Dedicatorias en Vivo */}
      <div className="p-5 rounded-3xl bg-[#181820] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#D71940]/20 flex items-center justify-center text-[#FF5478]">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              Redactar Dedicatoria de Amor
            </h3>
            <p className="text-xs text-white/50">
              Se enviará formateada a nuestro WhatsApp para salir al aire
            </p>
          </div>
        </div>

        <form onSubmit={handleSendDedicationWhatsApp} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-white/60 mb-1 block">
                Tu nombre (De:)
              </label>
              <input
                type="text"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="Ej. Martín"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D71940] transition-colors"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-white/60 mb-1 block">
                Para quién es (Para:)
              </label>
              <input
                type="text"
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                placeholder="Ej. Mi gran amor Andrea"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D71940] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-white/60 mb-1 block">
              Canción que deseas dedicar
            </label>
            <input
              type="text"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              placeholder="Ej. 'Te Amo' - Franco De Vita"
              className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D71940] transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-white/60 mb-1 block">
              Mensaje o dedicatoria
            </label>
            <textarea
              rows={3}
              value={loveMessage}
              onChange={(e) => setLoveMessage(e.target.value)}
              placeholder="Escribe lo que sientes en tu corazón..."
              className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D71940] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D71940] to-[#FF5478] hover:opacity-95 active:scale-[0.98] text-white text-xs font-semibold shadow-lg shadow-[#D71940]/25 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Enviar Dedicatoria por WhatsApp</span>
          </button>
        </form>
      </div>

      {/* Redes Sociales y Enlaces Oficiales */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider px-1">
          Canales & Enlaces Oficiales
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Stream & Website Oficial */}
          <a
            href={RADIO_CONFIG.website}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-[#181820] hover:bg-[#20202c] border border-[#FF5478]/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D71940]/20 flex items-center justify-center text-[#FF5478]">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white group-hover:text-[#FF5478] transition-colors block">
                    Stream Oficial de Radio
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D71940] text-white font-semibold">
                    En Vivo
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#D5AD70] truncate block max-w-[180px]">
                  radio.free-shoutcast.com/site/91965
                </span>
              </div>
            </div>
            <div className="text-white/40 group-hover:text-white transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* Facebook */}
          <a
            href={RADIO_CONFIG.social.facebook}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-[#181820] hover:bg-[#20202c] border border-white/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors block">
                  Facebook
                </span>
                <span className="text-[11px] text-white/70">
                  Cupido Radio Py
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </a>

          {/* Instagram */}
          <a
            href={RADIO_CONFIG.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-[#181820] hover:bg-[#20202c] border border-white/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors block">
                  Instagram
                </span>
                <span className="text-[11px] text-white/70">
                  @cupidoradiopy
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </a>

          {/* TikTok */}
          <a
            href={RADIO_CONFIG.social.tiktok || 'https://www.tiktok.com/@cupidoradiopy'}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-[#181820] hover:bg-[#20202c] border border-white/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00f2fe]/10 border border-[#fe2c55]/20 flex items-center justify-center text-white">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.86-4.5V8.8a8.28 8.28 0 0 0 4.84 1.56V6.91a4.85 4.85 0 0 1-.93-.22Z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white group-hover:text-[#fe2c55] transition-colors block">
                  TikTok
                </span>
                <span className="text-[11px] text-white/70">
                  Cupido Radio Py
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};
