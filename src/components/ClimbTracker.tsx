import React, { useEffect, useState } from "react";

function ClimbTracker(): React.ReactElement | null {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll tracking (always register hooks before any early return)
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not show on mobile
  // Do not render UI on mobile — but still keep hooks in place
  if (!isDesktop) {
    return <div style={{ display: "none" }} />;
  }

  const climberY = scrollProgress;

  // ============================
  // CLIMBER — Back View, Vinyl Grips
  // ============================
  const ClimberSVG = ({ y }: { y: number }) => (
    <svg
      width="90"
      height="120"
      viewBox="0 0 90 120"
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: `${y}%`,
        transition: "bottom 0.15s ease-out",
        zIndex: 50,
      }}
    >
      {/* Head (back of head) */}
      <circle cx="45" cy="20" r="12" fill="#e6e9ef" />

      {/* Torso */}
      <rect x="32" y="32" width="26" height="35" rx="6" fill="#7c94ff" />

      {/* Arms reaching vinyls */}
      <line
        x1="45" y1="40"
        x2="25" y2="10"
        stroke="#7c94ff"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="45" y1="46"
        x2="70" y2="28"
        stroke="#7c94ff"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Hands */}
      <circle cx="25" cy="10" r="5" fill="#e6e9ef" />
      <circle cx="70" cy="28" r="5" fill="#e6e9ef" />

      {/* Legs stepping vinyls */}
      <line
        x1="40" y1="67"
        x2="30" y2="100"
        stroke="#7c94ff"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="50" y1="67"
        x2="60" y2="100"
        stroke="#7c94ff"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Feet */}
      <circle cx="30" cy="100" r="5" fill="#e6e9ef" />
      <circle cx="60" cy="100" r="5" fill="#e6e9ef" />
    </svg>
  );

  // ============================
  // VINYL HOLDS (Climb Route)
  // ============================
  const vinylPositions = [5, 20, 35, 50, 65, 80, 95];

  const Vinyl = ({ bottom }: { bottom: number }) => (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: `${bottom}%`,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "radial-gradient(circle, #111 40%, #222 60%, #000 90%)",
        border: "4px solid #444",
        boxShadow: "0 0 12px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#888",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "160px",
        background: "#151923",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        padding: "16px",
        color: "#e6e9ef",
        zIndex: 1000,
      }}
    >
      <h3
        style={{
          margin: "0 0 16px",
          fontSize: "16px",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Climb Progress
      </h3>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "450px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.04)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Vinyl Holds */}
        {vinylPositions.map((pos, i) => (
          <Vinyl key={i} bottom={pos} />
        ))}

        {/* Climber */}
        <ClimberSVG y={climberY} />

        {/* Progress Display */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.5)",
            padding: "4px 12px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          {Math.round(scrollProgress)}%
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "12px",
          opacity: 0.7,
        }}
      >
        Scroll to climb
      </p>
    </div>
  );
}

export default ClimbTracker;
