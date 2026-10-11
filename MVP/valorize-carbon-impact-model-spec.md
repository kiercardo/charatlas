# Valorize Carbon Impact v1.9 — Complete Model Specification

**Status:** Both crops fully characterised. Every constant confirmed by isolated black-box test. Nothing inferred by subtraction.

---

## Part 1 — How the Model Works

### The idea in one paragraph

A farm produces a crop (cocoa or coffee). Growing that crop emits carbon — the **baseline PCF**, expressed per kilogram of crop. The crop also produces residues (husks, prunings, shells or pulp). Those residues would normally rot, be burnt, or be piled up, emitting methane and nitrous oxide. The app asks: what if you turned some of that residue into **biochar** instead? Two separate things then happen, and the model keeps them strictly apart.

### The two boundaries — this is the core concept

Everything in the model resolves to one of two categories, and they are **never mixed**:

| | **Reductions** (inside boundary) | **Removals** (reported separately) |
|---|---|---|
| **What** | Emissions you avoid causing | Carbon you pull out and store |
| **Components** | Avoided, Inputs | Biochar, SOC |
| **Effect on PCF** | Subtracted from it | **Never subtracted from it** |
| **Standard** | PCR-compatible, ISO 14067 | LSRS Chapter 13 |

This is why the app has two views:

- **PCF View** — shows only the reductions. This is a legitimate product carbon footprint.
- **Net View** — subtracts removals too. The app labels this *"Inventory Net Intensity"* and explicitly states it is **NOT a standard PCF**. Useful for net-zero tracking, not for product claims.

Confusing these two is the single most important error to avoid.

### The four levers

| Lever | Category | What it does |
|---|---|---|
| **Biochar** | Removal | Convert residue carbon into a stable form. Sequestration. |
| **Avoided** | Reduction | Stop residues from rotting/burning. Counterfactual — the emissions that *would have* happened. |
| **Inputs** | Reduction | Use less fertilizer. |
| **SOC** | Removal | Build soil organic carbon. |

### The step-by-step calculation

**Step 1 — How much residue is there?**

Each crop has three residue streams. Two scale with **crop volume**, one scales with **farm area**.

```
DM_stream = (crop_eff or area) × gen_ratio × %DM
```

Dry matter (DM) is what everything downstream uses. `crop_eff` is the crop volume after any yield growth (see Step 6).

**Step 2 — Biochar (a removal)**

Some fraction of each stream goes to the kiln. Not all of its carbon survives, and not all of what survives is permanent.

```
biochar = Σ  DM × 0.22 × %to_biochar × OC% × (44/12) × P × E
```

- `0.22` — the **biochar yield constant**. Only 22% of the dry matter becomes char. Applied to every stream, both crops.
- `OC%` — organic carbon content of that residue.
- `44/12` — converts carbon mass to CO₂ mass (molecular weight ratio).
- `P × E` — permanence × efficiency. Depends on kiln type.

**Step 3 — Avoided (a reduction)**

Residue has to go somewhere. Each stream splits across four **baseline fates** — what would have happened without the project. Each fate has an emission coefficient.

```
avoided = Σ DM × [ %spread  × N% × spread_factor
                 + %piles   × piles_coeff
                 + %compost × 0.155
                 + %burnt   × 0.095 ]
```

Two things to notice:

- **Spread-on-Field is the only nitrogen-based fate.** It multiplies by the residue's nitrogen content and a wet/dry factor. The other three are flat per-kg-of-dry-matter values.
- **Avoided is a counterfactual.** It is computed on the *full* residue mass, regardless of how much you divert to biochar. Setting "% to biochar" to 100 does not reduce it. The two figures are independent.

**Step 4 — Inputs (a reduction)**

Reduce fertilizer application by some percentage:

```
inputs = area × Σ(application_rate × EF) × redux% / 100 / 1000
```

**Step 5 — SOC (a removal)**

```
soc = area × soc_rate
```

Already in tonnes CO₂e. No conversion.

**Step 6 — Yield, and why it lowers PCF without reducing emissions**

If yield grows, the farm produces more crop from the same land:

```
crop_eff = crop × (1 + yield% / 100)
```

Now look carefully at the PCF formula:

```
PCF = (baseline_PCF × crop − avoided − inputs) / crop_eff
                            ↑                    ↑
                     original crop         scaled crop
```

**The numerator uses `crop`. The denominator uses `crop_eff`.** This asymmetry is deliberate and it is the easiest thing in the whole model to get wrong. Total emissions don't change — you just spread them over more product. The app calls this the **Efficiency Gain** and displays it as `baseline_PCF × crop_eff − baseline_PCF × crop`, explicitly labelled *"not summed below."* It is dilution, not abatement.

