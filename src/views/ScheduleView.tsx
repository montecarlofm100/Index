import React, { useState } from 'react';
import { useRadio } from '../context/RadioContext';
import { RADIO_CONFIG } from '../config/radioConfig';
import { ScheduleEditorModal } from '../components/ScheduleEditorModal';
import { Clock, Calendar, User, MessageCircleHeart, Radio, Sparkles, Settings2 } from 'lucide-react';

export const ScheduleView: React.FC = () => {
  const { currentShow, isPlaying, programs } = useRadio();
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'weekdays' | 'weekend'>('all');
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const now = new Date();
  const currentDay = now.getDay(); // 0 is Sunday, 6 is Saturday
  const isWeekendNow = currentDay === 0 || currentDay === 6;

  const filteredPrograms = programs.filter((prog) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'today') {
      if (isWeekendNow) {
        return prog.days.includes('Sábados') || prog.days.includes('Todos los días');
      } else {
        return prog.days.includes('Lunes a Viernes') || prog.days.includes('Todos los días');
      }
    }
    if (activeFilter === 'weekdays') {
      return prog.days.includes('Lunes a Viernes') || prog.days.includes('Todos los días');
    }
    if (activeFilter === 'weekend') {
      return prog.days.includes('Sábados') || prog.days.includes('Todos los días');
    }
    return true;
  });

  const handleDedicateForShow = (showTitle: string, hostName: string) => {
    const text = encodeURIComponent(
      `¡Hola Cupido Radio! Quiero enviar un saludo y pedir una dedicatoria para el programa "${showTitle}" con ${hostName}: `
    );
    window.open(`https://wa.me/${RADIO_CONFIG.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-full px-4 py-4 space-y-5 max-w-2xl mx-auto w-full select-none">
      {/* Title & Description with Editor Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D71940]/10 border border-[#D71940]/20 text-[11px] font-semibold text-[#FF5478] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Grilla Oficial</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            Programación Romántica
          </h2>
          <p className="text-xs text-white/60">
            Nuestras voces y baladas las 24 horas del día para acompañar tu corazón
          </p>
        </div>

        <button
          onClick={() => setIsEditorOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-[#D5AD70]/15 hover:bg-[#D5AD70]/25 text-[#D5AD70] border border-[#D5AD70]/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 shrink-0"
        >
          <Settings2 className="w-4 h-4" />
          <span>Editar Programas</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center p-1 bg-[#181820] border border-white/5 rounded-2xl gap-1">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'today', label: 'Hoy' },
          { id: 'weekdays', label: 'Lun a Vie' },
          { id: 'weekend', label: 'Fin de Semana' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
            className={`flex-1 py-2 px-2 text-xs font-medium rounded-xl transition-all ${
              activeFilter === tab.id
                ? 'bg-gradient-to-r from-[#D71940] to-[#FF5478] text-white shadow-md shadow-[#D71940]/20 font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Program Cards List */}
      <div className="space-y-3.5">
        {filteredPrograms.map((show) => {
          const isCurrentlyOnAir = currentShow?.id === show.id;

          return (
            <div
              key={show.id}
              className={`p-4 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                isCurrentlyOnAir
                  ? 'bg-gradient-to-br from-[#1F1722] via-[#191922] to-[#121217] border-[#D71940] shadow-xl shadow-[#D71940]/15'
                  : 'bg-[#181820]/90 border-white/5 hover:border-white/10'
              }`}
            >
              {/* On-Air Ribbon */}
              {isCurrentlyOnAir && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D71940] to-[#FF5478] px-3 py-1 rounded-bl-xl text-[10px] font-bold tracking-wider uppercase text-white flex items-center gap-1 shadow-md">
                  <span className={`w-1.5 h-1.5 rounded-full bg-white ${isPlaying ? 'animate-ping' : ''}`} />
                  <span>AL AIRE AHORA</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Show Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10 relative shadow-md">
                  <img
                    src={show.image}
                    alt={show.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {isCurrentlyOnAir && (
                    <div className="absolute inset-0 bg-[#D71940]/20 flex items-center justify-center">
                      <Radio className="w-6 h-6 text-white drop-shadow" />
                    </div>
                  )}
                </div>

                {/* Show Info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white font-heading truncate">
                      {show.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-white/70">
                    <span className="flex items-center gap-1 text-[#D5AD70]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-mono">{show.timeSlot}</span>
                    </span>

                    <span className="flex items-center gap-1 text-white/50">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{show.days}</span>
                    </span>

                    <span className="flex items-center gap-1 text-white/80 font-medium">
                      <User className="w-3.5 h-3.5 text-[#FF5478] shrink-0" />
                      <span>Con {show.host}</span>
                    </span>
                  </div>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {show.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {show.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Action for this specific show */}
                <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => handleDedicateForShow(show.title, show.host)}
                    aria-label={`Dedicatoria para ${show.title}`}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageCircleHeart className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dedicatoria</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Configurable note */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center text-xs text-white/50 space-y-1">
        <p className="flex items-center justify-center gap-1 text-[#D5AD70] font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Información de Programación Dinámica</span>
        </p>
        <p>
          Los programas, horarios y locutores se pueden editar pulsando "Editar Programas" arriba.
        </p>
      </div>

      {/* Interactive Schedule Editor Modal */}
      <ScheduleEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
      />
    </div>
  );
};
