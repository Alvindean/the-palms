// ============================================================
// Massagistas page — editorial mosaic of therapist portraits
// Photos read from window.THERAPISTS — edit there to add/remove.
// ============================================================
var { useState: __mgUseState, useEffect: __mgUseEffect } = React;

// ─────────────────────────────────────────────────────────────
// 🌴 EDIT YOUR THERAPISTS HERE
// ─────────────────────────────────────────────────────────────
// HOW TO ADD/EDIT/REMOVE A THERAPIST:
//
// 1. Each therapist is one entry in the array below:
//      { name: "Bia",   img: "assets/therapists/02-bia.jpg" }
//
// 2. Upload your photo to Wix Media Manager → right-click image →
//    "Get URL" → paste it as the `img` value (keep the quotes).
//
// 3. Want a tall card?    Add  size: "tall"
//    Want a short card?   Add  size: "short"
//    Want a medium card?  Add  size: "medium"
//    No `size`?           It uses the default size.
//    The mix of sizes creates the magazine-style mosaic look.
//
// 4. To remove a therapist: delete that line (and the comma after it).
//
// 5. To add a new one: copy any existing line, paste it below,
//    and change the name + photo URL.
// ─────────────────────────────────────────────────────────────
// FAQ entries — also injected as JSON-LD in massagistas.html
window.MG_FAQ = [
  {
    q: "As terapeutas de The Palms são profissionais formadas?",
    a: "Sim. Toda terapeuta da casa tem formação em massoterapia, com base em anatomia, fisiologia e ética profissional. Trabalhamos exclusivamente como casa de massagem desde 2008 e contratamos apenas profissionais com formação reconhecida e experiência comprovada."
  },
  {
    q: "Posso pedir a mesma terapeuta nas próximas reservas?",
    a: "Sim. Cada terapeuta tem agenda individual e fidelizar é comum aqui. Basta nos dizer o nome dela no WhatsApp ao reservar e ajustamos a agenda. Se ela não estiver disponível no horário que você quer, sugerimos uma terapeuta com perfil próximo."
  },
  {
    q: "Quantas massagistas trabalham em The Palms?",
    a: "Mantemos uma equipe ativa de doze terapeutas, com rotação semanal de agendas. Em qualquer dia útil há entre quatro e seis terapeutas em atendimento simultâneo, em salas privativas independentes."
  },
  {
    q: "Como vocês indicam a terapeuta certa para mim?",
    a: "Conversamos pelo WhatsApp antes da reserva. Pedimos três informações: qual ritual você quer, como o seu corpo está hoje (tensão, cansaço, área específica) e que tipo de presença você prefere — silenciosa ou conversadora, firme ou contemplativa. Com isso, sugerimos uma terapeuta. A decisão final é sempre sua."
  },
  {
    q: "As preferências que eu disser ficam confidenciais?",
    a: "Sim. Discrição é parte do ofício. Nenhum dado de cliente circula entre terapeutas além do que é necessário para conduzir o ritual. Nenhum nome ou preferência é discutido fora da casa. Sua reserva, suas preferências e sua presença ficam apenas em The Palms."
  },
  {
    q: "Posso conhecer a terapeuta antes da reserva?",
    a: "Os retratos da equipe estão acima nesta página — clique em qualquer um para ampliar. Não fazemos visitas presenciais antes da reserva, por discrição com as terapeutas em atendimento. Mas podemos te contar pelo WhatsApp sobre o estilo de toque, especialidades e disponibilidade de qualquer uma delas."
  }
];

window.THERAPISTS = window.THERAPISTS || [];
// ─────────────────────────────────────────────────────────────

