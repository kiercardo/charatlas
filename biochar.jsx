/* CharAtlas — Biochar knowledge page. Exposes window.BioPage. */
(function () {
  const CAX = window.CharAtlasDesignSystem_9427fe;

  function BioPage({ onRequest }) {
    const t = window.useT();
    return (
      <main>
        <section className="bio-hero">
          <div className="site-hero__grid cax-mapgrid"></div>
          <div className="site__wrap">
            <div className="cax-eyebrow" style={{ marginBottom: 'var(--space-5)' }}>{t('bio.eyebrow')}</div>
            <h1>{t('bio.h1')}</h1>
            <p className="lede">{t('bio.lede')}</p>
          </div>
        </section>

        <section className="site-sec" id="what">
          <div className="site__wrap">
            <div className="bio-what">
              <div>
                <div className="site-sec__head" style={{ marginBottom: 'var(--space-5)' }}><h2>{t('bio.whatH2')}</h2></div>
                <p className="bio-p">{t('bio.p1')}</p>
                <p className="bio-p">{t('bio.p2')}</p>
              </div>
              <div className="bio-specs">
                <figure className="bio-photo">
                  <img src={window.BIOCHAR_IMG || 'assets/biochar-pile.png'} alt="Biochar" />
                  <figcaption>Courtesy of tohamina / magnific.com</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        <window.SitePhotoStrip />

        <section className="site-sec bio-sec--tint" id="agronomic">
          <div className="site__wrap">
            <div className="cax-eyebrow site-sec__eyebrow">{t('bio.agroEyebrow')}</div>
            <div className="site-sec__head">
              <h2>{t('bio.agroH2')}</h2>
              <p>{t('bio.agroP')}</p>
            </div>
            <div className="bio-meters">
              {t('bio.meters').map((m) => (
                <div className="bio-meter" key={m.label}>
                  <CAX.Meter label={m.label} value={m.value} display={m.display} />
                </div>
              ))}
            </div>
            <p className="bio-note">{t('bio.agroNote')}</p>
          </div>
        </section>

        <section className="site-sec" id="economic">
          <div className="site__wrap">
            <div className="cax-eyebrow site-sec__eyebrow">{t('bio.econEyebrow')}</div>
            <div className="site-sec__head">
              <h2>{t('bio.econH2')}</h2>
              <p>{t('bio.econP')}</p>
            </div>
            <div className="bio-table">
              {t('bio.rows').map(([k, v]) => (
                <div className="site-match__row" key={k}><span className="site-match__k">{k}</span><span className="site-match__v">{v}</span></div>
              ))}
            </div>
            <p className="bio-note">{t('bio.econNote')}</p>
            <div className="site-hero__cta" style={{ marginTop: 'var(--space-7)' }}>
              <CAX.Button size="lg" trailingIcon={<i data-lucide="arrow-right"></i>} onClick={() => { window.location.href = 'landing.html'; }}>{t('bio.cta1')}</CAX.Button>
              <CAX.Button size="lg" variant="secondary" onClick={() => { window.location.href = 'index.html#data'; }}>{t('bio.cta2')}</CAX.Button>
            </div>
          </div>
        </section>
      </main>
    );
  }
  window.BioPage = BioPage;
})();
