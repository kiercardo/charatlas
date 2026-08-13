/* CharAtlas site — brand (DS viewfinder logo) + language context.
   Exposes window.{BrandProvider, SiteLogo, useLang, useT, LangToggle}. */
(function () {
  const CAX = window.CharAtlasDesignSystem_9427fe;

  function SiteLogo({ size = 26, tone = 'ink', href = 'index.html' }) {
    const inner = <CAX.Logo size={size} tone={tone} />;
    if (!href) return inner;
    return <a href={href} style={{ textDecoration: 'none', display: 'inline-flex' }}>{inner}</a>;
  }

  /* ---- language ---------------------------------------------------------- */
  const LANG_KEY = 'cax-site-lang-v1';
  const LangCtx = React.createContext({ lang: 'en', setLang: () => {} });

  function BrandProvider({ children }) {
    const [lang, setLangState] = React.useState(() => {
      try { return localStorage.getItem(LANG_KEY) || 'en'; } catch (e) { return 'en'; }
    });
    const setLang = (l) => { setLangState(l); try { localStorage.setItem(LANG_KEY, l); } catch (e) {} };
    React.useEffect(() => { document.documentElement.lang = lang; }, [lang]);
    return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
  }
  function useLang() { return React.useContext(LangCtx); }
  function useT() {
    const { lang } = useLang();
    const dict = (window.CAX_I18N && (window.CAX_I18N[lang] || window.CAX_I18N.en)) || {};
    return (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), dict);
  }
  function LangToggle() {
    const { lang, setLang } = useLang();
    return (
      <div className="lang" role="group" aria-label="Language">
        {['en', 'it'].map((l) => (
          <button key={l} className={'lang__opt' + (lang === l ? ' is-on' : '')} onClick={() => setLang(l)} aria-pressed={lang === l}>{l.toUpperCase()}</button>
        ))}
      </div>
    );
  }

  Object.assign(window, { BrandProvider, SiteLogo, useLang, useT, LangToggle });
})();
