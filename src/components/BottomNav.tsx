import React from 'react';
import { Radio, CalendarDays, MessageCircleHeart, Info } from 'lucide-react';

export type NavTabId = 'inicio' | 'programacion' | 'contacto' | 'acerca';

interface BottomNavProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'inicio' as NavTabId,
      label: 'Inicio',
      icon: Radio,
    },
    {
      id: 'programacion' as NavTabId,
      label: 'Programación',
      icon: CalendarDays,
    },
    {
      id: 'contacto' as NavTabId,
      label: 'Contacto',
      icon: MessageCircleHeart,
    },
    {
      id: 'acerca' as NavTabId,
      label: 'Acerca de',
      icon: Info,
    },
  ];

  return (
    <nav className="w-full bg-[#121217]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 z-40">
      <div className="grid grid-cols-4 items-center max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className="relative flex flex-col items-center justify-center min-h-[48px] py-1 transition-all group focus:outline-none"
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-[#FF5478] bg-[#D71940]/15 scale-105'
                    : 'text-white/50 group-hover:text-white/80'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 transition-colors ${
                  isActive ? 'text-[#FF5478] font-semibold' : 'text-white/50 group-hover:text-white/70'
                }`}
              >
                {tab.label}
              </span>

              {/* Active glow dot */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#D5AD70] mt-0.5 shadow-[0_0_6px_#D5AD70]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
