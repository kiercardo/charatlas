import React, { useState } from "react";

// ---- Real data extracted from the Biochar workbook artifacts ----
const FS=[{"t":"Coffee Husks","cat":"Agricultural residues","c":0.525,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, Consumer materials and construction materials"},{"t":"Rice Husks","cat":"Agricultural residues","c":0.425,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.244,"q":"Medium quality","app":"Soil applications, Consumer materials and construction materials"},{"t":"Grain Husk","cat":"Agricultural residues","c":0.235,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, Animal Feed, Consumer materials and construction materials"},{"t":"Seed Husk","cat":"Agricultural residues","c":0.505,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, Animal Feed, Consumer materials and construction materials"},{"t":"Nut shells","cat":"Agricultural residues","c":0.5,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.8105,"q":"High quality","app":"Soil applications, Animal Feed, Consumer materials and construction materials"},{"t":"Cotton residues (stalks)","cat":"Agricultural residues","c":0.45,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, Consumer materials and construction materials"},{"t":"Sunflower pods","cat":"Agricultural residues","c":0.49,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, Consumer materials and construction materials"},{"t":"Orchard waste (tree branches, apple, pear, peach)","cat":"Agricultural residues","c":0.495,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, construction materials, consumer products"},{"t":"Mustard crops","cat":"Agricultural residues","c":0.45,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, construction materials, consumer products"},{"t":"Juliflora","cat":"Agricultural residues","c":0.42,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, construction materials, consumer products"},{"t":"Empty fruit bunch (palm)","cat":"Agricultural residues","c":0.48,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, construction materials, consumer products"},{"t":"Cane trash","cat":"Agricultural residues","c":0.45,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium quality","app":"Soil applications, construction materials, consumer products"},{"t":"Coconut fronds","cat":"Agricultural residues","c":0.365,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.8895,"q":"Medium quality","app":"Soil applications, construction materials, consumer products"},{"t":"Rice / corn straw","cat":"Agricultural residues","c":0.39,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.4098,"q":"Medium quality","app":"Soil applications, construction materials, consumer products"},{"t":"Wood residues (sawdust, wood shavings, offcuts)","cat":"Wood residues","c":0.5,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.75,"q":"High quality","app":"Soil applications, construction materials, consumer products"},{"t":"Sawmill waste (bark, branches, sawdust)","cat":"Wood residues","c":0.5,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, construction materials, consumer products, filtering applications"},{"t":"Waste wood clean","cat":"Wood residues","c":0.45,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.821,"q":"Medium - High quality","app":"Soil applications, construction materials, consumer products, filtering applications"},{"t":"Untreated wood chips","cat":"Wood residues","c":0.52,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, construction materials, consumer products, filtering applications"},{"t":"Wood pellets","cat":"Wood residues","c":0.485,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, construction materials, consumer products, filtering applications"},{"t":"Miscanthus/Willow/Switchgrass etc.","cat":"Dedicated Energy crops","c":0.48,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.7505,"q":"High quality","app":"Soil applications, construction materials, consumer products, filtering applications"},{"t":"Sustainably grown energy crops (wood)","cat":"Dedicated Energy crops","c":0.5,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.8,"q":"High quality","app":"Soil applications, construction materials, consumer products, filtering applications"},{"t":"Corn, maize, rapeseed, sugarcane","cat":"Dedicated Energy crops","c":0.46,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, animal feed, construction materials, consumer products"},{"t":"Forest debris","cat":"Forestry Waste","c":0.485,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, construction materials, consumer products"},{"t":"Forestry residues (bark, leaves, branches, shavings)","cat":"Forestry Waste","c":0.515,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.815,"q":"High quality","app":"Soil applications, construction materials, consumer products"},{"t":"Food processing residues (puff purree, press mud cake)","cat":"Organic Waste","c":0.39,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium - High quality","app":"Soil applications, Animal Feed, construction materials"},{"t":"Landfill intended biomass","cat":"Organic Waste","c":0.365,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium quality","app":"Construction materials, Filtering applications"},{"t":"Food waste","cat":"Organic Waste","c":0.365,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium quality","app":"Construction materials, Filtering applications"},{"t":"Municipal Solid Waste (MSW)","cat":"Organic Waste","c":0.41,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.252,"q":"Low quality","app":"Construction materials"},{"t":"Sugarcane bagasse","cat":"Industrial Waste","c":0.45,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.815,"q":"Medium - High quality","app":"Soil applications, construction materials, consumer products"},{"t":"Composted food","cat":"Industrial Waste","c":0.285,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium - Low quality","app":"Construction materials"},{"t":"Pulp and paper mill waste","cat":"Industrial Waste","c":0.38,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium quality","app":"Construction materials, Filtering applications"},{"t":"Spent grains (brewers, distillery)","cat":"Industrial Waste","c":0.48,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, animal feed, construction materials, consumer products"},{"t":"Spent coffee grounds","cat":"Industrial Waste","c":0.585,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"High quality","app":"Soil applications, animal feed, construction materials, consumer products"},{"t":"Black Liquor","cat":"Industrial Waste","c":0.305,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium quality","app":"Construction materials, Filtering applications"},{"t":"Sewage Sludge","cat":"Industrial Waste","c":0.315,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Low quality","app":"Construction materials"},{"t":"Palm Oil Mill Effluent (POME)","cat":"Industrial Waste","c":0.46,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium - Low quality","app":"Not applicable"},{"t":"Refuse Derived Fuel (RDF)","cat":"Industrial Waste","c":0.5,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Low quality","app":"Construction materials"},{"t":"Poultry waste","cat":"Manure","c":0.35,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":0.577,"q":"Low quality","app":"Construction materials"},{"t":"Pig manure","cat":"Manure","c":0.4,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium quality","app":"Construction materials, Filtering applications"},{"t":"Cattle manure","cat":"Manure","c":0.375,"yl":0.15,"ym":0.4,"yh":0.6,"bcc":null,"q":"Medium quality","app":"Construction materials, Filtering applications"}];
const COST=[{"id":"capex_1","country":"UK","cost":25.0,"cur":"GBP","unit":"ton biochar","tech":"at dedicated facility","size":"Mid to Large (> 2,000t.yr feedstock)","src":"Shackley and Sohi, 2010","yr":"2010"},{"id":"capex_2","country":"UK","cost":7.0,"cur":"GBP","unit":"ton biochar","tech":"on farm","size":"Small (< 2,000t.yr feedstock)","src":"Shackley and Sohi, 2010","yr":"2010"},{"id":"capex_3","country":"UK","cost":2400.0,"cur":"GBP","unit":"per kW","tech":"Wood (woodchips feedstock) gasification power gen plant (used as proxy)","size":"2 Mweq","src":"Shackley and Sohi, 2010","yr":"2010"},{"id":"capex_4","country":"UK","cost":1100.0,"cur":"GBP","unit":"per kW","tech":"Wood (woodchips feedstock) combusion power gen plant (used as proxy)","size":"25 Mweq","src":"Shackley and Sohi, 2010","yr":"2010"},{"id":"capex_5","country":"US","cost":34.0,"cur":"USD","unit":"ton feedstock","tech":"Fast pyrolysis","size":null,"src":"McCarl et al","yr":"2009"},{"id":"capex_6","country":"US","cost":34.0,"cur":"USD","unit":"ton feedstock","tech":"Fast pyrolysis","size":null,"src":"McCarl et al","yr":"2009"},{"id":"capex_7","country":"US","cost":21.0,"cur":"USD","unit":"ton feedstock","tech":"Slow pyrolysis","size":null,"src":"McCarl et al","yr":"2009"},{"id":"capex_8","country":"US","cost":556.0,"cur":"USD","unit":"ton biochar","tech":"mobile biochar unit","size":"Small-scale","src":"Elias et al","yr":"2022"},{"id":"capex_9","country":"US","cost":1102.0,"cur":"USD","unit":"ton biochar","tech":"centralised industrial biochar unit","size":"Large-scale","src":"Elias et al","yr":"2022"},{"id":"capex_10","country":"World","cost":21630000.0,"cur":"USD","unit":"1 production plant","tech":"Unspecified tech or size","size":"N/A","src":"Project Drawdown","yr":null},{"id":"capex_11","country":"Australia","cost":250000.0,"cur":"AUD","unit":"1 production plant","tech":"container-based mobile pyrolyser (Transportable into field)","size":"Small (approx. 1,000t biochar prod per year)","src":"Joseph et al.","yr":null},{"id":"capex_12","country":"Austria/Europe","cost":400000.0,"cur":"USD","unit":"1 production plant","tech":"Fixed double auger pyrolyser","size":"Small (1,000t biochar prod per year)","src":"Joseph et al.","yr":null},{"id":"capex_13","country":"China","cost":200000.0,"cur":"USD","unit":"1 production plant","tech":"Fixed continuous pyrolyser (rotating drum)","size":"Mid-scale (3,500t feedstock per year)","src":"Joseph et al.","yr":null},{"id":"capex_14","country":"China","cost":1000000.0,"cur":"USD","unit":"1 production plant","tech":"Fixed continuous pyrolyser (rotating drum)","size":"Mid-scale (15,000t feedstock per year)","src":"Joseph et al.","yr":null},{"id":"capex_15","country":"China","cost":1500000.0,"cur":"USD","unit":"1 production plant","tech":"Fixed continuous pyrolyser (converted Open Core gasifiers)","size":"Mid-scale (15,000t feedstock per year)","src":"Joseph et al.","yr":null},{"id":"capex_16","country":"Bolivia","cost":4000000.0,"cur":"USD","unit":"1 production plant","tech":"Fixed, high-tech pyrolysis plant, planned output of >30,000 t biochar per year","size":"Large-scale (>30,000 t biochar per year)","src":"Exomad Green (Puro.earth biochar developer)","yr":"2023"}];

const EBC_CLASSES = [
  { name: "EBC Feed", hc: 0.4, oc: null, use: "Animal feed only", note: "Strictest contaminant limits" },
  { name: "EBC Feed Plus", hc: 0.4, oc: null, use: "Soil, agriculture & feed", note: "Strict heavy-metal limits" },
  { name: "EBC Agronomic", hc: 0.7, oc: 0.4, use: "Fertilizer / soil", note: "Slightly elevated As, Pb, Hg limits" },
  { name: "EBC Urban", hc: 0.7, oc: 0.4, use: "Parks, landscaping, filtration", note: "Higher heavy-metal limits" },
  { name: "EBC Consumer Materials", hc: 0.7, oc: null, use: "Skin-contact consumer goods", note: "Higher heavy-metal limits" },
  { name: "EBC Basic Materials", hc: 0.7, oc: null, use: "Construction, asphalt, composites", note: "No metal limit, declaration only" },
];

// ---- Puro 2025 permanence model (Section 6). Coefficients are Table 6.1 verbatim. ----
// PF = M − a × (H/Corg), with M and a selected by soil temperature Ts (°C).
// Source: Puro.earth Biochar Methodology, Edition 2025 v.2, Eq. 6.1 / 6.3 / 6.4 / 6.5.
const PURO_M = {7:96.59,8:95.98,9:95.36,10:94.73,11:94.10,12:93.50,13:92.92,14:92.38,15:91.87,16:91.40,17:90.96,18:90.57,19:90.20,20:89.87,21:89.57,22:89.29,23:89.03,24:88.79,25:88.57,26:88.37,27:88.18,28:87.99,29:87.82,30:87.66,31:87.50,32:87.34,33:87.19,34:87.04,35:86.90,36:86.75,37:86.61,38:86.47,39:86.33,40:86.19};
const PURO_A = {7:11.28,8:13.44,9:15.66,10:17.92,11:20.15,12:22.31,13:24.38,14:26.33,15:28.16,16:29.84,17:31.39,18:32.81,19:34.11,20:35.29,21:36.36,22:37.35,23:38.26,24:39.09,25:39.87,26:40.59,27:41.27,28:41.91,29:42.52,30:43.10,31:43.67,32:44.21,33:44.74,34:45.26,35:45.77,36:46.27,37:46.77,38:47.27,39:47.76,40:48.25};

// Soil temperature is floored at 7°C and rounded up to the next integer (rule 6.2.4).
function puroTs(ts) { return Math.max(7, Math.min(40, Math.ceil(ts))); }
// Persistence fraction, Eq. 6.4. Valid H/Corg domain is 0–0.7.
function puroPF(hcorg, ts) {
  const t = puroTs(ts);
  return { pf: PURO_M[t] - PURO_A[t] * hcorg, tUsed: t };
}

// ---- Verra VM0044 v1.2 permanence (Section 8.2). 100-year horizon. ----
// Permanence adjustment factor PR_de,k by production temperature, from IPCC (2019)
// Table 4AP.2 (also Woolf et al. 2021). A flat default bracket, not a regression.
// Source: VM0044 v1.2, Eq. 2 and Table 3.
const VERRA_PR = [
  { key: "high", label: "High temp pyrolysis / gasification", range: ">600°C", pr: 0.89 },
  { key: "med",  label: "Medium temp pyrolysis", range: "450–600°C", pr: 0.80 },
  { key: "low",  label: "Low temp pyrolysis", range: "350–450°C", pr: 0.65 },
];

// ---- Isometric Biochar Storage in Soil Environments (v1.2), Option 1: 200-yr. ----
// F_durable,200 = min(0.95, 1 − [c + (a + b·ln(Tsoil))·H/Corg]).  Eq. 3 / Table 4.
// Coefficients from a conservative (17th-percentile) regression on Woolf et al. 2021.
// Tsoil floored at 7°C; eligibility gate is stricter: H/Corg < 0.5 and O/Corg < 0.2.
const ISO_A = -0.383, ISO_B = 0.350, ISO_C = -0.048;
function isoF200(hcorg, tsoil) {
  const t = Math.max(7, tsoil);
  const raw = 1 - (ISO_C + (ISO_A + ISO_B * Math.log(t)) * hcorg);
  return Math.min(0.95, Math.max(0, raw)) * 100; // as percent
}

// ---- Isometric Option 2: 1,000-yr durability (Module Equation 3). ----
// Credits the fraction of biochar passing the 2% R0 benchmark (Sanei et al. 2024),
// discounted by one standard deviation of the binomial sample proportion:
//   F_durable = S − sqrt( S·(1−S) / N )
// S = share of R0 measurements passing the 2% benchmark; N = samples per batch (≥500).
// Source: Isometric Durability of Biochar in Surface Soil, Option 2, Eq. 3.
function isoF1000(S, N) {
  const s = Math.max(0, Math.min(1, S));
  const n = Math.max(1, N);
  const se = Math.sqrt((s * (1 - s)) / n);
  return Math.max(0, Math.min(1, s - se)) * 100; // as percent
}

// ---- Sanei IBRo2 — Inertinite Benchmarking (Sanei et al. 2024, 2025; Petersen et al. 2026). ----
// Direct measurement of the stable (inertinite) carbon fraction, not a decay model.
// Three reflectance classes split the carbonized macerals:
//   poorly carbonized  Ro ≤ 1.2 %
//   semi-inertinite    1.2 % < Ro ≤ 2.0 %
//   inertinite         Ro > 2.0 %   ← the durable pool (≥1000-yr, geological permanence)
// Eq. 1  F_React = C_React / C_Org                    (reactive carbon fraction)
// Eq. 2  F_Inert = F_Ro>2 × (1 − F_React)             (inertinite fraction of organic C)
// Eq. 3  C_Inert (dry wt%) = F_Inert × C_Org          (inertinite carbon content)
// Eq. 4  CDR (wt%) = C_Inert × 44.01 / 12.01          (CO2-equivalents)
function saneiModel({ froRo2, freact, corg }) {
  const fro = Math.max(0, Math.min(1, froRo2));   // fraction of Ro measurements > 2 %
  const fr = Math.max(0, Math.min(1, freact));    // reactive carbon fraction
  const fInert = fro * (1 - fr);                  // Eq. 2
  const cInert = fInert * corg;                   // Eq. 3 (as wt%, corg in wt%)
  const cdrWtPct = cInert * (44.01 / 12.01);      // Eq. 4 (tCO2e per 100 t biochar)
  return { fInert, cInert, cdrWtPct };
}

// Sampling-variance safety margin (Sanei et al. 2025, Eq. 16; Petersen et al. 2026, Eq. 1):
//   safety margin (%) ≈ k · CV(%) / sqrt(n),  k ≈ 1.65 (one-sided 95 % bound).
// n = independent samples (per year, or per batch group); CV from ≥3 samples.
function saneiSafetyMargin(cvPct, n, k = 1.65) {
  if (n <= 0) return 0;
  return k * cvPct / Math.sqrt(n);
}

// ---- Soil temperature by country (Lembrechts et al. 2022, SBIO1 5–15 cm). ----
// Same dataset Puro & Isometric name. Country-resolution; format [name, Tsoil°C, TminColdestMonth°C].
const SOIL_TEMPS = [["Afghanistan",15.4,1.77],["Albania",10.62,2.45],["Algeria",26.82,13.12],["American Samoa",23.84,25.21],["Andorra",1.19,-4.77],["Angola",21.33,16.18],["Antigua and Barb.",25.69,28.27],["Argentina",14.24,4.84],["Armenia",5.74,-2.26],["Aruba",28.0,30.52],["Australia",23.1,11.99],["Austria",4.87,-3.07],["Azerbaijan",12.04,2.1],["Bahamas",24.44,25.84],["Bahrain",30.46,21.43],["Bangladesh",24.5,16.77],["Barbados",25.64,27.97],["Belarus",6.3,-0.66],["Belgium",8.59,2.18],["Belize",23.58,23.1],["Benin",27.77,25.45],["Bermuda",20.34,19.01],["Bhutan",8.32,2.62],["Bolivia",19.65,13.91],["Bosnia and Herz.",8.22,-0.74],["Botswana",22.42,8.0],["Brazil",23.67,21.36],["Brunei",25.02,24.61],["Bulgaria",10.16,0.33],["Burkina Faso",30.16,26.32],["Burundi",18.64,16.57],["Cabo Verde",22.36,24.53],["Cambodia",26.31,25.15],["Cameroon",23.07,21.58],["Canada",-2.47,-14.0],["Cayman Is.",25.44,27.46],["Central African Rep.",24.6,22.56],["Chad",29.91,21.44],["Chile",9.18,1.54],["China",9.58,-4.69],["Colombia",21.8,21.53],["Comoros",21.37,22.64],["Congo",22.6,21.62],["Costa Rica",21.7,22.31],["Croatia",10.49,1.83],["Cuba",24.01,23.56],["Curaçao",27.41,30.25],["Cyprus",17.82,13.66],["Czechia",6.45,-1.23],["Côte d'Ivoire",25.98,24.43],["Dem. Rep. Congo",21.88,20.48],["Denmark",7.73,1.91],["Djibouti",30.83,25.12],["Dominica",22.44,25.48],["Dominican Rep.",22.84,22.48],["Ecuador",18.49,17.54],["Egypt",26.56,14.21],["El Salvador",24.22,23.55],["Eq. Guinea",21.01,20.61],["Eritrea",29.14,24.48],["Estonia",5.68,-0.04],["Ethiopia",23.04,20.42],["Faeroe Is.",3.92,3.0],["Fiji",22.49,23.01],["Finland",3.23,-1.7],["Fr. Polynesia",21.97,23.68],["France",11.33,5.6],["Gabon",22.04,21.13],["Gambia",29.01,26.23],["Georgia",7.01,-1.61],["Germany",7.62,0.65],["Ghana",27.25,25.39],["Greece",13.08,5.51],["Greenland",-6.54,-15.82],["Grenada",24.51,26.6],["Guam",25.53,26.8],["Guatemala",20.61,19.34],["Guernsey",10.06,7.15],["Guinea",25.43,22.14],["Guinea-Bissau",27.16,24.32],["Guyana",23.82,23.54],["Haiti",23.72,23.36],["Honduras",21.61,21.17],["Hong Kong",21.09,15.27],["Hungary",9.99,-0.2],["Iceland",1.08,-4.07],["India",24.38,16.56],["Indonesia",23.07,22.88],["Iran",20.04,5.58],["Iraq",25.37,10.11],["Ireland",8.51,5.32],["Isle of Man",8.03,5.53],["Israel",21.47,12.11],["Italy",11.52,4.3],["Jamaica",23.82,25.5],["Japan",9.97,1.76],["Jersey",10.05,6.52],["Jordan",21.83,9.06],["Kazakhstan",9.38,-4.76],["Kenya",25.42,22.92],["Kiribati",26.0,27.23],["Kosovo",8.68,-0.15],["Kuwait",30.0,14.36],["Kyrgyzstan",3.9,-6.18],["Laos",21.34,17.44],["Latvia",6.03,-0.04],["Lebanon",14.09,6.95],["Lesotho",9.54,-0.19],["Liberia",24.29,23.64],["Libya",26.0,13.34],["Liechtenstein",5.13,-2.13],["Lithuania",6.4,-0.26],["Luxembourg",7.21,0.78],["Macao",22.22,16.1],["Madagascar",22.05,18.49],["Malawi",21.22,16.4],["Malaysia",23.78,23.15],["Maldives",26.23,26.57],["Mali",32.16,23.1],["Malta",18.67,16.59],["Marshall Is.",25.58,26.37],["Mauritania",31.92,21.94],["Mauritius",22.23,22.31],["Mexico",20.2,13.78],["Micronesia",24.71,25.95],["Moldova",9.6,-0.7],["Monaco",12.68,6.54],["Mongolia",6.31,-14.93],["Montenegro",6.45,-1.5],["Morocco",21.79,12.73],["Mozambique",23.85,18.74],["Myanmar",22.05,16.13],["N. Mariana Is.",24.95,26.49],["Namibia",22.49,9.72],["Nepal",12.81,2.65],["Netherlands",9.51,3.17],["New Caledonia",20.38,19.71],["New Zealand",8.17,5.17],["Nicaragua",24.17,24.19],["Niger",31.31,20.53],["Nigeria",27.59,24.45],["North Korea",6.95,-5.28],["North Macedonia",9.55,0.45],["Oman",32.07,22.73],["Pakistan",23.3,9.63],["Palau",25.56,26.9],["Palestine",19.81,11.05],["Panama",23.16,23.69],["Papua New Guinea",20.86,21.06],["Paraguay",23.1,16.09],["Peru",17.75,15.34],["Philippines",24.09,24.39],["Poland",7.22,-0.27],["Portugal",14.4,9.27],["Puerto Rico",24.3,26.63],["Qatar",31.39,21.5],["Romania",8.8,-0.85],["Russia",-2.36,-16.33],["Rwanda",17.6,15.61],["S. Sudan",26.31,23.99],["Saint Lucia",24.53,26.97],["Samoa",22.92,24.43],["San Marino",12.47,3.78],["Saudi Arabia",29.6,16.64],["Senegal",30.48,26.61],["Serbia",9.99,0.07],["Seychelles",24.2,25.45],["Sierra Leone",24.91,23.36],["Singapore",25.33,25.56],["Sint Maarten",25.63,28.13],["Slovakia",6.98,-1.69],["Slovenia",7.68,-1.06],["Solomon Is.",23.58,25.25],["Somalia",29.31,25.95],["South Africa",17.92,6.55],["South Korea",11.35,1.33],["Spain",13.0,6.31],["Sri Lanka",25.68,25.85],["St-Martin",25.46,28.19],["St. Kitts and Nevis",24.32,26.89],["St. Vin. and Gren.",23.14,25.6],["Sudan",30.34,21.88],["Suriname",24.64,24.29],["Sweden",3.39,-1.67],["Switzerland",3.97,-2.93],["Syria",20.81,7.9],["São Tomé and Principe",22.15,23.07],["Tajikistan",6.25,-5.52],["Tanzania",22.49,19.95],["Thailand",25.65,23.2],["Timor-Leste",23.6,23.78],["Togo",27.0,24.93],["Tonga",22.92,23.14],["Trinidad and Tobago",25.08,26.62],["Tunisia",22.15,12.26],["Turkey",10.77,1.58],["Turkmenistan",18.63,3.36],["Turks and Caicos Is.",25.7,27.89],["Tuvalu",26.27,26.7],["U.S. Virgin Is.",25.63,28.07],["Uganda",21.77,19.71],["Ukraine",8.09,-0.22],["United Arab Emirates",32.26,21.62],["United Kingdom",7.71,3.47],["United States of America",8.45,-0.83],["Uruguay",16.59,9.32],["Uzbekistan",15.06,1.03],["Vanuatu",22.14,23.69],["Venezuela",24.12,23.34],["Vietnam",22.26,19.25],["Yemen",29.16,21.05],["Zambia",21.56,15.88],["Zimbabwe",21.33,13.4],["eSwatini",18.23,10.89]];

// Context note for a selected country: flags freeze conditions and the 7°C floor.
function coldNote(name) {
  const hit = SOIL_TEMPS.find(r => r[0] === name);
  if (!hit) return "";
  const [, tsoil, tmin] = hit;
  if (tsoil < 7) return `${name}: annual soil ${tsoil.toFixed(1)}°C is below the 7°C floor — credited as 7°C (conservative).`;
  if (tmin != null && tmin < 0) return `${name}: ${tsoil.toFixed(1)}°C annual mean; coldest month dips to ${tmin.toFixed(1)}°C (seasonal freezing).`;
  return `${name}: ${tsoil.toFixed(1)}°C annual mean soil temperature. Country-level — override for a specific site.`;
}

const EMBER = "#C75B39";
const INK = "#1F2A26";
const PAPER = "#F4F1EA";
const MOSS = "#3D5A4C";

const card = {
  background: "#FFFFFF", borderRadius: 14, border: "1px solid #E2DDD0",
  padding: "22px 24px", marginBottom: 18,
};
const label = { fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: MOSS, fontWeight: 600, marginBottom: 8, display: "block" };
const mono = { fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" };
const selStyle = { width: "100%", padding: "11px 12px", borderRadius: 9, border: "1px solid #D8D2C4", fontSize: 15, background: PAPER, color: INK, boxSizing: "border-box" };

function readout(big, small, accent) {
  return (
    <div style={{ flex: 1, minWidth: 130 }}>
      <div style={{ ...mono, fontSize: 30, fontWeight: 600, color: accent || INK, lineHeight: 1.1 }}>{big}</div>
      <div style={{ fontSize: 12.5, color: MOSS, marginTop: 4 }}>{small}</div>
    </div>
  );
}

function CarbonEstimator() {
  const withData = FS.filter(f => f.c != null);
  const [sel, setSel] = useState(withData[0].t);
  const [tons, setTons] = useState(1000);
  const [yld, setYld] = useState("ym");
  const f = withData.find(x => x.t === sel);

  const yieldFrac = f[yld];
  const biochar = tons * yieldFrac;
  // biochar carbon content: use measured if present, else estimate from feedstock carbon (~2x enrichment, capped 0.85)
  const bcc = f.bcc != null ? f.bcc : Math.min(f.c * 1.7, 0.85);
  const carbonInBiochar = biochar * bcc;
  const co2 = carbonInBiochar * (44 / 12); // C -> CO2 stoichiometric
  const est = f.bcc == null;

  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 4px", fontSize: 18, color: INK }}>Carbon removal estimator</h3>
      <p style={{ margin: "0 0 18px", fontSize: 14, color: MOSS }}>How much CO₂ a project removes, from feedstock type and tonnage.</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: 2, minWidth: 200 }}>
          <label style={label}>Feedstock</label>
          <select style={selStyle} value={sel} onChange={e => setSel(e.target.value)}>
            {withData.map(x => <option key={x.t} value={x.t}>{x.t} — {x.cat}</option>)}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: 140 }}>
          <label style={label}>Feedstock input (t/yr)</label>
          <input type="number" style={selStyle} value={tons} min={0}
            onChange={e => setTons(Math.max(0, Number(e.target.value)))} />
        </div>
      </div>

      <label style={label}>Conversion scenario</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["yl", "Low", f.yl], ["ym", "Medium", f.ym], ["yh", "High", f.yh]].map(([k, lab, v]) => (
          <button key={k} onClick={() => setYld(k)}
            style={{ flex: 1, padding: "9px 6px", borderRadius: 9, cursor: "pointer", fontSize: 13.5,
              border: yld === k ? `1.5px solid ${EMBER}` : "1px solid #D8D2C4",
              background: yld === k ? "#FBEDE7" : PAPER, color: yld === k ? EMBER : INK,
              fontWeight: yld === k ? 600 : 400 }}>
            {lab} · {(v * 100).toFixed(0)}%
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", padding: "18px 20px", background: INK, borderRadius: 12 }}>
        {readout(Math.round(biochar).toLocaleString() + " t", "biochar produced", "#E8C9A0")}
        {readout((bcc * 100).toFixed(1) + "%", est ? "biochar C content (est.)" : "biochar C content", "#E8C9A0")}
        {readout(Math.round(co2).toLocaleString() + " t", "CO₂ removed / yr", EMBER)}
      </div>
      {est && <p style={{ fontSize: 12, color: "#A8917A", margin: "10px 2px 0", fontStyle: "italic" }}>
        No measured biochar-carbon value for this feedstock in the dataset — estimated from feedstock carbon content. Treat as indicative.
      </p>}
    </div>
  );
}

