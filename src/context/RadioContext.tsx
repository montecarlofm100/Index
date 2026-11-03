import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { PlaybackState, ProgramShow, StreamOption } from '../types/radio';
import { RADIO_CONFIG, CUPIDO_ASSETS } from '../config/radioConfig';

interface RadioContextType {
  playbackState: PlaybackState;
  isPlaying: boolean;
  isLoading: boolean;
  currentStream: StreamOption;
  availableStreams: StreamOption[];
  volume: number;
  isMuted: boolean;
  errorMessage: string | null;
  currentShow: ProgramShow | null;
  currentSongTitle: string;
  sleepTimer: number | null;
  customStreamUrl: string;
  // Actions
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (level: number) => void;
  toggleMute: () => void;
  selectStream: (streamId: string) => void;
  setCustomStream: (url: string) => void;
  reconnect: () => void;
  setSleepTimer: (minutes: number | null) => void;
  programs: ProgramShow[];
  updatePrograms: (newPrograms: ProgramShow[]) => void;
  resetPrograms: () => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

const LOCAL_STORAGE_VOL_KEY = 'cupido_radio_volume';
const LOCAL_STORAGE_STREAM_KEY = 'cupido_radio_stream_id';
const LOCAL_STORAGE_CUSTOM_URL_KEY = 'cupido_radio_custom_url';
const LOCAL_STORAGE_PROGRAMS_KEY = 'cupido_radio_programs';

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const sleepTimerIntervalRef = useRef<number | null>(null);

