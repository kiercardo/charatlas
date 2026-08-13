/* CharAtlas — Applications page: static terminal screens. Exposes window.TermScreens. */
(function () {
  const CAX = window.CharAtlasDesignSystem_9427fe;
  const NAV = [
    { id: 'dashboard', label: 'Portfolio', icon: 'layout-dashboard' },
    { id: 'registry', label: 'Registry', icon: 'table-2' },
    { id: 'screening', label: 'Screening', icon: 'scan-line' },
    { id: 'reports', label: 'Reports', icon: 'file-text' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  function TermFrame({ active, crumb, children }) {
    return (
      <div className="termshot">
        <div className="termshot__scroll">
          <div className="term" aria-hidden="true">
            <header className="term__top">
              <div className="term__brand"><window.SiteLogo size={22} href={null} /></div>
              <div className="term__search">
                <i data-lucide="search"></i>
                <span className="termshot__ph">Search producers, sectors, dMRV IDs…</span>
                <span className="term__kbd">⌘K</span>
              </div>
              <div className="term__topright">
                <span className="term__clock cax-coord">EU MARKET · OPEN</span>
                <span className="term__icon"><i data-lucide="bell"></i></span>
                <div className="term__avatar">IM</div>
              </div>
            </header>
            <div className="term__body">
              <nav className="term__nav">
                <span className="term__navlabel">Workspace</span>
                {NAV.map((n) => (
                  <span key={n.id} className={'term__navitem' + (active === n.id ? ' is-active' : '')}>
                    <i data-lucide={n.icon}></i>
                    <span>{n.label}</span>
                  </span>
                ))}
                <div className="term__navfoot">
                  <span className="term__navlabel">Coverage</span>
                  <div className="term__coverage cax-coord">9 MARKETS · GRID 31U–34V<br />42 ACTIVE PRODUCERS</div>
                </div>
              </nav>
              <main className="term__main">
                <div className="term__crumb cax-eyebrow">{crumb}</div>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Head({ title, sub, actions }) {
    return (
      <div className="term-page">
        <div>
          <h3 className="term-page__title">{title}</h3>
          <p className="term-page__sub">{sub}</p>
        </div>
        {actions ? <div className="term-page__actions">{actions}</div> : null}
      </div>
    );
  }

  /* --- 1. Screening + pricing ------------------------------------------- */
  function ScreenScreening() {
    const t = window.useT();
    const c = t('apps.term').scr;
    const E = window.ENG;
    const el = E.eligibility(E.BATCHES[0]);
    const out = E.breakEven(E.DEFAULTS, 'biogenic');
    const names = t('matching.classNames');
    const r = out.rows[4];
    return (
      <TermFrame active="screening" crumb={c.crumb}>
        <Head title={c.title} sub={c.sub} actions={<CAX.Badge tone="positive" dot>{c.badge}</CAX.Badge>} />
        <div className="term-kpis">
          <CAX.StatTile label={c.k1} value={el.qualified} unit={'/ ' + el.total} />
          <CAX.StatTile label={c.k2} value={E.eur(r.be)} foot={<span className="termshot__foot">{r.year}</span>} />
          <CAX.StatTile label={c.k3} value={E.eur(out.floor)} foot={<span className="termshot__foot">{c.k3sub}</span>} />
          <CAX.StatTile label={c.k4} value="96" unit="%" foot={<div style={{ width: '100%' }}><CAX.Meter value={96} /></div>} />
        </div>
        <div className="term-grid term-grid--2" style={{ marginTop: 'var(--space-6)' }}>
          <CAX.Card title={c.classes}>
            <div className="termshot__rows">
              {el.rows.map((x) => (
                <div className="termshot__row" key={x.cls.id}>
                  <span>{names[x.cls.id]}</span>
                  <span className="termshot__bar"><i style={{ width: x.pass ? Math.max(6, x.headroom * 100) + '%' : '0%' }}></i></span>
                  {x.pass
                    ? <b className="cax-tnum">{E.pct(x.headroom)}</b>
                    : <CAX.Badge tone="neutral">{t('matching.blockedLab')}</CAX.Badge>}
                </div>
              ))}
            </div>
          </CAX.Card>
          <CAX.Card title={c.record}>
            <div className="termshot__props">
              {t('matching.record').map(([k, v]) => (
                <div className="termshot__prop" key={k}><span>{k}</span><b>{v}</b></div>
              ))}
            </div>
          </CAX.Card>
        </div>
      </TermFrame>
    );
  }

  /* --- 2. Durability ----------------------------------------------------- */
  function ScreenDurability() {
    const t = window.useT();
    const c = t('apps.term').dur;
    const bars = [{ k: c.low, v: 86.8 }, { k: c.mid, v: 89.0 }, { k: c.high, v: 90.2 }];
    return (
      <TermFrame active="reports" crumb={c.crumb}>
        <Head title={c.title} sub={c.sub} actions={<CAX.Badge tone="ink">{c.badge}</CAX.Badge>} />
        <div className="term-kpis">
          <CAX.StatTile label={c.k1} value="86.8" unit="%" foot={<span className="termshot__foot">{c.k1sub}</span>} />
          <CAX.StatTile label={c.k2} value="2.36" foot={<span className="termshot__foot">tCO₂e</span>} />
          <CAX.StatTile label={c.k3} value="2,830" foot={<span className="termshot__foot">tCO₂e / yr</span>} />
          <CAX.StatTile label={c.k4} value="0.09" foot={<span className="termshot__foot">tCO₂e</span>} />
        </div>
        <div className="term-grid term-grid--2" style={{ marginTop: 'var(--space-6)' }}>
          <CAX.Card title={c.compare}>
            <div className="termshot__rows">
              {bars.map((b) => (
                <div className="termshot__row" key={b.k}>
                  <span>{b.k}</span>
                  <span className="termshot__bar"><i style={{ width: b.v + '%' }}></i></span>
                  <b className="cax-tnum">{b.v.toFixed(1)}%</b>
                </div>
              ))}
            </div>
            <p className="termshot__note">{c.note}</p>
          </CAX.Card>
          <CAX.Card title={c.inputs}>
            <div className="termshot__props">
              {c.rows.map(([k, v]) => (<div className="termshot__prop" key={k}><span>{k}</span><b>{v}</b></div>))}
            </div>
          </CAX.Card>
        </div>
      </TermFrame>
    );
  }

  /* --- 3. Matching / registry -------------------------------------------- */
  function ScreenMatching() {
    const t = window.useT();
    const c = t('apps.term').match;
    const rows = [
      { id: 'BC-01', n: 'Vine-Cane Char 700', p: 'Domaine Carbon (FR)', s: 63 },
      { id: 'BC-04', n: 'Softwood Premium 650', p: 'Nordic Char (SE)', s: 63 },
      { id: 'BC-02', n: 'Orchard Pruning 500', p: 'Romagna Biochar (IT)', s: 62 },
      { id: 'BC-03', n: 'DairyManure BioChar', p: 'AltoAgri (ES)', s: 62 },
      { id: 'BC-07', n: 'Sewage Sludge Char', p: 'AquaPyro (NL)', s: null },
      { id: 'BC-05', n: 'GreenWaste Char 420', p: 'CityLoop (DE)', s: null },
      { id: 'BC-06', n: 'LowTemp Vine 400', p: 'TestPlot (PT)', s: null },
    ];
    return (
      <TermFrame active="registry" crumb={c.crumb}>
        <Head title={c.title} sub={c.sub} actions={<CAX.Badge tone="neutral">{c.badge}</CAX.Badge>} />
        <CAX.Card flush>
          <CAX.DataTable
            rowKey="id"
            columns={[
              { key: 'id', header: c.cId },
              { key: 'n', header: c.cName },
              { key: 'p', header: c.cProd },
              { key: 's', header: c.cScore, align: 'right', render: (v) => (v == null
                ? <CAX.Badge tone="neutral">{c.blocked}</CAX.Badge>
                : <span className="cax-tnum" style={{ fontWeight: 600 }}>{v}</span>) },
              { key: 'id', header: c.cFit, align: 'right', render: (v, row) => (row.s == null
                ? <span className="termshot__foot">—</span>
                : <span style={{ display: 'inline-flex', width: 72, marginLeft: 'auto' }}><CAX.Meter value={row.s} /></span>) },
            ]}
            rows={rows}
          />
        </CAX.Card>
      </TermFrame>
    );
  }

  /* --- 4. Capital benchmarks --------------------------------------------- */
  function ScreenCost() {
    const t = window.useT();
    const c = t('apps.term').cost;
    const rows = [
      { v: '£7', t: 'On-farm unit', u: 'per t biochar · UK · 2010', s: 'Small' },
      { v: '£25', t: 'Dedicated facility', u: 'per t biochar · UK · 2010', s: 'Mid' },
      { v: '$556', t: 'Mobile pyrolysis unit', u: 'per t biochar · US · 2022', s: 'Small' },
      { v: '$1,102', t: 'Centralised industrial unit', u: 'per t biochar · US · 2022', s: 'Large' },
      { v: 'A$250,000', t: 'Container-based mobile pyrolyser', u: 'per plant · AU · ~1,000 t/yr', s: 'Small' },
      { v: '$21.6M', t: 'Utility-scale production plant', u: 'per plant · global benchmark', s: 'Large' },
    ];
    return (
      <TermFrame active="dashboard" crumb={c.crumb}>
        <Head title={c.title} sub={c.sub} actions={<CAX.Badge tone="neutral">{c.badge}</CAX.Badge>} />
        <CAX.Card>
          <div className="termshot__rows">
            {rows.map((r) => (
              <div className="termshot__row termshot__row--cost" key={r.t}>
                <b className="cax-tnum termshot__cost">{r.v}</b>
                <span className="termshot__costt">{r.t}<small>{r.u}</small></span>
                <CAX.Badge tone="neutral">{r.s}</CAX.Badge>
              </div>
            ))}
          </div>
        </CAX.Card>
      </TermFrame>
    );
  }

  window.TermScreens = { ScreenScreening, ScreenDurability, ScreenMatching, ScreenCost };
})();
