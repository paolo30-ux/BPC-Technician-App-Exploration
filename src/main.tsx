import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Order matters: Bootstrap reboot/utilities → BPC tokens → global overrides.
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/tokens.css';
import '@/styles/global.css';
import { App } from '@/App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
