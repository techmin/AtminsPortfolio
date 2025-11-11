import React from 'react';

const aboutText = `I'm Atmin Sheth, a passionate software developer who loves building products that make life easier and more meaningful. I enjoy turning ideas into real, impactful solutions — from intuitive web apps to efficient systems that help people live better every day. Always curious, I’m constantly learning new technologies and sharing my knowledge and collaborations.

When I’m not coding, you’ll probably find me climbing rocks or dancing to fresh beats — both fuel my creativity and problem-solving mindset. I also run a dance blog, where I blend rhythm and storytelling to inspire others to express themselves through movement.

I’m always open to freelance projects, collaborations, and creative partnerships — whether it’s tech, design, or storytelling. Let’s create something that moves people — digitally or literally.`;

function About(): React.ReactElement {
  console.log('About component rendering');
  return (
    <div 
      style={{ 
        background: '#151923', 
        border: '1px solid rgba(255,255,255,0.06)', 
        borderRadius: '12px', 
        padding: '24px',
        color: '#e6e9ef'
      }}
    >
      <h2 style={{ margin: '0 0 12px', color: '#e6e9ef' }}>
        About Me
      </h2>
      <p style={{ lineHeight: 1.6, color: '#e6e9ef', whiteSpace: 'pre-wrap' }}>
        {aboutText.split('\n').map((line, idx) => (
          <span key={idx} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

export default About;


