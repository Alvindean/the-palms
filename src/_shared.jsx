// ============================================================
// _shared.jsx — chrome + constants used across all pages
// Loaded BEFORE every page's main script.
// ============================================================

var { useState: __useState, useEffect: __useEffect, useRef: __useRef } = React;

// --- Constants ---
// Landline (display + tel:) — for SEO/JSON-LD/Google
window.PHONE = '551130440366';
window.PHONE_DISPLAY = '+55 11 3044-0366';
// WhatsApp number — what wa.me/sticky-dock booking uses
window.WA_PHONE = '5511924784150';
window.WA_DISPLAY = '+55 11 92478-4150';
// Jobs only — surfaces only on /trabalhe-conosco, never on booking flows
window.JOBS_WA_PHONE = '5511941272210';
window.JOBS_WA_DISPLAY = '+55 11 94127-2210';
window.ADDRESS_LINE = 'Rua Gomes de Carvalho, 416';
window.ADDRESS_AREA = 'Vila Olímpia · São Paulo';
window.MAPS_URL = 'https://share.google/To2l7MFaWY0VfpO18';
window.IG_URL = 'https://www.instagram.com/the_palms_sao_paulo/';
window.SITE_URL = 'https://thepalms.com.br';

window.FONTS = {
  italiana: '"Italiana", serif',
  cormorant: '"Cormorant Garamond", serif',
  playfair: '"Playfair Display", serif',
  bodoni: '"Bodoni Moda", serif',
};

window.PALETTE = {
  bg: '#05060a', ink: '#f5ecd9', orange: '#ff8a1f', blue: '#1f6dff', gold: '#e8b87a', deep: '#0a0c14',
};

// All 6 rituals — single source of truth (real prices/durations from competitive copy)
window.RITUALS = [
  { slug: 'sensorial',     id: 'I',   name: 'Ritual Sensorial',     tag: 'RITUAL ASSINATURA',    durations: [{t:'60′'},{t:'90′'},{t:'120′'}],  time: '60 · 90 · 120 min', price: 'Consulte valores', priceFrom: 'Consulte valores',  note: 'A travessia clássica da casa. Toques lentos de corpo inteiro, óleos aquecidos, respiração guiada.', kw: 'massagem sensorial' },
  { slug: 'quatro-maos',   id: 'II',  name: 'Quatro Mãos',          tag: 'EXPERIÊNCIA AMPLIADA', durations: [{t:'90′'},{t:'120′'}],            time: '90 · 120 min',      price: 'Consulte valores', priceFrom: 'Consulte valores',  note: 'Duas terapeutas, ritmos sincronizados. Toques que se cruzam, se respondem, dissolvem a noção de onde uma mão termina e a outra começa.', kw: 'massagem a quatro mãos' },
  { slug: 'casal',         id: 'III', name: 'Ritual do Casal',      tag: 'PARA DOIS',            durations: [{t:'90′'},{t:'120′'}],            time: '90 · 120 min',      price: 'Consulte valores', priceFrom: 'Consulte valores',  note: 'Massagem em paralelo com terapeutas individuais, na mesma sala. Para casais que querem pausar juntos sem perder a privacidade individual.', kw: 'massagem para casais' },
  { slug: 'tantrico',      id: 'IV',  name: 'Ritual Tântrico',      tag: 'ENERGIA & PRESENÇA',   durations: [{t:'90′'},{t:'120′'}],            time: '90 · 120 min',      price: 'Consulte valores', priceFrom: 'Consulte valores',  note: 'Trabalho com respiração, energia e toque consciente. Ritmo lento, atenção plena, despertar dos sentidos sem pressa.', kw: 'massagem tântrica' },
  { slug: 'pedras-quentes',id: 'V',   name: 'Pedras Quentes',       tag: 'RELAXAMENTO PROFUNDO', durations: [{t:'60′'},{t:'90′'}],             time: '60 · 90 min',       price: 'Consulte valores', priceFrom: 'Consulte valores',  note: 'Pedras de basalto aquecidas conduzidas pelo corpo em movimentos longos. Calor que penetra a musculatura e abre espaço para o toque sutil que segue.', kw: 'massagem com pedras quentes' },
  { slug: 'banho',         id: 'VI',  name: 'Banho Sensorial',      tag: 'RITUAL COMPLETO',      durations: [{t:'120′'}],                       time: '120 min',           price: 'Consulte valores', priceFrom: 'Consulte valores',  note: 'Inicia com banho de imersão em ervas aromáticas, segue com massagem de corpo inteiro com óleos quentes. Uma travessia em duas partes.', kw: 'banho sensorial' },
];

