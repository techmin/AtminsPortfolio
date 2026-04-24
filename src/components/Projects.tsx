import React, { useState } from 'react';
import projects from '@data/projects.json';

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string;
  image: string;
};

function Projects(): React.ReactElement {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div>
      <h2 style={{ margin: 0, marginBottom: 12, fontFamily: 'fantasy', fontSize: '90px', color: '#1114c7b3' }}>
        Projects
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {(projects as Project[]).map((p) => {
          const isHovered = hoveredId === p.id;

          return (
            <article
              key={p.id}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: 'relative',
                background: '#151923',
                border: isHovered
                  ? '1px solid rgba(124,148,255,0.5)'
                  : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                overflow: 'hidden',
                color: '#e6e9ef',
                transition: 'transform 0.25s ease, border 0.25s ease, box-shadow 0.25s ease',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered
                  ? '0 8px 32px rgba(124,148,255,0.18), 0 0 0 1px rgba(124,148,255,0.12)'
                  : '0 2px 8px rgba(0,0,0,0.3)',
                cursor: 'pointer',
              }}
            >
              {/* ── ORBIT RADIAL HOVER EFFECT ── */}
              {/* Absolutely positioned bigbang centered on the card on hover */}
              <div
                className="bigbang"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 1,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.35s ease',
                }}
              >
                <div
                  className="gravity-spot at-center"
                  style={
                    {
                      '--o-force': '240px',
                    } as React.CSSProperties
                  }
                >
                  {/* Orbit ring 1 — innermost, spins on hover */}
                  <div
                    className="orbit-4"
                    style={{
                      border: '1px solid rgba(124,148,255,0.25)',
                      borderRadius: '50%',
                      animation: isHovered ? 'orbitSpin 6s linear infinite' : 'none',
                    }}
                  >
                    {/* Small satellite dot on ring 1 */}
                    <div
                      className="satellite"
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#7c94ff',
                        boxShadow: '0 0 8px #7c94ff',
                      }}
                    />
                  </div>

                  {/* Orbit ring 2 — counter spin */}
                  <div
                    className="orbit-7"
                    style={{
                      border: '1px solid rgba(124,148,255,0.15)',
                      borderRadius: '50%',
                      animation: isHovered ? 'orbitSpinReverse 9s linear infinite' : 'none',
                    }}
                  >
                    {/* Two satellite dots on ring 2 */}
                    <div
                      className="satellite"
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'rgba(124,148,255,0.8)',
                      }}
                    />
                    <div
                      className="satellite"
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: 'rgba(124,148,255,0.5)',
                      }}
                    />
                  </div>

                  {/* Orbit ring 3 — outermost, slow spin */}
                  <div
                    className="orbit-10"
                    style={{
                      border: '1px dashed rgba(124,148,255,0.1)',
                      borderRadius: '50%',
                      animation: isHovered ? 'orbitSpin 14s linear infinite' : 'none',
                    }}
                  >
                    {/* Three satellite dots evenly spaced */}
                    <div
                      className="satellite"
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'rgba(124,148,255,0.4)',
                      }}
                    />
                    <div
                      className="satellite"
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'rgba(124,148,255,0.4)',
                      }}
                    />
                    <div
                      className="satellite"
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'rgba(124,148,255,0.4)',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* ── CARD CONTENT ── */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                  />
                )}

                <div style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, color: '#e6e9ef' }}>{p.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#7c94ff', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}
                        >
                          GitHub
                        </a>
                      )}
                      {p.demo && (
                        <>
                          <span style={{ color: '#e6e9ef' }}>·</span>
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#7c94ff', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}
                          >
                            Demo
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description slides in on hover */}
                  <p
                    style={{
                      margin: '8px 0 0',
                      color: '#e6e9ef',
                      maxHeight: isHovered ? '200px' : '0',
                      opacity: isHovered ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease, opacity 0.35s ease',
                      fontSize: '13px',
                      lineHeight: 1.5,
                    }}
                  >
                    {p.description}
                  </p>

                  {/* Tech stack — glows on hover */}
                  <p
                    style={{
                      marginTop: '8px',
                      color: isHovered ? '#7c94ff' : '#a6adbb',
                      fontSize: '12px',
                      transition: 'color 0.3s ease',
                      textShadow: isHovered ? '0 0 8px rgba(124,148,255,0.5)' : 'none',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {p.techStack.join(' · ')}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes orbitSpin {
          from { --o-rotate: 0deg; }
          to   { --o-rotate: 360deg; }
        }
        @keyframes orbitSpinReverse {
          from { --o-rotate: 360deg; }
          to   { --o-rotate: 0deg; }
        }
      `}</style>
    </div>
  );
}

export default Projects;
