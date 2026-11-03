import React, { useState } from 'react';
import { ProgramShow } from '../types/radio';
import { useRadio } from '../context/RadioContext';
import { CUPIDO_ASSETS } from '../config/radioConfig';
import {
  Calendar,
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  RotateCcw,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';

interface ScheduleEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleEditorModal: React.FC<ScheduleEditorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { programs, updatePrograms, resetPrograms } = useRadio();

  const [editingShow, setEditingShow] = useState<ProgramShow | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(13);
  const [days, setDays] = useState('Lunes a Viernes');
  const [description, setDescription] = useState('');
  const [tagsStr, setTagsStr] = useState('');

  if (!isOpen) return null;

  const handleStartEdit = (show: ProgramShow) => {
    setEditingShow(show);
    setIsCreatingNew(false);
    setTitle(show.title);
    setHost(show.host);
    setTimeSlot(show.timeSlot);
    setStartHour(show.startHour);
    setEndHour(show.endHour);
    setDays(show.days);
    setDescription(show.description);
    setTagsStr(show.tags.join(', '));
  };

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setEditingShow(null);
    setTitle('');
    setHost('');
    setTimeSlot('14:00 - 18:00');
    setStartHour(14);
    setEndHour(18);
    setDays('Lunes a Viernes');
    setDescription('');
    setTagsStr('Baladas, Romance');
  };

  const handleCancelForm = () => {
    setEditingShow(null);
    setIsCreatingNew(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !host.trim()) {
      setFeedback('El título del programa y el locutor son obligatorios.');
      return;
    }

    const tagsArray = tagsStr
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (isCreatingNew) {
      const newShow: ProgramShow = {
        id: `prog-custom-${Date.now()}`,
        title: title.trim(),
        host: host.trim(),
        timeSlot: timeSlot.trim(),
        startHour: Number(startHour),
        endHour: Number(endHour),
        days: days.trim(),
        description: description.trim() || 'Programa musical romántico de Cupido Radio.',
        image: CUPIDO_ASSETS.coverAlbum,
        tags: tagsArray.length > 0 ? tagsArray : ['Romántico'],
      };

      const updated = [...programs, newShow];
      updatePrograms(updated);
      setFeedback('¡Nuevo programa agregado con éxito!');
    } else if (editingShow) {
      const updated = programs.map(p => {
        if (p.id === editingShow.id) {
          return {
            ...p,
            title: title.trim(),
            host: host.trim(),
            timeSlot: timeSlot.trim(),
            startHour: Number(startHour),
            endHour: Number(endHour),
            days: days.trim(),
            description: description.trim(),
            tags: tagsArray.length > 0 ? tagsArray : p.tags,
          };
        }
        return p;
      });
      updatePrograms(updated);
      setFeedback('¡Programa actualizado correctamente!');
    }

    setEditingShow(null);
    setIsCreatingNew(false);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (id: string, programTitle: string) => {
    if (programs.length <= 1) {
      setFeedback('Debe quedar al menos un programa en la grilla.');
      return;
    }
    const confirmed = window.confirm(`¿Estás seguro de eliminar el programa "${programTitle}"?`);
    if (confirmed) {
      const updated = programs.filter(p => p.id !== id);
      updatePrograms(updated);
      setFeedback(`"${programTitle}" fue eliminado.`);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleResetToDefaults = () => {
    const confirmed = window.confirm('¿Deseas restablecer todos los programas a los valores originales de fábrica?');
    if (confirmed) {
      resetPrograms();
      setFeedback('Programación restablecida a los valores iniciales.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#191920] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121216]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D71940]/20 flex items-center justify-center text-[#FF5478]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Administrador de Programación
              </h3>
              <p className="text-xs text-white/50">
                Edita los programas, locutores y horarios de Cupido Radio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Notification feedback */}
          {feedback && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Form for Creating / Editing */}
          {(isCreatingNew || editingShow) ? (
            <div className="p-4 rounded-2xl bg-black/40 border border-[#D71940]/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Edit2 className="w-4 h-4 text-[#FF5478]" />
                  <span>{isCreatingNew ? 'Agregar Nuevo Programa' : `Editar: ${editingShow?.title}`}</span>
                </h4>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="text-xs text-white/50 hover:text-white"
                >
                  Cancelar
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/70 font-medium mb-1 block">Título del Programa *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ej. Amanecer Romántico"
                      className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D71940]"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 font-medium mb-1 block">Locutor(a) / Conductor *</label>
                    <input
                      type="text"
                      required
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      placeholder="Ej. Clara Méndez"
                      className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D71940]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-white/70 font-medium mb-1 block">Texto de Horario</label>
                    <input
                      type="text"
                      required
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      placeholder="Ej. 06:00 - 09:00"
                      className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono placeholder-white/30 focus:outline-none focus:border-[#D71940]"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 font-medium mb-1 block">Días de Emisión</label>
                    <input
                      type="text"
                      required
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      placeholder="Ej. Lunes a Viernes"
                      className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D71940]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-white/70 font-medium mb-1 block" title="Hora inicio (0-23)">H. Inicio</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={startHour}
                        onChange={(e) => setStartHour(Number(e.target.value))}
                        className="w-full px-2 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 font-medium mb-1 block" title="Hora fin (1-24)">H. Fin</label>
                      <input
                        type="number"
                        min="1"
                        max="26"
                        value={endHour}
                        onChange={(e) => setEndHour(Number(e.target.value))}
                        className="w-full px-2 py-2 bg-black/60 border border-white/15 rounded-xl text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 font-medium mb-1 block">Descripción / Sinopsis</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe de qué trata el programa..."
                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D71940] resize-none"
                  />
                </div>

                <div>
                  <label className="text-white/70 font-medium mb-1 block">Etiquetas (separadas por coma)</label>
                  <input
                    type="text"
                    value={tagsStr}
                    onChange={(e) => setTagsStr(e.target.value)}
                    placeholder="Baladas, Amor, 80s"
                    className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#D71940]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCancelForm}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D71940] to-[#FF5478] text-white font-semibold flex items-center gap-1.5 shadow-md shadow-[#D71940]/25"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Guardar Programa</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleStartCreate}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D71940] to-[#FF5478] hover:opacity-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#D71940]/25 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nuevo Programa</span>
              </button>

              <button
                onClick={handleResetToDefaults}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                title="Restablecer programas iniciales"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            </div>
          )}

          {/* List of current shows */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider px-1">
              Programas Actuales ({programs.length})
            </h4>

            {programs.map((show) => (
              <div
                key={show.id}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors flex items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm truncate">
                      {show.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#D5AD70] px-2 py-0.5 rounded-md bg-white/5 shrink-0">
                      {show.timeSlot}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span className="text-white/80 font-medium">Con {show.host}</span>
                    <span>·</span>
                    <span>{show.days}</span>
                  </div>
                  <p className="text-[11px] text-white/50 line-clamp-1">
                    {show.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleStartEdit(show)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                    title="Editar programa"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(show.id, show.title)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    title="Eliminar programa"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#121216] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
