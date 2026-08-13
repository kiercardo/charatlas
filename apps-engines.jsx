/* CharAtlas — Applications page engines. Exposes window.AppTools. */
(function () {
  const R = React;
  const PURO_M = {7:96.59,8:95.98,9:95.36,10:94.73,11:94.10,12:93.50,13:92.92,14:92.38,15:91.87,16:91.40,17:90.96,18:90.57,19:90.20,20:89.87,21:89.57,22:89.29,23:89.03,24:88.79,25:88.57,26:88.37,27:88.18,28:87.99,29:87.82,30:87.66,31:87.50,32:87.34,33:87.19,34:87.04,35:86.90,36:86.75,37:86.61,38:86.47,39:86.33,40:86.19};
  const PURO_A = {7:11.28,8:13.44,9:15.66,10:17.92,11:20.15,12:22.31,13:24.38,14:26.33,15:28.16,16:29.84,17:31.39,18:32.81,19:34.11,20:35.29,21:36.36,22:37.35,23:38.26,24:39.09,25:39.87,26:40.59,27:41.27,28:41.91,29:42.52,30:43.10,31:43.67,32:44.21,33:44.74,34:45.26,35:45.77,36:46.27,37:46.77,38:47.27,39:47.76,40:48.25};
  const CTO2 = 44 / 12;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function durability(hc, ts, pyroT) {
    const t = clamp(Math.ceil(ts), 7, 40);
    const regression = PURO_M[t] - PURO_A[t] * hc;
    const tf = Math.max(7, ts);
    const conservative = clamp(1 - (-0.048 + (-0.383 + 0.350 * Math.log(tf)) * hc), 0, 0.95) * 100;
    const bracket = (pyroT >= 600 ? 0.89 : pyroT >= 450 ? 0.80 : 0.65) * 100;
    const vals = [conservative, regression, bracket].sort((a, b) => a - b);
    return { low: vals[0], mid: vals[1], high: vals[2], eligible: hc < 0.7 };
  }

  function Seg({ options, value, onChange }) {
    return (
      <div className="appseg">
        {options.map((o) => (
          <button key={o.v} type="button" className={o.v === value ? 'is-on' : ''} onClick={() => onChange(o.v)}>{o.l}</button>
        ))}
      </div>
    );
  }

  function Slider({ label, value, display, unit, min, max, step, onChange }) {
    return (
      <label className="hcalc__ctrl">
        <span className="hcalc__lab">{label}<b>{display != null ? display : value}{unit}</b></span>
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
      </label>
    );
  }

  function Panel({ title, live, children, foot }) {
    return (
      <div className="hcalc apptool">
        <div className="hcalc__bar"><span>{title}</span><span className="amk__live"><i></i>{live}</span></div>
        <div className="hcalc__body">{children}</div>
        {foot ? <div className="apptool__foot">{foot}</div> : null}
      </div>
    );
  }

  /* ---------- 1. Durability (full) ---------- */
  function DurabilityTool() {
    const t = window.useT();
    const c = t('apps.tools').dur;
    const [hc, setHc] = R.useState(0.3);
    const [ts, setTs] = R.useState(12);
    const [pyro, setPyro] = R.useState(650);
    const [corg, setCorg] = R.useState(78);
    const [moist, setMoist] = R.useState(5);
    const [tpa, setTpa] = R.useState(1200);
    const d = durability(hc, ts, pyro);
    const perT = (f) => (f / 100) * (corg / 100) * (1 - moist / 100) * CTO2;
    const bars = [{ k: c.low, v: d.low }, { k: c.mid, v: d.mid }, { k: c.high, v: d.high }];
    return (
      <Panel title={c.title} live={c.live} foot={c.foot}>
        <div className="apptool__split">
          <div>
            <span className="hcalc__q">{c.inputs}</span>
            <div className="hcalc__ctrls">
              <Slider label={c.hc} value={hc} display={hc.toFixed(2)} unit="" min={0.05} max={0.8} step={0.01} onChange={setHc} />
              <Slider label={c.ts} value={ts} unit=" °C" min={2} max={30} step={1} onChange={setTs} />
              <Slider label={c.corg} value={corg} unit=" %" min={40} max={92} step={1} onChange={setCorg} />
              <Slider label={c.moist} value={moist} unit=" %" min={0} max={25} step={1} onChange={setMoist} />
              <Slider label={c.vol} value={tpa} display={tpa.toLocaleString('en-US')} unit=" t" min={100} max={10000} step={100} onChange={setTpa} />
            </div>
            <span className="hcalc__lab" style={{ marginBottom: 'var(--space-3)' }}>{c.pyro}</span>
            <Seg value={pyro} onChange={setPyro} options={[{ v: 400, l: c.pyroLow }, { v: 550, l: c.pyroMed }, { v: 650, l: c.pyroHigh }]} />
          </div>
          <div className="apptool__out">
            <span className="hcalc__q">{c.headline}</span>
            <span className="hcalc__fig cax-tnum">{d.eligible ? d.low.toFixed(1) : '—'}{d.eligible ? <small style={{ fontSize: '0.34em' }}>%</small> : null}</span>
            <span className="hcalc__unit">{d.eligible ? c.headlineCap : c.outOfRange}</span>
            <div className="appbars">
              {bars.map((b) => (
                <div className="appbars__row" key={b.k}>
                  <span>{b.k}</span>
                  <span className="appbars__track"><i style={{ width: d.eligible ? clamp(b.v, 0, 100) + '%' : '0%' }}></i></span>
                  <b className="cax-tnum">{d.eligible ? b.v.toFixed(1) + '%' : '—'}</b>
                </div>
              ))}
            </div>
            <div className="hcalc__rows">
              <div className="hcalc__row"><span>{c.perT}</span><b>{d.eligible ? perT(d.low).toFixed(2) : '—'}</b></div>
              <div className="hcalc__row is-accent"><span>{c.annual}</span><b>{d.eligible ? Math.round(perT(d.low) * tpa).toLocaleString('en-US') : '—'}</b></div>
              <div className="hcalc__row"><span>{c.spread}</span><b>{d.eligible ? (perT(d.high) - perT(d.low)).toFixed(2) : '—'}</b></div>
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  /* ---------- 2. Vineyard matching (condensed) ---------- */
  const CATALOGUE = [
    { id: 'BC-01', name: 'Vine-Cane Char 700', prod: 'Domaine Carbon (FR)', cat: 'plant', pyroT: 700, hc: 0.32, corg: 78 },
    { id: 'BC-02', name: 'Orchard Pruning 500', prod: 'Romagna Biochar (IT)', cat: 'plant', pyroT: 500, hc: 0.45, corg: 72 },
    { id: 'BC-03', name: 'DairyManure BioChar', prod: 'AltoAgri (ES)', cat: 'manure', pyroT: 550, hc: 0.38, corg: 48 },
    { id: 'BC-04', name: 'Softwood Premium 650', prod: 'Nordic Char (SE)', cat: 'plant', pyroT: 650, hc: 0.30, corg: 85 },
    { id: 'BC-05', name: 'GreenWaste Char 420', prod: 'CityLoop (DE)', cat: 'municipal', pyroT: 420, hc: 0.62, corg: 60 },
    { id: 'BC-06', name: 'LowTemp Vine 400', prod: 'TestPlot (PT)', cat: 'plant', pyroT: 400, hc: 0.78, corg: 65 },
    { id: 'BC-07', name: 'Sewage Sludge Char', prod: 'AquaPyro (NL)', cat: 'sludge', pyroT: 600, hc: 0.40, corg: 40 },
  ];
  const modPH = (p) => (p < 5 ? 0.9 : p < 6 ? 0.85 : p < 8 ? 0.2 : -0.25);
  const modWater = (tex, pt) => {
    const base = tex === 'sandy' ? 0.9 : tex === 'loam' ? 0.45 : 0.35;
    const tf = pt >= 600 ? 1 : pt >= 500 ? 0.8 : pt >= 450 ? 0.5 : -0.2;
    return clamp(base * tf, -1, 1);
  };
  const modRate = (r) => (r <= 10 ? 0.85 : r <= 20 ? 0.80 : r <= 30 ? 0.65 : r <= 40 ? 0.55 : r <= 60 ? 0.35 : -0.3);

  function MatchTool() {
    const t = window.useT();
    const c = t('apps.tools').match;
    const [ph, setPh] = R.useState(6.4);
    const [tex, setTex] = R.useState('loam');
    const [water, setWater] = R.useState('deficit');
    const [rate, setRate] = R.useState(20);
    const gate = water === 'rainfed' ? 1 : water === 'deficit' ? 0.6 : 0.25;
    const rows = CATALOGUE.map((b) => {
      const blocked = b.cat === 'sludge' || b.cat === 'municipal' || b.hc >= 0.7;
      const raw = (modPH(ph) * 0.28 + modWater(tex, b.pyroT) * 0.25 + 0.4 * 0.22 + modRate(rate) * 0.15 + 0.5 * 0.10) * gate;
      return { b, blocked, score: Math.round(clamp((raw + 1) / 2, 0, 1) * 100) };
    }).sort((a, x) => (a.blocked !== x.blocked ? (a.blocked ? 1 : -1) : x.score - a.score));
    return (
      <Panel title={c.title} live={c.live} foot={c.foot}>
        <div className="apptool__split">
          <div>
            <span className="hcalc__q">{c.inputs}</span>
            <div className="hcalc__ctrls">
              <Slider label={c.ph} value={ph} display={ph.toFixed(1)} unit="" min={4.5} max={8.5} step={0.1} onChange={setPh} />
              <Slider label={c.rate} value={rate} unit=" t/ha" min={5} max={70} step={5} onChange={setRate} />
            </div>
            <span className="hcalc__lab" style={{ marginBottom: 'var(--space-3)' }}>{c.tex}</span>
            <Seg value={tex} onChange={setTex} options={[{ v: 'sandy', l: c.texSandy }, { v: 'loam', l: c.texLoam }, { v: 'clay', l: c.texClay }]} />
            <span className="hcalc__lab" style={{ margin: 'var(--space-5) 0 var(--space-3)' }}>{c.water}</span>
            <Seg value={water} onChange={setWater} options={[{ v: 'rainfed', l: c.wRain }, { v: 'deficit', l: c.wDeficit }, { v: 'irrigated', l: c.wIrr }]} />
          </div>
          <div className="apptool__out">
            <span className="hcalc__q">{c.results}</span>
            <div className="appmatch">
              {rows.map((r) => (
                <div className={'appmatch__row' + (r.blocked ? ' is-off' : '')} key={r.b.id}>
                  <div>
                    <span className="appmatch__n">{r.b.name}</span>
                    <span className="appmatch__p">{r.b.prod}</span>
                  </div>
                  {r.blocked
                    ? <span className="appmatch__blocked">{c.blocked}</span>
                    : <span className="appmatch__s cax-tnum">{r.score}<small>{r.score >= 70 ? c.strong : r.score >= 45 ? c.moderate : c.weak}</small></span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  /* ---------- 3. Residue impact (condensed) ---------- */
  const CROPS = {
    cocoa: [
      { basis: 'crop', gen: 3.04, dm: 15.4, oc: 65, n: 1.27, piles: 0.674, fate: [0, 1, 0, 0] },
      { basis: 'area', gen: 8900, dm: 57, oc: 80, n: 0.580, piles: 0.196, fate: [1, 0, 0, 0] },
      { basis: 'crop', gen: 0.15, dm: 90, oc: 70, n: 2.50, piles: 0.674, fate: [0, 1, 0, 0] },
    ],
    coffee: [
      { basis: 'crop', gen: 2.50, dm: 23, oc: 60, n: 2.80, piles: 0.674, fate: [0, 1, 0, 0] },
      { basis: 'area', gen: 5000, dm: 60, oc: 80, n: 0.600, piles: 0.196, fate: [1, 0, 0, 0] },
      { basis: 'crop', gen: 0.18, dm: 88, oc: 65, n: 0.600, piles: 0.674, fate: [0, 1, 0, 0] },
    ],
  };

  function ImpactTool() {
    const t = window.useT();
    const c = t('apps.tools').impact;
    const [crop, setCrop] = R.useState('cocoa');
    const [yieldT, setYieldT] = R.useState(1200);
    const [area, setArea] = R.useState(800);
    const [kiln, setKiln] = R.useState('industrial');
    const PE = kiln === 'industrial' ? 0.85 * 0.85 : 0.75 * 0.80;
    let stored = 0, avoided = 0;
    CROPS[crop].forEach((st) => {
      const dm = st.basis === 'crop' ? yieldT * st.gen * (st.dm / 100) : area * (st.gen / 1000) * (st.dm / 100);
      stored += dm * 0.22 * (st.oc / 100) * CTO2 * PE;
      avoided += dm * (st.fate[0] * (st.n / 100) * 3.7 + st.fate[1] * st.piles);
    });
    return (
      <Panel title={c.title} live={c.live} foot={c.foot}>
        <div className="apptool__split">
          <div>
            <span className="hcalc__q">{c.inputs}</span>
            <span className="hcalc__lab" style={{ marginBottom: 'var(--space-3)' }}>{c.crop}</span>
            <Seg value={crop} onChange={setCrop} options={[{ v: 'cocoa', l: c.cocoa }, { v: 'coffee', l: c.coffee }]} />
            <div className="hcalc__ctrls">
              <Slider label={c.yieldL} value={yieldT} display={yieldT.toLocaleString('en-US')} unit=" t" min={100} max={5000} step={100} onChange={setYieldT} />
              <Slider label={c.areaL} value={area} display={area.toLocaleString('en-US')} unit=" ha" min={50} max={4000} step={50} onChange={setArea} />
            </div>
            <span className="hcalc__lab" style={{ marginBottom: 'var(--space-3)' }}>{c.kiln}</span>
            <Seg value={kiln} onChange={setKiln} options={[{ v: 'simple', l: c.kilnSimple }, { v: 'industrial', l: c.kilnInd }]} />
          </div>
          <div className="apptool__out">
            <span className="hcalc__q">{c.storedL}</span>
            <span className="hcalc__fig cax-tnum">{Math.round(stored).toLocaleString('en-US')}</span>
            <span className="hcalc__unit">{c.storedCap}</span>
            <div className="hcalc__rows" style={{ marginTop: 'var(--space-6)' }}>
              <div className="hcalc__row is-accent"><span>{c.avoidedL}</span><b>{Math.round(avoided).toLocaleString('en-US')}</b></div>
              <div className="hcalc__row"><span>{c.totalL}</span><b>{Math.round(stored + avoided).toLocaleString('en-US')}</b></div>
            </div>
          </div>
        </div>
      </Panel>
    );
  }

  /* ---------- 4. Plant cost benchmarks (condensed) ---------- */
  const COST = [
    { cost: '£7', unit: 'per t biochar', tech: 'On-farm unit', place: 'UK · 2010', scale: 'small' },
    { cost: '£25', unit: 'per t biochar', tech: 'Dedicated facility', place: 'UK · 2010', scale: 'mid' },
    { cost: '$556', unit: 'per t biochar', tech: 'Mobile pyrolysis unit', place: 'US · 2022', scale: 'small' },
    { cost: '$1,102', unit: 'per t biochar', tech: 'Centralised industrial unit', place: 'US · 2022', scale: 'large' },
    { cost: '$21', unit: 'per t feedstock', tech: 'Slow pyrolysis', place: 'US · 2009', scale: 'mid' },
    { cost: '$34', unit: 'per t feedstock', tech: 'Fast pyrolysis', place: 'US · 2009', scale: 'mid' },
    { cost: 'A$250,000', unit: 'per plant', tech: 'Container-based mobile pyrolyser', place: 'AU · ~1,000 t/yr', scale: 'small' },
    { cost: '$21.6M', unit: 'per plant', tech: 'Utility-scale production plant', place: 'Global benchmark', scale: 'large' },
  ];

  function CostTool() {
    const t = window.useT();
    const c = t('apps.tools').cost;
    const [scale, setScale] = R.useState('all');
    const rows = COST.filter((r) => scale === 'all' || r.scale === scale);
    return (
      <Panel title={c.title} live={c.live} foot={c.foot}>
        <span className="hcalc__q">{c.filter}</span>
        <Seg value={scale} onChange={setScale} options={[{ v: 'all', l: c.all }, { v: 'small', l: c.small }, { v: 'mid', l: c.mid }, { v: 'large', l: c.large }]} />
        <div className="appcost">
          {rows.map((r) => (
            <div className="appcost__row" key={r.tech + r.cost}>
              <span className="appcost__v cax-tnum">{r.cost}</span>
              <span className="appcost__t">{r.tech}<small>{r.unit} · {r.place}</small></span>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  window.AppTools = { DurabilityTool, MatchTool, ImpactTool, CostTool };
})();
