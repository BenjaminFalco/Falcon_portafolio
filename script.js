// Año en footer
document.getElementById('y').textContent = new Date().getFullYear();

// Print rápido
document.getElementById('printBtn')?.addEventListener('click', () => window.print());

// Modo claro/oscuro (persistente)
const KEY = 'cv-theme';
const btn = document.getElementById('themeBtn');
const setTheme = (dark) => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; };

const stored = localStorage.getItem(KEY);
if (stored) setTheme(stored === 'dark');

btn?.addEventListener('click', () => {
  const now = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(KEY, now);
  setTheme(now === 'dark');
});
