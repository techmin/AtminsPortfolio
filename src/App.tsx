import React from 'react';
import About from './components/About';
import ContactForm from './components/contactForm';
import Projects from './components/Projects';
import ClimbTracker from './components/ClimbTracker';
import Freelancing from '@components/Freelance';
// @ts-ignore: CSS import has no type declarations
import 'bulma/css/bulma.min.css';
 
const prf = './prf.jpg';
function App(): React.ReactElement {
  console.log('App rendering');
  return (

    <div className="container" style={{ minHeight: '100vh', padding: '24px' }}>
       <div className='columns'>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
        <a className="button is-link" href="https://www.linkedin.com/in/atmins/">Linkedin</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px', marginLeft: '10px' }}>
        <a className="button is-link" href="https://atmindancesworld.blogspot.com/">Dance Blog</a>
      </div> 
      </div>
      <header className="section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
          <img 
            src="https://avatars.githubusercontent.com/u/46662857?type=square&v=4"
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
          <div
      
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "16px",
      marginLeft: "50%",
    }}
  >
    <a
      href="https://drive.google.com/file/d/1VWEV99CYiDMYtExnoYoircuRWjg7ZHpG/view?usp=sharing"
      className="button is-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>
  </div>

        <section className="section" style={{ margin: '20px 0' }}>
          <Projects />
        </section>

        <section className="section" style={{ margin: '20px 0' }}>
          <Freelancing />
        </section>
        <section className="section" style={{ margin: '20px 0' }}>
          <ContactForm />
        </section>

      </main>
      
  <div className="columns is-centered">
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "16px",
      marginRight: "10%",
    }}
  >
    <a
      href="https://www.linkedin.com/in/atmins/"
      className="button is-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      LinkedIn
    </a>
  </div>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "16px",
    }}
  >
    <a
      href="https://drive.google.com/file/d/1VWEV99CYiDMYtExnoYoircuRWjg7ZHpG/view?usp=sharing"
      className="button is-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Resume
    </a>
  </div>
    <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "16px",
      marginLeft: "10%",
    }}
  >
    <a
      href="https://github.com/techmin"
      className="button is-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Github
    </a>
  </div>
  <div 
   style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      marginBottom: "16px",
      marginLeft: "10%",
    }}
  >

        <a className="button is-link" href="https://atmindancesworld.blogspot.com/">Dance Blog</a>
      </div> 
</div>

    </div>
  );
}

export default App;


