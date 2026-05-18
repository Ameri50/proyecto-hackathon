/* ── THEME ── */
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
function setTheme(t) { root.setAttribute('data-theme', t); localStorage.setItem('theme', t); }
setTheme(localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

/* ── SCROLL PROGRESS ── */
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
}

/* ── NAV PILL hover ── */
const mainNav  = document.getElementById('main-nav');
const pill     = document.getElementById('nav-pill');
const navLinks = document.querySelectorAll('.nav-links a');
const linkList = document.getElementById('nav-links');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const r  = link.getBoundingClientRect();
    const lr = linkList.getBoundingClientRect();
    pill.style.opacity = '1';
    pill.style.left    = (r.left - lr.left) + 'px';
    pill.style.width   = r.width + 'px';
  });
});
linkList.addEventListener('mouseleave', () => { pill.style.opacity = '0'; });

/* ── SCROLL: progress + shrink + active section ── */
const sections = ['hero','desafios','premios','criterios','bases','registro'];

function onScroll() {
  updateProgress();
  mainNav.classList.toggle('scrolled', window.scrollY > 20);
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 90) current = id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── HAMBURGER ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const hamIcon    = document.getElementById('ham-icon');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamIcon.innerHTML = open
    ? `<line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/>`
    : `<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>`;
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamIcon.innerHTML = `<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>`;
}));

/* ── SEARCH ── */
const searchToggle  = document.getElementById('search-toggle');
const searchBox     = document.getElementById('search-box');
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

const pages = [
  { label: 'Inicio', href: '#hero', color: '#7c6af7' },
  { label: 'Desafíos', href: '#desafios', color: '#60a5fa' },
  { label: 'Asistente Virtual Académico', href: '#desafios', color: '#60a5fa' },
  { label: 'Detección Temprana de Riesgo', href: '#desafios', color: '#fb7185' },
  { label: 'Tutor Virtual 24/7', href: '#desafios', color: '#a78bfa' },
  { label: 'Agente Motivacional', href: '#desafios', color: '#f472b6' },
  { label: 'Mentoría Inteligente', href: '#desafios', color: '#34d399' },
  { label: 'Optimización Académica', href: '#desafios', color: '#22d3ee' },
  { label: 'Premios', href: '#premios', color: '#fbbf24' },
  { label: 'Criterios de Evaluación', href: '#criterios', color: '#94a3b8' },
  { label: 'Bases del Hackathon', href: '#bases', color: '#60a5fa' },
  { label: 'Formulario de Registro', href: '#registro', color: '#a78bfa' },
];

searchToggle.addEventListener('click', e => {
  e.stopPropagation();
  searchBox.classList.toggle('open');
  if (searchBox.classList.contains('open')) searchInput.focus();
});
document.addEventListener('click', e => {
  if (!searchBox.contains(e.target) && e.target !== searchToggle) searchBox.classList.remove('open');
});
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.innerHTML = '<p class="search-hint">Escribe para buscar...</p>'; return; }
  const matches = pages.filter(p => p.label.toLowerCase().includes(q));
  if (!matches.length) { searchResults.innerHTML = '<p class="search-hint">Sin resultados</p>'; return; }
  searchResults.innerHTML = matches.map(m =>
    `<a class="search-result-item" href="${m.href}">
       <span class="search-result-dot" style="background:${m.color}"></span>${m.label}
     </a>`
  ).join('');
  searchResults.querySelectorAll('a').forEach(a => a.addEventListener('click', () => searchBox.classList.remove('open')));
});

/* ── COUNTDOWN ── */
const target = new Date('2025-11-01T08:00:00');
function updateCountdown() {
  const diff = target - new Date();
  if (diff <= 0) {
    ['days','hours','mins','secs'].forEach(u => document.getElementById('cd-'+u).textContent = '00');
    return;
  }
  document.getElementById('cd-days').textContent  = String(Math.floor(diff/86400000)).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(Math.floor((diff%86400000)/3600000)).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);
