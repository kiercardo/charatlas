/* CharAtlas — Applications page: one live engine, the rest as terminal screens. */
(function () {
  const CAX = window.CharAtlasDesignSystem_9427fe;

  function Shot({ live, children }) {
    const t = window.useT();
    const term = t('apps.term');
    return (
      <div className="appshot">
        <span className={'appshot__lab' + (live ? ' is-live' : '')}><i></i>{live ? term.liveLab : term.shotLab}</span>
        {children}
      </div>
    );
  }

  function AppsPage() {
    const t = window.useT();
    const S = window.TermScreens;
    return (
      <main>
        <section className="bio-hero">
          <div className="site-hero__grid cax-mapgrid"></div>
          <div className="site__wrap">
            <div className="cax-eyebrow" style={{ marginBottom: 'var(--space-5)' }}>{t('apps.eyebrow')}</div>
            <h1>{t('apps.h1')}</h1>
            <p className="lede">{t('apps.lede')}</p>
          </div>
        </section>

        <section className="site-sec bio-sec--tint" id="demo">
          <div className="site__wrap">
            <div className="site-sec__head">
              <h2>{t('apps.demoH')}</h2>
              <p>{t('apps.demoP')}</p>
            </div>
            <Shot live><window.AppTools.ImpactTool /></Shot>
          </div>
        </section>

        <section className="site-sec" id="tools">
          <div className="site__wrap">
            <div className="site-sec__head">
              <h2>{t('apps.toolsH')}</h2>
              <p>{t('apps.toolsP')}</p>
            </div>
            <div className="appstack">
              <Shot><S.ScreenScreening /></Shot>
              <Shot><S.ScreenDurability /></Shot>
              <Shot><S.ScreenMatching /></Shot>
              <Shot><S.ScreenCost /></Shot>
            </div>
            <div className="site-hero__cta" style={{ marginTop: 'var(--space-8)' }}>
              <CAX.Button size="lg" variant="secondary" leadingIcon={<i data-lucide="arrow-left"></i>} onClick={() => { window.location.href = 'index.html'; }}>{t('apps.back')}</CAX.Button>
            </div>
          </div>
        </section>
      </main>
    );
  }
  window.AppsPage = AppsPage;
})();
