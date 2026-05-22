var { useState, useEffect, useRef, useMemo } = React;
var __IMG = (window.CONTENT && window.CONTENT.images) || {};
function img(k){ return (__IMG[k] != null) ? __IMG[k] : k; }

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "neon",
  "displayFont": "italiana",
  "tagline": "relaxation for the mind, body & soul",
  "swayIntensity": 7,
  "showGrain": true,
  "showRotatedMargin": true,
  "headline": "THE PALMS",
  "heroLayout": "default",
  "navMode": "left-rail"
}/*EDITMODE-END*/;

const PALETTES = {
  neon:     { bg: '#05060a', ink: '#f5ecd9', orange: '#ff8a1f', blue: '#1f6dff', gold: '#e8b87a', deep: '#0a0c14' },
  ember:    { bg: '#0a0807', ink: '#f5ecd9', orange: '#d94a1a', blue: '#3a5fcc', gold: '#e8b87a', deep: '#1a0e08' },
  obsidian: { bg: '#08080a', ink: '#f0ead6', orange: '#d4af37', blue: '#2d4a8a', gold: '#caa55a', deep: '#15140f' },
  midnight: { bg: '#020410', ink: '#e8eef8', orange: '#ffb86b', blue: '#3d8eff', gold: '#9ec5ff', deep: '#050a1c' },
};

const FONTS = {
  italiana: '"Italiana", serif',
  cormorant: '"Cormorant Garamond", serif',
  playfair: '"Playfair Display", serif',
  bodoni: '"Bodoni Moda", serif',
};

const PHOTOS = [
  { src: img('feature1'),    label: 'Stairway',  cap: 'Stairway to happiness' },
  { src: img('feature2'),       label: 'Oasis',     cap: 'The amber oasis' },
  { src: img('feature3'), label: 'Corridor',  cap: 'Cobalt corridor' },
  { src: img('feature4'),   label: 'Blue Room', cap: 'The blue room' },
];

// ============================================================
// TOPBAR — extracted so it sits OVER the hero slider, not inside it
// ============================================================
function TopBar({ onReserve }) {
  return (
    <header className="topbar">
      <div className="topbar-mark">
        <span className="mark-dot" />
        <span className="mark-text">VILA OLÍMPIA &nbsp;·&nbsp; SÃO PAULO &nbsp;·&nbsp; DESDE 2008</span>
      </div>
      <nav className="topbar-nav">
        <a href="massagens.html">Rituais</a>
        <a href="massagistas.html">Massagistas</a>
        <a href="#galeria">A Casa</a>
        <a href="#faq">FAQ</a>
        <a href="#visite">Visite</a>
        <button type="button" className="topbar-cta" onClick={onReserve}>
          <span>RESERVAR</span>
          <span className="topbar-cta-arrow">→</span>
        </button>
      </nav>
      <div className="topbar-meta">
        <span>S 23°33′</span>
        <span className="meta-sep">·</span>
        <span>W 46°38′</span>
      </div>
    </header>
  );
}