function MassagistasPage() {
  const { ReserveChrome, Header, openReserve } = window.useReserve('massagistas');
  const [lbIdx, setLbIdx] = __mgUseState(null);

  const open = (i) => { setLbIdx(i); document.body.style.overflow = 'hidden'; };
  const close = () => { setLbIdx(null); document.body.style.overflow = ''; };
  const next = () => setLbIdx((i) => (i + 1) % window.THERAPISTS.length);
  const prev = () => setLbIdx((i) => (i - 1 + window.THERAPISTS.length) % window.THERAPISTS.length);

  __mgUseEffect(() => {
    if (lbIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lbIdx]);

  return (
    <>
      <Header />
      <window.PageHero
        eyebrow="EQUIPE · VILA OLÍMPIA"
        title="Nossas massagistas."
        titleEm="Mãos que conhecem o ofício."
        lead="Conheça as terapeutas que conduzem os rituais de The Palms — clique em qualquer retrato para ampliar."
        breadcrumb={[{ label: 'Massagistas' }]}
      />

      {/* ─────────── INTRO ESSAY ─────────── */}
      <section className="mg-essay">
        <div className="mg-essay-inner">
          <span className="mg-essay-eye">A EQUIPE · THE PALMS</span>
          <h2 className="mg-essay-h" style={{ fontFamily: window.FONTS.italiana }}>
            Mãos formadas, presença treinada,<br />discrição como segunda língua.
          </h2>
          <div className="mg-essay-body" style={{ fontFamily: window.FONTS.cormorant }}>
            <p><em>
              The Palms é uma <strong>casa de massagem em Vila Olímpia</strong> que opera com uma equipe
              de massoterapeutas selecionadas, todas com formação reconhecida em massoterapia,
              anatomia e fisiologia. Não trabalhamos com terapeutas avulsas: cada profissional que conduz
              um ritual aqui é parte da casa, treinada na leitura do corpo de quem chega e no ritmo de
              quem precisa pausar a cidade.
            </em></p>
            <p><em>
              A equipe atende rituais sensoriais, tântricos, a quatro mãos, para casais, com pedras
              quentes e banho sensorial — em <strong>salas privativas</strong>, com agendas
              individualizadas. Cada terapeuta tem uma assinatura própria de toque, ritmo e respiração.
              Algumas conduzem com firmeza e profundidade; outras com lentidão e silêncio. Não há um
              estilo único da casa — há doze formas de chegar ao mesmo lugar.
            </em></p>
            <p><em>
              <strong>Discrição é parte do ofício.</strong> Nenhum nome de cliente circula entre
              terapeutas. Nenhuma reserva é discutida fora da casa. As preferências que você declara
              ficam apenas no ritual.
            </em></p>
          </div>
        </div>
      </section>

      <section className="mg-section">
        <div className="mg-grid">
          {window.THERAPISTS.map((t, i) => (
            <div
              key={i}
              className={`mg-card ${t.size || ''}`}
              onClick={() => open(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') open(i); }}
              aria-label={`Ver retrato de ${t.name}, massoterapeuta · especialidade ${t.tag}`}
            >
              <span className="mg-num">{String(i + 1).padStart(2, '0')}</span>
              <img
                src={t.img}
                alt={`Retrato de ${t.name} — massoterapeuta em The Palms São Paulo, Vila Olímpia. Especialidade: ${t.tag}.`}
                loading="lazy"
                decoding="async"
                width="800"
                height="1200"
              />
              <div className="mg-name-strip">
                <div className="mg-name-text" style={{ fontFamily: window.FONTS.italiana }}>{t.name}</div>
                <div className="mg-name-meta">{t.tag.toUpperCase()} · {t.years} ANOS</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mg-cta">
          <h3 style={{ fontFamily: window.FONTS.italiana }}>Não sabe quem escolher?</h3>
          <p style={{ fontFamily: window.FONTS.cormorant }}>
            <em>Conte sobre o seu momento no WhatsApp — indicamos a terapeuta certa para o seu ritual.</em>
          </p>
          <window.CTAPrimary onClick={() => openReserve()}>RESERVAR PELO WHATSAPP</window.CTAPrimary>
        </div>
      </section>

      {/* ─────────── COMO ESCOLHER ─────────── */}
      <section className="mg-howto">
        <div className="mg-howto-inner">
          <span className="mg-howto-eye">COMO ESCOLHER</span>
          <h2 className="mg-howto-h" style={{ fontFamily: window.FONTS.italiana }}>
            Quatro modos de chegar à terapeuta certa.
          </h2>
          <div className="mg-howto-grid">
            <article className="mg-howto-card">
              <span className="mg-howto-num">01</span>
              <h3 style={{ fontFamily: window.FONTS.italiana }}>Pelo ritual</h3>
              <p style={{ fontFamily: window.FONTS.cormorant }}><em>
                Cada terapeuta tem rituais nos quais é particularmente forte. Algumas conduzem o
                Ritual Sensorial com leveza; outras são referência em Pedras Quentes ou no Tântrico.
                Diga qual ritual você quer e indicamos quem combina com ele.
              </em></p>
            </article>
            <article className="mg-howto-card">
              <span className="mg-howto-num">02</span>
              <h3 style={{ fontFamily: window.FONTS.italiana }}>Pelo seu corpo hoje</h3>
              <p style={{ fontFamily: window.FONTS.cormorant }}><em>
                Tensão alta, cansaço acumulado, lombar travada, semana exaustiva — cada estado pede
                um toque diferente. Conte como o corpo chega e sugerimos uma terapeuta com leitura
                e ritmo adequados ao momento.
              </em></p>
            </article>
            <article className="mg-howto-card">
              <span className="mg-howto-num">03</span>
              <h3 style={{ fontFamily: window.FONTS.italiana }}>Pela energia</h3>
              <p style={{ fontFamily: window.FONTS.cormorant }}><em>
                Algumas conduzem em silêncio. Outras conversam quando você quer. Algumas têm toque
                firme; outras são lentas e contemplativas. Diga o que você quer encontrar — ou o
                que quer evitar — e indicamos por afinidade.
              </em></p>
            </article>
            <article className="mg-howto-card">
              <span className="mg-howto-num">04</span>
              <h3 style={{ fontFamily: window.FONTS.italiana }}>Pela continuidade</h3>
              <p style={{ fontFamily: window.FONTS.cormorant }}><em>
                Voltou e gostou de quem te atendeu? Pode pedir a mesma terapeuta nas próximas
                reservas. Acompanhamos a agenda dela individualmente; basta dizer o nome no
                WhatsApp e reservamos diretamente.
              </em></p>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="mg-faq" id="faq-equipe">
        <div className="mg-faq-inner">
          <span className="mg-faq-eye">PERGUNTAS FREQUENTES · A EQUIPE</span>
          <h2 className="mg-faq-h" style={{ fontFamily: window.FONTS.italiana }}>
            Sobre nossas massagistas.
          </h2>
          <div className="mg-faq-list">
            {window.MG_FAQ.map((q, i) => (
              <details key={i} className="mg-faq-q">
                <summary style={{ fontFamily: window.FONTS.italiana }}>
                  <span>{q.q}</span>
                  <span className="mg-faq-plus" aria-hidden="true">+</span>
                </summary>
                <div className="mg-faq-a" style={{ fontFamily: window.FONTS.cormorant }}>
                  <p><em>{q.a}</em></p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lbIdx !== null && (
        <div className="mg-lb on" role="dialog" aria-modal="true" onClick={(e) => { if (e.target.classList.contains('mg-lb')) close(); }}>
          <div className="mg-lb-stage">
            <div className="mg-lb-top">
              <span>{String(lbIdx + 1).padStart(2, '0')} / {String(window.THERAPISTS.length).padStart(2, '0')}</span>
              <button className="mg-lb-close" onClick={close} aria-label="Fechar">×</button>
            </div>
            <div className="mg-lb-img-wrap">
              <button className="mg-lb-arrow mg-lb-prev" onClick={prev} aria-label="Anterior">‹</button>
              <img
                className="mg-lb-img"
                src={window.THERAPISTS[lbIdx].img}
                alt={`Retrato de ${window.THERAPISTS[lbIdx].name} — massoterapeuta em The Palms São Paulo. ${window.THERAPISTS[lbIdx].tag}, ${window.THERAPISTS[lbIdx].touch.toLowerCase()}.`}
                width="900"
                height="1350"
              />
              <button className="mg-lb-arrow mg-lb-next" onClick={next} aria-label="Próxima">›</button>
            </div>
            <div className="mg-lb-bottom">
              <div className="mg-lb-name" style={{ fontFamily: window.FONTS.italiana }}>{window.THERAPISTS[lbIdx].name}</div>
              <div className="mg-lb-bio">
                <span className="mg-lb-bio-item">{window.THERAPISTS[lbIdx].tag}</span>
                <span className="mg-lb-bio-sep">·</span>
                <span className="mg-lb-bio-item">{window.THERAPISTS[lbIdx].touch}</span>
                <span className="mg-lb-bio-sep">·</span>
                <span className="mg-lb-bio-item">{window.THERAPISTS[lbIdx].years} anos de ofício</span>
              </div>
              <div className="mg-lb-meta">THE PALMS · VILA OLÍMPIA</div>
              <button className="mg-lb-cta" onClick={() => { close(); openReserve(); }}>RESERVAR RITUAL →</button>
            </div>
          </div>
        </div>
      )}

      <ReserveChrome />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MassagistasPage />);