// Convenience getter
window.getRitual = (slug) => window.RITUALS.find(r => r.slug === slug);

// ============================================================
// SiteHeader — fixed top nav with active state
// Pass `current` to highlight the active page.
// ============================================================
window.SiteHeader = function SiteHeader({ current = 'home', onReserve }) {
  const items = [
    { key: 'home',        label: 'Início',      href: 'index.html' },
    { key: 'massagens',   label: 'Rituais',     href: 'massagens.html' },
    { key: 'massagistas', label: 'Massagistas', href: 'massagistas.html' },
    { key: 'a-casa',      label: 'A Casa',      href: 'index.html#galeria' },
    { key: 'visite',      label: 'Visite',      href: 'index.html#visite' },
    { key: 'faq',         label: 'FAQ',         href: 'index.html#faq' },
  ];
  return (
    <header className="site-header">
      <a href="index.html" className="sh-mark" aria-label="The Palms São Paulo">
        <span className="sh-mark-glyph" style={{ fontFamily: window.FONTS.italiana }}>THE PALMS</span>
        <span className="sh-mark-sub">SÃO PAULO · MASSAGE COMPANY</span>
      </a>
      <nav className="sh-nav">
        {items.map(it => (
          <a key={it.key} href={it.href} className={`sh-link ${current === it.key ? 'on' : ''}`}>
            {it.label}
          </a>
        ))}
        <button className="sh-cta" onClick={onReserve}>RESERVAR →</button>
      </nav>
    </header>
  );
};

