// Rituais index page
var { useState } = React;

function MassagensPage() {
  const { ReserveChrome, Header, openReserve } = window.useReserve('massagens');

  return (
    <>
      <Header />
      <window.PageHero
        eyebrow="CASA DE MASSAGEM · VILA OLÍMPIA"
        title="Seis rituais."
        titleEm="Uma casa reservada na Vila Olímpia."
        lead="Massagem sensorial, tântrica, a quatro mãos, para casais, com pedras quentes e banho sensorial — em salas privativas, com discrição como parte do ritual. Valores informados pelo WhatsApp, conforme o ritual e a duração."
        breadcrumb={[{ label: 'Rituais' }]}
      />

      <section className="rit-index">
        <div className="rit-intro">
          <p style={{ fontFamily: window.FONTS.cormorant, fontSize: 24, lineHeight: 1.5, maxWidth: 780 }}>
            <em>
              The Palms é uma <strong>casa de massagem premium em Vila Olímpia</strong>. Cada um dos seis rituais foi
              desenhado em torno de uma única ideia: pausar a cidade. Escolha o ritual que pede o seu corpo hoje —
              ou peça orientação no WhatsApp, e indicamos.
            </em>
          </p>
        </div>

        <div className="rit-cards">
          {window.RITUALS.map((r) => (
            <button
              key={r.slug}
              id={r.slug}
              type="button"
              className="rit-card"
              onClick={() => openReserve(r.name)}
              aria-label={`Reservar ${r.name}`}
            >
              <div className="rc-meta">
                <span className="rc-num">{r.id}</span>
                <span className="rc-tag">{r.tag}</span>
              </div>
              <h2 className="rc-name" style={{ fontFamily: window.FONTS.italiana }}>{r.name}</h2>
              <p className="rc-note" style={{ fontFamily: window.FONTS.cormorant }}><em>{r.note}</em></p>
              <div className="rc-foot">
                <div className="rc-stats">
                  <span className="rc-stat"><span className="rcs-l">Duração</span><span className="rcs-v">{r.time}</span></span>
                  <span className="rc-stat"><span className="rcs-l">Investimento</span><span className="rcs-v">{r.price}</span></span>
                </div>
                <span className="rc-arrow">→</span>
              </div>
            </button>
          ))}
        </div>

        <div className="rit-cta">
          <h3 style={{ fontFamily: window.FONTS.italiana }}>Não decidiu?</h3>
          <p style={{ fontFamily: window.FONTS.cormorant }}>
            <em>Conte sobre o seu dia no WhatsApp — sugerimos o ritual ideal para o momento.</em>
          </p>
          <window.CTAPrimary onClick={() => openReserve()}>RESERVAR PELO WHATSAPP</window.CTAPrimary>
        </div>
      </section>

      <ReserveChrome />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MassagensPage />);
