/* CharAtlas Engines kit — batch records and the two engines.
   Gate thresholds and coefficients are computed here and never rendered:
   the UI shows inputs and outputs only. */
window.ENG = (function () {
  /* ---- Use classes. Named by what the batch may be sold into. ------------ */
  const CLASSES = [
    { id: 'feed',     name: 'Animal feed',            use: 'Feed additive, silage treatment',        gates: { hc: 0.4, cu: 70,  pb: 45,  cd: 0.7, pah: 6.0 }, pyroTMin: 500, plantOnly: true },
    { id: 'feedplus', name: 'Soil & feed, dual use',  use: 'Field application and feed',             gates: { hc: 0.4, cu: 70,  pb: 45,  cd: 0.7, pah: 6.0 }, plantOnly: true },
    { id: 'agro',     name: 'Fertilizer & soil',      use: 'Arable, vineyard, growing substrates',   gates: { hc: 0.7, oc: 0.4, cu: 100, pb: 120, cd: 1.5, pah: 6.0 } },
    { id: 'urban',    name: 'Landscaping & filtration', use: 'Parks, green roofs, water treatment', gates: { hc: 0.7, oc: 0.4, cu: 150, pb: 150, cd: 2.0, pah: 6.0 } },
    { id: 'consumer', name: 'Consumer goods',         use: 'Skin-contact and household products',    gates: { hc: 0.7, cu: 150, pb: 150, cd: 2.0, pah: 6.0 } },
    { id: 'basic',    name: 'Construction materials', use: 'Asphalt, concrete, composites',          gates: { hc: 0.7 } },
  ];

  /* Plain-language names for every gate. No thresholds are ever surfaced. */
  const GATE = {
    hc: 'carbon stability', oc: 'oxidation state', cu: 'copper', pb: 'lead',
    cd: 'cadmium', pah: 'aromatic hydrocarbons',
    pyroT: 'process temperature', feedstock: 'feedstock origin',
  };

  /* ---- Batch records ----------------------------------------------------- */
  const BATCHES = [
    { id: 'CA-2408-17', feedstock: 'Vine-cane residue', origin: 'plant', site: 'Alentejo, PT',
      coord: '38.57° N · 7.91° W', mass: 62, received: '14 Aug',
      hc: 0.32, oc: 0.18, corg: 78, pyroT: 620, cu: 42, pb: 12, cd: 0.3, pah: 3.1 },
    { id: 'CA-2408-22', feedstock: 'Orchard prunings', origin: 'plant', site: 'Emilia-Romagna, IT',
      coord: '44.49° N · 11.34° E', mass: 148, received: '22 Aug',
      hc: 0.45, oc: 0.22, corg: 72, pyroT: 510, cu: 55, pb: 18, cd: 0.5, pah: 3.8 },
    { id: 'CA-2409-04', feedstock: 'Municipal green waste', origin: 'municipal', site: 'Nordrhein-Westfalen, DE',
      coord: '51.23° N · 6.78° E', mass: 240, received: '04 Sep',
      hc: 0.62, oc: 0.34, corg: 60, pyroT: 420, cu: 88, pb: 40, cd: 0.9, pah: 5.6 },
    { id: 'CA-2409-11', feedstock: 'Digested sewage sludge', origin: 'sludge', site: 'Zuid-Holland, NL',
      coord: '51.92° N · 4.48° E', mass: 95, received: '11 Sep',
      hc: 0.40, oc: 0.20, corg: 40, pyroT: 600, cu: 140, pb: 95, cd: 2.1, pah: 7.8 },
  ];

  /* ---- Engine 1 — eligibility ------------------------------------------- */
  /* Returns a verdict per use class plus headroom to the binding gate.
     Headroom is a fraction of the allowance still unused; the allowance
     itself is not disclosed. */
  function evaluate(b, cls) {
    const blocked = [];
    if (cls.plantOnly && b.origin !== 'plant') blocked.push(GATE.feedstock);
    if (cls.pyroTMin && b.pyroT <= cls.pyroTMin) blocked.push(GATE.pyroT);

    let headroom = 1, binding = null;
    Object.keys(cls.gates).forEach((k) => {
      const margin = 1 - b[k] / cls.gates[k];
      if (margin < 0) { blocked.push(GATE[k]); return; }
      if (margin < headroom) { headroom = margin; binding = GATE[k]; }
    });

    return { pass: blocked.length === 0, blocked, headroom, binding };
  }

  function eligibility(b) {
    const rows = CLASSES.map((c) => Object.assign({ cls: c }, evaluate(b, c)));
    return { rows, qualified: rows.filter((r) => r.pass).length, total: rows.length };
  }

  /* ---- Engine 2 — break-even price under the carbon border charge ------- */
  const YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034];
  const SHARE = [0.025, 0.05, 0.10, 0.225, 0.485, 0.61, 0.735, 0.86, 1.00];
  const FOSS_EF = 3.10;
  const BIO_EF = { biogenic: 0, conservative: 0.30 };

  const DEFAULTS = { price: 75, embedded: 1.90, substitution: 10, reductant: 450, fossil: 350, volume: 50000 };

  function breakEven(inp, mode) {
    const bioEF = BIO_EF[mode];
    const replaced = inp.reductant * (inp.substitution / 100) / 1000; /* t reductant per t product */
    const removed = replaced * (FOSS_EF - bioEF);
    const rows = YEARS.map((year, k) => {
      const base = inp.embedded * SHARE[k] * inp.price;
      const reduced = Math.max(0, inp.embedded - removed) * SHARE[k] * inp.price;
      const saving = base - reduced;
      return {
        year,
        charge: base,
        saving,
        be: inp.fossil + (replaced > 0 ? saving / replaced : 0),
        annual: saving * inp.volume,
      };
    });
    return { rows, replaced, removed, floor: inp.fossil };
  }

  /* ---- Formatting -------------------------------------------------------- */
  const eur = (n) => '\u20ac' + Math.round(n).toLocaleString('en-US');
  const eur2 = (n) => '\u20ac' + n.toFixed(2);
  const compact = (n) => Math.abs(n) >= 1e6 ? '\u20ac' + (n / 1e6).toFixed(2) + 'M'
    : Math.abs(n) >= 1e3 ? '\u20ac' + Math.round(n / 1e3) + 'k' : eur(n);
  const num = (n) => n.toLocaleString('en-US');
  const pct = (n) => Math.round(n * 100) + '%';

  return { CLASSES, BATCHES, YEARS, DEFAULTS, eligibility, breakEven, eur, eur2, compact, num, pct };
})();
