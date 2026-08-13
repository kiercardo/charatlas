/* CharAtlas website — page sections, i18n-aware. Exposes window.Site*. */
(function () {
  const CAX = window.CharAtlasDesignSystem_9427fe;
  const DASH_URL = '../ui_kits/dashboards/index.html';

  function SiteNav({ onRequest, here = 'home' }) {
    const t = window.useT();
    const pre = here === 'home' ? '' : 'index.html';
    const links = [
      [t('nav.matching'), pre + '#matching'], [t('nav.unlocks'), pre + '#platform'],
      [t('nav.data'), pre + '#data'],
    ];
    return (
      <header className="site-nav">
        <div className="site__wrap site-nav__in">
          <window.SiteLogo size={26} href={here === 'home' ? '#top' : 'index.html'} />
          <nav className="site-nav__links">
            {links.map(([l, h]) => <a href={h} key={l}>{l}</a>)}
            <a href="applications.html" className={here === 'apps' ? 'is-here' : ''}>{t('nav.applications')}</a>
            <a href="biochar.html" className={here === 'biochar' ? 'is-here' : ''}>{t('nav.biochar')}</a>
            <a href="team.html" className={here === 'team' ? 'is-here' : ''}>{t('nav.team')}</a>
          </nav>
          <div className="site-nav__cta">
            <window.LangToggle />
            <CAX.Button size="sm" onClick={onRequest}>{t('nav.request')}</CAX.Button>
          </div>
        </div>
      </header>
    );
  }

  function HeroCalc() {
    const t = window.useT();
    const E = window.ENG;
    const [price, setPrice] = React.useState(75);
    const [sub, setSub] = React.useState(10);
    const out = E.breakEven(Object.assign({}, E.DEFAULTS, { price: price, substitution: sub }), 'biogenic');
    const r = out.rows[4];
    return (
      <div className="hcalc">
        <div className="hcalc__bar">
          <span>{t('hero.calcLab')}</span>
          <span className="amk__live"><i></i>2030</span>
        </div>
        <div className="hcalc__body">
          <span className="hcalc__q">{t('hero.calcQ')}</span>
          <span className="hcalc__fig cax-tnum">{E.eur(r.be)}</span>
          <span className="hcalc__unit">{t('hero.calcUnit')}</span>
          <div className="hcalc__ctrls">
            <label className="hcalc__ctrl">
              <span className="hcalc__lab">{t('hero.calcPrice')}<b>{'\u20ac' + price}/t</b></span>
              <input type="range" min="40" max="140" step="5" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </label>
            <label className="hcalc__ctrl">
              <span className="hcalc__lab">{t('hero.calcSub')}<b>{sub + '%'}</b></span>
              <input type="range" min="0" max="40" step="1" value={sub} onChange={(e) => setSub(Number(e.target.value))} />
            </label>
          </div>
          <div className="hcalc__rows">
            <div className="hcalc__row"><span>{t('hero.calcFloor')}</span><b>{E.eur(out.floor)}/t</b></div>
            <div className="hcalc__row is-accent"><span>{t('hero.calcPrem')}</span><b>+{E.eur(r.be - out.floor)}/t</b></div>
            <div className="hcalc__row"><span>{t('hero.calcSave')}</span><b>{E.compact(r.annual)}</b></div>
          </div>
          <span className="hcalc__foot">{t('hero.calcFoot')}</span>
        </div>
      </div>
    );
  }

  function SiteHero({ onRequest }) {
    const t = window.useT();
    return (
      <section className="site-hero">
        <div className="site__wrap site-hero__split">
          <div className="site-hero__in">
            <div className="cax-eyebrow" style={{ marginBottom: 'var(--space-5)' }}>{t('hero.eyebrow')}</div>
            <h1>{t('hero.h1')}</h1>
            <p className="lede">{t('hero.lede')}</p>
            <div className="site-hero__cta">
              <CAX.Button size="lg" trailingIcon={<i data-lucide="arrow-right"></i>} onClick={onRequest}>{t('hero.cta1')}</CAX.Button>
              <CAX.Button size="lg" variant="secondary" leadingIcon={<i data-lucide="book-open"></i>} onClick={() => { window.location.href = 'applications.html'; }}>{t('hero.cta2')}</CAX.Button>
            </div>
          </div>
          <div className="hero-3d">
            <biochar-3d class="hero-3d__stage"></biochar-3d>
          </div>
        </div>
      </section>
    );
  }

  function SiteAffil() {
    return null;
  }

  function SiteProblem() {
    const t = window.useT();
    return (
      <section className="site-sec" id="problem">
        <div className="site__wrap">
          <div className="cax-eyebrow site-sec__eyebrow">{t('problem.eyebrow')}</div>
          <div className="site-sec__head">
            <h2>{t('problem.h2')}</h2>
            <p>{t('problem.p')}</p>
          </div>
          <div className="site-prob">
            {t('problem.items').map((it, i) => (
              <div className="site-prob__item" key={it.t}>
                <span className="site-pipe__n">{'0' + (i + 1)}</span>
                <h4>{it.t}</h4>
                <p>{it.p}</p>
              </div>
            ))}
          </div>
          <p className="site-prob__claim">{t('problem.foot')}</p>
        </div>
      </section>
    );
  }

  function SiteFinalCta({ onRequest }) {
    const t = window.useT();
    return (
      <section className="site-sec site-final" id="access">
        <div className="site__wrap site-final__in">
          <h2>{t('finalcta.h2')}</h2>
          <p>{t('finalcta.p')}</p>
          <div className="site-hero__cta" style={{ justifyContent: 'center' }}>
            <CAX.Button size="lg" trailingIcon={<i data-lucide="arrow-right"></i>} onClick={onRequest}>{t('finalcta.cta1')}</CAX.Button>
            <CAX.Button size="lg" variant="secondary" onClick={() => { window.location.hash = '#data'; }}>{t('finalcta.cta2')}</CAX.Button>
          </div>
        </div>
      </section>
    );
  }

  function EngineDemo() {
    const t = window.useT();
    const E = window.ENG;
    const ui = t('matching.ui');
    const names = t('matching.classNames');
    const batch = E.BATCHES[0];
    const el = E.eligibility(batch);
    const [year, setYear] = React.useState(4);
    const out = E.breakEven(E.DEFAULTS, 'biogenic');
    const r = out.rows[year];
    const lo = Math.min.apply(null, out.rows.map((x) => x.be));
    const hi = Math.max.apply(null, out.rows.map((x) => x.be));
    const sx = (i) => 8 + (244 * i) / 8;
    const sy = (v) => 56 - (44 * (v - lo)) / (hi - lo || 1);
    return (
      <div className="amk amk--two">
        <div className="amk__bar">
          <window.SiteLogo tone="white" size={16} href={null} />
          <nav className="amk__tabs">{ui.tabs.map((tb, i) => <span key={tb} className={i === 0 ? 'is-on' : ''}>{tb}</span>)}</nav>
          <span className="amk__org">{ui.org}</span>
        </div>
        <div className="amk__crumb"><span>{ui.crumb}</span><span className="amk__live"><i></i>{ui.live}</span></div>
        <div className="amk__body">
          <div className="amk__col">
            <span className="amk__lab">{t('matching.recordLab')}</span>
            {t('matching.record').map(([k, v]) => (
              <div className="site-match__row" key={k}><span className="site-match__k">{k}</span><span className="site-match__v">{v}</span></div>
            ))}
            <div className="amk__meterrow"><span>{ui.complete}</span><span className="cax-num">96%</span></div>
            <div className="amk__meter"><i style={{ '--w': '96%' }}></i></div>
            <span className="amk__lab" style={{ marginTop: 'var(--space-6)' }}>{ui.classesPanel}</span>
            <div className="engc">
              {el.rows.map((c) => (
                <div className={'engc__row' + (c.pass ? '' : ' is-off')} key={c.cls.id}>
                  <span className="engc__name">{names[c.cls.id]}</span>
                  <span className="engc__bar"><i style={{ width: c.pass ? Math.max(6, c.headroom * 100) + '%' : '0%' }}></i></span>
                  <span className="engc__v">{c.pass ? E.pct(c.headroom) : t('matching.blockedLab')}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="amk__col site-match__core">
            <div className="site-match__grid cax-mapgrid--ink"></div>
            <span className="amk__lab">{t('matching.q1')}</span>
            <div className="site-match__hero">
              <span className="site-match__big cax-tnum js-count">{el.qualified}<small style={{ fontSize: '0.4em', color: 'var(--grey-500)' }}>{' / ' + el.total}</small></span>
              <span className="site-match__cap">{t('matching.q1cap')}</span>
            </div>
            <span className="amk__lab" style={{ marginTop: 'var(--space-5)' }}>{t('matching.q2')}</span>
            <div className="site-match__hero" style={{ borderBottom: 0 }}>
              <span className="site-match__big cax-tnum" key={'y' + year}>{E.eur(r.be)}</span>
              <span className="site-match__cap">{t('matching.q2cap').replace('2030', String(r.year))}</span>
            </div>
            <svg className="engspark" viewBox="0 0 260 68" role="img" aria-label="Break-even price 2026 to 2034">
              <path d={out.rows.map((x, i) => (i ? 'L' : 'M') + sx(i).toFixed(1) + ' ' + sy(x.be).toFixed(1)).join(' ')} />
              {out.rows.map((x, i) => (
                <circle key={x.year} cx={sx(i)} cy={sy(x.be)} r={i === year ? 4.5 : 2.5} className={i === year ? 'is-on' : ''}
                  onClick={() => setYear(i)} />
              ))}
              <text x="8" y="67">2026</text>
              <text x="252" y="67" textAnchor="end">2034</text>
            </svg>
            <div className="engfoot">
              <div className="site-match__row"><span className="site-match__k">{t('matching.floorLab')}</span><span className="site-match__v">{E.eur(out.floor)}/t</span></div>
              <div className="site-match__row"><span className="site-match__k">{t('matching.premLab')}</span><span className="site-match__v" style={{ color: 'var(--green-100)' }}>+{E.eur(r.be - out.floor)}/t</span></div>
            </div>
          </div>
        </div>
        <div className="amk__status"><span>{ui.statusL}</span><span>{ui.statusR}</span></div>
      </div>
    );
  }

  function SiteMatching() {
    const t = window.useT();
    return (
      <section className="site-sec" id="matching">
        <div className="site__wrap">
          <div className="cax-eyebrow site-sec__eyebrow">{t('matching.eyebrow')}</div>
          <div className="site-sec__head">
            <h2>{t('matching.h2')}</h2>
            <p>{t('matching.p')}</p>
          </div>
          <a className="engshot" href="applications.html">
            <img src="assets/solution-shot.png" alt={t('matching.shotAlt')} />
          </a>
          <div className="engshot__cta">
            <CAX.Button variant="secondary" trailingIcon={<i data-lucide="arrow-right"></i>} onClick={() => { window.location.href = 'applications.html'; }}>{t('matching.shotCta')}</CAX.Button>
          </div>
          <div className="site-prob" style={{ marginTop: 'var(--space-7)', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {t('matching.points').map((pt) => (
              <div className="site-prob__item" key={pt.t}>
                <h4 style={{ marginTop: 0 }}>{pt.t}</h4>
                <p>{pt.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function SiteProducts() {
    const t = window.useT();
    const icons = ['file-check-2', 'sprout', 'shield-check', 'landmark'];
    return (
      <section className="site-sec" id="platform">
        <div className="site__wrap">
          <div className="cax-eyebrow site-sec__eyebrow">{t('products.eyebrow')}</div>
          <div className="site-sec__head">
            <h2>{t('products.h2')}</h2>
            <p>{t('products.p')}</p>
          </div>
          <div className="site-products site-products--4">
            {t('products.items').map((it, i) => (
              <div className="site-prod" key={it.title}>
                <div className="site-prod__icn"><i data-lucide={icons[i]}></i></div>
                <span className="site-prod__tag">{it.tag}</span>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </div>
          <p className="site-match__foot">{t('products.foot')}</p>
        </div>
      </section>
    );
  }

  function SitePipeline() {
    const t = window.useT();
    return (
      <section className="site-sec" id="data">
        <div className="site__wrap">
          <div className="cax-eyebrow site-sec__eyebrow">{t('pipeline.eyebrow')}</div>
          <div className="site-sec__head"><h2>{t('pipeline.h2')}</h2></div>
          <div className="site-pipe">
            {t('pipeline.steps').map((s) => (
              <div className="site-pipe__step" key={s.n}>
                <span className="site-pipe__n">{s.n}</span>
                <h4>{s.t}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function SiteBand() {
    const t = window.useT();
    return (
      <section className="site-band" id="lenders">
        <div className="site-band__grid cax-mapgrid--ink"></div>
        <div className="site__wrap" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
          <div style={{ position: 'relative', fontFamily: 'var(--font-mono)', fontSize: 15, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--grey-400)', marginBottom: 'var(--space-8)' }}>{t('affil.label')}:</div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 'var(--space-10)', flexWrap: 'wrap' }}>
            {t('affil.items').map((a) => (
              <img key={a.n} src={a.src} alt={a.n} style={{ height: a.h || 'auto', width: a.w || 'auto', maxWidth: '100%', objectFit: 'contain', display: 'block' }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  function SiteMapFeature() {
    const t = window.useT();
    const sites = [
      { xy: ['30%', '34%'], c: '52.37° N · 4.89° E', g: 'GRID 31U' },
      { xy: ['46%', '22%'], c: '59.33° N · 18.06° E', g: 'GRID 34V' },
      { xy: ['58%', '18%'], c: '61.50° N · 23.76° E', g: 'GRID 35V' },
      { xy: ['40%', '54%'], c: '51.05° N · 13.74° E', g: 'GRID 33U' },
      { xy: ['66%', '42%'], c: '60.39° N · 5.32° E', g: 'GRID 32V' },
      { xy: ['52%', '66%'], c: '41.15° N · 8.61° W', g: 'GRID 29T' },
    ];
    const [live, setLive] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setLive((v) => (v + 1) % sites.length), 2400);
      return () => clearInterval(id);
    }, []);
    const s = sites[live];
    return (
      <section className="site-sec" id="coverage">
        <div className="site__wrap">
          <div className="site-map">
            <div>
              <div className="cax-eyebrow site-sec__eyebrow">{t('map.eyebrow')}</div>
              <div className="site-sec__head" style={{ marginBottom: 0 }}>
                <h2>{t('map.h2')}</h2>
                <p>{t('map.p')}</p>
              </div>
              <ul className="site-feature-list">
                {t('map.feats').map((f) => (
                  <li key={f}><i data-lucide="check"></i><span>{f}</span></li>
                ))}
              </ul>
            </div>
            <div className="site-map__panel">
              <div className="term-map__grid cax-mapgrid--ink"></div>
              {sites.map((d, i) => <span className={'site-map__dot' + (i === live ? ' is-live' : '')} key={i} style={{ left: d.xy[0], top: d.xy[1] }}></span>)}
              <span className="site-map__coord">{s.c} · {s.g}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function SitePhotoStrip() {
    const t = window.useT();
    const figs = [<window.SchemPyrolysis key="p" />, <window.SchemField key="f" />];
    return (
      <section className="site-sec" id="material">
        <div className="site__wrap">
          <div className="cax-eyebrow site-sec__eyebrow">{t('photos.label')}</div>
          <div className="site-photos">
            {t('photos.items').map((it, i) => (
              <figure className="photo-fig" key={it.cap}>
                <div className="photo-fig__frame">{figs[i]}</div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function SiteFooter({ onRequest }) {
    const t = window.useT();
    return (
      <footer className="site-foot">
        <div className="site__wrap">
          <div className="site-foot__top">
            <div className="site-foot__col">
              <window.SiteLogo tone="white" size={26} href={null} />
              <p className="site-foot__blurb">{t('footer.blurb')}</p>
              <a className="site-foot__mail" href="mailto:hello@charatlas.eu">hello@charatlas.eu</a>
            </div>
            {t('footer.cols').map((c) => (
              <div className="site-foot__col" key={c.h}>
                <h5>{c.h}</h5>
                {c.links.map(([l, href]) => (
                  href === 'request'
                    ? <a href="#top" key={l} onClick={(e) => { e.preventDefault(); onRequest(); }}>{l}</a>
                    : <a href={href} key={l}>{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div className="site-foot__bottom">
            <span>{t('footer.bottom')}</span>
            <span>EU MARKET · GRID 31U–34V</span>
          </div>
        </div>
      </footer>
    );
  }

  /* ---- request access modal ---------------------------------------------- */
  function RequestAccessModal({ open, onClose }) {
    const t = window.useT();
    const [form, setForm] = React.useState({ name: '', email: '', org: 0 });
    const [errors, setErrors] = React.useState({});
    const [sent, setSent] = React.useState(false);
    const [busy, setBusy] = React.useState(false);
    React.useEffect(() => {
      if (!open) return;
      window.lucide && window.lucide.createIcons();
      const onKey = (e) => { if (e.key === 'Escape') onClose(); };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }, [open, sent]);
    if (!open) return null;
    const opts = t('modal.options');
    const submit = (e) => {
      e.preventDefault();
      const errs = {};
      if (!form.name.trim()) errs.name = t('modal.errName');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('modal.errEmail');
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;
      setBusy(true);
      fetch('https://formspree.io/f/mbdnqldz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ form: 'request-access', name: form.name, email: form.email, role: opts[form.org] }),
      }).then((r) => {
        if (r.ok) setSent(true);
        else setErrors({ email: t('modal.errNet') });
      }).catch(() => setErrors({ email: t('modal.errNet') })).finally(() => setBusy(false));
    };
    const close = () => { onClose(); setSent(false); setErrors({}); };
    return (
      <div className="md__overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="md__box" role="dialog" aria-modal="true" aria-label={t('modal.bar')}>
          <div className="md__bar">
            <span className="cax-coord">{t('modal.bar')}</span>
            <CAX.IconButton size="sm" variant="ghost" label="Close" onClick={close}><i data-lucide="x"></i></CAX.IconButton>
          </div>
          {sent ? (
            <div className="md__body">
              <CAX.Badge tone="positive" dot>{t('modal.sentBadge')}</CAX.Badge>
              <h3 className="md__h">{t('modal.sentH')}</h3>
              <p className="md__p">{t('modal.sentP')}</p>
              <CAX.Button onClick={close}>{t('modal.done')}</CAX.Button>
            </div>
          ) : (
            <form className="md__body" onSubmit={submit} noValidate>
              <h3 className="md__h">{t('modal.h')}</h3>
              <p className="md__p">{t('modal.p')}</p>
              <CAX.Input label={t('modal.name')} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} error={errors.name} placeholder="A. Lindqvist" />
              <CAX.Input label={t('modal.email')} type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} error={errors.email} placeholder="name@organization.eu" mono />
              <CAX.Select label={t('modal.youare')} value={opts[form.org]} onChange={(e) => setForm((f) => ({ ...f, org: opts.indexOf(e.target.value) }))}>
                {opts.map((o) => <option key={o}>{o}</option>)}
              </CAX.Select>
              <div className="md__actions">
                <CAX.Button type="submit" disabled={busy}>{busy ? '…' : t('modal.submit')}</CAX.Button>
                <CAX.Button type="button" variant="ghost" onClick={close}>{t('modal.cancel')}</CAX.Button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  Object.assign(window, { SiteNav, SiteHero, HeroCalc, EngineDemo, SiteAffil, SiteProblem, SiteFinalCta, SiteMatching, SiteProducts, SitePipeline, SiteBand, SiteMapFeature, SitePhotoStrip, SiteFooter, RequestAccessModal });
})();
