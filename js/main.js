(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Email (kept out of the HTML source to reduce scraping)
  const user = 'dia.saada', host = 'gmail.com';
  document.querySelectorAll('[data-mail]').forEach(el => {
    el.href = 'mailto:' + user + '@' + host;
    if (el.dataset.mail === 'text') el.textContent = user + '@' + host;
  });

  // Typing prompt
  const el = document.getElementById('typed');
  const lines = [
    'designing wallets, ledgers & payment flows',
    'shipping agentic systems with guardrails',
    'making engineering teams AI-native',
    'security first. always. it\'s fintech.'
  ];
  if (el) {
    if (reduce) { el.textContent = lines[0]; }
    else {
      let li = 0, ci = 0, del = false;
      const tick = () => {
        const s = lines[li];
        el.textContent = s.slice(0, ci);
        if (!del && ci < s.length) { ci++; setTimeout(tick, 38); }
        else if (!del) { del = true; setTimeout(tick, 1800); }
        else if (ci > 0) { ci--; setTimeout(tick, 16); }
        else { del = false; li = (li + 1) % lines.length; setTimeout(tick, 300); }
      };
      tick();
    }
  }

  // Reveal on scroll
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' }) : null;
  document.querySelectorAll('.reveal').forEach(n => io ? io.observe(n) : n.classList.add('in'));

  // Active nav link
  const links = [...document.querySelectorAll('.nav ul a')];
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.remove('active'));
          map.get(e.target.id)?.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(s => spy.observe(s));
  }

  // Card glow follows cursor
  document.querySelectorAll('.card').forEach(c => {
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Years of experience (since Nov 2012)
  const y = document.getElementById('yrs');
  if (y) y.textContent = Math.floor((Date.now() - new Date(2012, 10, 1)) / 31557600000) + '+';
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
