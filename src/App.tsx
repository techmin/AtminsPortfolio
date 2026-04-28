import React, { useState, useEffect, useRef, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import NeuralProjects from './components/NeuralProjects';
import './styles/global.css';

// ─── scroll‑progress sidebar ─────────────────────────────────────────────────

function ClimbWidget() {
  const [pct, setPct] = useState(0);
  const [vis, setVis] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const onResize = () => setVis(window.innerWidth > 900);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    onScroll(); onResize();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  if (!vis) return null;
  return (
    <div className="climb-widget" title={`${Math.round(pct)}% scrolled`}>
      <div className="climb-percent">{Math.round(pct)}<span style={{ fontSize: 8 }}>%</span></div>
      <div className="climb-track">
        <div className="climb-fill" style={{ height: `${pct}%` }} />
        {/* SVG Climber */}
        <svg
          width="28"
          height="38"
          viewBox="0 0 90 120"
          style={{
            position: 'absolute',
            bottom: `${pct}%`,
            left: '50%',
            transform: 'translate(-50%, 50%)',
            transition: 'bottom 0.1s ease-out',
            zIndex: 10,
            filter: 'drop-shadow(0 0 6px rgba(124,148,255,0.7))',
          }}
        >
          <circle cx="45" cy="20" r="12" fill="#e6e9ef" />
          <circle cx="45" cy="20" r="14" fill="none" stroke="#7c94ff" strokeWidth="1.5" opacity="0.6" />
          <rect x="32" y="32" width="26" height="35" rx="6" fill="#7c94ff" />
          <rect x="43" y="34" width="4" height="31" rx="2" fill="rgba(255,255,255,0.25)" />
          <line x1="45" y1="40" x2="25" y2="10" stroke="#7c94ff" strokeWidth="7" strokeLinecap="round" />
          <line x1="45" y1="46" x2="70" y2="28" stroke="#7c94ff" strokeWidth="7" strokeLinecap="round" />
          <circle cx="25" cy="10" r="5" fill="#e6e9ef" />
          <circle cx="70" cy="28" r="5" fill="#e6e9ef" />
          <line x1="40" y1="67" x2="30" y2="100" stroke="#7c94ff" strokeWidth="7" strokeLinecap="round" />
          <line x1="50" y1="67" x2="60" y2="100" stroke="#7c94ff" strokeWidth="7" strokeLinecap="round" />
          <circle cx="30" cy="100" r="5" fill="#e6e9ef" />
          <circle cx="60" cy="100" r="5" fill="#e6e9ef" />
        </svg>
      </div>
      <div className="climb-label">scroll</div>
    </div>
  );
}

// ─── nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav
      className="site-nav"
      style={{ boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none' }}
    >
      <div className="nav-logo">atmin's Portfolio</div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#freelance">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <a
            href="https://drive.google.com/file/d/1VWEV99CYiDMYtExnoYoircuRWjg7ZHpG/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{ padding: '7px 18px', fontSize: 13 }}
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

// ─── hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-glow" />
      <div className="container">
        <div className="section-label">hello world</div>
        <img
          className="hero-avatar"
          src="https://avatars.githubusercontent.com/u/46662857?type=square&v=4"
          alt="Atmin Sheth"
        />
        <h1 className="hero-name">
          <span className="gradient-text">Atmin Sheth</span>
        </h1>
        <p className="hero-title">AI &amp; Software Engineer</p>
        <p className="hero-bio">
          I build products that make life easier and more meaningful — from intelligent web apps
          to AI‑powered systems. Passionate climber, dancer, and relentless learner.
        </p>
        <div className="hero-links">
          <a href="https://www.linkedin.com/in/atmins/" target="_blank" rel="noreferrer" className="btn btn-primary">
            LinkedIn
          </a>
          <a href="https://github.com/techmin" target="_blank" rel="noreferrer" className="btn btn-ghost">
            GitHub
          </a>
          <a href="https://atminsdanceworld.substack.com" target="_blank" rel="noreferrer" className="btn btn-ghost">
            Dance Blog
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── about ───────────────────────────────────────────────────────────────────

const SKILLS = [
  'Python', 'TypeScript', 'React', 'Node.js', 'FastAPI', 'Flask',
  'PyTorch', 'Hugging Face', 'OpenAI', 'LangChain', 'AWS', 'Docker',
  'PostgreSQL', 'MongoDB', 'Three.js', 'C#', 'R'
];

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-label">about me</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 8 }}>
          Turning ideas into&nbsp;<span className="gradient-text">reality</span>
        </h2>

        <div className="about-grid">
          <div className="glass-card about-card">
            <h3>Who I Am</h3>
            <p>
              I'm a passionate software developer who loves building products that make life easier
              and more meaningful. I enjoy turning ideas into real, impactful solutions — from
              intuitive web apps to efficient AI systems.
            </p>
            <p style={{ marginTop: 12 }}>
              When I'm not coding, you'll find me climbing rocks or dancing to fresh beats — both
              fuel my creativity and problem‑solving mindset.
            </p>
          </div>

          <div className="glass-card about-card">
            <h3>What I'm About</h3>
            <p>
              Always curious, constantly learning. I run a dance blog blending rhythm and
              storytelling, and I'm always open to freelance projects, collaborations, and
              creative partnerships.
            </p>
            <p style={{ marginTop: 12 }}>
              Whether it's tech, design, or storytelling — let's create something that moves
              people, digitally or literally.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <p className="section-label" style={{ marginBottom: 14 }}>tech stack</p>
          <div className="skill-list">
            {SKILLS.map(s => (
              <span key={s} className="tech-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── freelance ────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: '⚡', title: 'Full-Stack Development', desc: 'Modern websites, backend APIs, dashboards, secure systems, and end-to-end web applications.' },
  { icon: '🧠', title: 'AI + LLM Integration', desc: 'Chatbots, workflow automation, embeddings, fine-tuning models, and custom AI features for your business.' },
  { icon: '🎨', title: 'Web & UI Design', desc: 'Clean landing pages, product UI, portfolio websites, and brand-aligned design systems.' },
  { icon: '🏗️', title: 'System Design', desc: 'Scalable architecture, cloud-ready design, and planning your backend & database for future growth.' },
  { icon: '🤖', title: 'Automation', desc: 'AI agents, workflow automation, document processing, and time-saving tools tailored to your needs.' },
  { icon: '💬', title: 'Tech Consultation', desc: 'Helping you plan your MVP, choose tech stacks, and understand how AI can elevate your business.' },
];

function Freelance() {
  return (
    <section id="freelance" className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-label">services</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 8 }}>
          Freelancing&nbsp;<span className="gradient-text">Services</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 0, fontSize: 15 }}>
          I help businesses build modern software and integrate AI‑powered solutions.
        </p>
        <div className="freelance-grid">
          {SERVICES.map(s => (
            <div key={s.title} className="glass-card freelance-card">
              <div className="freelance-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── contact form ─────────────────────────────────────────────────────────────

interface FormState { name: string; email: string; message: string; status: '' | 'sending' | 'success' | 'error'; }

class ContactForm extends Component<{}, FormState> {
  state: FormState = { name: '', email: '', message: '', status: '' };

  change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [e.target.name]: e.target.value } as unknown as FormState);
  };

  submit = async (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ status: 'sending' });
    try {
      const r = await fetch('https://formspree.io/f/xyzlkjvw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.state.name, email: this.state.email, message: this.state.message }),
      });
      if (r.ok) {
        this.setState({ name: '', email: '', message: '', status: 'success' });
      } else {
        this.setState({ status: 'error' } as Pick<FormState, 'status'>);
      }
    } catch { this.setState({ status: 'error' }); }
  };

  render() {
    const { name, email, message, status } = this.state;
    return (
      <section id="contact" className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label">contact</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 8 }}>
            Let's&nbsp;<span className="gradient-text">Connect</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            Open to freelance, collaborations, and creative partnerships.
          </p>

          <div className="contact-wrapper">
            <form onSubmit={this.submit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" type="text" name="name" placeholder="Your Name" value={name} onChange={this.change} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" name="email" placeholder="your@email.com" value={email} onChange={this.change} required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-textarea" name="message" placeholder="What are you working on?" rows={5} value={message} onChange={this.change} required />
              </div>
              <button className="btn btn-primary" type="submit" disabled={status === 'sending'} style={{ width: '100%', justifyContent: 'center' }}>
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
              </button>
              {status === 'success' && <p className="form-status success">Message sent! I'll be in touch soon. 🎉</p>}
              {status === 'error' && <p className="form-status error">Something went wrong — try again.</p>}
            </form>
          </div>
        </div>
      </section>
    );
  }
}

// ─── footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Atmin Sheth</span>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/atmins/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/techmin" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://atmindancesworld.blogspot.com/" target="_blank" rel="noreferrer">Dance Blog</a>
        <a href="https://drive.google.com/file/d/1VWEV99CYiDMYtExnoYoircuRWjg7ZHpG/view?usp=sharing" target="_blank" rel="noreferrer">Resume</a>
      </div>
    </footer>
  );
}

// ─── mouse trail ─────────────────────────────────────────────────────────────

function MouseTrail() {
  const [trail, setTrail] = useState<{ x: number, y: number, id: number }[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setTrail(prev => [...prev, { x: e.clientX, y: e.clientY, id: idCounter++ }].slice(-25));
    };
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setTrail(prev => prev.length > 0 ? prev.slice(1) : prev);
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 9999 }}>
      {trail.map((pt, i) => {
        const opacity = (i + 1) / trail.length;
        return (
          <div
            key={pt.id}
            style={{
              position: 'absolute',
              left: pt.x,
              top: pt.y,
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#7c94ff',
              opacity: opacity * 0.6,
              transform: `translate(-50%, -50%) scale(${opacity * 1.5})`,
              boxShadow: '0 0 8px #7c94ff',
            }}
          />
        );
      })}
    </div>
  );
}

// ─── root app ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <MouseTrail />
      {/* decorative backgrounds */}
      <div className="grid-bg" />
      <div className="noise-overlay" />

      <ClimbWidget />
      <Nav />

      <main style={{ paddingLeft: 80, position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <NeuralProjects />
        <Freelance />
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