// ============================================================
// HERO — v2: two-column product hero (Nov 2025 redesign)
// Left: eyebrow chip → headline → subhead → CTAs → trust chips
// Right: featured-ritual card with Buddha relief + palm silhouettes
// ============================================================
function Hero({ tweaks, onReserve }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  const sway = tweaks.swayIntensity;

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const r = heroRef.current?.getBoundingClientRect();
      if (!r) return;
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero hero-v2"
      data-screen-label="01 Hero"
      data-hero-layout={tweaks.heroLayout || 'default'}
      style={{
        '--bg': palette.bg,
        '--ink': palette.ink,
        '--orange': palette.orange,
        '--blue': palette.blue,
        '--gold': palette.gold,
        '--deep': palette.deep,
        '--sway': sway,
      }}
    >
      {/* Solid black backdrop */}
      <div className="hero-bg hero-bg-solid">
        <div className="hero-bg-veil" />
      </div>

      {/* Topbar moved out of hero — UnifiedNav now lives at App root */}

      {/* Tropical palm illustration — frames the hero with sunset palms */}
      <div className="hv2-illust" aria-hidden="true">
        <img src={img('hero')} alt="" loading="eager" />
      </div>

      {/* Animated birds — react to mouse + scroll, plus continuous flight loop */}
      <svg className="hv2-bird hv2-bird-1" viewBox="0 0 40 20" aria-hidden="true"
        style={{
          transform: `translate(${mouse.x * 30 + scrollY * -0.15}px, ${mouse.y * 18 + scrollY * 0.08}px)`,
        }}>
        <path d="M2 12 Q 10 2 20 10 Q 30 2 38 12" stroke="#c47428" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="hv2-bird hv2-bird-2" viewBox="0 0 40 20" aria-hidden="true"
        style={{
          transform: `translate(${mouse.x * -22 + scrollY * 0.18}px, ${mouse.y * 12 + scrollY * -0.06}px)`,
        }}>
        <path d="M2 11 Q 10 3 20 9 Q 30 3 38 11" stroke="#b86420" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="hv2-bird hv2-bird-3" viewBox="0 0 40 20" aria-hidden="true"
        style={{
          transform: `translate(${mouse.x * 18 + scrollY * -0.22}px, ${mouse.y * -14 + scrollY * 0.12}px)`,
        }}>
        <path d="M2 13 Q 10 5 20 11 Q 30 5 38 13" stroke="#a85818" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>

      <div className="hv2-illust-vignette" aria-hidden="true" />

      {/* Two-column stage */}
      <div className="hv2-stage">

        {/* LEFT — copy + CTAs */}
        <div className="hv2-left">
          <div className="hv2-eyebrow">
            <svg className="hv2-eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 12c4-4 14-4 18 0M5 12c3.3-3 10.7-3 14 0M7 12c2.6-2 7.4-2 10 0" strokeLinecap="round" />
              <circle cx="12" cy="12" r="1.4" fill="currentColor" />
            </svg>
            <span>SANTUÁRIO PRIVATIVO · VILA OLÍMPIA</span>
          </div>

          <h1 className="hv2-headline">
            Entre em <span className="hv2-amber" style={{ fontFamily: FONTS.italiana }}>The Palms</span>
            <br />
            e deixe o ruído
            <br />
            para trás.
          </h1>

          <p className="hv2-sub">
            Um oásis urbano para os sentidos. Casa de massagem em Vila Olímpia, São Paulo,
            desde 2008 — esculpida por palmeiras, luz âmbar e rituais conduzidos com presença
            absoluta. Discrição como parte do toque.
          </p>

          <div className="hv2-ctas">
            <a
              href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent('Olá, gostaria de reservar um ritual em The Palms.')}`}
              target="_blank"
              rel="noopener"
              className="hv2-cta-primary"
            >
              <span>Reservar pelo WhatsApp</span>
              <span className="hv2-cta-arrow">→</span>
            </a>
            <a href="#rituais" className="hv2-cta-ghost">
              <span>Ver Rituais</span>
            </a>
          </div>

          <div className="hv2-chips">
            <div className="hv2-chip">
              <svg className="hv2-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" strokeLinejoin="round" />
              </svg>
              <span>Privativo & discreto</span>
            </div>
            <div className="hv2-chip">
              <svg className="hv2-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22V8M12 8c-2-3-5-4-8-3 1 4 4 7 8 7zM12 8c2-3 5-4 8-3-1 4-4 7-8 7z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              <span>Atmosfera de palmeiras</span>
            </div>
            <div className="hv2-chip">
              <svg className="hv2-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
              </svg>
              <span>Reserva simples</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Buddha column with warm glow */}
        <div
          className="hv2-buddha-col"
          style={{
            transform: `translate(${mouse.x * 8}px, ${mouse.y * 6}px)`,
          }}
        >
          {/* Floating mood chip */}
          <div className="hv2-mood">
            <svg className="hv2-mood-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 8c3-2 6-2 9 0s6 2 9 0M3 14c3-2 6-2 9 0s6 2 9 0" strokeLinecap="round" />
            </svg>
            <div className="hv2-mood-text">
              <span className="hv2-mood-label">Atmosfera</span>
              <span className="hv2-mood-value">Calma. Quente. Sagrada.</span>
            </div>
          </div>

          {/* Buddha figure with warm glow */}
          <div className="hv2-buddha-stage">
            <div className="hv2-buddha-glow" />
            <div className="hv2-buddha-img">
              <img src={img('guardian')} alt="Estátua guardiã — atmosfera meditativa de The Palms" />
            </div>
            <div className="hv2-buddha-rays" aria-hidden="true">
              <svg viewBox="0 0 200 200" fill="none">
                {Array.from({ length: 16 }).map((_, i) => {
                  const a = (i / 16) * Math.PI * 2;
                  const x1 = 100 + Math.cos(a) * 50;
                  const y1 = 100 + Math.sin(a) * 50;
                  const x2 = 100 + Math.cos(a) * 95;
                  const y2 = 100 + Math.sin(a) * 95;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(217, 119, 53, 0.22)" strokeWidth="0.6" strokeLinecap="round" />;
                })}
              </svg>
            </div>
          </div>

          {/* Featured ritual caption beneath */}
          <div className="hv2-buddha-caption">
            <span className="hv2-feature-eye">RITUAL ASSINATURA</span>
            <h3 className="hv2-feature-title" style={{ fontFamily: FONTS.italiana }}>Ritual Sensorial</h3>
            <p className="hv2-feature-sub">A travessia clássica da casa. Toques lentos de corpo inteiro, óleos aquecidos, respiração guiada — desde 2008.</p>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <div className="cue-line" />
        <span>RESPIRE</span>
      </div>

      {tweaks.showGrain && <div className="grain" aria-hidden />}
      <div className="vignette" aria-hidden />
    </section>
  );
}

function Stat({ n, label, suffix, sublabel }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => e.isIntersecting && setShown(true));
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!shown) return;
    const target = parseInt(n, 10);
    let raf; const start = performance.now(); const dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, n]);
  return (
    <div ref={ref} className="stat">
      <span className="stat-n">{String(val).padStart(2, '0')}{suffix || ''}</span>
      <span className="stat-label">{label}</span>
      {sublabel && <span className="stat-sublabel">{sublabel}</span>}
    </div>
  );
}

// ============================================================
// GALLERY — magazine-style asymmetric photo grid
// ============================================================
function Gallery({ tweaks }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  return (
    <section
      id="galeria"
      className="gallery"
      data-screen-label="02 Gallery"
      style={{
        '--bg': palette.bg, '--ink': palette.ink,
        '--orange': palette.orange, '--blue': palette.blue,
        '--gold': palette.gold, '--deep': palette.deep,
      }}
    >
      <div className="gal-head">
        <span className="gal-eye">A CASA · GALERIA</span>
        <h2 className="gal-title" style={{ fontFamily: FONTS.italiana }}>
          Duas temperaturas.
          <br />
          <em style={{ fontFamily: FONTS.cormorant, fontWeight: 400 }}>Uma hora inesquecível.</em>
        </h2>
      </div>

      <div className="gal-grid">
        <div className="gal-cell tall" style={{ backgroundImage: `url(${img('gallery1')})` }}>
          <div className="cell-tag amber">01 · ESCADARIA</div>
        </div>
        <div className="gal-cell wide" style={{ backgroundImage: `url(${img('gallery2')})` }}>
          <div className="cell-tag amber">02 · O OÁSIS</div>
        </div>
        <div className="gal-cell" style={{ backgroundImage: `url(${img('gallery3')})` }}>
          <div className="cell-tag amber">03 · PISCINA</div>
        </div>
        <div className="gal-cell" style={{ backgroundImage: `url(${img('gallery4')})` }}>
          <div className="cell-tag blue">04 · SALA AZUL</div>
        </div>
        <div className="gal-cell tall" style={{ backgroundImage: `url(${img('gallery5')})` }}>
          <div className="cell-tag amber">05 · GUARDIÃO</div>
        </div>
        <div className="gal-cell" style={{ backgroundImage: `url(${img('gallery6')})` }}>
          <div className="cell-tag blue">06 · CORREDOR COBALTO</div>
        </div>
        <div className="gal-cell" style={{ backgroundImage: `url(${img('gallery7')})` }}>
          <div className="cell-tag amber">07 · PÁTIO</div>
        </div>
        <div className="gal-cell wide" style={{ backgroundImage: `url(${img('gallery8')})` }}>
          <div className="cell-tag amber">08 · PASSAGEM DE BAMBU</div>
        </div>
        <a href="https://www.instagram.com/the_palms_sao_paulo/" target="_blank" rel="noopener" className="gal-cell ig-cell">
          <div className="ig-inner">
            <svg className="ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
            <span className="ig-handle" style={{ fontFamily: FONTS.italiana }}>@the_palms_sao_paulo</span>
            <span className="ig-cta">SIGA NO INSTAGRAM →</span>
          </div>
        </a>
      </div>
    </section>
  );
}

// ============================================================
// HERO SLIDER — auto-rotates between poster hero and SEO hero
// SEO hero is FIRST in DOM (Google reads it first); CSS `order`
// keeps the poster visually first. Stacked crossfade + parallax,
// arrows for manual control, dots for progress.
// ============================================================
function HeroSlider({ tweaks, onReserve }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const slides = 2;
  // idx 0 = poster (longer brand moment), idx 1 = SEO hero (shorter)
  const DURATIONS = [14000, 7000];
  const labels = ['Capa', 'Apresentação'];

  const go = (next) => {
    setDirection(next > idx || (idx === slides - 1 && next === 0) ? 1 : -1);
    setIdx(next);
  };
  const advance = (delta) => {
    const next = (idx + delta + slides) % slides;
    setDirection(delta > 0 ? 1 : -1);
    setIdx(next);
  };

  React.useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setDirection(1);
      setIdx((i) => (i + 1) % slides);
    }, DURATIONS[idx]);
    return () => clearTimeout(t);
  }, [idx, paused]);

  return (
    <div
      className="hero-slider"
      data-screen-label="01 Hero Slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ '--slide-idx': idx, '--slide-dir': direction }}
    >
      <div className="hs-topbar"></div>

      <div className="hs-stage">
        {/* SEO hero FIRST in DOM (Google reads this first) */}
        <div
          className={`hs-slide hs-slide--seo ${idx === 1 ? 'is-active' : 'is-inactive'} ${direction === 1 ? 'dir-fwd' : 'dir-back'}`}
          aria-hidden={idx !== 1}
        >
          <SEOHero tweaks={tweaks} onReserve={onReserve} />
        </div>
        <div
          className={`hs-slide hs-slide--poster ${idx === 0 ? 'is-active' : 'is-inactive'} ${direction === 1 ? 'dir-fwd' : 'dir-back'}`}
          aria-hidden={idx !== 0}
        >
          <Hero tweaks={tweaks} onReserve={onReserve} />
        </div>
      </div>

      <button
        type="button"
        className="hs-arrow hs-arrow--prev"
        aria-label="Slide anterior"
        onClick={() => advance(-1)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
          <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className="hs-arrow hs-arrow--next"
        aria-label="Próximo slide"
        onClick={() => advance(1)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
          <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="hs-dots" role="tablist" aria-label="Hero slides">
        {[...Array(slides)].map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={idx === i}
            aria-label={labels[i]}
            className={`hs-dot ${idx === i ? 'on' : ''}`}
            onClick={() => go(i)}
          >
            <span
              className="hs-dot-fill"
              key={`${idx}-${paused}`}
              style={{
                animationDuration: `${DURATIONS[idx]}ms`,
                animationPlayState: idx === i && !paused ? 'running' : 'paused',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SEO HERO — keyword-rich H1 + lead + stats
// Sits right under the poster hero. Brand stays poster, Google gets the words.
// ============================================================
function SEOHero({ tweaks, onReserve }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  return (
    <section
      className="seo-hero"
      data-screen-label="01b SEO Hero"
      style={{ '--bg': palette.deep, '--ink': palette.ink, '--orange': palette.orange, '--blue': palette.blue, '--gold': palette.gold }}
    >
      <div className="seo-grain" aria-hidden />
      {/* Decorative palms — same orange/black poster atmosphere as slide 1 */}
      <div className="seo-palms" aria-hidden>
        <div className="seo-palm-l">
          <Palm side="left" count={22} length={520} color={palette.orange} sway={tweaks.swayIntensity * 0.6} />
        </div>
        <div className="seo-palm-r">
          <Palm side="left" count={22} length={520} color={palette.orange} sway={tweaks.swayIntensity * 0.6} />
        </div>
      </div>
      <div className="seo-inner">
        <div className="seo-text">
        <span className="seo-eye">VILA OLÍMPIA · SÃO PAULO · DESDE 2008</span>
        <h1 className="seo-h1" style={{ fontFamily: FONTS.italiana }}>
          Um oásis urbano
          <br />
          <em style={{ fontFamily: FONTS.cormorant, fontWeight: 400 }}>para os sentidos.</em>
        </h1>
        <p className="seo-lead" style={{ fontFamily: FONTS.cormorant }}>
          <em>
            Há mais de 17 anos na Vila Olímpia, conduzimos rituais sensoriais que devolvem o corpo a si
            mesmo. Próximos à Faria Lima e ao JK Iguatemi, em uma das ruas mais reservadas do bairro.
          </em>
        </p>
        <div className="seo-cta">
          <button className="cta-primary" onClick={onReserve}>
            <span className="cta-label">RESERVAR RITUAL</span>
            <span className="cta-arrow">→</span>
          </button>
          <a
            href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent('Olá! Gostaria de informações sobre os rituais em The Palms.')}`}
            target="_blank"
            rel="noopener"
            className="cta-ghost"
          >
            <span>WhatsApp · {WA_DISPLAY}</span>
          </a>
        </div>

        <div className="seo-stats">
          <div className="seo-stat">
            <span className="seos-n" style={{ fontFamily: FONTS.italiana }}>17<sup>+</sup></span>
            <span className="seos-l">ANOS</span>
            <span className="seos-s">na Vila Olímpia</span>
          </div>
          <div className="seo-stat">
            <span className="seos-n" style={{ fontFamily: FONTS.italiana }}>12</span>
            <span className="seos-l">TERAPEUTAS</span>
            <span className="seos-s">formadas em massoterapia</span>
          </div>
          <div className="seo-stat">
            <span className="seos-n" style={{ fontFamily: FONTS.italiana }}>6</span>
            <span className="seos-l">RITUAIS</span>
            <span className="seos-s">consulte valores</span>
          </div>
        </div>
        </div>

        {/* Brand seal — TP monogram + circular decals (moved from poster) */}
        <aside className="seo-brand" aria-hidden>
          <div className="seo-brand-mark" style={{ fontFamily: FONTS.italiana }}>T<span className="seo-brand-amp">·</span>P</div>
          <div className="seo-brand-rule" />
          <div className="seo-brand-name">THE PALMS</div>
          <div className="seo-brand-meta">
            <span>CASA DE MASSAGENS</span>
            <span className="seo-brand-dot">·</span>
            <span>VILA OLÍMPIA</span>
            <span className="seo-brand-dot">·</span>
            <span>DESDE 2008</span>
          </div>

          <div className="seo-brand-seal">
            <svg viewBox="0 0 200 200" className="seo-brand-seal-svg" aria-hidden>
              <defs>
                <path id="seo-seal-circle" d="M 100,100 m -76,0 a 76,76 0 1,1 152,0 a 76,76 0 1,1 -152,0" />
              </defs>
              <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
              <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
              <text className="seo-brand-seal-text" fill="currentColor">
                <textPath href="#seo-seal-circle" startOffset="0">
                  THE PALMS · SÃO PAULO · EST. MMVIII · VILA OLÍMPIA · 
                </textPath>
              </text>
              <g transform="translate(100 100)" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.95">
                <line x1="0" y1="-30" x2="0" y2="20" />
                {[-60, -35, -10, 10, 35, 60, -75, 75].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const len = 26 + (i % 3) * 4;
                  const x2 = Math.sin(rad) * len;
                  const y2 = -Math.cos(rad) * len - 8;
                  return <line key={i} x1="0" y1="-12" x2={x2} y2={y2} />;
                })}
                <circle cx="0" cy="22" r="3" fill="currentColor" />
              </g>
              <text x="100" y="180" textAnchor="middle" className="seo-brand-seal-no" fill="currentColor">№ 01</text>
            </svg>
          </div>

          <div className="seo-brand-foot">
            <span className="seo-brand-foot-label">VOL.</span>
            <span className="seo-brand-foot-num" style={{ fontFamily: FONTS.italiana }}>I</span>
            <span className="seo-brand-foot-label">MMXXVI</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

