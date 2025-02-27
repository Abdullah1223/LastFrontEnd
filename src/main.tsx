import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import { SocketProvider } from './context/SocketContext.tsx';

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <SocketProvider>
      <App />
      </SocketProvider>
    </ThemeProvider>
  
);