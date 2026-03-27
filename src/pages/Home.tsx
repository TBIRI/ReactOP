import { ArrowRight, TrendingUp, MousePointerClick, Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const init = useCallback(() => {
    if (observerRef.current) return;
    const sections = document.querySelectorAll('[data-section]');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target;
          Array.from(section.querySelectorAll('.reveal')).forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), i * 120);
          });
          observerRef.current?.unobserve(section);
        });
      },
      { threshold: 0.08, rootMargin: '0px' }
    );
    sections.forEach((s) => observerRef.current!.observe(s));
  }, []);
  useEffect(() => {
    const raf = requestAnimationFrame(() => init());
    return () => { cancelAnimationFrame(raf); observerRef.current?.disconnect(); };
  }, [init]);
}

/* ═══════════════════════════════════════════ */

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if ((window as any).Tally) (window as any).Tally.loadEmbeds();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  useScrollReveal();

  /* ── Data ── */
  const services = [
    { icon: TrendingUp, title: "Google Ads", desc: "Vos clients potentiels cherchent déjà vos services sur Google. Nous créons, gérons et optimisons vos campagnes pour les capter.", keywords: "google ads, campagnes publicitaires, acquisition" },
    { icon: MousePointerClick, title: "Optimisation de la conversion", desc: "Une bonne pub ne sert à rien si la page derrière ne convertit pas. Nous optimisons votre tunnel de conversion pour que les clics deviennent des leads.", keywords: "landing page, conversion, optimisation CRO" }
  ];

  const steps = [
    { num: "01", title: "Évaluer le potentiel", desc: "Nous commençons par vérifier s'il y a une vraie opportunité. Si nous pensons ne pas pouvoir vous aider, nous vous le dirons franchement." },
    { num: "02", title: "Auditer l'acquisition et la conversion", desc: "Nous analysons ce qui attire la demande, ce qui la freine, et ce qui peut être amélioré sur le site comme dans le parcours jusqu'à la prise de contact." },
    { num: "03", title: "Mettre en place", desc: "Nous déployons les actions retenues : campagnes, messages, pages et ajustements nécessaires pour générer plus de demandes." },
    { num: "04", title: "Optimiser dans la durée", desc: "Nous suivons les résultats dans le temps, puis testons, ajustons et améliorons ce qui doit l'être pour gagner en volume et en qualité." }
  ];

  const faqs = [
    { question: "Qu'est-ce que vous faites concrètement ?", answer: "Deux choses : vous rendre visible sur Google quand quelqu'un cherche votre service, et faire en sorte qu'il vous contacte une fois sur votre site." },
    { question: "Comment améliorez-vous la conversion après le clic ?", answer: "Cela dépend de votre activité et de ce qui freine vos résultats. Nous pouvons intervenir sur les pages dédiées, le site, les formulaires, la clarté de l'offre, la rapidité de traitement des demandes et, plus largement, sur l'ensemble du parcours de contact. L'objectif reste le même : faire en sorte que le trafic généré crée davantage de vraies demandes." },
    { question: "Comment savoir si votre approche est adaptée à mon entreprise ?", answer: "Nous ne partons pas d'une méthode toute faite. Nous prenons en compte votre marché, votre zone, votre offre, vos marges et votre capacité à traiter les demandes. Notre rôle est de construire une approche cohérente pour votre entreprise." },
    { question: "Qu'est-ce qui vous différencie des autres agences ?", answer: "Nous n'essayons pas de vous impressionner avec du volume de clics. Ce qui nous intéresse, c'est ce qui fait vraiment rentrer des clients. Là où beaucoup d'agences s'arrêtent au trafic, nous travaillons aussi sur ce qui se passe après le clic, pour transformer un maximum de visites en vraies opportunités." },
    { question: "Comment savoir si ça fonctionne vraiment ?", answer: "Nous faisons un point régulier sur les indicateurs les plus pertinents et restons 100% transparents quoi qu'il advienne. Vous savez ce qui évolue, ce qui bloque et ce que nous mettons en place pour faire progresser votre acquisition." }
  ];

  /* ── Shared padding ── */
  const px = "px-6 sm:px-8 lg:px-16 xl:px-24 3xl:px-32";
  const container = "max-w-screen-2xl mx-auto";

  return (
    <div className="min-h-screen bg-white text-gray-900" itemScope itemType="https://schema.org/WebPage">

      {/* ── Mobile header ── */}
      <div className="md:hidden mobile-header-fixed flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-xl border border-black/10 rounded-full shadow-lg shadow-black/10 hover:bg-white transition-all" aria-label="Retour en haut">
          <img src="/mobius_det.png" alt="ReactOP" className="w-7 h-7" itemProp="logo" />
          <span className="text-sm font-medium tracking-wide text-gray-900 font-syne">ReactOP</span>
        </button>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-11 h-11 flex items-center justify-center bg-white/80 backdrop-blur-xl border border-black/10 rounded-full shadow-lg shadow-black/10 hover:bg-white transition-all" aria-label="Menu">
          {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-900" /> : <Menu className="w-5 h-5 text-gray-900" />}
        </button>
      </div>

      {/* ── Desktop nav ── */}
      <nav className="hidden md:block fixed top-8 left-1/2 z-50 w-[90%] max-w-4xl" role="navigation" aria-label="Navigation principale" style={{ transform: 'translateX(-50%) translateZ(0)' }}>
        <div className="flex items-center justify-between px-6 py-2.5 glass-nav rounded-full shadow-xl shadow-black/[0.04]">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2" aria-label="Retour en haut">
            <img src="/mobius_det.png" alt="ReactOP" className="w-9 h-9 hover:opacity-80 transition-opacity" itemProp="logo" />
            <span className="text-base font-medium tracking-wide text-gray-900 font-syne">ReactOP</span>
          </button>
          <div className="flex items-center gap-2">
            {['services','processus','a-propos','contact'].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="px-5 py-2 rounded-full text-[15px] font-medium tracking-wide text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 font-nav">
                {id === 'a-propos' ? 'à propos' : id}
              </button>
            ))}
          </div>
          <button onClick={() => navigate('/audit')} className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-500 font-medium tracking-wide text-[13px] rounded-full whitespace-nowrap shadow-md shadow-blue-600/20 transition-all font-nav">
            <span className="text-white">Audit gratuit</span>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`fixed top-20 left-4 right-4 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 shadow-2xl shadow-black/10">
          <div className="flex flex-col space-y-1">
            {['Services','Processus','À propos','Contact'].map((label) => (
              <button key={label} onClick={() => scrollTo(label === 'À propos' ? 'a-propos' : label.toLowerCase())} className="text-base font-medium text-gray-800 py-3 text-left hover:text-blue-600 transition-colors px-4 rounded-xl hover:bg-gray-50">
                {label}
              </button>
            ))}
            <div className="pt-2">
              <button onClick={() => { navigate('/audit'); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 font-medium text-base rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                <span className="text-white">Audit gratuit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Background ── */}
      <div className="mobius-bg" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-blur-overlay" aria-hidden="true" />


      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section className="min-h-[100svh] sm:min-h-[100vh] flex flex-col relative overflow-hidden gpu-accelerated" role="banner" aria-label="Section hero" data-section="hero" itemScope itemType="https://schema.org/WPHeader">
        {/* Circles */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[15%] -right-[10%] w-[700px] h-[700px] sm:w-[1000px] sm:h-[1000px] lg:w-[1300px] lg:h-[1300px] 3xl:w-[1500px] 3xl:h-[1500px] opacity-[0.035]">
            <div className="w-full h-full border border-gray-400/40 rounded-full" />
            <div className="absolute inset-[14%] border border-gray-400/25 rounded-full" />
            <div className="absolute inset-[28%] border border-gray-400/15 rounded-full" />
          </div>
        </div>

        <div className={`relative z-10 flex-1 flex items-center w-full ${px}`}>
          <div className="w-full flex flex-col items-start" style={{ marginTop: 'clamp(5rem, 10vw, 8rem)' }}>

            <h1 className="hero-title font-display font-bold uppercase leading-[1.15] animate-slide-in-stagger-1 mb-8 sm:mb-10" style={{ fontSize: 'clamp(2.8rem, 5.85vw, 8.1rem)' }} itemProp="name headline">
              <span className="text-gray-900">Vos clients vous</span><br />
              <span className="text-gray-900">cherchent déjà sur </span>
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Google</span>
            </h1>

            <p className="font-sans text-lg sm:text-xl text-gray-500 max-w-lg lg:max-w-2xl mb-10 sm:mb-12 leading-[1.7] animate-slide-in-stagger-2" itemProp="description">
              ReactOP vous aide à capter cette demande et à la transformer en appels, devis, contrats, ce qui vous arrange
            </p>

            <div className="flex flex-col animate-slide-in-stagger-3">
              <div className="flex items-center gap-8 sm:gap-10">
                <button onClick={() => navigate('/audit')} className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 font-sans font-semibold text-base sm:text-lg overflow-hidden rounded-xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/35 hover:shadow-xl transition-all duration-300" aria-label="Recevoir un audit gratuit avec ReactOP" data-action="cta-primary">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  <span className="relative text-white">Estimer mon potentiel</span>
                  <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>

                <button onClick={() => scrollTo('services')} className="group flex flex-col items-start gap-1.5">
                  <span className="font-sans text-sm font-medium tracking-wide text-gray-400 group-hover:text-gray-700 transition-colors duration-200">Voir nos services</span>
                  <span className="block h-px w-full bg-gray-300 group-hover:bg-gray-500 transition-colors duration-200" />
                </button>
              </div>
              <span className="font-sans text-xs text-gray-400 mt-2 ml-1">Audit gratuit, sans engagement</span>
            </div>

          </div>
        </div>

        <div className="relative z-10 flex justify-center pb-8 sm:pb-12 animate-slide-in-stagger-3" aria-hidden="true">
          <button onClick={() => scrollTo('services')} className="flex flex-col items-center gap-3 group">
            <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-gray-400 group-hover:text-blue-500 transition-colors duration-300">Scroll</span>
            <div className="w-px h-12 overflow-hidden">
              <div className="w-full h-full bg-blue-500 animate-scroll-trail" />
            </div>
          </button>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          SERVICES — fond teinté pour séparer visuellement
      ════════════════════════════════════════════════ */}
      <section id="services" className={`py-24 sm:py-36 lg:py-44 ${px} gpu-accelerated`} aria-labelledby="services-title" data-section="services" itemScope itemType="https://schema.org/Service">
        <div className={container}>

          {/* Header : titre + subtitle sur une seule ligne à desktop */}
          <div className="mb-14 sm:mb-20 lg:mb-24">
            <h2 id="services-title" className="reveal reveal-scale font-display font-bold uppercase tracking-wide text-gray-900 leading-[1.0] mb-5" style={{ fontSize: 'clamp(2.5rem, 5.2vw, 6.5rem)' }} itemProp="name">
              Nos Services
            </h2>
            <p className="reveal font-sans text-lg sm:text-xl text-gray-500 italic" itemProp="description">
              Nous aidons les entreprises à tirer le maximum de la demande qualifiée présente sur Google
            </p>
          </div>

          {/* 2 cards side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" role="list">
            {services.map((s, i) => (
              <div key={i} className="reveal group p-7 sm:p-9 glass-card glass-card-hover rounded-2xl flex flex-col" role="listitem" data-service-type={s.keywords} itemScope itemType="https://schema.org/Service">
                <s.icon className="w-8 h-8 lg:w-10 lg:h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                <h3 className="font-display font-bold uppercase tracking-wide text-gray-900 leading-[1.1] mb-3" style={{ fontSize: 'clamp(1.2rem, 1.6vw, 1.8rem)' }} itemProp="name">{s.title}</h3>
                <p className="font-sans text-gray-500 leading-[1.7] text-sm sm:text-base mt-2" itemProp="description">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════
          PROCESSUS — fond blanc
      ════════════════════════════════════════════════ */}
      <section id="processus" className={`py-24 sm:py-36 lg:py-44 ${px} gpu-accelerated`} aria-labelledby="processus-title" data-section="process" itemScope itemType="https://schema.org/HowTo">
        <div className={container}>

          <div className="mb-14 sm:mb-20 lg:mb-24">
            <h2 id="processus-title" className="reveal reveal-scale font-display font-bold uppercase tracking-wide text-gray-900 leading-[1.0] mb-5" style={{ fontSize: 'clamp(2.5rem, 5.2vw, 6.5rem)' }} itemProp="name">
              Notre processus
            </h2>
            <p className="reveal font-sans text-lg sm:text-xl text-gray-500 italic">Une méthodologie éprouvée en 4 étapes</p>
          </div>

          {/* 4 horizontal steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8" role="list">
            {steps.map((step, i) => (
              <div key={i} className="reveal group p-7 sm:p-9 glass-card glass-card-hover rounded-2xl flex flex-col" role="listitem" itemScope itemType="https://schema.org/HowToStep">
                <div className="font-display font-bold text-blue-500/30 leading-none mb-4" style={{ fontSize: 'clamp(1.8rem, 2.2vw, 2.8rem)' }} aria-hidden="true">{step.num}</div>
                <h3 className="font-display font-bold uppercase tracking-wide text-gray-900 leading-[1.1] mb-3" style={{ fontSize: 'clamp(1.1rem, 1.4vw, 1.6rem)' }} itemProp="name">{step.title}</h3>
                <p className="font-sans text-gray-500 text-sm leading-relaxed mt-2" itemProp="text">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ════════════════════════════════════════════════
          À PROPOS — fond teinté, layout 2-col sidebar
      ════════════════════════════════════════════════ */}
      <section id="a-propos" className={`py-24 sm:py-36 lg:py-44 ${px} gpu-accelerated relative overflow-hidden`} aria-labelledby="apropos-title" data-section="about" itemScope itemType="https://schema.org/Organization">
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 xl:gap-28 items-start">

            {/* Left: sticky title (2/5) */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <h2 id="apropos-title" className="reveal reveal-scale font-display font-bold uppercase tracking-wide text-gray-900 leading-[1.0] mb-5" style={{ fontSize: 'clamp(2.5rem, 4.7vw, 6.5rem)' }}>
                Qui sommes-nous ?
              </h2>
              <div className="flex items-center gap-2 reveal">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <MapPin className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                <span className="font-sans text-sm text-gray-400">Lausanne, CH</span>
              </div>
            </div>

            {/* Right: narrative + values */}
            <div className="lg:col-span-3">

              {/* ── Opening narrative ── */}
              <div className="reveal py-8 sm:py-10 border-b border-gray-200/80">
                <p className="font-sans text-gray-600 leading-[1.6] max-w-[65ch]" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)' }} itemProp="description">
                  ReactOP part d'un constat simple&nbsp;: certaines PME font un excellent travail mais stagnent, pendant que des concurrents parfois moins bons raflent les clients, simplement parce qu'ils se positionnent sur Google. Cette demande existe. Elle est là, chaque jour. Et toujours <span className="text-gray-900 font-medium">une minorité d'entreprises en Suisse la captent</span>.
                </p>
              </div>

              <div className="reveal py-8 sm:py-10 border-b border-gray-200/80">
                <p className="font-sans text-gray-600 leading-[1.6] max-w-[65ch]" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)' }}>
                  Basés à Lausanne, nous aidons les entreprises de services à saisir cette demande déjà présente sur Google, prête à acheter, puis à la transformer en clients. Les PME de services n'ont ni le temps ni la motivation de se pencher sur Google, et <span className="text-gray-900 font-medium">passent à côté de clients chaque mois</span>.
                </p>
              </div>

              {/* ── Values intro ── */}
              <div className="reveal pt-10 sm:pt-14 pb-8 sm:pb-10">
                <p className="font-sans text-gray-400 text-sm tracking-[0.15em] uppercase font-medium">Ce en quoi nous croyons</p>
              </div>

              {/* ── Three values ── */}
              {[
                {
                  title: "Le mérite",
                  text: "Nous ne sommes payés que si vos résultats sont au rendez-vous, ce qui nous pousse à maximiser et maintenir nos efforts, et ce qui permet de minimiser le risque de votre côté."
                },
                {
                  title: "La rapidité d'exécution",
                  text: "Le monde digital bouge vite, il n'y a pas de place pour ceux qui n'avancent pas. Nous testons et ajustons rigoureusement en continu."
                },
                {
                  title: "La transparence",
                  text: "Vous voyez tout\u00a0: le budget, les résultats, ce qui marche et ce qui ne marche pas."
                }
              ].map((v, i) => (
                <div key={i} className={`reveal pl-6 sm:pl-8 border-l-2 border-l-blue-500/30 hover:border-l-blue-500 transition-colors duration-500 py-6 sm:py-8 ${i < 2 ? 'border-b border-b-gray-200/50' : ''}`}>
                  <h3 className="font-display font-bold uppercase tracking-wide text-gray-900 leading-[1.1] mb-3" style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.4rem)' }}>
                    {v.title}
                  </h3>
                  <p className="font-sans text-gray-600 leading-[1.6] text-sm sm:text-[15px]">
                    {v.text}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          FAQ — fond blanc, layout 2-col sidebar
      ════════════════════════════════════════════════ */}
      <section id="faq" className={`py-24 sm:py-36 lg:py-44 ${px} gpu-accelerated`} aria-labelledby="faq-title" data-section="faq" itemScope itemType="https://schema.org/FAQPage">
        <div className={container}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 xl:gap-28">

            {/* Left: sticky title (2/5) */}
            <div className="lg:col-span-2">
              <h2 id="faq-title" className="reveal reveal-scale font-display font-bold uppercase tracking-wide text-gray-900 leading-[1.0]" style={{ fontSize: 'clamp(2.5rem, 4.7vw, 6.5rem)' }}>
                Questions fréquentes
              </h2>
            </div>

            {/* Right: accordion (3/5) */}
            <div className="lg:col-span-3 reveal">
              {faqs.map((faq, idx) => (
                <div key={idx} className={`border-t ${idx === faqs.length - 1 ? 'border-b' : ''} border-gray-200`} itemScope itemType="https://schema.org/Question">
                  <button onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} className="w-full flex items-center justify-between gap-6 py-6 sm:py-7 text-left group" aria-expanded={openFaqIndex === idx} aria-controls={`faq-answer-${idx}`}>
                    <span className={`font-sans font-medium text-[15px] sm:text-base transition-colors duration-200 ${openFaqIndex === idx ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`} itemProp="name">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${openFaqIndex === idx ? 'rotate-180 text-blue-600' : 'text-gray-300 group-hover:text-gray-500'}`} aria-hidden="true" />
                  </button>
                  {isMobile ? (
                    openFaqIndex === idx && (
                      <div id={`faq-answer-${idx}`} itemScope itemType="https://schema.org/Answer">
                        <p className="font-sans text-sm text-gray-500 leading-relaxed pb-6 pr-8" itemProp="text">{faq.answer}</p>
                      </div>
                    )
                  ) : (
                    <div id={`faq-answer-${idx}`} className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: openFaqIndex === idx ? '1fr' : '0fr' }} itemScope itemType="https://schema.org/Answer">
                      <div className="overflow-hidden">
                        <p className={`font-sans text-sm sm:text-[15px] text-gray-500 leading-relaxed pb-6 sm:pb-8 pr-8 sm:pr-12 transition-opacity duration-500 ${openFaqIndex === idx ? 'opacity-100' : 'opacity-0'}`} itemProp="text">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════
          CONTACT — fond teinté
      ════════════════════════════════════════════════ */}
      <section id="contact" className={`py-20 sm:py-36 lg:py-44 ${px} gpu-accelerated`} aria-labelledby="contact-title" data-section="contact" itemScope itemType="https://schema.org/ContactPage">
        <div className={container}>
          <div className="grid md:grid-cols-2 gap-12 sm:gap-20 lg:gap-28 xl:gap-36 items-center">

            <div itemScope itemType="https://schema.org/Organization" className="reveal">
              <h2 id="contact-title" className="font-display font-bold uppercase tracking-wide text-gray-900 leading-[1.0] mb-8 sm:mb-12 lg:mb-16" style={{ fontSize: 'clamp(3rem, 6vw, 9rem)' }}>
                Parlons-en !
              </h2>
              <div className="border-t border-gray-200 pt-6 sm:pt-8">
                <p className="font-sans text-gray-400 text-sm mb-2">Email</p>
                <a href="mailto:info@reactop.com" className="font-sans font-light text-gray-900 hover:text-blue-600 transition-colors break-words" style={{ fontSize: 'clamp(1.1rem, 2vw, 2.5rem)' }} itemProp="email" aria-label="Envoyer un email à ReactOP">
                  info@reactop.com
                </a>
              </div>
            </div>

            <div className="reveal w-full glass-card rounded-2xl p-4 sm:p-6">
              <iframe data-tally-src="https://tally.so/embed/A7LaDW?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="690" frameBorder="0" marginHeight={0} marginWidth={0} title="Contact" />
            </div>

          </div>
        </div>
      </section>


      {/* ── Footer ── */}
      <footer className={`border-t border-gray-100 py-12 sm:py-16 ${px}`} role="contentinfo" aria-label="Pied de page" itemScope itemType="https://schema.org/WPFooter">
        <div className={container}>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left" itemScope itemType="https://schema.org/Organization">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <img src="/mobius_det.png" alt="ReactOP" className="h-8 w-8 sm:h-9 sm:w-9" itemProp="logo" />
                <div className="text-base sm:text-lg font-medium tracking-wide text-gray-900 font-syne" itemProp="name">ReactOP</div>
              </div>
              <p className="font-sans text-xs sm:text-sm text-gray-400" itemProp="copyrightNotice">&copy; 2026 ReactOP. Tous droits réservés.</p>
            </div>
            <div className="text-center md:text-right" itemScope itemType="https://schema.org/ContactPoint">
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <a href="mailto:info@reactop.com" className="hover:text-blue-600 transition-colors" itemProp="email">info@reactop.com</a>
                <span className="w-px h-4 bg-gray-200" />
                <a href="tel:+41775211998" className="hover:text-blue-600 transition-colors" itemProp="telephone">+41 77 521 19 98</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
