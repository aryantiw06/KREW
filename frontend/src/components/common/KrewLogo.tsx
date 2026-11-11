import React from 'react';
import { Link } from 'react-router-dom';

interface KrewLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  linkTo?: string;
  className?: string;
}

export const KrewLogo: React.FC<KrewLogoProps> = ({
  size = 'md',
  showTagline = false,
  linkTo = '/',
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const content = (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Studio Film-Lens Stylized K Node Icon */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} rounded-xl bg-krew-card border border-krew-border transition-all duration-300 group-hover:border-krew-purple/60 group-hover:shadow-purple-glow`}>
        {/* Film Frame Perforations Motif */}
        <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-krew-purple opacity-70"></div>
        <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-krew-cyan opacity-70"></div>
        <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-krew-purple opacity-70"></div>
        <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-krew-cyan opacity-70"></div>
        
        {/* Central Stylized K SVG */}
        <svg viewBox="0 0 24 24" className="w-5/6 h-5/6 p-0.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Vertical Stem */}
          <path d="M7 5V19" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
          {/* Upper Diagonal Arm with cyan node */}
          <path d="M17 6L9.5 12" stroke="url(#krew-icon-grad)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="17" cy="6" r="1.5" fill="#38BDF8" />
          {/* Lower Diagonal Arm with purple node */}
          <path d="M9.5 12L17.5 18" stroke="url(#krew-icon-grad)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="17.5" cy="18" r="1.5" fill="#A855F7" />
          {/* Central Intersection Node */}
          <circle cx="9.5" cy="12" r="1.5" fill="#C4B5FD" />
          <defs>
            <linearGradient id="krew-icon-grad" x1="9" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.6" stopColor="#C4B5FD" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-bold tracking-tight text-white ${textSizes[size]}`}>
            KREW
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-krew-purple animate-pulse"></span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-widest font-mono text-krew-lavender uppercase -mt-0.5">
            YOUR VISION. OUR CREW.
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
