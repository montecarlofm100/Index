import React from 'react';
import { RADIO_CONFIG } from '../config/radioConfig';

export const NewsSection: React.FC = () => {
  return (
    <section id="noticias" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cupido-pink">
            Música & Artistas
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            Noticias de Entretenimiento
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RADIO_CONFIG.news.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target={item.isExternal ? '_blank' : '_self'}
            rel={item.isExternal ? 'noreferrer' : undefined}
            className="glass-card rounded-2xl overflow-hidden group hover:border-cupido-pink/40 hover:-translate-y-1 transition-all flex flex-col cursor-pointer"
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span
                className={`absolute top-3 left-3 ${item.badgeColor} backdrop-blur-md text-[10px] font-black uppercase px-2.5 py-1 rounded-full text-white shadow-md`}
              >
                {item.source}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold text-cupido-red uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-bold text-base text-white mt-2 group-hover:text-cupido-pink transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                <span>
                  <i className="fa-regular fa-clock mr-1"></i> {item.date}
                </span>
                <span className="text-cupido-pink font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Leer nota</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
