import React from 'react';
import { useRadio } from '../context/RadioContext';

export const ScheduleSection: React.FC = () => {
  const { programs, currentShow } = useRadio();

  return (
    <section id="programacion" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-bold uppercase tracking-wider text-cupido-pink bg-cupido-pink/10 px-3 py-1 rounded-full border border-cupido-pink/20">
          Parrilla Oficial
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
          Nuestra Programación
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          La mejor selección musical para cada momento de tu día.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((prog) => {
          const isCurrent = currentShow?.id === prog.id;

          return (
            <div
              key={prog.id}
              id={prog.id}
              className={`glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-t-4 ${prog.borderColor || 'border-cupido-red'} hover:border-white/20 transition-all ${
                isCurrent
                  ? 'ring-2 ring-cupido-red/50 shadow-2xl shadow-cupido-red/20'
                  : ''
              } ${prog.isWeekend ? 'bg-gradient-to-br from-emerald-950/20 to-transparent' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-black uppercase ${prog.badgeTextColor || 'text-cupido-red'} ${prog.badgeColor || 'bg-cupido-red/20'} px-3 py-1 rounded-full flex items-center gap-1.5`}
                  >
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cupido-red animate-ping" />
                    )}
                    <span>{prog.timeSlot}</span>
                  </span>

                  <i className={`${prog.iconClass || 'fa-solid fa-radio'} text-lg`}></i>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">{prog.title}</h3>
                </div>

                {isCurrent && (
                  <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider text-cupido-red bg-cupido-red/15 px-2 py-0.5 rounded-md">
                    ¡AL AIRE AHORA!
                  </span>
                )}

                <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <span>{prog.statusCategory || 'Al Aire'}</span>
                <span className={`${prog.badgeTextColor || 'text-cupido-red'} font-semibold flex items-center gap-1`}>
                  <i className="fa-solid fa-heart text-[10px]"></i>
                  <span>{prog.highlightText || 'En Vivo'}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
