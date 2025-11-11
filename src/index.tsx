import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

console.log('Index.tsx loaded');

const container = document.getElementById('root');
if (!container) {
  console.error('Root container not found');
  throw new Error('Root container not found');
}
console.log('Root container found:', container);

const root = createRoot(container);
console.log('Creating root and rendering App');
root.render(<App />);