// ============================================================
// Breadcrumbs — semantic + visible + matches JSON-LD
// ============================================================
window.Breadcrumbs = function Breadcrumbs({ trail }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <a href="index.html">Início</a>
      {trail.map((c, i) => (
        <React.Fragment key={i}>
          <span className="crumb-sep">/</span>
          {c.href ? <a href={c.href}>{c.label}</a> : <span className="crumb-cur">{c.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};

// ============================================================
// SiteFooter — same on every page
// ============================================================
window.SiteFooter = function SiteFooter({ onReserve }) {
  return (
    <footer id="reservas" className="site-footer">
      <div className="sf-grid">
        <div className="sf-block sf-brand">
          <span className="sf-mark" style={{ fontFamily: window.FONTS.italiana }}>THE PALMS</span>
          <p style={{ fontFamily: window.FONTS.cormorant }}>
            <em>Casa de massagem premium na Vila Olímpia. Seis rituais. Discrição é parte do ritual.</em>
          </p>
        </div>
        <div className="sf-block">
          <span className="sf-eye">VISITE</span>
          <p style={{ fontFamily: window.FONTS.cormorant }}><em>{window.ADDRESS_LINE}<br />{window.ADDRESS_AREA}</em></p>
          <a href={window.MAPS_URL} target="_blank" rel="noopener" className="sf-link">Google Maps →</a>
        </div>
        <div className="sf-block">
          <span className="sf-eye">HORÁRIO</span>
          <p style={{ fontFamily: window.FONTS.cormorant }}><em>Seg — Sáb · 12:00 — 20:00<br />Domingo · fechado</em></p>
        </div>
        <div className="sf-block">
          <span className="sf-eye">RESERVE</span>
          <p style={{ fontFamily: window.FONTS.cormorant }}>
            <em><a href={`https://wa.me/${window.WA_PHONE}`} target="_blank" rel="noopener" style={{color:'var(--orange)', textDecoration:'none'}}>{window.WA_DISPLAY}</a></em>
          </p>
          <button className="foot-cta" onClick={onReserve}>RESERVAR →</button>
        </div>
        <div className="sf-block">
          <span className="sf-eye">SIGA</span>
          <p style={{ fontFamily: window.FONTS.cormorant }}>
            <em><a href={window.IG_URL} target="_blank" rel="noopener" style={{color:'var(--orange)', textDecoration:'none'}}>@the_palms_sao_paulo</a></em>
          </p>
        </div>
      </div>

      <div className="sf-rule" />

      <div className="sf-cols">
        <div className="sf-col">
          <span className="sf-eye">RITUAIS</span>
          <ul>
            {window.RITUALS.map(r => (
              <li key={r.slug}><a href={'massagens.html#' + r.slug}>{r.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="sf-col">
          <span className="sf-eye">A CASA</span>
          <ul>
            <li><a href={'index.html#galeria'}>Galeria · A Casa</a></li>
            <li><a href={'massagistas.html'}>Massagistas</a></li>
            <li><a href={'index.html#visite'}>Visite · Mapa</a></li>
            <li><a href={'index.html#faq'}>Perguntas frequentes</a></li>
          </ul>
        </div>
        <div className="sf-col">
          <span className="sf-eye">RESERVE</span>
          <ul>
            <li><a href={`https://wa.me/${window.WA_PHONE}`} target="_blank" rel="noopener">WhatsApp · {window.WA_DISPLAY}</a></li>
            <li><a href={`tel:+${window.PHONE}`}>Telefone · {window.PHONE_DISPLAY}</a></li>
            <li><a href={window.MAPS_URL} target="_blank" rel="noopener">Como chegar</a></li>
            <li><a href={window.IG_URL} target="_blank" rel="noopener">@the_palms_sao_paulo</a></li>
          </ul>
        </div>
      </div>

      <div className="sf-rule" />
      <div className="sf-bottom">
        <span>© MMXXVI · The Palms São Paulo Massage Company · Vila Olímpia</span>
        <span>Discrição é parte do ritual.</span>
        <span className="sf-credit">
          <a href="https://rankmarketing.net" target="_blank" rel="noopener">
            Powered by <strong>Rank Marketing</strong>
          </a>
        </span>
      </div>
    </footer>
  );
};

// ============================================================
// StickyDock
// ============================================================
window.StickyDock = function StickyDock({ onReserve }) {
  const [shown, setShown] = __useState(false);
  __useEffect(() => {
    const handler = () => setShown(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <div className={`dock ${shown ? 'on' : ''}`}>
      <a className="dock-btn dock-wa" href={`https://wa.me/${window.WA_PHONE}?text=${encodeURIComponent('Olá! Gostaria de informações sobre os rituais em The Palms.')}`} target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.4.1-.5.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.5 1 2.9 1.2 3.1.1.2 2 3.1 4.9 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.2-.3-.5-.4M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg>
        <span>WhatsApp</span>
      </a>
      <a className="dock-btn dock-call" href={`tel:+${window.PHONE}`} aria-label="Ligar">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        <span>Ligar</span>
      </a>
      <button className="dock-btn dock-reserve" onClick={onReserve}>
        <span>RESERVAR</span>
        <span className="cta-arrow">→</span>
      </button>
    </div>
  );
};

// ============================================================
// ReservePanel — slide-in form -> WhatsApp deeplink
// ============================================================
window.ReservePanel = function ReservePanel({ open, onClose, defaultRitual }) {
  const [phone, setPhone] = __useState('');
  const [email, setEmail] = __useState('');
  const [ritual, setRitual] = __useState(defaultRitual || 'Ritual Sensorial');
  const [date, setDate] = __useState('');
  const [time, setTime] = __useState('');
  const [guests, setGuests] = __useState('1');
  const [notes, setNotes] = __useState('');

  __useEffect(() => { if (defaultRitual) setRitual(defaultRitual); }, [defaultRitual]);
  __useEffect(() => {
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
    const url = `https://wa.me/${window.WA_PHONE}?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className={`reserve-overlay ${open ? 'on' : ''}`} onClick={onClose} aria-hidden={!open}>
      <aside className={`reserve-panel ${open ? 'on' : ''}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Reservar">
        <button className="reserve-close" onClick={onClose} aria-label="Fechar">×</button>
        <span className="reserve-eye">RESERVAS</span>
        <h3 className="reserve-title" style={{ fontFamily: window.FONTS.italiana }}>Reserve seu ritual</h3>
        <p className="reserve-sub" style={{ fontFamily: window.FONTS.cormorant }}>
          <em>Confirmação imediata pelo WhatsApp. Sem cadastro.</em>
        </p>
        <form className="reserve-form" onSubmit={submit}>
          <label className="rf-field">
            <span>Ritual</span>
            <select value={ritual} onChange={(e) => setRitual(e.target.value)} required>
              {window.RITUALS.map((r) => (
                <option key={r.slug} value={r.name}>{r.name}</option>
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
          <p className="rf-fine" style={{ fontFamily: window.FONTS.cormorant }}>
            <em>Ao enviar, abrimos uma conversa pré-preenchida no WhatsApp para confirmar.</em>
          </p>
        </form>
      </aside>
    </div>
  );
};

// ============================================================
// useReserve — hook that wires up panel state + Page chrome
// Usage: const { ReserveChrome, openReserve } = useReserve(currentNavKey);
// Then render <ReserveChrome /> at the end of your App.
// ============================================================
window.useReserve = function useReserve(currentNavKey, defaultRitual) {
  const [open, setOpen] = __useState(false);
  const openReserve = (ritualName) => {
    if (ritualName) window.__pendingRitual = ritualName;
    setOpen(true);
  };
  const closeReserve = () => setOpen(false);
  const ReserveChrome = () => (
    <>
      <window.SiteFooter onReserve={() => openReserve()} />
      <window.StickyDock onReserve={() => openReserve()} />
      <window.ReservePanel
        open={open}
        onClose={closeReserve}
        defaultRitual={window.__pendingRitual || defaultRitual}
      />
    </>
  );
  const Header = () => (
    <>
      <window.UnifiedNav current={currentNavKey} onReserve={() => openReserve()} />
      <window.UnifiedNavSpacer />
    </>
  );
  return { ReserveChrome, Header, openReserve };
};

// ============================================================
// CTA — reusable buttons
// ============================================================
window.CTAPrimary = function CTAPrimary({ children, onClick, href, target }) {
  const cls = 'cta-primary';
  if (href) return <a className={cls} href={href} target={target}><span className="cta-label">{children}</span><span className="cta-arrow">→</span></a>;
  return <button className={cls} onClick={onClick}><span className="cta-label">{children}</span><span className="cta-arrow">→</span></button>;
};

window.CTAGhost = function CTAGhost({ children, onClick, href, target }) {
  const cls = 'cta-ghost';
  if (href) return <a className={cls} href={href} target={target}><span>{children}</span></a>;
  return <button className={cls} onClick={onClick}><span>{children}</span></button>;
};

// ============================================================
// PageHero — reusable interior page hero
// ============================================================
window.PageHero = function PageHero({ eyebrow, title, titleEm, lead, breadcrumb }) {
  return (
    <section className="page-hero">
      <div className="ph-grain" />
      {breadcrumb && <window.Breadcrumbs trail={breadcrumb} />}
      <span className="ph-eye">{eyebrow}</span>
      <h1 className="ph-title" style={{ fontFamily: window.FONTS.italiana }}>
        {title}
        {titleEm && <><br /><em style={{ fontFamily: window.FONTS.cormorant, fontWeight: 400 }}>{titleEm}</em></>}
      </h1>
      {lead && <p className="ph-lead" style={{ fontFamily: window.FONTS.cormorant }}><em>{lead}</em></p>}
    </section>
  );
};

// ============================================================
// RelatedRituals — interlinking block
// ============================================================
window.RelatedRituals = function RelatedRituals({ excludeSlug, title = 'Outros rituais' }) {
  const others = window.RITUALS.filter(r => r.slug !== excludeSlug).slice(0, 3);
  return (
    <section className="related">
      <h3 className="rel-title" style={{ fontFamily: window.FONTS.italiana }}>{title}</h3>
      <div className="rel-grid">
        {others.map(r => (
          <a key={r.slug} href={'massagens.html#' + r.slug} className="rel-card">
            <span className="rel-num">{r.id}</span>
            <span className="rel-name" style={{ fontFamily: window.FONTS.italiana }}>{r.name}</span>
            <span className="rel-note" style={{ fontFamily: window.FONTS.cormorant }}><em>{r.note}</em></span>
            <span className="rel-meta"><span>{r.time}</span><span>{r.price}</span></span>
            <span className="rel-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
};
