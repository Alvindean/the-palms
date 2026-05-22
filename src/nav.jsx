// ============================================================
// UnifiedNav — one cinematic, sticky navbar shared across the site
// Loaded on index.html, massagens.html, massagistas.html
//
// Features:
// - Dark glass + amber glow aesthetic
// - Hide on scroll-down, reveal on scroll-up
// - Condenses (smaller padding + compact wordmark) after scroll past hero
// - Subtle animated underline on hover (orange, sweeps left → right)
// - Refined ghost menu links + loud orange WhatsApp/Reservar CTA
// - Mobile hamburger w/ full-screen drawer
// - Active link highlight via `current` prop
// ============================================================

(function () {
  const { useState, useEffect, useRef } = React;

  const NAV_ITEMS = [
    { key: 'home',        label: 'Início',      href: 'index.html' },
    { key: 'massagens',   label: 'Rituais',     href: 'massagens.html' },
    { key: 'massagistas', label: 'Massagistas', href: 'massagistas.html' },
    { key: 'a-casa',      label: 'A Casa',      href: 'index.html#galeria' },
    { key: 'visite',      label: 'Visite',      href: 'index.html#visite' },
    { key: 'faq',         label: 'FAQ',         href: 'index.html#faq' },
  ];

  // mode: 'sticky' | 'hide-on-down' | 'left-rail'
  // railSections: optional [{id, label}] — when provided, rail shows these instead of top-3 nav items
  //   and uses scrollspy to light up the active section
  function UnifiedNav({ current = 'home', onReserve, mode = 'left-rail', railSections = null }) {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [railMode, setRailMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const lastY = useRef(0);

    useEffect(() => {
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const y = window.scrollY;
          const vh = window.innerHeight || 800;
          // Condense after 80px (only matters for non-rail modes)
          setScrolled(y > 80);

          if (mode === 'left-rail') {
            // After ~60% viewport, transform into left rail
            setRailMode(y > vh * 0.6);
            setHidden(false);
          } else if (mode === 'hide-on-down') {
            const dy = y - lastY.current;
            if (y > 240 && dy > 6) setHidden(true);
            else if (dy < -4 || y < 100) setHidden(false);
            setRailMode(false);
          } else {
            // 'sticky' — never hide, never rail
            setHidden(false);
            setRailMode(false);
          }
          lastY.current = y;
        });
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, [mode]);

    // Scrollspy — when railSections are provided, track which one is "in view"
    useEffect(() => {
      if (!railSections || !railSections.length) return;
      let raf = 0;
      const update = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const probe = window.innerHeight * 0.35; // anchor line ~35% down the viewport
          let current = null;
          for (const s of railSections) {
            const el = document.getElementById(s.id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= probe && rect.bottom >= probe) {
              current = s.id;
              break;
            }
            // Fallback: last section above the probe line
            if (rect.top <= probe) current = s.id;
          }
          setActiveSection(current);
        });
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      return () => {
        window.removeEventListener('scroll', update);
        window.removeEventListener('resize', update);
        cancelAnimationFrame(raf);
      };
    }, [railSections]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
      return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleReserve = (e) => {
      setMenuOpen(false);
      if (onReserve) {
        e.preventDefault();
        onReserve();
      }
    };

    return (
      <>
        <header
          className={[
            'unav',
            scrolled ? 'unav--scrolled' : '',
            hidden ? 'unav--hidden' : '',
            railMode ? 'unav--rail-active' : '',
            menuOpen ? 'unav--menu-open' : '',
          ].filter(Boolean).join(' ')}
          aria-label="Navegação principal"
        >
          {/* Animated amber glow line at the bottom edge — appears when scrolled */}
          <div className="unav-glow" aria-hidden="true" />

          <div className="unav-inner">
            {/* Wordmark */}
            <a href="index.html" className="unav-mark" aria-label="The Palms São Paulo — início">
              <span className="unav-mark-glyph" style={{ fontFamily: window.FONTS ? window.FONTS.italiana : '"Italiana", serif' }}>
                THE&nbsp;PALMS
              </span>
              <span className="unav-mark-sub">SÃO PAULO · DESDE 2008</span>
            </a>

            {/* Desktop nav */}
            <nav className="unav-links" aria-label="Páginas">
              {NAV_ITEMS.map((it) => (
                <a
                  key={it.key}
                  href={it.href}
                  className={`unav-link ${current === it.key ? 'is-active' : ''}`}
                >
                  <span>{it.label}</span>
                  <i className="unav-link-underline" aria-hidden="true" />
                </a>
              ))}
            </nav>

            {/* Right side: meta coords + CTA */}
            <div className="unav-right">
              <span className="unav-coords">VILA OLÍMPIA · SP</span>
              <button type="button" className="unav-cta" onClick={handleReserve}>
                <span>RESERVAR</span>
                <span className="unav-cta-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="unav-burger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </header>

        {/* Left rail — appears after scrolling past hero in 'left-rail' mode */}
        <aside
          className={`unav-rail ${railMode ? 'is-active' : ''}`}
          aria-hidden={!railMode}
          aria-label="Navegação lateral"
        >
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="unav-rail-mark" aria-label="The Palms — topo">
            <span className="unav-rail-mark-glyph" style={{ fontFamily: window.FONTS ? window.FONTS.italiana : '"Italiana", serif' }}>
              THE&nbsp;PALMS
            </span>
          </a>

          <span className="unav-rail-divider" aria-hidden="true" />

          <nav className="unav-rail-links" aria-label="Seções">
            {railSections && railSections.length ? (
              railSections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`unav-rail-link ${activeSection === s.id ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(s.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {s.label}
                </a>
              ))
            ) : (
              NAV_ITEMS.slice(0, 3).map((it) => (
                <a
                  key={it.key}
                  href={it.href}
                  className={`unav-rail-link ${current === it.key ? 'is-active' : ''}`}
                >
                  {it.label}
                </a>
              ))
            )}
          </nav>

          <button
            type="button"
            className="unav-rail-cta"
            onClick={handleReserve}
            aria-label="Reservar"
          >
            <span>RESERVAR</span>
          </button>
        </aside>

        {/* Mobile drawer — full screen, dark glass */}
        <div
          className={`unav-drawer ${menuOpen ? 'is-open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            className="unav-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >×</button>

          <span className="unav-drawer-eye">THE PALMS · MENU</span>
          <nav className="unav-drawer-nav" aria-label="Páginas">
            {NAV_ITEMS.map((it, i) => (
              <a
                key={it.key}
                href={it.href}
                onClick={() => setMenuOpen(false)}
                className={`unav-drawer-link ${current === it.key ? 'is-active' : ''}`}
                style={{
                  fontFamily: window.FONTS ? window.FONTS.italiana : '"Italiana", serif',
                  transitionDelay: menuOpen ? `${0.08 + i * 0.04}s` : '0s',
                }}
              >
                <span className="unav-drawer-num">0{i + 1}</span>
                <span className="unav-drawer-label">{it.label}</span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="unav-drawer-cta"
            onClick={handleReserve}
          >
            <span>RESERVAR PELO WHATSAPP</span>
            <span aria-hidden="true">→</span>
          </button>

          <div className="unav-drawer-foot">
            <span>Vila Olímpia · São Paulo</span>
            <span>·</span>
            <span>Desde 2008</span>
          </div>
        </div>
      </>
    );
  }

  // Spacer keeps content from sliding under the fixed nav
  function UnifiedNavSpacer() {
    return <div className="unav-spacer" aria-hidden="true" />;
  }

  window.UnifiedNav = UnifiedNav;
  window.UnifiedNavSpacer = UnifiedNavSpacer;
})();