function EbcChecker() {
  const [hc, setHc] = useState(0.35);
  const [oc, setOc] = useState(0.30);

  const results = EBC_CLASSES.map(c => {
    const hcOk = hc <= c.hc;
    const ocOk = c.oc == null ? true : oc <= c.oc;
    return { ...c, qualifies: hcOk && ocOk, hcOk, ocOk };
  });

  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 4px", fontSize: 18, color: INK }}>EBC compliance check</h3>
      <p style={{ margin: "0 0 18px", fontSize: 14, color: MOSS }}>Which European Biochar Certificate classes a sample qualifies for, by H/C and O/C ratio.</p>

      <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 150 }}>
          <label style={label}>H/C molar ratio &mdash; {hc.toFixed(2)}</label>
          <input type="range" min={0} max={1} step={0.01} value={hc} onChange={e => setHc(Number(e.target.value))}
            style={{ width: "100%", accentColor: EMBER }} />
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <label style={label}>O/C molar ratio &mdash; {oc.toFixed(2)}</label>
          <input type="range" min={0} max={1} step={0.01} value={oc} onChange={e => setOc(Number(e.target.value))}
            style={{ width: "100%", accentColor: EMBER }} />
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {results.map(r => (
          <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
            borderRadius: 9, background: r.qualifies ? "#ECF3EC" : PAPER,
            border: `1px solid ${r.qualifies ? "#BBD4BB" : "#E2DDD0"}` }}>
            <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff",
              background: r.qualifies ? MOSS : "#C9C2B2" }}>{r.qualifies ? "✓" : "·"}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>{r.name}</div>
              <div style={{ fontSize: 12.5, color: MOSS }}>{r.use} · {r.note}</div>
            </div>
            <div style={{ ...mono, fontSize: 12, color: MOSS, textAlign: "right", whiteSpace: "nowrap" }}>
              H/C&le;{r.hc}{r.oc != null ? ` · O/C≤${r.oc}` : ""}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: MOSS, margin: "14px 2px 0", fontStyle: "italic" }}>
        Carbon-removal credits generally require H/C below 0.7 (permanence threshold). Lower ratios indicate more stable, recalcitrant carbon.
      </p>
    </div>
  );
}

