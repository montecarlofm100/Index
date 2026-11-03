import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { RADIO_CONFIG } from '../config/radioConfig';
import { QrCode, Download } from 'lucide-react';

interface HeaderNavProps {
  onOpenQRModal?: () => void;
  onOpenInstallModal?: () => void;
  viewMode?: 'auto' | 'mobile' | 'desktop';
  onToggleViewMode?: (mode: 'auto' | 'mobile' | 'desktop') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenQRModal,
  onOpenInstallModal,
  viewMode = 'auto',
  onToggleViewMode,
}) => {
  const { isPlaying, togglePlay } = useRadio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 glass-nav border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Oficial + Nombre Compacto */}
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <img
            src="/Cupido-Color-192.png"
            onError={(e) => {
              // fallback if needed
              (e.target as HTMLImageElement).src = 'https://i.ibb.co/hRpQ4YwB/Cupido-Color.png';
            }}
            alt="Cupido Radio"
            className="w-11 h-11 object-contain rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col leading-none">
            <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-cupido-pink transition-colors">
              CUPIDO<span className="text-cupido-red"> RADIO</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-tight -mt-0.5">
              La que te enamora
            </span>
          </div>
        </a>

        {/* Menú Principal */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-300">
          <a href="#inicio" className="hover:text-cupido-pink transition-colors">
            Inicio
          </a>
          <a href="#programacion" className="hover:text-cupido-pink transition-colors">
            Programación
          </a>
          <a href="#pedidos" className="hover:text-cupido-pink transition-colors">
            Pedidos WhatsApp
          </a>
        </nav>

        {/* Acciones Directas Superiores */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Conmutador de Disposición: PC vs SmartPhone */}
          {onToggleViewMode && (
            <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-[11px] font-bold mr-1">
              <button
                onClick={() => onToggleViewMode('desktop')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'desktop'
                    ? 'bg-gradient-to-r from-cupido-red to-cupido-pink text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Disposición Web PC"
              >
                <i className="fa-solid fa-desktop text-[11px]"></i>
                <span>Vista PC</span>
              </button>
              <button
                onClick={() => onToggleViewMode('mobile')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'mobile'
                    ? 'bg-gradient-to-r from-cupido-red to-cupido-pink text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Disposición SmartPhone"
              >
                <i className="fa-solid fa-mobile-screen text-[11px]"></i>
                <span>SmartPhone</span>
              </button>
            </div>
          )}

          {/* Quick QR / App Install Buttons if available */}
          {onOpenQRModal && (
            <button
              onClick={onOpenQRModal}
              title="Escanear Código QR para tu teléfono"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <QrCode className="w-4 h-4 text-[#FF3366]" />
            </button>
          )}



          <a
            href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=¡Hola%20Cupido%20Radio!%20Quiero%20pedir%20un%20tema%20en%20vivo:`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-white px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30 transition-all shrink-0"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>{RADIO_CONFIG.whatsappFormatted}</span>
          </a>

          <button
            onClick={togglePlay}
            className="bg-gradient-to-r from-cupido-red to-cupido-pink hover:opacity-95 active:scale-95 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cupido-red/35 cursor-pointer shrink-0 transition-transform"
          >
            {isPlaying && <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>}
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-xs`}></i>
            <span>{isPlaying ? 'PAUSAR' : 'EN VIVO'}</span>
          </button>
        </div>

        {/* Botón Menú Móvil */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={togglePlay}
            className="bg-gradient-to-r from-cupido-red to-cupido-pink text-white px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md shadow-cupido-red/30"
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-xs`}></i>
            <span>{isPlaying ? 'PAUSA' : 'EN VIVO'}</span>
          </button>

          <button
            onClick={toggleMobileMenu}
            aria-label="Abrir Menú"
            className="text-gray-300 hover:text-white p-2"
          >
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cupido-surface border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-3 duration-200">
          <a
            href="#inicio"
            onClick={closeMobileMenu}
            className="text-base font-semibold hover:text-cupido-pink transition-colors"
          >
            Inicio
          </a>
          <a
            href="#programacion"
            onClick={closeMobileMenu}
            className="text-base font-semibold hover:text-cupido-pink transition-colors"
          >
            Programación
          </a>
          <a
            href="#pedidos"
            onClick={closeMobileMenu}
            className="text-base font-semibold hover:text-cupido-pink transition-colors"
          >
            Pedidos WhatsApp
          </a>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={`https://wa.me/${RADIO_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 rounded-xl text-white font-bold text-sm shadow-md"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>Pedir canción ({RADIO_CONFIG.whatsappFormatted})</span>
            </a>


          </div>
        </div>
      )}
    </header>
  );
};
