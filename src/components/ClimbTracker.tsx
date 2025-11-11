import React, { useEffect, useState } from 'react';

function ClimbTracker(): React.ReactElement {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate climber position (scroll down = descends = moves down)
  const climberPosition = scrollProgress; // 0% at top when at top of page, 100% at bottom when scrolled down

  // SVG Climber Component
  const ClimberSVG = ({ yPosition }: { yPosition: number }) => (
    <svg
      width="80"
      height="100"
      viewBox="0 0 80 100"
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: `${yPosition}%`,
        transition: 'bottom 0.1s ease-out',
        zIndex: 10
      }}
    >
      {/* Head */}
      <circle cx="40" cy="20" r="12" fill="#e6e9ef" />
      {/* Body */}
      <rect x="32" y="32" width="16" height="30" rx="4" fill="#7c94ff" />
      {/* Arms */}
      <line x1="20" y1="40" x2="32" y2="45" stroke="#7c94ff" strokeWidth="6" strokeLinecap="round" />
      <line x1="48" y1="45" x2="60" y2="40" stroke="#7c94ff" strokeWidth="6" strokeLinecap="round" />
      {/* Legs */}
      <line x1="36" y1="62" x2="28" y2="80" stroke="#7c94ff" strokeWidth="6" strokeLinecap="round" />
      <line x1="44" y1="62" x2="52" y2="80" stroke="#7c94ff" strokeWidth="6" strokeLinecap="round" />
      {/* Climbing Rope */}
      <line x1="40" y1="20" x2="40" y2="100" stroke="#a6adbb" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
      {/* Helmet */}
      <circle cx="40" cy="18" r="14" fill="none" stroke="#e6e9ef" strokeWidth="2" />
    </svg>
  );

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '200px',
        background: '#151923',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '20px',
        color: '#e6e9ef',
        zIndex: 1000
      }}
    >
      <h3 style={{ margin: '0 0 16px', color: '#e6e9ef', fontSize: '18px', textAlign: 'center' }}>
        Climb Progress
      </h3>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '2px solid rgba(255,255,255,0.1)'
        }}
        aria-label={`Climb Progress — ${Math.round(scrollProgress)}%`}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Mountain/Rock Background Pattern */}
        <svg width="100%" height="100%" style={{ position: 'absolute', bottom: 0 }}>
          {/* Rock pattern */}
          <path
            d="M0,400 L20,380 L40,390 L60,370 L80,385 L100,375 L120,390 L140,380 L160,385 L180,370 L200,380 L0,400 Z"
            fill="rgba(255,255,255,0.05)"
          />
          <path
            d="M0,400 L30,360 L60,370 L90,350 L120,365 L150,355 L180,370 L200,360 L0,400 Z"
            fill="rgba(255,255,255,0.03)"
          />
        </svg>

        {/* Progress Fill */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${scrollProgress}%`,
            background: 'linear-gradient(180deg, #9dd6ff, #7c94ff)',
            transition: 'height 0.1s ease-out',
            opacity: 0.3
          }}
        />

        {/* Climber */}
        <ClimberSVG yPosition={climberPosition} />

        {/* Progress Percentage Display */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15, 17, 21, 0.8)',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#e6e9ef',
            zIndex: 20
          }}
        >
          {Math.round(scrollProgress)}%
        </div>
      </div>
      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#a6adbb', textAlign: 'center' }}>
        Scroll to climb
      </p>
    </div>
  );
}

export default ClimbTracker;