function CostExplorer() {
  const [scale, setScale] = useState("All");
  const scales = ["All", "Small", "Mid", "Large"];
  const match = (c) => {
    if (scale === "All") return true;
    const s = (c.size || "").toLowerCase();
    return s.includes(scale.toLowerCase());
  };
  const rows = COST.filter(c => c.cost != null && match(c));

  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 4px", fontSize: 18, color: INK }}>Plant cost benchmarks</h3>
      <p style={{ margin: "0 0 16px", fontSize: 14, color: MOSS }}>Sourced CAPEX datapoints across technologies and scales. Currencies preserved as published.</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {scales.map(s => (
          <button key={s} onClick={() => setScale(s)}
            style={{ padding: "7px 16px", borderRadius: 20, cursor: "pointer", fontSize: 13.5,
              border: scale === s ? `1.5px solid ${EMBER}` : "1px solid #D8D2C4",
              background: scale === s ? "#FBEDE7" : PAPER, color: scale === s ? EMBER : INK,
              fontWeight: scale === s ? 600 : 400 }}>{s}</button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {rows.map(c => (
          <div key={c.id} style={{ display: "flex", alignItems: "baseline", gap: 14, padding: "12px 14px",
            borderRadius: 9, background: PAPER, border: "1px solid #E2DDD0" }}>
            <div style={{ ...mono, fontSize: 17, fontWeight: 600, color: EMBER, minWidth: 120 }}>
              {c.cost.toLocaleString()} {c.cur}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, color: INK }}>{c.tech || c.item}</div>
              <div style={{ fontSize: 12.5, color: MOSS }}>
                per {c.unit} · {c.country}{c.yr ? ` · ${c.yr}` : ""} · {c.src}
              </div>
            </div>
            {c.size && <span style={{ fontSize: 11.5, color: MOSS, background: "#ECEAE1",
              padding: "3px 9px", borderRadius: 6, whiteSpace: "nowrap" }}>{c.size.split(" ")[0]}</span>}
          </div>
        ))}
        {rows.length === 0 && <div style={{ fontSize: 14, color: MOSS, padding: 12 }}>No datapoints at this scale.</div>}
      </div>
    </div>
  );
}

