import React from 'react';
import About from './components/About';

import Projects from './components/Projects';
import ClimbTracker from './components/ClimbTracker';
import ContactForm from './components/contactForm';

const prf = './prf.jpg';
function App(): React.ReactElement {
  console.log('App rendering');
  return (
    
    <div className="container" style={{ minHeight: '100vh', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
        <a href="https://www.linkedin.com/in/atmins/">Linkedin</a>
      </div>  
      <header className="section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
          <img 
            src={prf}
            alt="Asta Staria" 
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(255,255,255,0.1)'
            }}
          />
          <div>
            <h1 className="title" style={{ color: '#e6e9ef', fontSize: '28px', fontWeight: 700, margin: '0 0 8px' }}>
              Atmin Sheth
            </h1>
            <p className="subtitle" style={{ color: '#a6adbb', margin: 0 }}>
              AI & Software Engineer
            </p>
          </div>
        </div>
      </header>

      <main>
        <ClimbTracker />
        <section className="section" style={{ margin: '40px 0' }}>
          <About />
        </section>

        <section className="section" style={{ margin: '40px 0' }}>
          <Projects />
        </section>
        <section className="section" style={{ margin: '40px 0' }}>
          <ContactForm />
        </section>
      </main>
  
      <div className='container'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
        <a href="https://www.linkedin.com/in/atmins/">Linkedin</a>
      </div>
       <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
        <a href="https://drive.google.com/file/d/1gOD0PeRg6fAh_VOtontmFF6p1SHilZsG/view?usp=sharing">Resume</a>
      </div>
    </div>
    </div>
  );
}

export default App;


