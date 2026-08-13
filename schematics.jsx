/* CharAtlas — schematic diagrams (pyrolysis path + field application).
   Line-drawn, cartographic: hairline ink strokes, mono callouts, green accent.
   Exposes window.{SchemPyrolysis, SchemField}. */
(function () {
  const INK = 'var(--ink)';
  const GREEN = 'var(--green-700)';
  const FAINT = 'var(--grey-400)';
  const lab = { fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', fill: 'var(--text-muted)' };
  const labInk = Object.assign({}, lab, { fill: INK });
  const num = { fontFamily: 'var(--font-mono)', fontSize: 10, fill: GREEN, letterSpacing: '0.06em' };

  /* --- 01 · Feedstock → pyrolysis → char ---------------------------------- */
  function SchemPyrolysis() {
    const t = window.useT();
    const hexes = [];
    const R = 9, dx = R * 1.732, dy = R * 1.5;
    for (let row = -3; row <= 3; row++) {
      for (let col = -3; col <= 3; col++) {
        const cx = 516 + col * dx + (row % 2 ? dx / 2 : 0);
        const cy = 156 + row * dy;
        if (Math.hypot(cx - 516, cy - 156) > 52) continue;
        const pts = [];
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 180) * (60 * i - 30);
          pts.push(`${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`);
        }
        hexes.push(<polygon key={row + ':' + col} points={pts.join(' ')} fill="none" stroke={FAINT} strokeWidth="0.9" />);
      }
    }
    return (
      <svg viewBox="0 0 640 336" width="100%" height="100%" fill="none" role="img" aria-label="Schematic: feedstock, pyrolysis, biochar">
        <text x="0" y="12" style={lab}>{t('schem.s1')}</text>
        <text x="214" y="12" style={lab}>{t('schem.s2')}</text>
        <text x="446" y="12" style={lab}>{t('schem.s3')}</text>

        {/* feedstock: residue bundles */}
        <g stroke={INK} strokeWidth="1.2">
          <path d="M18 132 L74 110 M18 142 L74 120 M18 152 L74 130" />
          <path d="M22 174 L78 158 M22 184 L78 168 M22 194 L78 178" />
        </g>
        <rect x="14" y="102" width="66" height="60" stroke={FAINT} strokeWidth="0.9" />
        <rect x="18" y="150" width="66" height="56" stroke={FAINT} strokeWidth="0.9" />
        <text x="14" y="230" style={lab}>{t('schem.feedstock')}</text>
        <text x="14" y="244" style={num}>{t('schem.feedstockSub')}</text>

        {/* transport arrow */}
        <g stroke={INK} strokeWidth="1">
          <path d="M96 154 H188" />
          <path d="M180 149 L188 154 L180 159" />
        </g>

        {/* reactor */}
        <rect x="196" y="62" width="164" height="184" stroke={INK} strokeWidth="1.6" />
        <rect x="196" y="62" width="164" height="34" stroke={FAINT} strokeWidth="0.9" />
        <text x="208" y="84" style={labInk}>{t('schem.reactor')}</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line x1="212" y1={128 + i * 34} x2="252" y2={128 + i * 34} stroke={FAINT} strokeWidth="0.9" />
            <text x="258" y={132 + i * 34} style={num}>{700 - i * 100} °C</text>
          </g>
        ))}
        <g stroke={GREEN} strokeWidth="1.2">
          <path d="M278 242 V138" />
          <path d="M273 146 L278 138 L283 146" />
        </g>
        <line x1="196" y1="246" x2="360" y2="246" stroke={INK} strokeWidth="1.6" />
        <text x="196" y="272" style={lab}>{t('schem.conversion')}</text>
        <text x="196" y="286" style={num}>{t('schem.conversionSub')}</text>

        {/* arrow to particle */}
        <g stroke={INK} strokeWidth="1">
          <path d="M372 154 H438" />
          <path d="M430 149 L438 154 L430 159" />
        </g>

        {/* magnified particle */}
        <clipPath id="caxPore"><circle cx="516" cy="156" r="61" /></clipPath>
        <circle cx="516" cy="156" r="62" stroke={INK} strokeWidth="1.6" />
        <g clipPath="url(#caxPore)">{hexes}</g>
        <g stroke={GREEN} strokeWidth="1">
          <path d="M560 114 L590 84 H614" />
        </g>
        <circle cx="560" cy="114" r="2.6" fill={GREEN} stroke="none" />
        <text x="636" y="76" style={num} textAnchor="end">{t('schem.pore')}</text>
        <text x="446" y="240" style={lab}>{t('schem.charTitle')}</text>
        <text x="446" y="254" style={num}>{t('schem.charSub')}</text>
        <text x="636" y="272" style={num} textAnchor="end">{t('schem.charSub2')}</text>

        <line x1="0" y1="310" x2="640" y2="310" stroke={FAINT} strokeWidth="0.9" />
        <text x="0" y="328" style={lab}>{t('schem.record')}</text>
      </svg>
    );
  }

  /* --- 04 · Field application -------------------------------------------- */
  function SchemField() {
    const t = window.useT();
    const seed = [[70, 158], [104, 180], [138, 164], [172, 188], [206, 168], [240, 184], [274, 162], [308, 182], [342, 170], [376, 190], [410, 166], [444, 184], [478, 174], [512, 192], [546, 168], [580, 186], [96, 206], [164, 212], [232, 208], [300, 214], [368, 206], [436, 212], [504, 208], [572, 214]];
    const parts = seed.map(([x, y], i) => {
      const r = 4.2, pts = [];
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 180) * (60 * k - 30);
        pts.push(`${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`);
      }
      return <polygon key={i} points={pts.join(' ')} fill="none" stroke={INK} strokeWidth="1" />;
    });
    return (
      <svg viewBox="0 0 640 336" width="100%" height="100%" fill="none" role="img" aria-label="Schematic: biochar applied to a soil profile">
        <text x="0" y="12" style={lab}>{t('schem.s4')}</text>

        {/* depth scale */}
        {[['0', 130], ['−10', 168], ['−20', 206], ['−30', 244]].map(([d, y]) => (
          <g key={d}>
            <line x1="30" y1={y} x2="44" y2={y} stroke={FAINT} strokeWidth="0.9" />
            <text x="0" y={y + 3.5} style={lab}>{d} {t('schem.cm')}</text>
          </g>
        ))}
        <line x1="44" y1="130" x2="44" y2="244" stroke={FAINT} strokeWidth="0.9" />

        {/* crop */}
        <g stroke={GREEN} strokeWidth="1.4">
          {[130, 250, 370, 490].map((x) => (
            <g key={x}>
              <path d={`M${x} 130 V72`} />
              <path d={`M${x} 92 L${x - 16} 76 M${x} 100 L${x + 16} 84 M${x} 80 L${x - 12} 64 M${x} 72 L${x + 12} 58`} />
            </g>
          ))}
        </g>

        {/* horizons */}
        <line x1="52" y1="130" x2="640" y2="130" stroke={INK} strokeWidth="1.6" />
        <line x1="52" y1="230" x2="640" y2="230" stroke={FAINT} strokeWidth="0.9" strokeDasharray="4 4" />
        <line x1="52" y1="274" x2="640" y2="274" stroke={INK} strokeWidth="1.2" />

        {/* roots */}
        <g stroke={INK} strokeWidth="0.9" opacity="0.5">
          {[130, 250, 370, 490].map((x) => (
            <g key={x}>
              <path d={`M${x} 130 V220`} />
              <path d={`M${x} 152 C${x - 22} 168 ${x - 30} 190 ${x - 34} 212`} />
              <path d={`M${x} 160 C${x + 22} 176 ${x + 30} 196 ${x + 33} 216`} />
              <path d={`M${x} 184 C${x - 12} 200 ${x - 16} 212 ${x - 17} 224`} />
            </g>
          ))}
        </g>

        {parts}

        {/* water held in pores */}
        <g stroke={GREEN} strokeWidth="1.1">
          {[[104, 180], [206, 168], [308, 182], [410, 166], [512, 192]].map(([x, y], i) => (
            <path key={i} d={`M${x - 9} ${y + 9} A 9 9 0 0 0 ${x + 9} ${y + 9}`} />
          ))}
        </g>

        {/* amended-band bracket */}
        <g stroke={GREEN} strokeWidth="1">
          <path d="M612 134 V226" />
          <path d="M607 140 L612 134 L617 140" />
          <path d="M607 220 L612 226 L617 220" />
        </g>

        <text x="52" y="296" style={lab}>{t('schem.zone')}</text>
        <text x="52" y="312" style={num}>{t('schem.zoneSub')}</text>
        <text x="330" y="296" style={lab}>{t('schem.held')}</text>
        <text x="330" y="312" style={num}>{t('schem.heldSub')}</text>
        <text x="52" y="334" style={lab}>{t('schem.custody')}</text>
      </svg>
    );
  }

  Object.assign(window, { SchemPyrolysis, SchemField });
})();