  // Programs state with persistence
  const [programs, setPrograms] = useState<ProgramShow[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_PROGRAMS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return RADIO_CONFIG.programs;
  });

  const updatePrograms = useCallback((newPrograms: ProgramShow[]) => {
    setPrograms(newPrograms);
    localStorage.setItem(LOCAL_STORAGE_PROGRAMS_KEY, JSON.stringify(newPrograms));
  }, []);

  const resetPrograms = useCallback(() => {
    setPrograms(RADIO_CONFIG.programs);
    localStorage.removeItem(LOCAL_STORAGE_PROGRAMS_KEY);
  }, []);

  const [availableStreams, setAvailableStreams] = useState<StreamOption[]>(() => {
    const savedCustom = localStorage.getItem(LOCAL_STORAGE_CUSTOM_URL_KEY);
    if (savedCustom) {
      return [
        ...RADIO_CONFIG.backupStreams,
        {
          id: 'stream-custom',
          name: 'Mi Enlace Personalizado',
          url: savedCustom,
          bitrate: 'Personalizado',
          format: 'Direct Stream',
          description: 'URL directa configurada manualmente por la emisora.',
          isCustom: true
        }
      ];
    }
    return RADIO_CONFIG.backupStreams;
  });

  const [currentStream, setCurrentStream] = useState<StreamOption>(() => {
    const savedId = localStorage.getItem(LOCAL_STORAGE_STREAM_KEY);
    if (!savedId || savedId === 'stream-caster-primary' || savedId === 'stream-caster-cupido' || savedId === 'stream-ismyradio-web' || savedId === 'stream-romantic-demo') {
      return RADIO_CONFIG.backupStreams[0];
    }
    const found = availableStreams.find(s => s.id === savedId);
    return found || RADIO_CONFIG.backupStreams[0];
  });

  const [customStreamUrl, setCustomStreamUrl] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_CUSTOM_URL_KEY) || '';
  });

  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_VOL_KEY);
    return saved !== null ? Number(saved) : 0.9;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sleepTimer, setSleepTimerMinutes] = useState<number | null>(null);
  const [currentSongTitle, setCurrentSongTitle] = useState<string>('Cupido Radio · Transmisión 24/7 en Vivo');

  // Live Shoutcast metadata polling (optimizado para carga veloz en móviles)
  useEffect(() => {
    let isCancelled = false;

    async function actualizarMetadatoCancion() {
      // Intentar primero con endpoint rápido con timeout corto para no ralentizar móviles
      const endpoint = `https://api.allorigins.win/raw?url=${encodeURIComponent('https://s1.free-shoutcast.com:18354/7.html')}&nocache=${Date.now()}`;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500);
        const response = await fetch(endpoint, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (response.ok) {
          const text = await response.text();
          let cancion = '';
          if (text && text.includes(',')) {
            const partes = text.split(',');
            if (partes.length >= 7) {
              cancion = partes.slice(6).join(',').replace(/<\/?[^>]+(>|$)/g, '').trim();
            }
          }
          if (cancion && cancion.trim() !== '' && !cancion.includes('<html>') && !isCancelled) {
            setCurrentSongTitle(cancion.trim());
          }
        }
      } catch {
        // En caso de fallo o timeout de red móvil, mantener el título actual sin bloquear
      }
    }

    // Demorar 1.5s el primer chequeo para dar prioridad al render inicial en el celular
    const firstTimer = setTimeout(actualizarMetadatoCancion, 1500);
    const interval = setInterval(actualizarMetadatoCancion, 15000);
    return () => {
      isCancelled = true;
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  // Compute active show based on current time & day
  const computeCurrentShow = useCallback((): ProgramShow => {
    const now = new Date();
    const day = now.getDay();
    const isWeekend = day === 0 || day === 6;
    const hour = now.getHours();

    if (isWeekend) {
      const weekendShow = programs.find(p => p.isWeekend);
      if (weekendShow) return weekendShow;
    }

    const show = programs.find(p => {
      if (p.isWeekend) return false;
      if (p.startHour <= p.endHour) {
        return hour >= p.startHour && hour < p.endHour;
      } else {
        return hour >= p.startHour || hour < p.endHour;
      }
    });

    return show || programs[0];
  }, [programs]);

  const [currentShow, setCurrentShow] = useState<ProgramShow | null>(computeCurrentShow);

  useEffect(() => {
    setCurrentShow(computeCurrentShow());
    const interval = setInterval(() => {
      setCurrentShow(computeCurrentShow());
    }, 60000);
    return () => clearInterval(interval);
  }, [computeCurrentShow]);

  // Audio element initialization
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    const onWaiting = () => {
      setPlaybackState('loading');
    };

    const onPlaying = () => {
      setPlaybackState('playing');
      setErrorMessage(null);
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'playing';
      }
    };

    const onPause = () => {
      if (playbackState !== 'loading' && playbackState !== 'reconnecting') {
        setPlaybackState('paused');
      }
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    };

    const onError = () => {
      console.warn('Audio streaming error encountered');
      setPlaybackState('error');
      setErrorMessage(
        'No se pudo conectar con la señal en directo. Verifica tu software emisor (RadioBOSS / BUTT / SAM) o toca Reintentar.'
      );
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'none';
      }
    };

    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Update MediaSession API for lockscreen controls
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSongTitle || (currentShow ? currentShow.title : RADIO_CONFIG.name),
        artist: 'Cupido Radio · 24/7 Música Romántica',
        album: 'La que te enamora',
        artwork: [
          { src: CUPIDO_ASSETS.logo, sizes: '512x512', type: 'image/png' },
          { src: CUPIDO_ASSETS.coverAlbum, sizes: '1024x1024', type: 'image/png' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        pause();
      });
      navigator.mediaSession.setActionHandler('stop', () => {
        pause();
      });
    }
  }, [currentShow, currentSongTitle]);

  // Volume synchronization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Sleep timer ticker
  useEffect(() => {
    if (sleepTimerIntervalRef.current) {
      clearInterval(sleepTimerIntervalRef.current);
      sleepTimerIntervalRef.current = null;
    }

    if (sleepTimer !== null && sleepTimer > 0) {
      sleepTimerIntervalRef.current = window.setInterval(() => {
        setSleepTimerMinutes((prev) => {
          if (prev === null || prev <= 1) {
            pause();
            return null;
          }
          return prev - 1;
        });
      }, 60000);
    }

    return () => {
      if (sleepTimerIntervalRef.current) {
        clearInterval(sleepTimerIntervalRef.current);
      }
    };
  }, [sleepTimer]);

  const play = async () => {
    if (!audioRef.current) return;
    try {
      setPlaybackState('loading');
      setErrorMessage(null);

      // Cache busting parameter
      const streamUrl = currentStream.url;
      const delimiter = streamUrl.includes('?') ? '&' : '/;?';
      const cacheBustUrl = `${streamUrl}${delimiter}nocache=${Date.now()}`;

      audioRef.current.src = cacheBustUrl;
      audioRef.current.load();
      await audioRef.current.play();
      setPlaybackState('playing');
    } catch (err: unknown) {
      console.error('Play failed:', err);
      setPlaybackState('error');
      setErrorMessage('Toca el botón de Play para iniciar la transmisión en vivo.');
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = '';
    setPlaybackState('paused');
  };

  const togglePlay = () => {
    if (playbackState === 'playing') {
      pause();
    } else {
      play();
    }
  };

  const setVolume = (level: number) => {
    const clamped = Math.max(0, Math.min(1, level));
    setVolumeState(clamped);
    if (isMuted && clamped > 0) {
      setIsMuted(false);
    }
    localStorage.setItem(LOCAL_STORAGE_VOL_KEY, String(clamped));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const selectStream = (streamId: string) => {
    const found = availableStreams.find((s) => s.id === streamId);
    if (found) {
      const wasPlaying = playbackState === 'playing';
      pause();
      setCurrentStream(found);
      localStorage.setItem(LOCAL_STORAGE_STREAM_KEY, found.id);
      if (wasPlaying) {
        setTimeout(() => {
          play();
        }, 150);
      }
    }
  };

  const setCustomStream = (url: string) => {
    const cleanUrl = url.trim();
    setCustomStreamUrl(cleanUrl);
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_URL_KEY, cleanUrl);

    if (cleanUrl) {
      const customOption: StreamOption = {
        id: 'stream-custom',
        name: 'Mi Enlace Personalizado',
        url: cleanUrl,
        bitrate: 'Personalizado',
        format: 'Direct Stream',
        description: 'URL directa configurada manualmente por la emisora.',
        isCustom: true,
      };

      setAvailableStreams((prev) => {
        const withoutOldCustom = prev.filter((s) => s.id !== 'stream-custom');
        return [...withoutOldCustom, customOption];
      });

      selectStream('stream-custom');
    } else {
      setAvailableStreams(RADIO_CONFIG.backupStreams);
      selectStream(RADIO_CONFIG.backupStreams[0].id);
    }
  };

  const reconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    setPlaybackState('reconnecting');
    pause();
    reconnectTimeoutRef.current = window.setTimeout(() => {
      play();
    }, 600);
  };

  const setSleepTimer = (minutes: number | null) => {
    setSleepTimerMinutes(minutes);
  };

  const isPlaying = playbackState === 'playing';
  const isLoading = playbackState === 'loading' || playbackState === 'reconnecting';

  return (
    <RadioContext.Provider
      value={{
        playbackState,
        isPlaying,
        isLoading,
        currentStream,
        availableStreams,
        volume,
        isMuted,
        errorMessage,
        currentShow,
        currentSongTitle,
        sleepTimer,
        customStreamUrl,
        play,
        pause,
        togglePlay,
        setVolume,
        toggleMute,
        selectStream,
        setCustomStream,
        reconnect,
        setSleepTimer,
        programs,
        updatePrograms,
        resetPrograms,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = (): RadioContextType => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
};
