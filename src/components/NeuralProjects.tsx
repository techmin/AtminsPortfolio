import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sparkles, Float, Line, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import projects from '@data/projects.json';

// ─── types ───────────────────────────────────────────────────────────────────

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  demo?: string;
  image?: string;
};

// ─── colour palette per tech category ────────────────────────────────────────

const TECH_COLORS: Record<string, string> = {
  Python: '#4f8ef7',
  React: '#22d3ee',
  TypeScript: '#8b5cf6',
  'C#': '#f472b6',
  AWS: '#fb923c',
  Flask: '#a3e635',
  OpenAI: '#facc15',
  default: '#6ee7b7',
};

function projectColor(p: Project): string {
  for (const tech of p.techStack) {
    if (TECH_COLORS[tech]) return TECH_COLORS[tech];
  }
  return TECH_COLORS.default;
}

// ─── layout: distribute nodes on a 3-D cylinder / sphere shell ───────────────

function nodePositions(count: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Fibonacci spiral
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;          // -1 .. 1
    const r = Math.sqrt(1 - y * y);
    const th = goldenAngle * i;
    positions.push(new THREE.Vector3(r * Math.cos(th) * 4.5, y * 3.0, r * Math.sin(th) * 4.5));
  }
  return positions;
}

// ─── connection line between two nodes ───────────────────────────────────────

function Connection({
  from, to, opacity
}: { from: THREE.Vector3; to: THREE.Vector3; opacity: number }) {
  return (
    <Line
      points={[[from.x, from.y, from.z], [to.x, to.y, to.z]]}
      color="#4f8ef7"
      transparent
      opacity={opacity * 0.25}
      lineWidth={1}
    />
  );
}

// ─── single project node ──────────────────────────────────────────────────────

function ProjectNode({
  project,
  position,
  onSelect,
  isSelected,
}: {
  project: Project;
  position: THREE.Vector3;
  onSelect: (p: Project | null) => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const color = useMemo(() => projectColor(project), [project]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 1.2 + project.id) * 0.06;
    if (meshRef.current) {
      meshRef.current.scale.setScalar(isSelected ? 1.5 : hovered ? 1.25 : scale);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(isSelected ? 2.2 : hovered ? 1.9 : 1.6 + Math.sin(t + project.id) * 0.15);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        isSelected ? 0.25 : hovered ? 0.18 : 0.1;
    }
  });

  return (
    <group position={[position.x, position.y, position.z]}>
      {/* glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      {/* core sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={e => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={e => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'default'; }}
        onClick={e => { e.stopPropagation(); onSelect(isSelected ? null : project); }}
      >
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 2.5 : hovered ? 1.8 : 0.9}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* label */}
      <Billboard>
        <Text
          position={[0, -0.42, 0]}
          fontSize={0.18}
          color={hovered || isSelected ? '#fff' : '#8892b0'}
          anchorX="center"
          anchorY="top"
          maxWidth={2.4}
          textAlign="center"
          outlineColor="#050810"
          outlineWidth={0.008}
        >
          {project.title}
        </Text>
      </Billboard>
    </group>
  );
}

// ─── animated ambient particles ──────────────────────────────────────────────

function AmbientParticles() {
  return (
    <Sparkles
      count={120}
      scale={12}
      size={1.2}
      speed={0.3}
      opacity={0.18}
      color="#4f8ef7"
    />
  );
}

// ─── scene ───────────────────────────────────────────────────────────────────

function NeuralScene({
  onSelect,
  selectedId,
}: {
  onSelect: (p: Project | null) => void;
  selectedId: number | null;
}) {
  const positions = useMemo(() => nodePositions(projects.length), []);
  const { camera } = useThree();

  // slow auto-rotation of the whole scene group
  const groupRef = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (groupRef.current && selectedId === null) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  // connections: every node to its 2 nearest neighbours
  const connections = useMemo(() => {
    const pairs: [number, number][] = [];
    positions.forEach((a, i) => {
      const dists = positions
        .map((b, j) => ({ j, d: a.distanceTo(b) }))
        .filter(x => x.j !== i)
        .sort((a, b) => a.d - b.d);
      dists.slice(0, 2).forEach(({ j }) => {
        if (!pairs.find(p => (p[0] === j && p[1] === i))) pairs.push([i, j]);
      });
    });
    return pairs;
  }, [positions]);

  return (
    <>
      {/* lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#4f8ef7" intensity={1.5} />
      <pointLight position={[-5, -3, -5]} color="#8b5cf6" intensity={1.2} />
      <pointLight position={[0, -6, 0]} color="#22d3ee" intensity={0.8} />

      <AmbientParticles />

      <group ref={groupRef}>
        {/* connections */}
        {connections.map(([i, j]) => (
          <Connection
            key={`${i}-${j}`}
            from={positions[i]}
            to={positions[j]}
            opacity={selectedId === null ? 1 : (selectedId === projects[i].id || selectedId === projects[j].id) ? 1.5 : 0.3}
          />
        ))}

        {/* nodes */}
        {(projects as Project[]).map((p, i) => (
          <ProjectNode
            key={p.id}
            project={p}
            position={positions[i]}
            onSelect={onSelect}
            isSelected={selectedId === p.id}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom
        enablePan={false}
        autoRotate={false}
        minDistance={5}
        maxDistance={18}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

// ─── project detail overlay ───────────────────────────────────────────────────

function ProjectPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  // close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="project-panel" onClick={onClose}>
      <div className="project-panel-backdrop" />
      <div
        className="project-panel-card"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'panelIn 0.25s ease' }}
      >
        <button className="project-panel-close" onClick={onClose}>×</button>
        {project.image && (
          <img className="project-panel-img" src={project.image} alt={project.title} />
        )}
        <div className="project-panel-body">
          <h3 className="project-panel-title">{project.title}</h3>
          <p className="project-panel-desc">{project.description}</p>
          <div className="project-panel-tags">
            {project.techStack.map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
          <div className="project-panel-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                ↗ GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                ↗ Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes panelIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── exported component ───────────────────────────────────────────────────────

export default function NeuralProjects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  const handleSelect = useCallback((p: Project | null) => setSelected(p), []);

  return (
    <section id="projects" className="neural-section">
      <div className="container">
        <div className="section-label">projects</div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              <span className="gradient-text">Neural Network</span> Visualizer
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 10, marginBottom: 0, fontSize: 15 }}>
              {viewMode === '3d' 
                ? 'Each node is a project. Drag to orbit — click a node to explore.'
                : 'Browse projects in a standard grid view.'}
            </p>
          </div>
          
          <button 
            className="btn btn-ghost"
            onClick={() => setViewMode(v => v === '3d' ? 'grid' : '3d')}
          >
            {viewMode === '3d' ? '⊞ Grid View' : '⟳ 3D View'}
          </button>
        </div>

        {viewMode === '3d' ? (
          <div className="neural-canvas-wrapper">
            <Canvas
              camera={{ position: [0, 0, 11], fov: 60 }}
              style={{ background: 'transparent' }}
              gl={{ antialias: true, alpha: true }}
            >
              <NeuralScene onSelect={handleSelect} selectedId={selected?.id ?? null} />
            </Canvas>
            <div className="neural-hint">drag · zoom · click</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {(projects as Project[]).map(p => (
              <div key={p.id} className="glass-card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                {p.image && (
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: '8px', marginBottom: 16 }} 
                  />
                )}
                <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--text-primary)' }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, flex: 1, lineHeight: 1.6 }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {p.techStack.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }}>
                      ↗ GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12 }}>
                      ↗ Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <ProjectPanel project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
