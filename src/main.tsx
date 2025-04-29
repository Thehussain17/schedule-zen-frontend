
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/calendar.css';
import { CalendarProvider } from './context/CalendarContext.tsx';

createRoot(document.getElementById("root")!).render(
  <CalendarProvider>
    <App />
  </CalendarProvider>
);
