import React from 'react';

interface CupidoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  variant?: 'full' | 'icon-only' | 'horizontal';
}

export const CupidoLogo: React.FC<CupidoLogoProps> = ({
  className = '',
  size = 'md',
  showSlogan = true,
  variant = 'full',
}) => {
  const iconDimensions = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }[size];

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }[size];

  const sloganSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  // Official Cupido Radio Logo Emblem (User's original design)
  const OfficialBadge = (
    <div className={`relative ${iconDimensions} shrink-0 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 duration-200`}>
      <img
        src="/cupido_logo.png"
        alt="Cupido Radio Logotipo Oficial"
        className="w-full h-full object-contain rounded-full drop-shadow-[0_4px_20px_rgba(215,25,64,0.45)]"
      />
    </div>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{OfficialBadge}</div>;
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {OfficialBadge}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className="text-base font-black tracking-tight text-white uppercase font-heading">
              CUPIDO
            </span>
            <span className="text-base font-light tracking-widest text-[#FF5478] uppercase font-heading">
              RADIO
            </span>
          </div>
          {showSlogan && (
            <span className="text-[10px] text-[#D5AD70] italic font-medium tracking-tight -mt-0.5">
              La música que te enamora
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {OfficialBadge}
      {showSlogan && (
        <span className="text-xs text-[#D5AD70] italic font-medium tracking-wide mt-2">
          "La música que te enamora"
        </span>
      )}
    </div>
  );
};
