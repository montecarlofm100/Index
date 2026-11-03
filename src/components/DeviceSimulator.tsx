import React, { useState } from 'react';
import { Smartphone, Monitor, Shield, Sparkles, QrCode } from 'lucide-react';

interface DeviceSimulatorProps {
  children: React.ReactNode;
  onOpenQRModal?: () => void;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({ children, onOpenQRModal }) => {
  const [deviceMode, setDeviceMode] = useState<'phone' | 'fluid'>('phone');
  const [osTheme, setOsTheme] = useState<'ios' | 'android'>('ios');

  return (
    <div className="min-h-screen bg-[#0a0a0d] text-white flex flex-col justify-between">
      {/* Top Testing Switcher (visible on desktop viewports) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-2.5 bg-[#121217] border-b border-white/10 text-xs z-50">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D71940]" />
            Cupido Radio · Entorno de Prueba Móvil
          </span>
          <span className="text-white/40">|</span>
          <a
            href="https://radio.free-shoutcast.com/site/91965"
            target="_blank"
            rel="noreferrer"
            className="text-[#D5AD70] hover:underline font-mono text-[11px] flex items-center gap-1 font-semibold"
          >
            <span>Stream: radio.free-shoutcast.com</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#D71940] text-white">En vivo</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          {onOpenQRModal && (
            <button
              onClick={onOpenQRModal}
              className="px-3 py-1 bg-[#D5AD70]/15 hover:bg-[#D5AD70]/25 text-[#D5AD70] border border-[#D5AD70]/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Código QR Móvil</span>
            </button>
          )}

          {/* OS Switcher */}
          {deviceMode === 'phone' && (
            <div className="flex items-center bg-black/40 rounded-xl p-0.5 border border-white/10">
              <button
                onClick={() => setOsTheme('ios')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  osTheme === 'ios'
                    ? 'bg-[#D71940] text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Apple iOS
              </button>
              <button
                onClick={() => setOsTheme('android')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  osTheme === 'android'
                    ? 'bg-[#D71940] text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Google Android
              </button>
            </div>
          )}

          {/* Mode Switcher */}
          <div className="flex items-center bg-black/40 rounded-xl p-0.5 border border-white/10">
            <button
              onClick={() => setDeviceMode('phone')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                deviceMode === 'phone'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Marco Smartphone</span>
            </button>
            <button
              onClick={() => setDeviceMode('fluid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                deviceMode === 'fluid'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Pantalla Completa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Display Container */}
      <div className="flex-1 flex items-center justify-center p-0 lg:p-6 w-full overflow-hidden">
        {deviceMode === 'fluid' ? (
          // Fullscreen fluid mode
          <div className="w-full h-full min-h-screen bg-[#101014] flex flex-col justify-between">
            {children}
          </div>
        ) : (
          // Realistic Phone Frame on desktop, 100% full screen on mobile
          <div className="w-full lg:max-w-[412px] h-screen lg:h-[844px] bg-[#101014] lg:rounded-[48px] lg:border-[8px] lg:border-[#252530] lg:shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(215,25,64,0.15)] flex flex-col justify-between overflow-hidden relative">
            {/* Phone Top Notch / Dynamic Island (only on desktop phone view) */}
            <div className="hidden lg:flex items-center justify-between px-7 pt-3 pb-1 text-[11px] font-semibold text-white/80 select-none z-50">
              <span>9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#101014] mr-2" />
                <span className="w-2 h-2 rounded-full bg-[#202028]" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span className="w-5 h-2.5 border border-white/60 rounded-sm p-0.5 flex items-center">
                  <span className="w-full h-full bg-white rounded-xs" />
                </span>
              </div>
            </div>

            {/* App Content */}
            <div className="flex-1 flex flex-col justify-between overflow-y-auto overflow-x-hidden relative">
              {children}
            </div>

            {/* Home Indicator Bar for iOS */}
            <div className="hidden lg:flex justify-center pb-2 pt-1 bg-[#121217]">
              <div className="w-32 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
