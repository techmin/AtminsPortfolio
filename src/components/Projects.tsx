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
  console.log('Projects component rendering', projects);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div>
      <h2 style={{ margin: 0, marginBottom: 12,fontFamily:'fantasy',fontSize:'90px', color: '#1114c7b3' }}>Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {(projects as Project[]).map((p) => (
          <article 
            key={p.id}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              background: '#151923',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              overflow: 'hidden',
              color: '#e6e9ef',
              transition: 'transform 0.2s ease',
              cursor: 'pointer'
            }}
          >
            {p.image && <img src={p.image} alt={p.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} />}
            <div style={{ padding: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, color: '#e6e9ef' }}>{p.title}</h3>
                <div>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" style={{ color: '#7c94ff', textDecoration: 'none', fontWeight: 600 }}>GitHub</a>
                  )}
                  {p.demo && (
                    <span style={{ margin: '0 6px', color: '#e6e9ef' }}>·</span>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noreferrer" style={{ color: '#7c94ff', textDecoration: 'none', fontWeight: 600 }}>Demo</a>
                  )}
                </div>
              </div>
              <p style={{ 
                margin: '8px 0 0', 
                color: '#e6e9ef',
                maxHeight: hoveredId === p.id ? '200px' : '0',
                opacity: hoveredId === p.id ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease',
                marginTop: hoveredId === p.id ? '8px' : '0'
              }}>{p.description}</p>
              <p style={{ marginTop: '8px', color: '#a6adbb', fontSize: '14px' }}>{p.techStack.join(' • ')}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Projects;