If "Scale residues" is also ticked, `crop_eff` feeds back into Step 1 — but only for the two crop-linked streams. The area-linked pruning stream is unaffected.

**Step 7 — Outputs**

```
PCF View = (baseline_PCF × crop − avoided − inputs) / crop_eff
Net View = PCF − (biochar + soc) / crop_eff
```

Net can go negative. There is no floor — a heavily biochar-loaded configuration was observed at **−27.27 kg CO₂e/kg**.

---

## Part 2 — Every Factor, Explained

### 2.1 Universal constants

| Constant | Value | Units | What it means |
|---|---|---|---|
| Biochar yield | **0.22** | fraction | Share of dry matter that survives pyrolysis as char. Global — same for every stream, both crops. |
| Carbon→CO₂ | **44/12** | ratio | Molecular weight of CO₂ ÷ molecular weight of C. Converts carbon mass to CO₂-equivalent mass. |
| Spread factor (wet) | **3.7** | kg CO₂e / kg N | N₂O emissions when residue is spread on wet ground. |
| Spread factor (dry) | **2.14** | kg CO₂e / kg N | Same, dry ground. Ratio 3.7/2.14 = 1.729, confirmed live at 1.7275. |
| Piles — moist | **0.674** | kg CO₂e / kg DM | Anaerobic methane from wet, dense residue heaps. |
| Piles — woody | **0.196** | kg CO₂e / kg DM | Same, but woody residue packs loosely and stays aerobic. |
| Managed compost | **0.155** | kg CO₂e / kg DM | Controlled aerobic decomposition. |
| Burnt | **0.095** | kg CO₂e / kg DM | Open-field burning. |

**Critical unit distinction:** the spread factors are **per kilogram of nitrogen**. The other three fates are **per kilogram of dry matter**. Forcing one basis onto all four produces a nonsense fate table that looks like an app bug and isn't.

### 2.2 Kiln type — permanence and efficiency

Affects **biochar only**. Does not touch Avoided, Inputs, SOC, or PCF View.

| Kiln | P (permanence) | E (efficiency) | P × E |
|---|---|---|---|
| Artisanal | 0.75 | 0.80 | **0.6000** |
| Industrial | 0.85 | 0.85 | **0.7225** |

Industrial / Artisanal = **1.204166…** Confirmed live to 5 digits.

### 2.3 The displayed per-stream factor

The small grey number beside each stream (e.g. *"Factor: 1.43 tCO₂e/t"*):

```
factor = OC% × (44/12) × P × E
```

**It does not include the 0.22.** This is a display convention, and it caused significant confusion during reverse-engineering. To get biochar from it:

```
biochar_stream = DM × 0.22 × %to_biochar × factor
```

The factor is the fastest way to verify a stream's OC% — read it off and invert.

### 2.4 Cocoa streams

Default baseline PCF: **1.22** kg CO₂e/kg (Abou Rajab et al., 2016)

| Stream | Basis | Gen. default | %DM | OC% | N% | Piles coefficient |
|---|---|---|---|---|---|---|
| Cocoa Pod Husks (CPH) | crop | 3.04 kg/kg | 15.4 | 65 | 1.27% | 0.674 (moist) |
| Pruning Residues | **area** | 8900 kg/ha | 57 | 80 | 0.580% | 0.196 (woody) |
| Cocoa Shells | crop | 0.15 kg/kg | 90 | 70 | 2.50% | 0.674 (moist) |

### 2.5 Coffee streams

Default baseline PCF: **3.60** kg CO₂e/kg (IDH–CIRAD, 2023)

| Stream | Basis | Gen. default | %DM | OC% | N% | Piles coefficient |
|---|---|---|---|---|---|---|
| Coffee Pulp | crop | 2.50 kg/kg | 23 | **60** | 2.80% | 0.674 (moist) |
| Pruning Residues | **area** | 5000 kg/ha | 60 | 80 | **0.600%** | 0.196 (woody) |
| Coffee Parchment | crop | 0.18 kg/kg | 88 | 65 | 0.600% | 0.674 (moist) |

Compost (0.155) and burnt (0.095) apply identically to all six streams across both crops.

**Nitrogen differs between crops.** Cocoa pruning is 0.580%; coffee pruning is 0.600%. Only the organic carbon (80%), the woody piles coefficient, and the area basis are shared between them.

**Note:** in each crop, exactly one stream is area-based (pruning) and two are crop-based. The pruning stream is the only one that takes the woody piles coefficient, and the only one immune to yield scaling.

