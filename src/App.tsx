import React, { useState, useEffect } from 'react';
import { RadioProvider } from './context/RadioContext';
import { HeaderNav } from './components/HeaderNav';
import { HeroPlayerSection } from './components/HeroPlayerSection';
import { WhatsAppCabinaSection } from './components/WhatsAppCabinaSection';
import { ScheduleSection } from './components/ScheduleSection';
import { SocialSection } from './components/SocialSection';
import { FooterSection } from './components/FooterSection';
import { StickyPlayer } from './components/StickyPlayer';
import { SmartphoneView } from './components/SmartphoneView';
import { StreamConfigModal } from './components/StreamConfigModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { QRCodeModal } from './components/QRCodeModal';
import { Smartphone, Monitor } from 'lucide-react';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

function RadioAppContent() {
  const isMobileDevice = useIsMobile();
  const [viewMode, setViewMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');
  const [isStreamConfigOpen, setIsStreamConfigOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Determinar si se muestra la disposición Smartphone o la disposición Web PC
  const showMobileLayout = viewMode === 'mobile' || (viewMode === 'auto' && isMobileDevice);

  return (
    <div className="min-h-screen bg-cupido-base text-gray-200 antialiased font-sans selection:bg-cupido-red selection:text-white flex flex-col relative overflow-x-hidden">
      {showMobileLayout ? (
        /* =======================================================
           DISPOSICIÓN SMARTPHONE (MÓVILES / CELULARES)
           - Ergonomía vertical para pantallas táctiles
           - Player unificado con carátula, sonando ahora y play grande
           - Barra inferior de pestañas (En Vivo, Horarios, Noticias, WhatsApp)
           ======================================================= */
        <div className="w-full">
          {/* Pequeño selector flotante de modo para permitir al usuario alternar a PC */}
          <div className="bg-white/5 border-b border-white/10 px-4 py-1.5 flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5 text-cupido-pink font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Modo SmartPhone</span>
            </span>
            <button
              onClick={() => setViewMode('desktop')}
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Monitor className="w-3 h-3 text-cupido-pink" />
              <span>Cambiar a Vista PC</span>
            </button>
          </div>

          <SmartphoneView
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenQRModal={() => setIsQRModalOpen(true)}
            onOpenStreamConfig={() => setIsStreamConfigOpen(true)}
          />
        </div>
      ) : (
        /* =======================================================
           DISPOSICIÓN WEB PC (COMPUTADORAS / PANTALLAS GRANDES)
           - Encabezado amplio con menú completo y accesos rápidos
           - Doble tarjeta 1:1 en paralelo (Señal HD con Play y Volumen)
           - Secciones completas de Cabina, Parrilla, Noticias y Redes
           - Barra de reproducción inferior Sticky Player completa
           ======================================================= */
        <div className="w-full flex flex-col min-h-screen">
          {/* Barra de Navegación Fija Superior */}
          <HeaderNav
            onOpenQRModal={() => setIsQRModalOpen(true)}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            viewMode={viewMode}
            onToggleViewMode={setViewMode}
          />

          {/* Contenido Principal con Espaciado Inferior para el Sticky Player */}
          <main className="flex-1 pb-32">
            {/* 1. Hero / Reproductor Señal HD + Logo Oficial y Volumen */}
            <HeroPlayerSection onOpenInstallModal={() => setIsInstallModalOpen(true)} />

            {/* 2. Sección Cabina WhatsApp para Pedir Temas */}
            <WhatsAppCabinaSection />

            {/* 3. Parrilla Oficial de Programación */}
            <ScheduleSection />

            {/* 4. Redes Sociales Oficiales (@cupidoradiopy) */}
            <SocialSection />
          </main>

          {/* Pie de Página */}
          <FooterSection
            onOpenStreamConfig={() => setIsStreamConfigOpen(true)}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
            onOpenQRModal={() => setIsQRModalOpen(true)}
          />

          {/* Barra Inferior Flotante de Audio con Sonando Ahora y Botón WhatsApp */}
          <StickyPlayer />
        </div>
      )}

      {/* Modals compartidos */}
      <StreamConfigModal
        isOpen={isStreamConfigOpen}
        onClose={() => setIsStreamConfigOpen(false)}
      />

      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <RadioProvider>
      <RadioAppContent />
    </RadioProvider>
  );
}