function PermanenceCalculator() {
  const [method, setMethod] = useState("puro");      // "puro" | "verra" | "iso"
  const [hcInput, setHcInput] = useState("0.30");    // entered as molar H/Corg
  const [byMass, setByMass] = useState(false);       // toggle: enter mass ratio instead
  const [ts, setTs] = useState(20);                  // soil temperature, °C (Puro & Iso)
  const [region, setRegion] = useState("");          // selected country (auto-fills ts)
  const [prKey, setPrKey] = useState("high");        // production temp bracket (Verra)
  const [q, setQ] = useState(1000);                  // batch dry mass, t
  const [corg, setCorg] = useState(80);              // organic carbon, %
  const [fracAbove2, setFracAbove2] = useState(72);  // % of R0 measurements ≥ 2% (Rainbow 1000-yr)
  const [residual, setResidual] = useState(95);      // residual (non-labile) organic carbon %
  const [moisture, setMoisture] = useState(10);      // moisture % (Rainbow Eq.4, as-received mass)
  const [isoOption, setIsoOption] = useState("o1");  // Isometric durability: "o1"=200-yr, "o2"=1000-yr
  const [isoS, setIsoS] = useState(85);              // % R0 samples passing 2% benchmark (Iso Opt.2)
  const [isoN, setIsoN] = useState(500);             // samples per batch, N ≥ 500 (Iso Opt.2)
  const [froRo2, setFroRo2] = useState(85);          // % of Ro measurements > 2% (Sanei inertinite share)
  const [freactPct, setFreactPct] = useState(1.0);   // reactive carbon fraction, % (Sanei)

  const isPuro = method === "puro";
  const isVerra = method === "verra";
  const isIso = method === "iso";
  const isRainbow = method === "rainbow";            // Rainbow/Sanei reflectance, 1000-yr
  const isSanei = method === "sanei";                // Sanei IBRo2 inertinite benchmarking
  const isoO2 = isIso && isoOption === "o2";          // Isometric Option 2: 1000-yr (S/N based)
  const isoO1 = isIso && isoOption === "o1";          // Isometric Option 1: 200-yr (H/Corg based)

  // Convert mass ratio to molar ratio if needed (×12.0).
  const hcorg = byMass ? (Number(hcInput) || 0) * 12.0 : (Number(hcInput) || 0);
  // Eligibility gate differs: Isometric Opt.1 caps H/Corg at 0.5; Puro/Verra/Rainbow at 0.7.
  // Isometric Opt.2 is reflectance-driven (S/N), so the H/C gate doesn't apply.
  const hcCap = isIso ? 0.5 : 0.7;
  const hcEligible = hcorg >= 0 && hcorg < hcCap + (isIso ? 0 : 1e-9);

  // Puro persistence fraction (% surviving over several centuries).
  const { pf: puroPf, tUsed } = puroPF(hcorg, ts);
  const puroPfPct = Math.max(0, Math.min(100, puroPf));
  const tsFloored = ts < 7;

  // Verra permanence adjustment factor (fraction surviving at 100 yr).
  const verra = VERRA_PR.find(v => v.key === prKey);
  const verraPct = verra.pr * 100;

  // Isometric durable fraction. Opt.1: F_durable,200 from H/Corg + soil temp.
  // Opt.2: F_durable,1000 = S − sqrt(S(1−S)/N) from the 2% R0 benchmark share.
  const isoPct200 = isoF200(hcorg, ts);
  const isoPct1000 = isoF1000(isoS / 100, isoN);
  const isoPct = isoO2 ? isoPct1000 : isoPct200;

  // Rainbow/Sanei 1000-yr inertinite fraction: F = (frac R0 ≥ 2%) × (residual C fraction).
  const rainbowPct = (Math.max(0, Math.min(100, fracAbove2)) / 100) *
                     (Math.max(0, Math.min(100, residual)) / 100) * 100;

  // Sanei IBRo2 inertinite fraction of organic carbon: F_Inert = F_Ro>2 × (1 − F_React).
  const saneiPct = (Math.max(0, Math.min(100, froRo2)) / 100) *
                   (1 - Math.max(0, Math.min(100, freactPct)) / 100) * 100;

  // Rainbow & Isometric Opt.2 gate on reflectance inputs, not H/C — always "eligible" here.
  const eligible = (isRainbow || isoO2) ? true : hcEligible;

  const pct = isPuro ? puroPfPct : isVerra ? verraPct : isRainbow ? rainbowPct : isoPct;

  // Gross stored CO2e. Isometric uses precise atomic weights 44.01/12.01.
  // Rainbow Eq.4 uses 44/12 and applies a moisture deduction (1 − M%) because its
  // mass input A_biochar is as-received, not dry. Puro/Verra use 44/12.
  const co2Factor = isIso ? (44.01 / 12.01) : (44 / 12);
  const moistFactor = isRainbow ? (1 - Math.max(0, Math.min(100, moisture)) / 100) : 1;
  const cStored = q * (corg / 100) * co2Factor * moistFactor;
  const net = cStored * pct / 100;
  const loss = cStored - net;

  // Per-method gross stored CO2e for the comparison panel, so each column uses its
  // own atomic-weight and (for Rainbow) moisture basis rather than the active method's.
  const grossFor = (m) => {
    const cf = (m === "iso" || m === "sanei") ? (44.01 / 12.01) : (44 / 12);
    const mf = m === "rainbow" ? (1 - Math.max(0, Math.min(100, moisture)) / 100) : 1;
    return q * (corg / 100) * cf * mf;
  };

  const inStyle = { ...selStyle, width: "auto", flex: 1, minWidth: 0 };
  const tabBtn = (active) => ({
    flex: 1, padding: "10px 6px", borderRadius: 9, cursor: "pointer", fontSize: 13.5,
    border: active ? `1.5px solid ${EMBER}` : "1px solid #D8D2C4",
    background: active ? "#FBEDE7" : PAPER, color: active ? EMBER : INK,
    fontWeight: active ? 600 : 500,
  });

  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 4px", fontSize: 18, color: INK }}>Permanence calculator</h3>
      <p style={{ margin: "0 0 16px", fontSize: 14, color: MOSS }}>
        How much biochar carbon counts as durable — under four certification standards, each with its own method and durability horizon.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <button onClick={() => setMethod("puro")} style={tabBtn(isPuro)}>Puro 2025 · CORC200+</button>
        <button onClick={() => setMethod("verra")} style={tabBtn(isVerra)}>Verra VM0044 · 100&nbsp;yr</button>
        <button onClick={() => setMethod("iso")} style={tabBtn(isIso)}>Isometric</button>
        <button onClick={() => setMethod("rainbow")} style={tabBtn(isRainbow)}>Rainbow</button>
        <button onClick={() => setMethod("sanei")} style={tabBtn(isSanei)}>Sanei IBRo2</button>
      </div>

      {isRainbow && <RainbowMethodPicker
        corg={corg} setCorg={setCorg}
        moisture={moisture} setMoisture={setMoisture}
        hcorg={hcorg} hcInput={hcInput} setHcInput={setHcInput}
        ts={ts} setTs={setTs} region={region} setRegion={setRegion}
        frac={fracAbove2} setFrac={setFracAbove2}
        residual={residual} setResidual={setResidual}
        q={q} setQ={setQ} />}

      {isIso && (
        <>
          <div style={{ padding: "10px 14px", borderRadius: 9, background: "#EEF2F6",
            border: "1px solid #C3D0DC", marginBottom: 14, fontSize: 12.5, color: "#3A4A57", lineHeight: 1.55 }}>
            <strong>Isometric Soil Storage (v1.2).</strong> Two durability options, chosen per project and
            declared in the PDD — they can't be combined. Option&nbsp;1 credits at 200&nbsp;years from H/C<sub>org</sub>;
            Option&nbsp;2 credits at 1,000&nbsp;years from the share of R₀ measurements passing the 2% benchmark.
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              ["o1", "Option 1 · 200 yr", "H/C₍org₎ soil-temperature model", "Woolf et al. 2021 · Eq. 2"],
              ["o2", "Option 2 · 1000 yr", "Random-reflectance benchmark", "Sanei et al. 2024 · Eq. 3"],
            ].map(([k, tag, title, sub]) => {
              const active = isoOption === k;
              return (
                <button key={k} onClick={() => setIsoOption(k)}
                  style={{ flex: 1, minWidth: 200, padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                    textAlign: "left", border: active ? `1.5px solid ${EMBER}` : "1px solid #D8D2C4",
                    background: active ? "#FBEDE7" : PAPER }}>
                  <div style={{ ...mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
                    color: active ? EMBER : MOSS, marginBottom: 4 }}>{tag}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{title}</div>
                  <div style={{ fontSize: 12, color: MOSS, marginTop: 2 }}>{sub}</div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {isSanei && <SaneiIBRo2Calculator
        corg={corg} setCorg={setCorg} q={q} setQ={setQ}
        froRo2={froRo2} setFroRo2={setFroRo2}
        freactPct={freactPct} setFreactPct={setFreactPct} />}

      {!isRainbow && !isSanei && (
      <>

      {/* Inputs: Isometric Opt.2 uses S/N reflectance inputs; everything else uses H/Corg + a second input */}
      {isoO2 ? (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={label}>Samples passing 2% R₀ — S = {isoS}%</label>
            <input type="range" min={0} max={100} step={1} value={isoS}
              onChange={e => setIsoS(Number(e.target.value))}
              style={{ width: "100%", accentColor: EMBER }} />
            <p style={{ fontSize: 11.5, color: MOSS, margin: "6px 2px 0" }}>
              Share of maceral-level R₀ measurements at or above the 2% benchmark (Sanei et al. 2024).
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={label}>Samples per batch — N = {isoN.toLocaleString()}</label>
            <input type="number" min={1} step={1} style={selStyle} value={isoN}
              onChange={e => setIsoN(Math.max(1, Number(e.target.value)))} />
            <p style={{ fontSize: 11.5, color: MOSS, margin: "6px 2px 0" }}>
              At least 500 measurements required. Larger N shrinks the standard-deviation discount.
            </p>
          </div>
        </div>
      ) : (
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <label style={label}>{byMass ? "H/C\u2092\u1d63\u1d4d mass ratio" : "H/C\u2092\u1d63\u1d4d molar ratio"}</label>
            <button onClick={() => setByMass(m => !m)}
              style={{ ...mono, fontSize: 11, color: MOSS, background: "none", border: "none",
                cursor: "pointer", textDecoration: "underline", padding: 0, marginBottom: 8 }}>
              {byMass ? "enter molar" : "enter by mass"}
            </button>
          </div>
          <input type="number" step="0.01" min={0} style={selStyle} value={hcInput}
            onChange={e => setHcInput(e.target.value)} />
          {byMass && <p style={{ fontSize: 11.5, color: MOSS, margin: "6px 2px 0" }}>
            Converted to molar (×12.0) → <span style={mono}>{hcorg.toFixed(3)}</span>
          </p>}
        </div>

        {/* Method-specific second input */}
        {isVerra ? (
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={label}>Production temperature</label>
            <select style={selStyle} value={prKey} onChange={e => setPrKey(e.target.value)}>
              {VERRA_PR.map(v => <option key={v.key} value={v.key}>{v.label} ({v.range}) — PR {v.pr}</option>)}
            </select>
            <p style={{ fontSize: 11.5, color: MOSS, margin: "6px 2px 0" }}>
              Source: IPCC 2019 Table 4AP.2 / Woolf et al. 2021. Flat default by temperature bracket.
            </p>
          </div>
        ) : (
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={label}>Soil temperature</label>
            <div style={{ display: "flex", gap: 8, alignItems: "stretch", marginBottom: 8 }}>
              <select style={{ ...selStyle, flex: 1, marginBottom: 0 }} value={region}
                onChange={e => {
                  const name = e.target.value;
                  setRegion(name);
                  const hit = SOIL_TEMPS.find(r => r[0] === name);
                  if (hit) setTs(hit[1]);
                }}>
                <option value="">Pick a country…</option>
                {SOIL_TEMPS.map(r => (
                  <option key={r[0]} value={r[0]}>{r[0]}</option>
                ))}
              </select>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", minWidth: 78, padding: "0 12px", borderRadius: 9,
                background: ts < 7 ? "#FBEDE7" : "#ECF3EC",
                border: `1px solid ${ts < 7 ? "#E8C9A0" : "#BBD4BB"}` }}>
                <div style={{ ...mono, fontSize: 18, fontWeight: 600, color: ts < 7 ? EMBER : MOSS, lineHeight: 1.1 }}>
                  {ts.toFixed(1)}°
                </div>
                <div style={{ fontSize: 9.5, color: MOSS, letterSpacing: "0.04em", marginTop: 2 }}>
                  {ts < 7 ? "→ 7° FLOOR" : "MEAN SOIL"}
                </div>
              </div>
            </div>
            <input type="range" min={-5} max={40} step={0.1} value={ts}
              onChange={e => { setTs(Number(e.target.value)); setRegion(""); }}
              style={{ width: "100%", accentColor: EMBER }} />
            <p style={{ fontSize: 11.5, color: MOSS, margin: "6px 2px 0" }}>
              {region
                ? coldNote(region)
                : "Pick a country (Lembrechts 2022, SBIO1 5–15 cm) or drag to set manually. Country-level — override for a specific site."}
            </p>
          </div>
        )}
      </div>
      )}

      {!eligible && !isRainbow && (
        <div style={{ padding: "11px 14px", borderRadius: 9, background: "#FBEDE7",
          border: `1px solid ${EMBER}`, marginBottom: 16, fontSize: 13, color: "#8A3A22" }}>
          H/C<sub>org</sub> = <span style={mono}>{hcorg.toFixed(3)}</span> is at or above {hcCap.toFixed(1)} —
          ineligible under {isoO1 ? "Isometric Option 1, which sets a stricter gate (0.5) than Puro or Verra (0.7)"
            : isIso ? "Isometric, which sets a stricter gate than Puro or Verra (0.7)" : "this standard"}.
          {isIso ? " A lower H/C means a more carbonized, more stable char." : " Above this ratio the material doesn't meet the biochar definition for soil use."}
        </div>
      )}

      {/* Headline persistence value */}
      <label style={label}>
        {isPuro ? "Persistence fraction (Eq. 6.4)" : isVerra ? "Permanence factor PR (Eq. 2 / Table 3)"
          : isRainbow ? "Inertinite fraction F_perm,1000 · Rainbow/Sanei (Eq. 3)"
          : isoO2 ? "Durable fraction F_durable,1000 (Eq. 3)" : "Durable fraction F (Eq. 2 / Table 3)"}
      </label>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, padding: "18px 20px",
        background: INK, borderRadius: 12, marginBottom: 6, flexWrap: "wrap" }}>
        {readout(eligible ? pct.toFixed(1) + "%" : "—",
          isPuro ? "carbon persistent over several centuries"
          : isVerra ? "carbon remaining at 100 years"
          : isRainbow ? "inertinite carbon durable over 1000 years"
          : isoO2 ? "carbon durable over 1000 years"
          : "carbon durable over 200 years", EMBER)}
        <div style={{ ...mono, fontSize: 12.5, color: "#A8917A", lineHeight: 1.7, flex: 1, minWidth: 180 }}>
          {isPuro && (
            <>
              PF = M − a × (H/C<sub>org</sub>)<br />
              PF = {PURO_M[tUsed]} − {PURO_A[tUsed]} × {hcorg.toFixed(3)}<br />
              <span style={{ color: "#7E9B86" }}>M, a read at Ts = {tUsed}°C</span>
            </>
          )}
          {isVerra && (
            <>
              PR = {verra.pr} &nbsp;(fixed default)<br />
              {verra.label}<br />
              <span style={{ color: "#7E9B86" }}>{verra.range} bracket</span>
            </>
          )}
          {isoO1 && (
            <>
              F = 1 − [c + (a + b·ln Ts)·H/C<sub>org</sub>]<br />
              a={ISO_A}, b={ISO_B}, c={ISO_C}<br />
              <span style={{ color: "#7E9B86" }}>Ts = {Math.max(7, ts).toFixed(1)}°C, capped at 95%</span>
            </>
          )}
          {isoO2 && (
            <>
              F = S − √[ S(1−S) / N ]<br />
              F = {(isoS/100).toFixed(2)} − √[{(isoS/100).toFixed(2)}×{(1-isoS/100).toFixed(2)}/{isoN.toLocaleString()}] = {(isoPct1000/100).toFixed(3)}<br />
              <span style={{ color: "#7E9B86" }}>1 SD below the mean pass-rate (N = {isoN.toLocaleString()})</span>
            </>
          )}
          {isRainbow && (
            <>
              F = (R₀ ≥ 2%) × (residual C)<br />
              F = {(fracAbove2/100).toFixed(2)} × {(residual/100).toFixed(2)} = {(rainbowPct/100).toFixed(3)}<br />
              <span style={{ color: "#7E9B86" }}>below-2% carbon earns no credit</span>
            </>
          )}
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: MOSS, margin: "0 2px 22px", fontStyle: "italic" }}>
        {isPuro && "Coefficients already embed Puro's 80% confidence-interval discount; durability claimed as CORC200+."}
        {isVerra && "Verra credits over a 100-year permanence horizon; the factor varies only by production-temperature bracket."}
        {isoO1 && "Conservative 17th-percentile fit on Woolf 2021. Isometric Option 1 gates more strictly (H/C < 0.5) and credits over 200 years."}
        {isoO2 && "Isometric Option 2 credits the fraction of biochar passing the 2% R₀ benchmark (Sanei 2024) over 1,000 years, discounted by one standard deviation of the binomial sample proportion. Requires ≥500 maceral-level R₀ measurements per batch."}
        {isRainbow && "Rainbow BiCRS Approach 2 (Sanei 2024), Eq. 3 & 4: only residual carbon above the 2% reflectance benchmark is credited, on a moisture-corrected basis. This is the gross credited fraction before any sampling-variance safety margin."}
      </p>

      {/* Batch application */}
      <label style={label}>Apply to a biochar batch</label>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ flex: 1, minWidth: 150 }}>
          <span style={{ fontSize: 12.5, color: MOSS, display: "block", marginBottom: 6 }}>
            {isRainbow ? "As-received mass A (t)" : "Dry mass Q (t)"}
          </span>
          <input type="number" min={0} style={inStyle} value={q}
            onChange={e => setQ(Math.max(0, Number(e.target.value)))} />
        </div>
        <div style={{ flex: 1, minWidth: 150 }}>
          <span style={{ fontSize: 12.5, color: MOSS, display: "block", marginBottom: 6 }}>Organic carbon C<sub>org</sub> (%)</span>
          <input type="number" min={0} max={100} style={inStyle} value={corg}
            onChange={e => setCorg(Math.max(0, Math.min(100, Number(e.target.value))))} />
        </div>
        {isRainbow && (
          <div style={{ flex: 1, minWidth: 150 }}>
            <span style={{ fontSize: 12.5, color: MOSS, display: "block", marginBottom: 6 }}>Moisture M (%)</span>
            <input type="number" min={0} max={100} style={inStyle} value={moisture}
              onChange={e => setMoisture(Math.max(0, Math.min(100, Number(e.target.value))))} />
          </div>
        )}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {[
          ["Gross stored carbon", cStored,
            isRainbow ? "C\u2092\u1d63\u1d4d × A × (1 − M%) × 44/12"
              : isIso ? "Q × C\u2092\u1d63\u1d4d × 44.01/12.01" : "Q × C\u2092\u1d63\u1d4d × 44/12", "#E8C9A0"],
          [isVerra ? "Decayed / not credited" : "Non-durable (decay)", loss,
            isPuro ? "× (100 − PF)" : isVerra ? "× (1 − PR)" : "× (1 − F)", "#C9C2B2"],
          ["Net durable removal", net,
            isPuro ? "counts toward CORCs" : isVerra ? "counts toward VCUs"
              : isRainbow ? "credited as negative (BiCRS Eq. 4)" : "counts toward Isometric credits", EMBER, isRainbow],
        ].map(([lab, val, formula, color, signed]) => (
          <div key={lab} style={{ display: "flex", alignItems: "baseline", gap: 14, padding: "12px 14px",
            borderRadius: 9, background: PAPER, border: "1px solid #E2DDD0" }}>
            <div style={{ ...mono, fontSize: 17, fontWeight: 600, color, minWidth: 140 }}>
              {eligible ? (signed && lab === "Net durable removal" ? "−" : "") + Math.round(val).toLocaleString() + " tCO₂e" : "—"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, color: INK }}>{lab}</div>
              <div style={{ ...mono, fontSize: 11.5, color: MOSS }} dangerouslySetInnerHTML={{ __html: formula }} />
            </div>
          </div>
        ))}
      </div>

      </>
      )}

      {/* Side-by-side comparison — visible for every method, Sanei included */}
      {(isRainbow || isoO2 || isSanei || (hcorg >= 0 && hcorg < 0.7)) && (
        <div style={{ marginTop: 18, padding: "14px 16px", borderRadius: 12, background: "#ECEAE1" }}>
          <div style={{ ...label, marginBottom: 12 }}>Same biochar, five standards</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              ["Puro 2025", puroPfPct, hcorg < 0.7, isPuro, "200-yr H/C", "puro"],
              ["Verra VM0044", verraPct, true, isVerra, "100-yr temp", "verra"],
              ["Isometric", isoPct, isoO2 ? true : hcorg < 0.5, isIso,
                isoO2 ? "1000-yr R₀" : "200-yr H/C", "iso"],
              ["Rainbow", rainbowPct, true, isRainbow, "1000-yr R₀", "rainbow"],
              ["Sanei IBRo2", saneiPct, true, isSanei, "geological R₀", "sanei"],
            ].map(([nm, p, elig, active, basis, mkey]) => (
              <div key={nm} style={{ flex: 1, minWidth: 110, padding: "12px 14px", borderRadius: 9,
                background: "#FFFFFF", border: `1px solid ${active ? EMBER : "#E2DDD0"}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 4 }}>{nm}</div>
                <div style={{ ...mono, fontSize: 22, fontWeight: 600, color: active ? EMBER : INK }}>
                  {elig ? p.toFixed(1) + "%" : "n/e"}
                </div>
                <div style={{ fontSize: 12, color: MOSS, marginTop: 2 }}>
                  {elig ? Math.round(grossFor(mkey) * p / 100).toLocaleString() + " tCO₂e · " + basis
                    : nm === "Isometric" ? "H/C ≥ 0.5 gate" : "H/C ≥ 0.7 gate"}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11.5, color: MOSS, margin: "12px 2px 0", lineHeight: 1.6 }}>
            The spread is the methodology, not the biochar. Verra applies a flat 100-yr factor by production temperature;
            Puro and Isometric resolve a fraction from H/C<sub>org</sub> and soil temperature (several centuries / 200&nbsp;yr);
            Rainbow and Sanei both credit the inertinite fraction from reflectance — Rainbow over 1000&nbsp;yr, Sanei as
            measured geological permanence (~100&nbsp;Myr) — a different input basis, shown for context.
            Isometric won't credit above H/C&nbsp;0.5. Reversal risk sits outside this number in all five, via buffer pools.
          </p>
        </div>
      )}
    </div>
  );
}

// ---- Rainbow BiCRS · Approach 2 · 1000-year Inertinite Carbon Removal ----
// Your uploaded RainbowBiCRSCalculator, fitted into a Charatlas tab.
const LINE = "#E2DDD0";   // hairline
const FELT = "#ECEAE1";   // panel fill

function RainbowBiCRSCalculator({ corg, setCorg, moisture, setMoisture,
  frac, setFrac, residual, setResidual, q, setQ }) {
  // ── Inputs (spec defaults) ──────────────────────────────────────
  const amount = q, setAmount = setQ;          // biochar mass shared with all registries
  // corg, moisture, residual, frac are shared (passed from PermanenceCalculator).

  // ── Math (real-time) ────────────────────────────────────────────
  const fPerm = (frac / 100) * (residual / 100);                       // Eq. 3
  const physicalC = fPerm * (corg / 100) * amount * (1 - moisture / 100); // physical permanent carbon, t
  const removal = physicalC * (44 / 12);                               // Eq. 4, t CO2e

  // ── Reusable styles ─────────────────────────────────────────────
  const rcard = {
    background: "#FBFAF6", border: `1px solid ${LINE}`, borderRadius: 14,
    padding: "20px 22px", marginBottom: 14,
  };
  const rlabel = {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase",
    color: MOSS, display: "block", marginBottom: 8,
  };
  const numStyle = {
    ...mono, width: "100%", boxSizing: "border-box", fontSize: 15, color: INK,
    padding: "9px 11px", borderRadius: 9, border: `1px solid ${LINE}`, background: PAPER,
    outline: "none",
  };
  const chip = (active) => ({
    ...mono, fontSize: 12, fontWeight: 600, padding: "3px 9px", borderRadius: 6,
    background: active ? "#FBEDE7" : FELT, color: active ? EMBER : MOSS,
    border: `1px solid ${active ? EMBER : LINE}`,
  });
  const stepNo = {
    ...mono, fontSize: 12, fontWeight: 700, color: "#FFFFFF", background: MOSS,
    width: 24, height: 24, borderRadius: 7, display: "inline-flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  };

  const field = (lab, value, setter, opts = {}) => (
    <div style={{ flex: 1, minWidth: 150 }}>
      <label style={rlabel}>{lab}</label>
      <input
        type="number" value={value} step={opts.step ?? 1}
        min={opts.min ?? 0} max={opts.max}
        onChange={(e) => {
          let v = Number(e.target.value);
          if (opts.min != null) v = Math.max(opts.min, v);
          if (opts.max != null) v = Math.min(opts.max, v);
          setter(v);
        }}
        style={numStyle}
      />
      {opts.hint && <p style={{ fontSize: 11, color: MOSS, margin: "6px 2px 0" }}>{opts.hint}</p>}
    </div>
  );

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ ...mono, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: EMBER, marginBottom: 6 }}>
          Rainbow BiCRS · Approach 2 · 1000-year
        </div>
        <h3 style={{ margin: 0, fontSize: 18, color: INK }}>
          Inertinite Carbon Removal Calculator
        </h3>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: MOSS, lineHeight: 1.55 }}>
          Reflectance-based permanence after Sanei et&nbsp;al. 2024. Carbon with random reflectance
          (R₀) at or above 2% is treated as inertinite — geologically stable for at least 1000 years.
          Watch how the fractions multiply into a final removal.
        </p>
      </div>

      {/* ── Inputs ── */}
      <div style={rcard}>
        <label style={{ ...rlabel, marginBottom: 14 }}>Project inputs</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 14 }}>
          {field("Dry mass Q (t)", amount, setAmount, { step: 0.1, hint: "As-received mass, A — shared across registries" })}
          {field("Total organic carbon (%)", corg, setCorg, { max: 100, hint: "C₍org₎ of the biochar" })}
          {field("Moisture (%)", moisture, setMoisture, { max: 100, hint: "Water removed before C→CO₂" })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {field("Residual carbon fraction (%)", residual, setResidual, { max: 100, hint: "Non-labile: total − reactive" })}
          {field("Sample fraction R₀ ≥ 2% (%)", frac, setFrac, { max: 100, hint: "Share of ≥500 measurements above 2%" })}
        </div>
      </div>

      {/* ── Step-by-step breakdown ── */}
      <label style={{ ...rlabel, margin: "22px 2px 12px" }}>Step-by-step methodology breakdown</label>

      {/* Step 1 — threshold, not mean */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>1</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>The 2% threshold decides — not the mean</div>
            <p style={{ fontSize: 13.5, color: MOSS, margin: "0 0 12px", lineHeight: 1.55 }}>
              The methodology deliberately ignores the mean R₀. What matters is the <em>distribution</em>:
              the share of measurements that clear the 2% inertinite benchmark. Everything ≥ 2% counts as
              permanent; everything below earns no removals — so a sample is certified on the fraction above
              the benchmark, never on its average reflectance.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span style={chip(false)}>mean R₀ · ignored</span>
              <span style={{ color: LINE }}>→</span>
              <span style={chip(true)}>fraction ≥ 2% = {frac}% · used</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 — Eq. 3 */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>2</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Permanent carbon fraction</div>
            <div style={{ ...mono, fontSize: 12, color: MOSS, marginBottom: 12 }}>Equation 3 · F₍perm 1000₎</div>
            <div style={{ background: INK, borderRadius: 11, padding: "16px 18px", ...mono }}>
              <div style={{ fontSize: 13, color: "#A8917A", lineHeight: 1.8 }}>
                F = (fraction ≥ 2%) × (residual carbon)
              </div>
              <div style={{ fontSize: 15, color: "#E8C9A0", lineHeight: 1.8 }}>
                F = {(frac / 100).toFixed(2)} × {(residual / 100).toFixed(2)}
                &nbsp;=&nbsp;<span style={{ color: EMBER, fontWeight: 700 }}>{(fPerm * 100).toFixed(1)}%</span>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: MOSS, margin: "10px 2px 0" }}>
              {(fPerm * 100).toFixed(1)}% of the biochar's organic carbon is permanent for 1000 years.
              The other {(100 - fPerm * 100).toFixed(1)}% is assumed to decompose within the horizon.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 — physical mass */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>3</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Physical permanent carbon</div>
            <div style={{ ...mono, fontSize: 12, color: MOSS, marginBottom: 12 }}>F × C₍org₎ × amount × (1 − moisture)</div>
            <div style={{ background: INK, borderRadius: 11, padding: "16px 18px", ...mono }}>
              <div style={{ fontSize: 14, color: "#E8C9A0", lineHeight: 1.9 }}>
                {fPerm.toFixed(3)} × {(corg / 100).toFixed(2)} × {amount} × {(1 - moisture / 100).toFixed(2)}
              </div>
              <div style={{ fontSize: 15, color: EMBER, fontWeight: 700, lineHeight: 1.6 }}>
                = {physicalC.toFixed(3)} t permanent carbon
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: MOSS, margin: "10px 2px 0" }}>
              Multiplying the permanent fraction by the carbon content, the batch mass, and the dry-mass
              factor gives the tonnes of physical carbon locked away.
            </p>
          </div>
        </div>
      </div>

      {/* ── Final result ── */}
      <div style={{
        background: INK, borderRadius: 16, padding: "24px 26px", marginTop: 6,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{ ...mono, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7E9B86", marginBottom: 8 }}>
            Final removal · Equation 4
          </div>
          <div style={{ ...mono, fontSize: 13, color: "#A8917A", lineHeight: 1.7 }}>
            physical C × 44/12<br />
            {physicalC.toFixed(3)} × 3.667
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...mono, fontSize: 38, fontWeight: 700, color: EMBER, lineHeight: 1 }}>
            {removal.toFixed(2)}
          </div>
          <div style={{ ...mono, fontSize: 13, color: "#A8917A", marginTop: 6 }}>tonnes CO₂e removed</div>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: MOSS, margin: "12px 2px 0", lineHeight: 1.55 }}>
        This is the gross credited figure before any sampling-variance safety margin.
      </p>
    </div>
  );
}

// ---- Rainbow BiCRS · Approach 1 · 100-year removals via H/Corg (Woolf et al. 2021) ----
// F_perm,100 = c − m × H/Corg, with c,m from soil-temperature brackets (Table 3).
// R = F_perm,100 × Corg × A_biochar × (1 − M%) × 44/12  (no −1; positive removal).
const RAINBOW_TC = [
  { max: 7.49, label: "< 7.49", c: 1.13, m: 0.46 },
  { max: 12.49, label: "7.5 – 12.49", c: 1.10, m: 0.59 },
  { max: 17.49, label: "12.5 – 17.49", c: 1.04, m: 0.64 },
  { max: 22.49, label: "17.5 – 22.49", c: 1.01, m: 0.65 },
  { max: Infinity, label: "> 22.5", c: 0.98, m: 0.66 },
];
function rainbowBracket(ts) {
  return RAINBOW_TC.find(b => ts <= b.max) || RAINBOW_TC[RAINBOW_TC.length - 1];
}

function RainbowApproach1Calculator({ corg, setCorg, moisture, setMoisture,
  hcorg, setHcInput, ts, setTs, region, setRegion, q, setQ }) {
  // ── Inputs (Example 1 from the methodology as defaults) ─────────
  const amount = q, setAmount = setQ;           // biochar mass shared with all registries
  // corg, moisture, hcorg, ts, region are shared (passed from PermanenceCalculator).
  const setHcorg = (v) => setHcInput(String(v)); // edits the shared H/Corg input

  // ── Math (real-time) ────────────────────────────────────────────
  const br = rainbowBracket(ts);
  const fPerm = br.c - br.m * hcorg;                                   // Eq. 1
  const fPermClamped = Math.max(0, Math.min(1, fPerm));
  const eligible = hcorg < 0.7;                                        // H/Corg gate
  const physicalC = fPermClamped * (corg / 100) * amount * (1 - moisture / 100);
  const removal = physicalC * (44 / 12);                              // Eq. 2 (positive)

  // ── Styles (aligned to Charatlas palette) ───────────────────────
  const rcard = {
    background: "#FBFAF6", border: `1px solid ${LINE}`, borderRadius: 14,
    padding: "20px 22px", marginBottom: 14,
  };
  const rlabel = {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase",
    color: MOSS, display: "block", marginBottom: 8,
  };
  const numStyle = {
    ...mono, width: "100%", boxSizing: "border-box", fontSize: 15, color: INK,
    padding: "9px 11px", borderRadius: 9, border: `1px solid ${LINE}`, background: PAPER,
    outline: "none",
  };
  const stepNo = {
    ...mono, fontSize: 12, fontWeight: 700, color: "#FFFFFF", background: MOSS,
    width: 24, height: 24, borderRadius: 7, display: "inline-flex",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  };

  const field = (lab, value, setter, opts = {}) => (
    <div style={{ flex: 1, minWidth: 150 }}>
      <label style={rlabel}>{lab}</label>
      <input
        type="number" value={value} step={opts.step ?? 1}
        min={opts.min ?? 0} max={opts.max}
        onChange={(e) => {
          let v = Number(e.target.value);
          if (opts.min != null) v = Math.max(opts.min, v);
          if (opts.max != null) v = Math.min(opts.max, v);
          setter(v);
        }}
        style={numStyle}
      />
      {opts.hint && <p style={{ fontSize: 11, color: MOSS, margin: "6px 2px 0" }}>{opts.hint}</p>}
    </div>
  );

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ ...mono, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: EMBER, marginBottom: 6 }}>
          Rainbow BiCRS · Approach 1 · 100-year
        </div>
        <h3 style={{ margin: 0, fontSize: 18, color: INK }}>
          H/C&#8202;org Permanence Calculator
        </h3>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: MOSS, lineHeight: 1.55 }}>
          Soil-temperature model after Woolf et&nbsp;al. 2021 (IPCC method). The permanent fraction of
          biochar carbon after 100 years is a linear function of the molar H/C&#8202;org ratio, with
          regression coefficients selected by the local annual soil temperature.
        </p>
      </div>

      {/* ── Inputs ── */}
      <div style={rcard}>
        <label style={{ ...rlabel, marginBottom: 14 }}>Project inputs</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 14 }}>
          {field("Dry mass Q (t)", amount, setAmount, { step: 0.1, hint: "Fresh mass, A — shared across registries" })}
          {field("Total organic carbon (%)", corg, setCorg, { max: 100, hint: "C₍org₎ of the biochar" })}
          {field("Moisture (%)", moisture, setMoisture, { max: 100, hint: "Water removed before C→CO₂" })}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-start" }}>
          {field("H/C₍org₎ molar ratio", hcorg, setHcorg, { step: 0.01, max: 2, hint: "Must be < 0.7 to qualify" })}
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={rlabel}>Soil temperature</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select style={{ ...numStyle, flex: 1 }} value={region}
                onChange={(e) => {
                  const name = e.target.value;
                  setRegion(name);
                  const hit = SOIL_TEMPS.find(r => r[0] === name);
                  if (hit) setTs(hit[1]);
                }}>
                <option value="">Pick a country…</option>
                {SOIL_TEMPS.map(r => <option key={r[0]} value={r[0]}>{r[0]}</option>)}
              </select>
              <input type="number" step={0.1} value={ts}
                onChange={(e) => { setTs(Number(e.target.value)); setRegion(""); }}
                style={{ ...numStyle, width: 80, flex: "0 0 80px" }} />
            </div>
            <p style={{ fontSize: 11, color: MOSS, margin: "6px 2px 0" }}>
              {region ? coldNote(region) : "Lembrechts 2021 by country, or type a site value. Selects the c, m bracket."}
            </p>
          </div>
        </div>
      </div>

      {!eligible && (
        <div style={{ padding: "11px 14px", borderRadius: 9, background: "#FBEDE7",
          border: `1px solid ${EMBER}`, marginBottom: 14, fontSize: 13, color: "#8A3A22" }}>
          H/C₍org₎ = <span style={mono}>{hcorg.toFixed(3)}</span> is at or above 0.7 — the material does not
          meet the biochar quality threshold for this pathway, so no removals are credited.
        </div>
      )}

      {/* ── Step-by-step breakdown ── */}
      <label style={{ ...rlabel, margin: "22px 2px 12px" }}>Step-by-step methodology breakdown</label>

      {/* Step 1 — bracket selection */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>1</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Soil temperature picks the coefficients</div>
            <p style={{ fontSize: 13.5, color: MOSS, margin: "0 0 12px", lineHeight: 1.55 }}>
              Warmer soils decompose biochar faster, so the regression coefficients c and m shift with the
              local annual soil temperature. Your {ts.toFixed(1)}°C falls in the <strong>{br.label}°C</strong> bracket.
            </p>
            <div style={{ display: "grid", gap: 6 }}>
              {RAINBOW_TC.map(b => {
                const active = b.label === br.label;
                return (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 12,
                    padding: "8px 12px", borderRadius: 8,
                    background: active ? "#FBEDE7" : FELT,
                    border: `1px solid ${active ? EMBER : LINE}` }}>
                    <span style={{ ...mono, fontSize: 13, fontWeight: active ? 700 : 500,
                      color: active ? EMBER : MOSS, minWidth: 110 }}>{b.label}°C</span>
                    <span style={{ ...mono, fontSize: 12.5, color: active ? INK : MOSS }}>
                      c = {b.c.toFixed(2)} · m = {b.m.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 — Eq. 1 */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>2</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Permanent carbon fraction</div>
            <div style={{ ...mono, fontSize: 12, color: MOSS, marginBottom: 12 }}>Equation 1 · F₍perm 100₎</div>
            <div style={{ background: INK, borderRadius: 11, padding: "16px 18px", ...mono }}>
              <div style={{ fontSize: 13, color: "#A8917A", lineHeight: 1.8 }}>
                F = c − m × (H/C₍org₎)
              </div>
              <div style={{ fontSize: 15, color: "#E8C9A0", lineHeight: 1.8 }}>
                F = {br.c.toFixed(2)} − {br.m.toFixed(2)} × {hcorg.toFixed(3)}
                &nbsp;=&nbsp;<span style={{ color: EMBER, fontWeight: 700 }}>{(fPermClamped * 100).toFixed(1)}%</span>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: MOSS, margin: "10px 2px 0" }}>
              {(fPermClamped * 100).toFixed(1)}% of the biochar's organic carbon is expected to remain after 100 years.
              The rest is assumed to decompose within the horizon.
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 — physical mass */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>3</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Physical permanent carbon</div>
            <div style={{ ...mono, fontSize: 12, color: MOSS, marginBottom: 12 }}>F × C₍org₎ × amount × (1 − moisture)</div>
            <div style={{ background: INK, borderRadius: 11, padding: "16px 18px", ...mono }}>
              <div style={{ fontSize: 14, color: "#E8C9A0", lineHeight: 1.9 }}>
                {fPermClamped.toFixed(3)} × {(corg / 100).toFixed(2)} × {amount} × {(1 - moisture / 100).toFixed(2)}
              </div>
              <div style={{ fontSize: 15, color: EMBER, fontWeight: 700, lineHeight: 1.6 }}>
                = {physicalC.toFixed(3)} t permanent carbon
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: MOSS, margin: "10px 2px 0" }}>
              The permanent fraction times carbon content, fresh mass, and the dry-mass factor gives the tonnes
              of physical carbon durably stored.
            </p>
          </div>
        </div>
      </div>

      {/* ── Final result ── */}
      <div style={{
        background: INK, borderRadius: 16, padding: "24px 26px", marginTop: 6,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <div style={{ ...mono, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7E9B86", marginBottom: 8 }}>
            Final removal · Equation 2
          </div>
          <div style={{ ...mono, fontSize: 13, color: "#A8917A", lineHeight: 1.7 }}>
            physical C × 44/12<br />
            {physicalC.toFixed(3)} × 3.667
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...mono, fontSize: 38, fontWeight: 700, color: EMBER, lineHeight: 1 }}>
            {eligible ? removal.toFixed(2) : "—"}
          </div>
          <div style={{ ...mono, fontSize: 13, color: "#A8917A", marginTop: 6 }}>tonnes CO₂e removed</div>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: MOSS, margin: "12px 2px 0", lineHeight: 1.55 }}>
        100-year durability pathway. This is the gross modeled removal before the methodology's uncertainty
        discount (≥ 3%) and the 2% buffer-pool contribution.
      </p>
    </div>
  );
}

// ---- Sanei IBRo2 · Inertinite Benchmarking · direct measurement of stable carbon ----
// Sanei et al. 2024 (Int. J. Coal Geol. 281) + 2025 (310) + Petersen et al. 2026 (Biomass Bioenergy 212).
// Distinct from a decay model: it measures the inertinite carbon directly from the Ro
// distribution and reactive-carbon fraction, then applies a sampling-variance safety margin.
function SaneiIBRo2Calculator({ corg, setCorg, q, setQ, froRo2, setFroRo2, freactPct, setFreactPct }) {
  // ── Reflectance / composition inputs ──
  // froRo2 (% Ro > 2%) and freactPct are shared with PermanenceCalculator for the comparison.
  const [reactMode, setReactMode] = useState("frac"); // "frac" = enter F_React %, "creact" = C_React wt%
  const [creact, setCreact] = useState(0.8);    // reactive carbon content, dry wt% (alt input)
  // ── Safety-margin block (optional) ──
  const [applyMargin, setApplyMargin] = useState(false);
  const [cv, setCv] = useState(4.1);            // coefficient of variation, %
  const [nSamples, setNSamples] = useState(12); // independent samples (e.g. monthly = 12/yr)
  const [crcf, setCrcf] = useState(true);       // apply EU CRCF extra 2.5 % conservative deduction

  // Reactive fraction is held in the shared freactPct (kept in sync in both entry modes).
  const freact = Math.max(0, Math.min(100, freactPct)) / 100;

  const { fInert, cInert, cdrWtPct } = saneiModel({
    froRo2: froRo2 / 100, freact, corg,
  });

  // Safety margin & representative C_Inert (Petersen 2026, Table 4 logic).
  const marginRel = applyMargin ? saneiSafetyMargin(cv, nSamples) : 0; // relative %
  const crcfRel = applyMargin && crcf ? 2.5 : 0;                       // EU CRCF flat 2.5 %
  const totalDeductRel = marginRel + crcfRel;
  const repCInert = Math.max(0, cInert * (1 - totalDeductRel / 100));
  const cdrPerTon = repCInert * (44.01 / 12.01) / 100;  // tCO2e per t biochar
  const batchCdr = cdrPerTon * q;                       // tCO2e for the batch mass

  // ── Styles (Charatlas palette, matches Rainbow calculators) ──
  const rcard = { background: "#FBFAF6", border: `1px solid ${LINE}`, borderRadius: 14, padding: "20px 22px", marginBottom: 14 };
  const rlabel = { fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: MOSS, display: "block", marginBottom: 8 };
  const numStyle = { ...mono, width: "100%", boxSizing: "border-box", fontSize: 15, color: INK, padding: "9px 11px", borderRadius: 9, border: `1px solid ${LINE}`, background: PAPER, outline: "none" };
  const stepNo = { ...mono, fontSize: 12, fontWeight: 700, color: "#FFFFFF", background: MOSS, width: 24, height: 24, borderRadius: 7, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };

  const field = (lab, value, setter, opts = {}) => (
    <div style={{ flex: 1, minWidth: 150 }}>
      <label style={rlabel}>{lab}</label>
      <input type="number" value={value} step={opts.step ?? 1} min={opts.min ?? 0} max={opts.max}
        onChange={(e) => {
          let v = Number(e.target.value);
          if (opts.min != null) v = Math.max(opts.min, v);
          if (opts.max != null) v = Math.min(opts.max, v);
          setter(v);
        }} style={numStyle} />
      {opts.hint && <p style={{ fontSize: 11, color: MOSS, margin: "6px 2px 0" }}>{opts.hint}</p>}
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ ...mono, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: EMBER, marginBottom: 6 }}>
          Sanei IBRo2 · Inertinite Benchmarking · ≥1000-yr
        </div>
        <h3 style={{ margin: 0, fontSize: 18, color: INK }}>Inertinite carbon, measured not modelled</h3>
        <p style={{ margin: "8px 0 0", fontSize: 14, color: MOSS, lineHeight: 1.55 }}>
          After Sanei et&nbsp;al. 2024/2025 and Petersen et&nbsp;al. 2026. Carbon with random reflectance
          R₀&nbsp;&gt;&nbsp;2&nbsp;% is inertinite — the geologically stable maceral, with an oxidation-kinetics
          half-life on the order of 100&nbsp;million years. The credited fraction comes straight from the R₀
          distribution and the reactive-carbon measurement, not from a decay projection.
        </p>
      </div>

      <div style={{ padding: "10px 14px", borderRadius: 9, background: "#EEF2F6", border: "1px solid #C3D0DC",
        marginBottom: 16, fontSize: 12.5, color: "#3A4A57", lineHeight: 1.55 }}>
        <strong>Three reflectance classes.</strong> R₀&nbsp;≤&nbsp;1.2&nbsp;% poorly carbonized · 1.2–2.0&nbsp;%
        semi-inertinite · <strong>&gt;&nbsp;2.0&nbsp;% inertinite</strong>. Only the inertinite share, after stripping
        the thermally reactive carbon, is credited. The 2&nbsp;% benchmark is the <em>onset</em> of the inertinite range,
        not the mean R₀.
      </div>

      {/* Inputs */}
      <div style={rcard}>
        <label style={{ ...rlabel, marginBottom: 14 }}>Measured inputs</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 14 }}>
          {field("F₍Ro>2₎ — inertinite share (%)", froRo2, setFroRo2, { max: 100, hint: "Area of the R₀ histogram above 2 % (KDE)" })}
          {field("Organic carbon C₍org₎ (%)", corg, setCorg, { max: 100, hint: "Cₒᵣg of the biochar (dry wt%)" })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <label style={rlabel}>Reactive carbon F₍React₎</label>
          <button onClick={() => setReactMode(m => m === "frac" ? "creact" : "frac")}
            style={{ ...mono, fontSize: 11, color: MOSS, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}>
            {reactMode === "frac" ? "enter as C₍React₎ wt%" : "enter as fraction %"}
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {reactMode === "frac"
            ? field("F₍React₎ (% of Cₒᵣg)", freactPct, setFreactPct, { step: 0.1, max: 100, hint: "Reactive (labile) carbon, Rock-Eval / TGA" })
            : field("C₍React₎ (dry wt%)", creact, (v) => { setCreact(v); setFreactPct(corg > 0 ? (Math.max(0, Math.min(corg, v)) / corg) * 100 : 0); }, { step: 0.1, max: corg, hint: `÷ Cₒᵣg ${corg}% → F₍React₎ ${(freact * 100).toFixed(1)}%` })}
        </div>
      </div>

      {/* Apply to a biochar batch */}
      <div style={rcard}>
        <label style={{ ...rlabel, marginBottom: 14 }}>Apply to a biochar batch</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {field("Dry mass Q (t)", q, setQ, { hint: "Batch or annual dry mass of biochar" })}
        </div>
      </div>

      {/* Step 1 — Eq. 2 */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>1</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Inertinite fraction of organic carbon</div>
            <div style={{ ...mono, fontSize: 12, color: MOSS, marginBottom: 12 }}>Equation 2 · F₍Inert₎</div>
            <div style={{ background: INK, borderRadius: 11, padding: "16px 18px", ...mono }}>
              <div style={{ fontSize: 13, color: "#A8917A", lineHeight: 1.8 }}>F₍Inert₎ = F₍Ro&gt;2₎ × (1 − F₍React₎)</div>
              <div style={{ fontSize: 15, color: "#E8C9A0", lineHeight: 1.8 }}>
                = {(froRo2 / 100).toFixed(2)} × (1 − {freact.toFixed(3)}) =
                &nbsp;<span style={{ color: EMBER, fontWeight: 700 }}>{(fInert * 100).toFixed(1)}%</span>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: MOSS, margin: "10px 2px 0" }}>
              The reactive carbon is removed first; what clears the 2&nbsp;% benchmark afterwards is the durable inertinite.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 — Eq. 3 */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>2</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Inertinite carbon content</div>
            <div style={{ ...mono, fontSize: 12, color: MOSS, marginBottom: 12 }}>Equation 3 · C₍Inert₎ (dry wt%)</div>
            <div style={{ background: INK, borderRadius: 11, padding: "16px 18px", ...mono }}>
              <div style={{ fontSize: 13, color: "#A8917A", lineHeight: 1.8 }}>C₍Inert₎ = F₍Inert₎ × C₍org₎</div>
              <div style={{ fontSize: 15, color: "#E8C9A0", lineHeight: 1.8 }}>
                = {fInert.toFixed(3)} × {corg}% =
                &nbsp;<span style={{ color: EMBER, fontWeight: 700 }}>{cInert.toFixed(1)} wt%</span>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: MOSS, margin: "10px 2px 0" }}>
              {cInert.toFixed(1)} t of stable inertinite carbon per 100&nbsp;t of biochar.
            </p>
          </div>
        </div>
      </div>

      {/* Optional safety margin */}
      <div style={rcard}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={stepNo}>3</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Sampling-variance safety margin</div>
              <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 12.5, color: MOSS }}>
                <input type="checkbox" checked={applyMargin} onChange={e => setApplyMargin(e.target.checked)}
                  style={{ accentColor: EMBER, width: 15, height: 15 }} />
                apply deduction
              </label>
            </div>
            <p style={{ fontSize: 13, color: MOSS, margin: "6px 0 0", lineHeight: 1.55 }}>
              Monte-Carlo–derived margin from production variability (Sanei 2025, Eq. 16):
              <span style={mono}> k·CV/√n</span>, k≈1.65. More samples → smaller deduction.
            </p>
            {applyMargin && (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14, margin: "14px 0 4px" }}>
                  {field("CV (%)", cv, setCv, { step: 0.1, hint: "Coefficient of variation, ≥3 samples" })}
                  {field("Samples n", nSamples, setNSamples, { min: 1, hint: "e.g. monthly = 12, weekly = 48" })}
                  <div style={{ flex: 1, minWidth: 150, display: "flex", alignItems: "flex-end" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 12.5, color: MOSS, padding: "9px 0" }}>
                      <input type="checkbox" checked={crcf} onChange={e => setCrcf(e.target.checked)}
                        style={{ accentColor: EMBER, width: 15, height: 15 }} />
                      EU CRCF +2.5 %
                    </label>
                  </div>
                </div>
                <div style={{ ...mono, fontSize: 12.5, color: MOSS, marginTop: 6 }}>
                  margin = 1.65 × {cv}/√{nSamples} = {marginRel.toFixed(2)}%{crcf ? ` + 2.5% CRCF = ${totalDeductRel.toFixed(2)}%` : ""}
                  &nbsp;→ representative C₍Inert₎ = <span style={{ color: EMBER, fontWeight: 700 }}>{repCInert.toFixed(1)} wt%</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Final result — Eq. 4 */}
      <div style={{ background: INK, borderRadius: 16, padding: "24px 26px", marginTop: 6,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ ...mono, fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7E9B86", marginBottom: 8 }}>
            CDR · Equation 4
          </div>
          <div style={{ ...mono, fontSize: 13, color: "#A8917A", lineHeight: 1.7 }}>
            C₍Inert₎ × 44.01/12.01<br />
            {repCInert.toFixed(1)}% × 3.664 = {cdrPerTon.toFixed(2)} t/t<br />
            × {q.toLocaleString()} t biochar
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ ...mono, fontSize: 34, fontWeight: 700, color: EMBER, lineHeight: 1 }}>
            {Math.round(batchCdr).toLocaleString()}
          </div>
          <div style={{ ...mono, fontSize: 13, color: "#A8917A", marginTop: 6 }}>
            tonnes CO₂e · {cdrPerTon.toFixed(2)} t per t biochar
          </div>
        </div>
      </div>
      <p style={{ fontSize: 11.5, color: MOSS, margin: "12px 2px 0", lineHeight: 1.55 }}>
        Durability rests on inertinite's geological permanence (Sanei et&nbsp;al. 2024: ~100&nbsp;Myr oxidation
        half-life at 30&nbsp;°C), not a fixed horizon. Adopted by the EU CRCF, Isometric, Rainbow, and Carbon Standards.
        {!applyMargin && " Toggle the safety margin above for the conservative, certifiable figure."}
      </p>
    </div>
  );
}


// Wrapper: lets the user pick Approach 1 (100-yr) or Approach 2 (1000-yr) inside the Rainbow method.
// Receives shared inputs from PermanenceCalculator so values carry across methods.
function RainbowMethodPicker({ corg, setCorg, moisture, setMoisture,
  hcorg, hcInput, setHcInput, ts, setTs, region, setRegion,
  frac, setFrac, residual, setResidual, q, setQ }) {
  const [approach, setApproach] = useState("a2"); // "a1" = 100-yr, "a2" = 1000-yr (default, unchanged)
  const pick = (active) => ({
    flex: 1, padding: "12px 14px", borderRadius: 10, cursor: "pointer", textAlign: "left",
    border: active ? `1.5px solid ${EMBER}` : `1px solid ${LINE}`,
    background: active ? "#FBEDE7" : "#FBFAF6",
  });
  return (
    <div>
      <div style={{ padding: "10px 14px", borderRadius: 9, background: "#EEF2F6",
        border: "1px solid #C3D0DC", marginBottom: 14, fontSize: 12.5, color: "#3A4A57", lineHeight: 1.55 }}>
        <strong>Rainbow BiCRS (v2.3).</strong> Two durability pathways. Project Developers choose one approach
        per monitoring period: a 100-year model from H/C&#8202;org, or a 1000-year estimate from random reflectance.
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <button onClick={() => setApproach("a1")} style={pick(approach === "a1")}>
          <div style={{ ...mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
            color: approach === "a1" ? EMBER : MOSS, marginBottom: 4 }}>Approach 1 · 100&nbsp;yr</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>H/C₍org₎ soil-temperature model</div>
          <div style={{ fontSize: 12, color: MOSS, marginTop: 2 }}>Woolf et al. 2021 · IPCC method</div>
        </button>
        <button onClick={() => setApproach("a2")} style={pick(approach === "a2")}>
          <div style={{ ...mono, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
            color: approach === "a2" ? EMBER : MOSS, marginBottom: 4 }}>Approach 2 · 1000&nbsp;yr</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>Random-reflectance inertinite</div>
          <div style={{ fontSize: 12, color: MOSS, marginTop: 2 }}>Sanei et al. 2024</div>
        </button>
      </div>
      {approach === "a1"
        ? <RainbowApproach1Calculator
            corg={corg} setCorg={setCorg} moisture={moisture} setMoisture={setMoisture}
            hcorg={hcorg} setHcInput={setHcInput} ts={ts} setTs={setTs}
            region={region} setRegion={setRegion} q={q} setQ={setQ} />
        : <RainbowBiCRSCalculator
            corg={corg} setCorg={setCorg} moisture={moisture} setMoisture={setMoisture}
            frac={frac} setFrac={setFrac} residual={residual} setResidual={setResidual} q={q} setQ={setQ} />}
    </div>
  );
}


export default function Charatlas() {
  const [tab, setTab] = useState("estimate");
  const tabs = [
    ["estimate", "Estimate carbon"],
    ["permanence", "Permanence"],
    ["ebc", "Check EBC class"],
    ["cost", "Cost benchmarks"],
  ];
  return (
    <div style={{ background: PAPER, minHeight: "100%", padding: "0 0 40px", color: INK,
      fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px" }}>

        <header style={{ padding: "34px 0 22px", borderBottom: `2px solid ${INK}`, marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: INK, display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", border: `3px solid ${EMBER}` }} />
            </div>
            <div>
              <div style={{ fontSize: 23, fontWeight: 700, letterSpacing: "-0.01em" }}>Charatlas</div>
              <div style={{ fontSize: 12.5, color: MOSS, letterSpacing: "0.04em" }}>biochar carbon intelligence</div>
            </div>
          </div>
        </header>

        <nav style={{ display: "flex", gap: 6, marginBottom: 22, flexWrap: "wrap" }}>
          {tabs.map(([k, lab]) => (
            <button key={k} onClick={() => setTab(k)}
              style={{ padding: "9px 16px", borderRadius: 9, cursor: "pointer", fontSize: 14,
                border: "none", background: tab === k ? INK : "transparent",
                color: tab === k ? PAPER : INK, fontWeight: tab === k ? 600 : 500 }}>
              {lab}
            </button>
          ))}
        </nav>

        {tab === "estimate" && <CarbonEstimator />}
        {tab === "permanence" && <PermanenceCalculator />}
        {tab === "ebc" && <EbcChecker />}
        {tab === "cost" && <CostExplorer />}

        <footer style={{ marginTop: 28, padding: "16px 18px", borderRadius: 12, background: "#ECEAE1",
          fontSize: 12.5, color: MOSS, lineHeight: 1.6 }}>
          <strong style={{ color: INK }}>Live on real data.</strong> 40 feedstocks · 16 cost datapoints · 6 EBC classes,
          from the workbook artifacts. The permanence tool is independent of that workbook — it implements three standards
          verbatim: Puro 2025 (§6, Table 6.1), Verra VM0044 v1.2 (§8.2, Table 3), and Isometric Soil Storage v1.2 (Eq. 3, Table 4).
        </footer>
      </div>
    </div>
  );
}
