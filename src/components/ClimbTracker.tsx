import React, { useEffect, useRef, useState } from "react";

function ClimbTracker(): React.ReactElement | null {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const progressRef = useRef<HTMLElement | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll tracking
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

  // Drive o-progress value attribute via ref (web-component attribute, not React prop)
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.setAttribute("value", String(Math.round(scrollProgress)));
    }
  }, [scrollProgress]);

  if (!isDesktop) return <div style={{ display: "none" }} />;

  const climberY = scrollProgress;

  // ============================
  // CLIMBER SVG — Back View
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
        filter: "drop-shadow(0 0 6px rgba(124,148,255,0.7))",
      }}
    >
      {/* Head */}
      <circle cx="45" cy="20" r="12" fill="#e6e9ef" />
      {/* Helmet glow ring */}
      <circle cx="45" cy="20" r="14" fill="none" stroke="#7c94ff" strokeWidth="1.5" opacity="0.6" />

      {/* Torso */}
      <rect x="32" y="32" width="26" height="35" rx="6" fill="#7c94ff" />
      {/* Torso accent stripe */}
      <rect x="43" y="34" width="4" height="31" rx="2" fill="rgba(255,255,255,0.25)" />

      {/* Left arm reaching vinyl */}
      <line x1="45" y1="40" x2="25" y2="10" stroke="#7c94ff" strokeWidth="7" strokeLinecap="round" />
      {/* Right arm reaching vinyl */}
      <line x1="45" y1="46" x2="70" y2="28" stroke="#7c94ff" strokeWidth="7" strokeLinecap="round" />

      {/* Hands */}
      <circle cx="25" cy="10" r="5" fill="#e6e9ef" />
      <circle cx="70" cy="28" r="5" fill="#e6e9ef" />

      {/* Left leg */}
      <line x1="40" y1="67" x2="30" y2="100" stroke="#7c94ff" strokeWidth="7" strokeLinecap="round" />
      {/* Right leg */}
      <line x1="50" y1="67" x2="60" y2="100" stroke="#7c94ff" strokeWidth="7" strokeLinecap="round" />

      {/* Feet */}
      <circle cx="30" cy="100" r="5" fill="#e6e9ef" />
      <circle cx="60" cy="100" r="5" fill="#e6e9ef" />
    </svg>
  );

  // ============================
  // VINYL HOLDS
  // ============================
  const vinylPositions = [5, 20, 35, 50, 65, 80, 95];

  const Vinyl = ({ bottom }: { bottom: number }) => (
    <div
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: `${bottom}%`,
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: "radial-gradient(circle, #111 40%, #222 60%, #000 90%)",
        border: "3px solid #444",
        boxShadow:
          scrollProgress >= bottom
            ? "0 0 14px rgba(124,148,255,0.8), 0 0 5px rgba(124,148,255,0.4)"
            : "0 0 6px rgba(0,0,0,0.6)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Vinyl center hole */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: scrollProgress >= bottom ? "#7c94ff" : "#888",
          transition: "background 0.4s ease",
          boxShadow: scrollProgress >= bottom ? "0 0 8px #7c94ff" : "none",
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
        background: "rgba(15,17,21,0.92)",
        border: "1px solid rgba(124,148,255,0.2)",
        borderRadius: "14px",
        padding: "14px",
        color: "#e6e9ef",
        zIndex: 1000,
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 24px rgba(124,148,255,0.12), 0 4px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── ORBIT RADIAL SUMMIT RING ── */}
      {/* Sits at the top of the widget as a HUD-style progress arc */}
      <div
        className="bigbang"
        style={{
          width: "132px",
          height: "132px",
          margin: "0 auto 10px",
          position: "relative",
        }}
      >
        <div
          className="gravity-spot"
          style={
            {
              "--o-force": "132px",
            } as React.CSSProperties
          }
        >
          {/* Outer decorative ring */}
          <div
            className="orbit-12"
            style={{
              border: "1px solid rgba(124,148,255,0.15)",
              borderRadius: "50%",
            }}
          />
          {/* Mid decorative ring */}
          <div
            className="orbit-8"
            style={{
              border: "1px dashed rgba(124,148,255,0.1)",
              borderRadius: "50%",
            }}
          />
          {/* Inner progress ring orbit */}
          <div
            className="orbit-10"
            style={
              {
                "--o-fill": "#7c94ff",
                "--o-back-fill": "rgba(124,148,255,0.1)",
                "--o-stroke": "rgba(124,148,255,0.4)",
                "--o-stroke-width": "1px",
                "--o-back-stroke": "transparent",
              } as React.CSSProperties
            }
          >
            {/* @ts-ignore */}
            <o-progress
              ref={progressRef}
              value={Math.round(scrollProgress)}
              max="100"
              shape="rounded"
              class="shrink-10"
            />
          </div>

          {/* Center label */}
          <div
            className="orbit-0"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: "translateY(-50%)",
                marginTop: "66px",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#7c94ff",
                  lineHeight: 1,
                  textShadow: "0 0 10px rgba(124,148,255,0.6)",
                }}
              >
                {Math.round(scrollProgress)}%
              </span>
              <span style={{ fontSize: "9px", color: "#a6adbb", marginTop: "2px" }}>
                SUMMIT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CLIMB TRACK ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "380px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.03)",
          overflow: "hidden",
          border: "1px solid rgba(124,148,255,0.1)",
        }}
      >
        {/* Vertical rope / guide line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "2px",
            transform: "translateX(-50%)",
            background: `linear-gradient(to top, #7c94ff ${scrollProgress}%, rgba(124,148,255,0.15) ${scrollProgress}%)`,
            transition: "background 0.25s ease",
          }}
        />

        {/* Vinyl Holds */}
        {vinylPositions.map((pos, i) => (
          <Vinyl key={i} bottom={pos} />
        ))}

        {/* Climber */}
        <ClimberSVG y={climberY} />
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "8px",
          fontSize: "10px",
          opacity: 0.5,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Scroll to climb
      </p>
    </div>
  );
}

export default ClimbTracker;
