/* CharAtlas website — scroll-reveal, count-up, ambient motion. Runtime-only: no-JS pages stay visible. */
(function () {
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SEL = ['.site-sec__head', '.site-sec__eyebrow', '.site-prob__item', '.site-pipe__step', '.site-prod', '.site-band__stat', '.site-affil__item', '.site-map__panel', '.site-feature-list li', '.site-final__in', '.amk', '.photo-fig', '.bio-meter', '.bio-specs > *', '.bio-table', '.team-card', '.team-cta', '.site-hero__in > *', '.land__card > *'].join(',');

  function countUp(el) {
    var tn = null, i, n;
    for (i = 0; i < el.childNodes.length; i++) { n = el.childNodes[i]; if (n.nodeType === 3 && /\d/.test(n.nodeValue)) { tn = n; break; } }
    if (!tn) return;
    var m = tn.nodeValue.match(/^\s*([+\-\u2212]?)(\d+(?:[.,]\d+)?)([\s\S]*)$/);
    if (!m) return;
    var sign = m[1], numStr = m[2], rest = m[3];
    var sepM = numStr.match(/[.,]/), sep = sepM ? sepM[0] : '', dec = sep ? numStr.split(sep)[1].length : 0;
    var target = parseFloat(numStr.replace(',', '.'));
    if (!isFinite(target)) return;
    var t0 = performance.now(), dur = 1000;
    function fmt(v) { var s = v.toFixed(dec); if (sep === ',') s = s.replace('.', ','); return sign + s + rest; }
    function step(now) {
      var p = Math.min(1, (now - t0) / dur); p = 1 - Math.pow(1 - p, 3);
      tn.nodeValue = p < 1 ? fmt(target * p) : sign + numStr + rest;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var io = RM ? null : new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });

  var cio = RM ? null : new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { cio.unobserve(e.target); countUp(e.target); } });
  }, { threshold: 0.5 });

  function scan() {
    var els = document.querySelectorAll(SEL), i, el;
    for (i = 0; i < els.length; i++) {
      el = els[i];
      if (el.hasAttribute('data-anim')) continue;
      el.setAttribute('data-anim', '');
      var k = 0, c = el.parentNode && el.parentNode.firstElementChild;
      while (c && c !== el) { if (c.hasAttribute('data-anim')) k++; c = c.nextElementSibling; }
      el.style.setProperty('--d', (k % 8) * 70 + 'ms');
      if (RM) { el.classList.add('in'); continue; }
      var r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < (window.innerHeight || document.documentElement.clientHeight)) {
        (function (n) { setTimeout(function () { n.classList.add('in'); }, 50); })(el);
      } else io.observe(el);
    }
    var cs = document.querySelectorAll('.js-count');
    for (i = 0; i < cs.length; i++) {
      el = cs[i];
      if (el.hasAttribute('data-counted')) continue;
      el.setAttribute('data-counted', '');
      if (!RM) cio.observe(el);
    }
  }

  var pending = false;
  function queue() { if (pending) return; pending = true; setTimeout(function () { pending = false; scan(); }, 40); }
  new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', queue); else queue();
  window.addEventListener('load', queue);
  setInterval(function () { /* watchdog: never leave in-view content hidden if IO stalls */
    var els = document.querySelectorAll('[data-anim]:not(.in)'), h = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < els.length; i++) { var r = els[i].getBoundingClientRect(); if (r.bottom > 0 && r.top < h) els[i].classList.add('in'); }
  }, 1200);
})();
