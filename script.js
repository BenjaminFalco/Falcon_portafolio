(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Año en footer
  const yEl = $('#y');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // Print rápido
  $('#printBtn')?.addEventListener('click', () => window.print());

  // Modo claro/oscuro (persistente)
  const KEY = 'cv-theme';
  const btn = $('#themeBtn');

  const applyTheme = (isDark) => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    // Fondo friki solo en modo oscuro
    document.body.classList.toggle('friki-bg', !!isDark);
    // Garantiza que el scroll vertical esté habilitado
    document.documentElement.style.overflowY = '';
    document.body.style.overflowY = '';
  };

  const stored = localStorage.getItem(KEY);
  const initialDark = stored ? (stored === 'dark') : prefersDark;
  applyTheme(initialDark);

  btn?.addEventListener('click', () => {
    const now = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(KEY, now);
    applyTheme(now === 'dark');
  });

  // Estilos dinámicos para el fondo friki (sin overflow:hidden)
  if (!$('#friki-style')) {
    const style = document.createElement('style');
    style.id = 'friki-style';
    style.textContent = `
    .friki-bg {
      background: linear-gradient(-45deg, #0b0e14, #1a2235, #0d1320, #111624);
      background-size: 400% 400%;
      position: relative;
      /* overflow: hidden;  <-- eliminado para no matar el scroll */
      overflow-x: hidden;   /* opcional: evita scroll horizontal */
      will-change: background-position;
      animation: gradientMove 22s ease-in-out infinite;
    }
    .friki-bg::before {
      content: "";
      position: fixed;
      inset: 0;
      background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 40px 40px;
      animation: moveDots 14s linear infinite;
      pointer-events: none;
      z-index: -1;
    }
    .friki-bg::after {
      content: "";
      position: fixed;
      inset: 0;
      background-image:
        radial-gradient(rgba(255,255,255,0.08) 2px, transparent 2px),
        radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 80px 80px, 120px 120px;
      animation: floatStars 60s linear infinite;
      pointer-events: none;
      z-index: -1;
    }
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes moveDots {
      from { background-position: 0 0; }
      to   { background-position: 40px 40px; }
    }
    @keyframes floatStars {
      from { background-position: 0 0, 0 0; }
      to   { background-position: 1000px 1000px, -1000px -1000px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .friki-bg, .friki-bg::before, .friki-bg::after {
        animation: none !important;
      }
    }
    `;
    document.head.appendChild(style);
  }
})();