### 2.6 Fertilizer emission factors

| Fertilizer | EF (kg CO₂e / kg) | Config default (kg/ha) |
|---|---|---|
| Urea | 1.735 | 100 |
| Ammonium Nitrate | 2.550 | 0 |
| Ammonium Sulfate | 1.150 | 0 |
| Triple Super Phosphate | 0.775 | 50 |
| Potassium Chloride (KCl) | 0.500 | 60 |
| NPK (15-15-15) | 0.480 | 300 |
| Compost | 0.005 | 0 |

Shared across both crops.

---

## Part 3 — Complete Equations

```
# Masses
crop_eff   = crop × (1 + yield_pct/100)     if "Scale residues" ticked
           = crop                            otherwise

DM_crop_stream = crop_eff × gen_ratio × pct_DM
DM_area_stream = area     × gen_rate  × pct_DM     # gen_rate in t/ha


# Biochar — a REMOVAL, never deducted from PCF
factor_i = OC_i × (44/12) × P × E
biochar  = Σ  DM_i × 0.22 × pct_to_biochar_i × factor_i


# Avoided — a REDUCTION, inside the boundary
spread_factor = 3.7 if wet else 2.14

avoided = Σ DM_i × [ spread_i  × N_i × spread_factor
                   + piles_i   × (0.674 if moist else 0.196)
                   + compost_i × 0.155
                   + burnt_i   × 0.095 ]


# Inputs — a REDUCTION
inputs = area × Σ(fert_rate_j × EF_j) × redux_pct / 100 / 1000


# SOC — a REMOVAL
soc = area × soc_rate


# Outputs
PCF = (baseline_pcf × crop − avoided − inputs) / crop_eff
Net = PCF − (biochar + soc) / crop_eff

# Display only, excluded from mitigation total
eff_gain = baseline_pcf × crop_eff − baseline_pcf × crop
```

All fate percentages and `pct_to_biochar` are entered as 0–100 and divided by 100. `redux_pct` likewise. `gen_rate` is displayed in kg/ha and must be divided by 1000 for tonnes.

---

## Part 4 — Behavioural Quirks

These are real and must be replicated in any rebuild.

| # | Behaviour |
|---|---|
| 1 | **Fate rows do not normalise.** The "Sum: 100%" badge turns red at other values, but the app computes anyway, adding each term straight through. A row summing to 200% double-counts. A row summing to 80% under-counts. Confirmed live. |
| 2 | **The planner reads Year 5 only.** It does not average or sum across years. Confirmed twice on non-uniform columns — a `15,10,10,10,10` fertilizer column uses 10, not the average of 11. |
| 3 | **"% to biochar" affects biochar only.** No effect on avoided. |
| 4 | **Fate affects avoided only.** No effect on biochar. |
| 5 | **Artisanal/Industrial affects biochar only.** No effect on avoided, inputs, SOC, or PCF View. |
| 6 | **Yield with "Scale residues" scales crop-linked streams only.** Pruning is area-linked and unaffected. |
| 7 | **"Scale residues" alone is inert.** With Yield unticked, `yield_pct = 0`, so ticking Scale residues changes nothing. |
| 8 | **Net can go negative.** No floor. Observed at −27.27. |
| 9 | **Avoided appears to sum per-stream rounded values**, producing residuals of ~0.01–0.2 t on large configurations. Cosmetic. |

---

## Part 5 — Errors in the App's Own Methodology Panel

The panel is authoritative for units and structure, but **four of its numbers are wrong**. Every one was caught by isolated measurement.

| Panel claims | Actual | How it was caught |
|---|---|---|
| Burning: 0.005 kg CO₂e/kg DM | **0.095** | CPH alone: 4.45 / 46.816 = 0.0951. Shells alone: 1.28 / 13.5 = 0.0948. Coffee pulp alone: 5.46 / 57.50 = 0.0950. Three independent streams, two crops. |
| Pruning Wood: 0.6% Nitrogen | **0.580%** | Spread-dry: 6.30 / (507.3 × 2.14) = 0.005804. Spread-wet: 10.89 / (507.3 × 3.7) = 0.005804. Identical to 4 dp. |
| Unmanaged Piles (woody): 0.198 | **0.196** | Coffee pruning isolated, 15.00 t DM, 100% piles → 2.94. 2.94 / 15.00 = 0.196 exactly. 0.198 would give 2.97. |
| Coffee Pulp: 50% Organic C | **60%** | Displayed factor reads 1.32. 1.32 / (44/12 × 0.60) = 0.60. At 50% the factor would read 1.10. |