// ============================================================
// MARQUEE
// ============================================================
function Marquee({ tweaks }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  const items = ['INSPIRE', '◆', 'EXPIRE', '◆', 'SILÊNCIO', '◆', 'CÍTRICOS & FUMAÇA', '◆', 'MÃOS LENTAS', '◆', 'PEDRA QUENTE', '◆'];
  return (
    <div className="marquee" style={{ '--ink': palette.ink, '--bg': palette.bg, '--orange': palette.orange, '--blue': palette.blue }}>
      <div className="marquee-track">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="marquee-item" style={{ fontFamily: FONTS.italiana }}>{it}</span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// RITUALS
// ============================================================
const WA_PHONE = '5511924784150';
const WA_DISPLAY = '+55 11 92478-4150';
const PHONE = '551130440366';
const PHONE_DISPLAY = '+55 11 3044-0366';
const ADDRESS_LINE = 'Rua Gomes de Carvalho, 416';
const ADDRESS_AREA = 'Vila Olímpia · São Paulo';
const MAPS_URL = 'https://share.google/To2l7MFaWY0VfpO18';
const IG_URL = 'https://www.instagram.com/the_palms_sao_paulo/';

const RITUALS = [
  { id: 'I',   name: 'Ritual Sensorial',  slug: 'sensorial',      time: '60 · 90 · 120 min', price: 'Consulte valores',  note: 'A travessia clássica da casa. Toques lentos de corpo inteiro, óleos aquecidos, respiração guiada. Nossa massagem mais reservada desde 2008.',                  tag: 'RITUAL ASSINATURA' },
  { id: 'II',  name: 'Quatro Mãos',       slug: 'quatro-maos',    time: '90 · 120 min',      price: 'Consulte valores',  note: 'Duas terapeutas, ritmos sincronizados. Toques que se cruzam, se respondem, dissolvem a noção de onde uma mão termina e a outra começa.',                       tag: 'EXPERIÊNCIA AMPLIADA' },
  { id: 'III', name: 'Ritual do Casal',   slug: 'casal',          time: '90 · 120 min',      price: 'Consulte valores', note: 'Massagem em paralelo com terapeutas individuais, na mesma sala. Para casais que querem pausar juntos sem perder a privacidade individual.',           tag: 'PARA DOIS' },
  { id: 'IV',  name: 'Ritual Tântrico',   slug: 'tantrico',       time: '90 · 120 min',      price: 'Consulte valores',  note: 'Trabalho com respiração, energia e toque consciente. Ritmo lento, atenção plena, despertar dos sentidos sem pressa.',                                            tag: 'ENERGIA & PRESENÇA' },
  { id: 'V',   name: 'Pedras Quentes',    slug: 'pedras-quentes', time: '60 · 90 min',       price: 'Consulte valores',  note: 'Pedras de basalto aquecidas conduzidas pelo corpo em movimentos longos. Calor que penetra a musculatura e abre espaço para o toque sutil que segue.',          tag: 'RELAXAMENTO PROFUNDO' },
  { id: 'VI',  name: 'Banho Sensorial',   slug: 'banho',          time: '120 min',           price: 'Consulte valores',  note: 'Inicia com banho de imersão em ervas aromáticas, segue com massagem de corpo inteiro com óleos quentes. Uma travessia em duas partes para quem quer entrega total.', tag: 'RITUAL COMPLETO' },
];

function Rituals({ tweaks, onReserve }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  const [active, setActive] = useState(0);
  return (
    <section id="rituais" className="rituals" data-screen-label="03 Rituals"
      style={{ '--bg': palette.bg, '--ink': palette.ink, '--orange': palette.orange, '--blue': palette.blue, '--gold': palette.gold, '--deep': palette.deep }}>
      <div className="rit-head">
        <span className="rit-eyebrow">NOSSOS RITUAIS · CONSULTE VALORES</span>
        <h2 className="rit-title" style={{ fontFamily: FONTS.italiana }}>
          Cada toque
          <br />
          <em style={{ fontFamily: FONTS.cormorant, fontWeight: 400 }}>tem nome.</em>
        </h2>
        <p className="rit-sub" style={{ fontFamily: FONTS.cormorant }}><em>Seis experiências distintas, do clássico ao mais imersivo. Valores informados pelo WhatsApp ou telefone.</em></p>
      </div>

      <div className="rit-grid">
        <ol className="rit-list">
          {RITUALS.slice(0, 3).map((r, i) => (
            <li key={r.id} className={`rit-row ${active === i ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} tabIndex={0}>
              <span className="rit-num">{r.id}</span>
              <span className="rit-name" style={{ fontFamily: FONTS.italiana }}>{r.name}</span>
              <span className="rit-tag">{r.tag}</span>
              <span className="rit-time">{r.time}</span>
              <span className="rit-price">{r.price}</span>
              <span className="rit-arrow">→</span>
            </li>
          ))}
        </ol>

        <aside className="rit-detail">
          <div className="detail-frame">
            <span className="detail-label">EM DESTAQUE</span>
            <h3 className="detail-name" style={{ fontFamily: FONTS.italiana }}>{RITUALS[active].name}</h3>
            <p className="detail-note" style={{ fontFamily: FONTS.cormorant }}><em>{RITUALS[active].note}</em></p>
            <div className="detail-meta">
              <span><b>Duração</b> {RITUALS[active].time}</span>
              <span><b>Investimento</b> {RITUALS[active].price}</span>
            </div>
            <div className="detail-illu">
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                {[...Array(6)].map((_, i) => (
                  <circle key={i} cx="100" cy="100" r={20 + i * 14} fill="none"
                    stroke={i % 2 ? 'var(--blue)' : 'var(--orange)'} strokeOpacity={0.6 - i * 0.07} strokeWidth="0.6"
                    style={{ transformOrigin: '100px 100px', animation: `spin ${20 + i * 4}s linear ${i % 2 ? 'reverse' : 'normal'} infinite` }} />
                ))}
                <circle cx="100" cy="100" r="6" fill="var(--orange)" />
              </svg>
            </div>
          </div>
        </aside>
      </div>

      <div className="rit-foot">
        <a href="massagens.html" className="rit-foot-link">
          <span>VER MENU COMPLETO</span>
          <span className="cta-arrow">→</span>
        </a>
        <span className="rit-foot-note" style={{ fontFamily: FONTS.cormorant }}>
          <em>Preços abertos · sem extras escondidos · pagamento no local</em>
        </span>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================
const FAQS = [
  {
    q: 'Quanto custa uma massagem em The Palms?',
    a: 'Os valores são informados diretamente pelo WhatsApp ou telefone, conforme o ritual escolhido e a duração. Entre em contato em ' + WA_DISPLAY + ' e respondemos com o valor exato e disponibilidade.',
  },
  {
    q: 'Como faço uma reserva?',
    a: 'Pelo WhatsApp em ' + WA_DISPLAY + ' ou pelo botão Reservar abaixo. Confirmação imediata. Aceitamos reservas com até 24h de antecedência.',
  },
  {
    q: 'Que tipos de massagem vocês oferecem?',
    a: 'Seis rituais: Ritual Sensorial, Quatro Mãos, Ritual do Casal, Ritual Tântrico, Massagem com Pedras Quentes e Banho Sensorial. Disponíveis em 60, 90 ou 120 minutos.',
  },
  {
    q: 'The Palms é discreto? Como é o atendimento?',
    a: 'Discrição é parte do ritual. A casa fica em uma rua reservada da Vila Olímpia, com salas privativas, manobrista no local e atendimento individualizado. Não há contato visual entre clientes que não estejam juntos. Há mais de 17 anos atendemos a executivos e clientes que valorizam total privacidade.',
  },
  {
    q: 'Onde fica e quais os horários de funcionamento?',
    a: 'Rua Gomes de Carvalho, 416, Vila Olímpia, São Paulo — a três minutos do JK Iguatemi e dez minutos da Faria Lima. Funcionamento: segunda a sábado, das 12h às 20h. Manobrista no local.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Cartão de crédito e débito (Visa, Master, Amex, Elo), PIX e dinheiro. Pagamento sempre no local, após o ritual. Sem retenção no momento da reserva.',
  },
  {
    q: 'O que devo levar? E o que está incluído?',
    a: 'Apenas você. Tudo já está incluído: ducha aquecida antes e depois, roupão, toalhas, chinelos, óleos premium aquecidos, água, chá ou champanhe, climatização, música ambiente, Wi-Fi e estacionamento (manobrista) gratuitos.',
  },
  {
    q: 'Posso reservar em cima da hora?',
    a: 'Sempre que houver agenda disponível, sim. Para garantir horário e a terapeuta de preferência, recomendamos reservar com até 24h de antecedência. Quatro Mãos pede 24h por envolver duas terapeutas.',
  },
  {
    q: 'Posso escolher minha terapeuta?',
    a: 'Sim. Cada uma das doze terapeutas tem sua própria agenda. Você pode pedir indicação pelo WhatsApp — conversamos sobre o que você busca e sugerimos quem combina mais com o seu momento.',
  },
  {
    q: 'O Ritual do Casal é para qualquer casal?',
    a: 'Sim, atendemos casais de todas as configurações. Massagem em paralelo, na mesma sala, com terapeutas individuais para cada um. Disponibilidade limitada — reserve com 48h de antecedência para casais.',
  },
  {
    q: 'Há estacionamento?',
    a: 'Sim, manobrista gratuito no local. Também estamos a três minutos a pé do JK Iguatemi (estacionamento público) e a dez minutos da Faria Lima.',
  },
  {
    q: 'Posso cancelar ou remarcar?',
    a: 'Cancelamentos e remarcações são feitos pelo WhatsApp até 4h antes do horário reservado, sem custo. Acima desse prazo, pedimos remarcação em vez de cancelamento.',
  },
  {
    q: 'O atendimento é profissional? São terapeutas formadas?',
    a: 'Sim. As doze terapeutas da casa são formadas em massoterapia, com formação em anatomia, fisiologia e ética profissional. The Palms atua há mais de 17 anos exclusivamente como casa de massagem terapêutica e sensorial.',
  },
];

function FAQ({ tweaks, onReserve }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq" data-screen-label="04 FAQ"
      style={{ '--bg': palette.bg, '--ink': palette.ink, '--orange': palette.orange, '--blue': palette.blue, '--gold': palette.gold }}>
      <div className="faq-head">
        <span className="faq-eye">SECTION 04 · PERGUNTAS</span>
        <h2 className="faq-title" style={{ fontFamily: FONTS.italiana }}>
          O que costumam<br />
          <em style={{ fontFamily: FONTS.cormorant, fontWeight: 400 }}>perguntar antes de reservar.</em>
        </h2>
      </div>
      <div className="faq-list">
        {FAQS.map((f, i) => (
          <details key={i} open={open === i} onClick={(e) => { e.preventDefault(); setOpen(open === i ? -1 : i); }} className="faq-row">
            <summary className="faq-q" style={{ fontFamily: FONTS.italiana }}>
              <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="faq-q-text">{f.q}</span>
              <span className="faq-toggle">{open === i ? '−' : '+'}</span>
            </summary>
            <p className="faq-a" style={{ fontFamily: FONTS.cormorant }}><em>{f.a}</em></p>
          </details>
        ))}
      </div>
      <div className="faq-cta">
        <button className="cta-primary" onClick={onReserve}>
          <span className="cta-label">RESERVAR PELO WHATSAPP</span>
          <span className="cta-arrow">→</span>
        </button>
      </div>
    </section>
  );
}

// ============================================================
// BOOKING BAND — final CTA before footer
// ============================================================
function BookingBand({ tweaks, onReserve }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  return (
    <section
      className="booking-band"
      data-screen-label="06b Booking Band"
      style={{ '--bg': palette.deep, '--ink': palette.ink, '--orange': palette.orange, '--blue': palette.blue, '--gold': palette.gold }}
    >
      <div className="bb-inner">
        <div className="bb-copy">
          <span className="bb-eye">RESERVE SEU RITUAL</span>
          <h2 className="bb-h" style={{ fontFamily: FONTS.italiana }}>
            Comece sua
            <br />
            <em style={{ fontFamily: FONTS.cormorant, fontWeight: 400 }}>travessia hoje.</em>
          </h2>
          <p className="bb-sub" style={{ fontFamily: FONTS.cormorant }}>
            <em>Confirmação imediata pelo WhatsApp. Pagamento no local. Sem retenção ou taxa de reserva.</em>
          </p>
        </div>

        <div className="bb-actions">
          <button className="cta-primary bb-cta" onClick={onReserve}>
            <span className="cta-label">RESERVAR AGORA</span>
            <span className="cta-arrow">→</span>
          </button>
          <a
            href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent('Olá! Gostaria de reservar um ritual em The Palms.')}`}
            target="_blank"
            rel="noopener"
            className="bb-line bb-wa"
          >
            <span className="bb-line-l">WHATSAPP</span>
            <span className="bb-line-v">{WA_DISPLAY}</span>
          </a>
          <a href={`tel:+${PHONE}`} className="bb-line bb-tel">
            <span className="bb-line-l">TELEFONE</span>
            <span className="bb-line-v">{PHONE_DISPLAY}</span>
          </a>
          <div className="bb-line bb-hours">
            <span className="bb-line-l">FUNCIONAMENTO</span>
            <span className="bb-line-v">Seg — Sáb · 12h — 20h</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// VISIT (Address + Hours + Map)
// ============================================================
function Visit({ tweaks }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  return (
    <section id="visite" className="visit" data-screen-label="05 Visit"
      style={{ '--bg': palette.bg, '--ink': palette.ink, '--orange': palette.orange, '--blue': palette.blue, '--gold': palette.gold }}>
      <div className="visit-grid">
        <div className="visit-info">
          <span className="v-eye">A CASA · DESDE 2008</span>
          <h2 className="v-title" style={{ fontFamily: FONTS.italiana }}>
            Discrição premium<br />
            <em style={{ fontFamily: FONTS.cormorant, fontWeight: 400 }}>na Vila Olímpia mais central.</em>
          </h2>
          <p className="v-lead" style={{ fontFamily: FONTS.cormorant }}>
            <em>Em uma casa reservada na Rua Gomes de Carvalho, a três minutos do JK Iguatemi e dez minutos da Faria Lima, criamos um espaço onde a Vila Olímpia desacelera. Salas privativas, manobrista no local, ambientes climatizados, atendimento individualizado.</em>
          </p>
          <div className="v-rows">
            <div className="v-row">
              <span className="v-label">ENDEREÇO</span>
              <p style={{ fontFamily: FONTS.cormorant, fontSize: 22 }}>
                <em>{ADDRESS_LINE}<br />{ADDRESS_AREA}</em>
              </p>
              <a href={MAPS_URL} target="_blank" rel="noopener" className="v-link">Abrir no Google Maps →</a>
            </div>
            <div className="v-row">
              <span className="v-label">HORÁRIO</span>
              <p style={{ fontFamily: FONTS.cormorant, fontSize: 22 }}>
                <em>Segunda a sábado<br />12:00 — 20:00<br />Domingo: fechado</em>
              </p>
            </div>
            <div className="v-row">
              <span className="v-label">CONTATO</span>
              <p style={{ fontFamily: FONTS.cormorant, fontSize: 22 }}>
                <em><a href={`https://wa.me/${WA_PHONE}`} target="_blank" rel="noopener" style={{color:'var(--orange)', textDecoration:'none'}}>{WA_DISPLAY}</a><br />WhatsApp · reservas</em>
              </p>
            </div>
          </div>
        </div>
        <a href={MAPS_URL} target="_blank" rel="noopener" className="visit-map">
          <iframe
            title="Mapa · The Palms São Paulo"
            src="https://www.google.com/maps?q=Rua+Gomes+de+Carvalho+416,+Vila+Olímpia,+São+Paulo&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-pin">
            <span className="map-dot" />
            <span className="map-label" style={{ fontFamily: FONTS.italiana }}>THE PALMS</span>
          </div>
        </a>
      </div>
    </section>
  );
}

// ============================================================
// RESERVE PANEL (slide-in WhatsApp deeplink form)
// ============================================================
function ReservePanel({ open, onClose }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ritual, setRitual] = useState('Ritual Sensorial');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('1');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      'Olá! Gostaria de reservar um ritual em The Palms.',
      '',
      `• Ritual: ${ritual}`,
      date && `• Data: ${date}`,
      time && `• Horário: ${time}`,
      `• Pessoas: ${guests}`,
      phone && `• WhatsApp: ${phone}`,
      email && `• E-mail: ${email}`,
      notes && `• Observações: ${notes}`,
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className={`reserve-overlay ${open ? 'on' : ''}`} onClick={onClose} aria-hidden={!open}>
      <aside className={`reserve-panel ${open ? 'on' : ''}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Reservar">
        <button className="reserve-close" onClick={onClose} aria-label="Fechar">×</button>
        <span className="reserve-eye">RESERVAS</span>
        <h3 className="reserve-title" style={{ fontFamily: FONTS.italiana }}>Reserve seu ritual</h3>
        <p className="reserve-sub" style={{ fontFamily: FONTS.cormorant }}>
          <em>Confirmação imediata pelo WhatsApp. Sem cadastro.</em>
        </p>
        <form className="reserve-form" onSubmit={submit}>
          <label className="rf-field">
            <span>Ritual</span>
            <select value={ritual} onChange={(e) => setRitual(e.target.value)} required>
              {RITUALS.map((r) => (
                <option key={r.id} value={r.name}>{r.name} — {r.price}</option>
              ))}
            </select>
          </label>
          <div className="rf-row">
            <label className="rf-field">
              <span>Data</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label className="rf-field">
              <span>Horário</span>
              <input type="time" min="12:00" max="20:00" value={time} onChange={(e) => setTime(e.target.value)} required />
            </label>
          </div>
          <label className="rf-field">
            <span>Pessoas</span>
            <div className="rf-pills">
              {['1', '2'].map((g) => (
                <button type="button" key={g} className={`rf-pill ${guests === g ? 'on' : ''}`} onClick={() => setGuests(g)}>
                  {g} {g === '1' ? 'pessoa' : 'pessoas'}
                </button>
              ))}
            </div>
          </label>
          <label className="rf-field">
            <span>WhatsApp</span>
            <input type="tel" placeholder="+55 11 9XXXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label className="rf-field">
            <span>E-mail (opcional)</span>
            <input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="rf-field">
            <span>Observações</span>
            <textarea rows={3} placeholder="Alguma preferência ou pedido especial?" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </label>
          <button type="submit" className="rf-submit">
            <span>ENVIAR PELO WHATSAPP</span>
            <span className="cta-arrow">→</span>
          </button>
          <p className="rf-fine" style={{ fontFamily: FONTS.cormorant }}>
            <em>Ao enviar, abrimos uma conversa pré-preenchida no WhatsApp para confirmar.</em>
          </p>
        </form>
      </aside>
    </div>
  );
}

// ============================================================
// STICKY DOCK
// ============================================================
function StickyDock({ onReserve }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const handler = () => setShown(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <div className={`dock ${shown ? 'on' : ''}`}>
      <a className="dock-btn dock-wa" href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent('Olá! Gostaria de informações sobre os rituais em The Palms.')}`} target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.5.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.5 1 2.9 1.2 3.1.1.2 2 3.1 4.9 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.2-.3-.5-.4M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg>
        <span>WhatsApp</span>
      </a>
      <a className="dock-btn dock-call" href={`tel:+${PHONE}`} aria-label="Ligar">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>Ligar</span>
      </a>
      <button className="dock-btn dock-reserve" onClick={onReserve}>
        <span>RESERVAR</span>
        <span className="cta-arrow">→</span>
      </button>
    </div>
  );
}
function Footer({ tweaks, onReserve }) {
  const palette = PALETTES[tweaks.palette] || PALETTES.neon;
  return (
    <section id="reservas" className="footer" data-screen-label="06 Reserve"
      style={{ '--bg': palette.deep, '--ink': palette.ink, '--orange': palette.orange, '--blue': palette.blue, '--gold': palette.gold }}>
      <div className="foot-grid">
        <div className="foot-block">
          <span className="foot-eye">VISITE</span>
          <p style={{ fontFamily: FONTS.cormorant }}><em>{ADDRESS_LINE}<br />{ADDRESS_AREA}<br /><a href={MAPS_URL} target="_blank" rel="noopener" style={{color:'var(--orange)', textDecoration:'none'}}>Google Maps →</a></em></p>
        </div>
        <div className="foot-block">
          <span className="foot-eye">HORÁRIO</span>
          <p style={{ fontFamily: FONTS.cormorant }}><em>Seg — Sáb · 12:00 — 20:00<br />Domingo · fechado</em></p>
        </div>
        <div className="foot-block">
          <span className="foot-eye">RESERVE</span>
          <p style={{ fontFamily: FONTS.cormorant }}><em>
            <a href={`https://wa.me/${WA_PHONE}`} target="_blank" rel="noopener" style={{color:'var(--orange)', textDecoration:'none'}}>{WA_DISPLAY}</a><br />
            WhatsApp · confirmação imediata
          </em></p>
          <button className="foot-cta" onClick={onReserve}>RESERVAR →</button>
        </div>
        <div className="foot-block">
          <span className="foot-eye">SIGA</span>
          <p style={{ fontFamily: FONTS.cormorant }}><em>
            <a href={IG_URL} target="_blank" rel="noopener" style={{color:'var(--orange)', textDecoration:'none'}}>@the_palms_sao_paulo</a><br />
            Instagram
          </em></p>
        </div>
      </div>
      <div className="foot-rule" />
      <div className="foot-bottom">
        <span>THE PALMS · OÁSIS URBANO NA VILA OLÍMPIA · DESDE 2008</span>
        <span>Discrição é parte do ritual.</span>
        <span className="foot-credit">
          <a href="https://rankmarketing.net" target="_blank" rel="noopener">
            Powered by <strong>Rank Marketing</strong>
          </a>
        </span>
      </div>
    </section>
  );
}

// ============================================================
// APP
// ============================================================
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [reserveOpen, setReserveOpen] = useState(false);
  const openReserve = () => setReserveOpen(true);
  const closeReserve = () => setReserveOpen(false);
  return (
    <>
      <UnifiedNav
        current="home"
        onReserve={openReserve}
        mode={tweaks.navMode || 'left-rail'}
        railSections={[
          { id: 'galeria',  label: 'A Casa' },
          { id: 'rituais',  label: 'Rituais' },
          { id: 'faq',      label: 'FAQ' },
          { id: 'visite',   label: 'Visite' },
        ]}
      />
      <Hero tweaks={tweaks} onReserve={openReserve} />
      <Marquee tweaks={tweaks} />
      <Gallery tweaks={tweaks} />
      <Rituals tweaks={tweaks} onReserve={openReserve} />
      <FAQ tweaks={tweaks} onReserve={openReserve} />
      <Visit tweaks={tweaks} />
      <BookingBand tweaks={tweaks} onReserve={openReserve} />
      <Footer tweaks={tweaks} onReserve={openReserve} />

      <StickyDock onReserve={openReserve} />
      <ReservePanel open={reserveOpen} onClose={closeReserve} />

      <TweaksPanel title="Tweaks" defaultOpen={false}>
        <TweakSection title="Nav Behavior">
          <TweakRadio value={tweaks.navMode || 'left-rail'} onChange={(v) => setTweak('navMode', v)}
            options={[
              { value: 'sticky', label: 'Sticky' },
              { value: 'hide-on-down', label: 'Hide on scroll' },
              { value: 'left-rail', label: 'Left rail' },
            ]} />
        </TweakSection>
        <TweakSection title="Hero Layout">
          <TweakRadio value={tweaks.heroLayout || 'default'} onChange={(v) => setTweak('heroLayout', v)}
            options={[
              { value: 'default', label: 'Default' },
              { value: 'cinematic', label: 'Cinematic Depth' },
              { value: 'headline', label: 'Headline-First' },
            ]} />
        </TweakSection>
        <TweakSection title="Palette">
          <TweakRadio value={tweaks.palette} onChange={(v) => setTweak('palette', v)}
            options={[
              { value: 'neon', label: 'Neon' },
              { value: 'ember', label: 'Ember' },
              { value: 'obsidian', label: 'Obsidian' },
              { value: 'midnight', label: 'Midnight' },
            ]} />
        </TweakSection>
        <TweakSection title="Display Font">
          <TweakRadio value={tweaks.displayFont} onChange={(v) => setTweak('displayFont', v)}
            options={[
              { value: 'italiana', label: 'Italiana' },
              { value: 'playfair', label: 'Playfair' },
              { value: 'bodoni', label: 'Bodoni' },
              { value: 'cormorant', label: 'Cormorant' },
            ]} />
        </TweakSection>
        <TweakSection title="Headline">
          <TweakText value={tweaks.headline} onChange={(v) => setTweak('headline', v)} />
        </TweakSection>
        <TweakSection title="Tagline">
          <TweakText value={tweaks.tagline} onChange={(v) => setTweak('tagline', v)} />
        </TweakSection>
        <TweakSection title="Sway intensity">
          <TweakSlider min={0} max={12} step={1} value={tweaks.swayIntensity} onChange={(v) => setTweak('swayIntensity', v)} />
        </TweakSection>
        <TweakSection title="Grain texture">
          <TweakToggle value={tweaks.showGrain} onChange={(v) => setTweak('showGrain', v)} />
        </TweakSection>
        <TweakSection title="Marginalia">
          <TweakToggle value={tweaks.showRotatedMargin} onChange={(v) => setTweak('showRotatedMargin', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
