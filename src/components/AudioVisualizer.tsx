import React from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  className?: string;
  barCount?: number;
  variant?: 'inline' | 'bars' | 'wave';
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  className = '',
  barCount = 5,
  variant = 'bars',
}) => {
  if (variant === 'inline') {
    return (
      <div className={`flex items-end gap-1 h-5 ${className}`}>
        {[...Array(barCount)].map((_, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-[#FF5478] transition-all duration-300 ${
              isPlaying
                ? i % 3 === 0
                  ? 'animate-soundwave-1'
                  : i % 2 === 0
                  ? 'animate-soundwave-2'
                  : 'animate-soundwave-3'
                : 'h-1.5 opacity-40'
            }`}
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-1.5 h-8 ${className}`}>
      {[...Array(barCount)].map((_, i) => (
        <span
          key={i}
          className={`w-1.5 rounded-full transition-all duration-200 ${
            isPlaying
              ? 'bg-gradient-to-t from-[#D71940] via-[#FF5478] to-[#D5AD70]'
              : 'h-2 bg-white/20'
          } ${
            isPlaying
              ? i === 0
                ? 'animate-soundwave-1'
                : i === 1
                ? 'animate-soundwave-2'
                : i === 2
                ? 'animate-soundwave-3'
                : i === 3
                ? 'animate-soundwave-4'
                : 'animate-soundwave-5'
              : ''
          }`}
          style={{
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
};