The panel is correct about everything else: the moist piles coefficient (0.674), managed compost (0.155), the spread wet/dry pair (3.7 / 2.14), all three coffee gen ratios, and — crucially — **the units**. Spread is `kg CO₂e/kg N`; the other three fates are `kg CO₂e/kg DM`.

---

## Part 6 — Validation Record

Every constant below was confirmed on a run where **exactly one stream carried mass**, or where the quantity was structurally isolated. No coefficient in this document was derived by subtracting a remainder.

| Component | Confirmed by |
|---|---|
| Biochar yield 0.22 | Single-stream isolation at non-default crop volume; reconfirmed on every subsequent run, both crops |
| Artisanal P×E = 0.60 | Displayed factors across 12 distinct OC values |
| Industrial P×E = 0.7225 | Factor jump 1.76 → 2.12 (ratio 1.2045) and 1.89 → 2.28; biochar 288.08 → 346.90 |
| `factor = OC × 44/12 × P × E` | Every OC tested: 55, 60, 65, 66, 70, 71, 75, 77, 80, 81, 85, 86 |
| Spread pair 3.7 / 2.14 | Toggle test on isolated pulp (57.50 t, 100% spread): 5.96 vs 3.45. Ratio 1.7275 vs predicted 1.7290. Both readings independently give N = 2.80%. |
| Piles moist 0.674 | Cocoa CPH and shells, single-fate isolation; coffee pulp and parchment, defaults run |
| Piles woody 0.196 | Coffee pruning isolated at 15.00 t: 2.94 / 15.00 = 0.196 |
| Compost 0.155 | Coffee pulp isolated at 57.50 t: 8.91 / 57.50 = 0.155 |
| Burnt 0.095 | Coffee pulp isolated at 57.50 t: 5.46 / 57.50 = 0.095 |
| Coffee pulp N = 2.80% | Isolated, 100% spread, both toggle states agree |
| Coffee parchment N = 0.600% | Isolated, 100% spread: 0.35 / (15.84 × 3.7) = 0.00597 |
| Coffee pruning N = 0.600% | Three configurations close exactly only at 0.600%: defaults 52.76 (vs 52.65 at 0.580%); 132/99 damp 135.52 (Δ 0.073); 132/99 dry 131.08 (Δ 0.042). |
| Seven fertilizer EFs | Non-default rates on all seven, two runs: 2.28 and 5.09, both exact |
| Year-5-only planner | Non-uniform column `10,25,10,25,25`; reconfirmed with `15,10,10,10,10` |
| `PCF` formula | Six configurations including yield-scaled (1.15) and negative (−27.27) |
| `Net` formula | 0.05 unscaled, 0.29 yield-scaled — removals divide by `crop_eff`, not `crop` |
| Non-normalising fates | 80% shells row computed straight through |

---

## Part 7 — Method Notes for Future Work

Hard-won. Ignore at your cost.

**Isolate by zeroing gen ratios, not by resetting fate rows.** Setting a stream's gen ratio to `0` removes it from every sum. Trying to hold two streams "at baseline" while varying a third fails repeatedly, because a fate row silently stays where it was and contaminates the reading.

**Never solve for a coefficient by subtracting a remainder.** Early values derived that way were wrong by 4×. Every constant that survived came from a run where exactly one stream had mass.

**Read the units before reading the numbers.** Spread is per kg nitrogen. The other three fates are per kg dry matter.

**Beware degenerate hypotheses.** The pairs *(spread = 3.7, N = 2.8%)* and *(spread = 2.14, N = 4.84%)* produce nearly identical Avoided on a mixed-fate configuration. They are only distinguishable by toggling Wet/Dry on a **single-stream, spread-only** run and taking the **ratio** of the two readings — which is independent of N. Any diagnosis that assumes the answer to determine the mode, then reads the mode to confirm the answer, is circular. This mistake was made and cost several rounds.

**When a constant seems to appear and then vanish, isolate rather than reason.** The 0.22 was hypothesised early, dismissed as a phantom because biochar happened to be self-consistent under a wrong mass assumption at the default configuration, and rediscovered thirty rounds later.

**Cross-check Avoided against PCF.** They are not independent — `PCF` is a function of `avoided` and `inputs`. If both reconcile, the wiring between them is correct. This is a free check on every run.

**Verify the toggle from the arithmetic, not the pill.** The Wet/Dry pill is small and low-contrast. Rather than squint at it, compute both branches and see which matches. But do not then conclude the pill is *wrong* — only that you could not read it.
