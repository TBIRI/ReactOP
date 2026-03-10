import { ArrowRight, TrendingUp, MousePointerClick, Menu, X, ChevronDown, MapPin, Zap, Users, Eye } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const init = useCallback(() => {
    if (observerRef.current) return;

    const targets = document.querySelectorAll('.reveal');

    const isMobile = window.innerWidth <= 1024 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    targets.forEach((el) => observerRef.current!.observe(el));
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => init());
    return () => {
      cancelAnimationFrame(raf);
      observerRef.current?.disconnect();
    };
  }, [init]);
}

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Tally) {
      (window as any).Tally.loadEmbeds();
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  useScrollReveal();

  const services = [
    { icon: TrendingUp, title: "Google Ads", desc: "Vos clients potentiels cherchent déjà vos services sur Google. Nous créons, gérons et optimisons vos campagnes pour les capter.", keywords: "google ads, campagnes publicitaires, acquisition" },
    { icon: MousePointerClick, title: "Optimisation de la conversion", desc: "Une bonne pub ne sert à rien si la page derrière ne convertit pas. Nous optimisons votre tunnel de conversion pour que les clics deviennent des leads.", keywords: "landing page, conversion, optimisation CRO" }
  ];

  const steps = [
    { num: "01", title: "Analyse", desc: "Audit marketing & identification des points de friction sur le tunnel de conversion" },
    { num: "02", title: "Stratégie", desc: "Priorisation des leviers à plus fort impact et définition de vos objectifs et indicateurs de succès" },
    { num: "03", title: "Déploiement", desc: "Conception des campagnes et optimisation de la conversion" },
    { num: "04", title: "Optimisation continue", desc: "Améliorations régulières et suivi des résultats basés sur le volume et la qualité des demandes" }
  ];

  const faqs = [
    { question: "Quels services proposez-vous exactement ?", answer: "Nous aidons les entreprises à capter une demande déjà présente sur Google et à la transformer en leads qualifiés. Concrètement, nous gérons vos campagnes Google Ads et travaillons tout ce qui permet de convertir davantage de clics en vraies opportunités commerciales." },
    { question: "Comment améliorez-vous la conversion après le clic ?", answer: "Cela dépend de votre activité et de ce qui freine vos résultats. Nous pouvons intervenir sur les pages dédiées, le site, les formulaires, la clarté de l'offre, la rapidité de traitement des demandes et, plus largement, sur l'ensemble du parcours de contact. L'objectif reste le même : faire en sorte que le trafic généré crée davantage de vraies demandes." },
    { question: "Comment savoir si votre approche est adaptée à mon entreprise ?", answer: "Nous ne partons pas d'une méthode toute faite. Nous prenons en compte votre marché, votre zone, votre offre, vos marges et votre capacité à traiter les demandes. Notre rôle est de construire une approche cohérente pour votre entreprise." },
    { question: "Qu'est-ce qui vous différencie des autres agences ?", answer: "Nous ne cherchons pas à vous vendre du volume de clics inutiles. Nous cherchons à générer des demandes qualifiées. Là où beaucoup d'agences s'arrêtent au trafic, nous travaillons aussi sur ce qui se passe après le clic, pour transformer davantage de visites en vraies opportunités. Nous avançons avec une logique simple : exécution rapide, proximité client et amélioration continue." },
    { question: "Comment savoir si cela fonctionne vraiment ?", answer: "Nous faisons un point régulier sur les indicateurs les plus utiles, avec un reporting au minimum toutes les deux semaines. Nous suivons ce qui peut être mesuré de façon fiable dans votre activité afin de piloter les décisions et d'améliorer les résultats. Vous savez ce qui évolue, ce qui bloque et ce que nous mettons en place pour faire progresser votre acquisition." }
  ];

  return (
    <div className="min-h-screen bg-black text-white" itemScope itemType="https://schema.org/WebPage">
      <div className="md:hidden mobile-header-fixed flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg shadow-black/30 hover:bg-white/15 transition-all duration-300"
          aria-label="Retour en haut"
        >
          <img src="/mobius_det.png" alt="ReactOP" className="w-7 h-7" itemProp="logo" />
          <span className="text-sm font-medium tracking-wide text-white font-syne">ReactOP</span>
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg shadow-black/30 hover:bg-white/15 transition-all duration-300"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      <nav className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl px-4" role="navigation" aria-label="Navigation principale" style={{ transform: 'translateX(-50%) translateZ(0)', willChange: 'transform' }}>
        <div className="flex items-center justify-between px-8 py-3 glass-nav rounded-full shadow-2xl">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2"
            aria-label="Retour en haut"
          >
            <img src="/mobius_det.png" alt="ReactOP" className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity" itemProp="logo" />
            <span className="text-xl font-medium tracking-wide text-white font-syne">ReactOP</span>
          </button>

          <button
            onClick={() => scrollToSection('services')}
            className="px-8 py-2.5 rounded-full text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 font-nav"
            aria-label="Naviguer vers la section services"
          >
            services
          </button>

          <button
            onClick={() => scrollToSection('processus')}
            className="px-8 py-2.5 rounded-full text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 font-nav"
            aria-label="Naviguer vers la section processus"
          >
            processus
          </button>

          <button
            onClick={() => scrollToSection('a-propos')}
            className="px-8 py-2.5 rounded-full text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 font-nav"
            aria-label="Naviguer vers la section à propos"
          >
            à propos
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-2.5 rounded-full text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 font-nav"
            aria-label="Naviguer vers la section contact"
          >
            contact
          </button>

          <button
            onClick={() => navigate('/audit')}
            className="group inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-500 border-2 border-blue-400 font-medium tracking-wide text-base rounded-full whitespace-nowrap relative shadow-lg shadow-blue-500/30 transition-all font-nav"
          >
            <span className="relative text-white">
              Audit gratuit
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div className={`fixed top-20 left-4 right-4 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-black/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => scrollToSection('services')}
              className="text-base font-medium tracking-wide text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-white/5"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('processus')}
              className="text-base font-medium tracking-wide text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-white/5"
            >
              Processus
            </button>

            <button
              onClick={() => scrollToSection('a-propos')}
              className="text-base font-medium tracking-wide text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-white/5"
            >
              À propos
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-base font-medium tracking-wide text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-white/5"
            >
              Contact
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  navigate('/audit');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 font-medium tracking-wide text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all"
              >
                <span className="text-white">Audit gratuit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mobius-bg" aria-hidden="true"></div>
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-blur-overlay"
        aria-hidden="true"
      ></div>

      {/* Hero */}
      <section className="min-h-[100svh] sm:min-h-[100vh] flex flex-col relative overflow-hidden gpu-accelerated" role="banner" aria-label="Section hero" data-section="hero" itemScope itemType="https://schema.org/WPHeader">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] opacity-[0.03]">
            <div className="w-full h-full border border-white/20 rounded-full"></div>
            <div className="absolute inset-[15%] border border-white/15 rounded-full"></div>
            <div className="absolute inset-[30%] border border-white/10 rounded-full"></div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center w-full px-6 sm:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-0">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8 xl:col-span-7">
                <h1 className="font-display text-[2.9rem] leading-[1.05] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[5.5rem] font-bold mb-5 sm:mb-8 animate-slide-in-stagger-1" itemProp="name headline">
                  <span className="text-white">Vos clients vous</span>
                  <br />
                  <span className="text-white">cherchent sur </span>
                  <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Google</span>
                </h1>

                <p className="font-sans text-[1rem] sm:text-lg lg:text-xl xl:text-2xl text-gray-400 max-w-2xl mb-8 sm:mb-10 leading-[1.6] animate-slide-in-stagger-2" itemProp="description">
                  Nous aidons les entreprises de services ambitieuses à capter la demande sur <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-transparent font-semibold">Google</span> et à convertir ce trafic en <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent font-semibold">leads qualifiés</span>
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 animate-slide-in-stagger-3">
                  <button
                    onClick={() => navigate('/audit')}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 font-sans font-semibold text-base sm:text-lg overflow-hidden rounded-xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:shadow-xl transition-all duration-300"
                    aria-label="Recevoir un audit gratuit avec ReactOP"
                    data-action="cta-primary"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[length:200%_100%] group-hover:animate-shimmer" aria-hidden="true" />
                    <span className="relative text-white">Recevez votre audit gratuit</span>
                    <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-6 sm:mt-8 animate-slide-in-stagger-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <MapPin className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
                  <span className="font-sans text-sm text-gray-500">Lausanne, Suisse</span>
                </div>
              </div>

              <div className="hidden lg:flex lg:col-span-4 xl:col-span-5 items-center justify-end">
                <div className="relative w-full max-w-sm xl:max-w-md animate-slide-in-stagger-2">
                  <div className="space-y-4">
                    <div className="glass-card rounded-2xl p-5 border-l-2 border-l-blue-500/50">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <span className="font-sans text-sm font-medium text-white">Trafic qualifié</span>
                      </div>
                      <p className="font-sans text-sm text-gray-500">Ciblage précis des intentions de recherche</p>
                    </div>

                    <div className="glass-card rounded-2xl p-5 border-l-2 border-l-emerald-500/50 ml-6">
                      <div className="flex items-center gap-3 mb-2">
                        <MousePointerClick className="w-5 h-5 text-emerald-400" />
                        <span className="font-sans text-sm font-medium text-white">Conversion optimisée</span>
                      </div>
                      <p className="font-sans text-sm text-gray-500">Chaque clic est une opportunité</p>
                    </div>

                    <div className="glass-card rounded-2xl p-5 border-l-2 border-l-amber-500/50">
                      <div className="flex items-center gap-3 mb-2">
                        <ArrowRight className="w-5 h-5 text-amber-400" />
                        <span className="font-sans text-sm font-medium text-white">Leads qualifiés</span>
                      </div>
                      <p className="font-sans text-sm text-gray-500">Des prospects prêts à passer à l'action</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-center pb-6 sm:pb-12 animate-slide-in-stagger-3" aria-hidden="true">
          <button
            onClick={() => scrollToSection('services')}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors duration-300"
          >
            <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-gray-500 to-transparent"></div>
          </button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="pt-20 pb-40 sm:pt-32 sm:pb-56 lg:pt-40 lg:pb-64 px-6 sm:px-10 gpu-accelerated" aria-labelledby="services-title" data-section="services" itemScope itemType="https://schema.org/Service">
        <div className="max-w-6xl mx-auto">
          <h2 id="services-title" className="reveal reveal-scale font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-3 sm:mb-6 lg:mb-8 text-white pb-3" itemProp="name">
            Nos Services
          </h2>
          <div className="reveal flex flex-col items-center gap-2 mb-12 sm:mb-20 lg:mb-24" style={{ '--delay': '0.15s' } as React.CSSProperties}>
            <div className="flex items-center gap-3 sm:gap-4 w-full justify-center">
              <span className="h-px w-8 sm:w-12 flex-shrink-0 bg-gradient-to-r from-transparent to-blue-500/50"></span>
              <p className="font-display text-base sm:text-xl lg:text-2xl text-gray-400 tracking-wide italic text-center" itemProp="description">
                Nous aidons les entreprises à tirer le maximum
              </p>
              <span className="h-px w-8 sm:w-12 flex-shrink-0 bg-gradient-to-l from-transparent to-blue-500/50"></span>
            </div>
            <p className="font-display text-base sm:text-xl lg:text-2xl text-gray-400 tracking-wide italic text-center">
              de la demande qualifiée présente sur Google
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:gap-12" role="list">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="reveal group p-6 sm:p-10 lg:p-12 glass-card glass-card-hover rounded-3xl overflow-visible"
                style={{ '--delay': `${idx * 0.15}s` } as React.CSSProperties}
                role="listitem"
                data-service-type={service.keywords}
                itemScope
                itemType="https://schema.org/Service"
              >
                <service.icon className="w-8 h-8 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-400 mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-4 text-white leading-[1.3] pb-2" itemProp="name">{service.title}</h3>
                <p className="font-sans text-sm sm:text-lg lg:text-xl text-gray-400 leading-[1.6] pb-2" itemProp="description">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section id="processus" className="py-24 sm:py-48 lg:py-56 px-6 sm:px-10 gpu-accelerated" aria-labelledby="processus-title" data-section="process" itemScope itemType="https://schema.org/HowTo">
        <div className="max-w-5xl mx-auto">
          <h2 id="processus-title" className="reveal reveal-scale font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-3 sm:mb-6 lg:mb-8 text-white pb-3" itemProp="name">
            Notre processus
          </h2>
          <div className="reveal flex items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-20 lg:mb-24" style={{ '--delay': '0.15s' } as React.CSSProperties}>
            <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-blue-500/50"></span>
            <p className="font-display text-base sm:text-xl lg:text-2xl text-gray-400 tracking-wide italic" itemProp="description">
              Une méthodologie éprouvée en 4 étapes
            </p>
            <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-blue-500/50"></span>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8" role="list">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="reveal relative flex items-center gap-6 sm:gap-10 lg:gap-14 p-6 sm:p-8 lg:p-10 glass-card glass-card-hover rounded-3xl"
                style={{ '--delay': `${idx * 0.12}s` } as React.CSSProperties}
                role="listitem"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <div className="font-display text-4xl sm:text-7xl lg:text-8xl font-bold text-blue-500/20 flex-shrink-0 w-12 sm:w-24 lg:w-32 text-right leading-none" aria-hidden="true">{step.num}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl sm:text-3xl lg:text-4xl font-semibold mb-1.5 sm:mb-3 text-white" itemProp="name">{step.title}</h3>
                  <p className="font-sans text-gray-400 text-sm sm:text-lg lg:text-xl leading-relaxed" itemProp="text">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À propos */}
      <section id="a-propos" className="py-24 sm:py-48 lg:py-56 px-6 sm:px-10 gpu-accelerated relative overflow-hidden" aria-labelledby="apropos-title" data-section="about" itemScope itemType="https://schema.org/Organization">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <p className="reveal font-sans text-xs tracking-[0.2em] uppercase text-gray-500 text-center mb-5">À propos</p>
          <h2 id="apropos-title" className="reveal reveal-scale font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-3 sm:mb-6 lg:mb-8 text-white pb-3">
            Qui sommes-<span className="italic">nous</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-12 sm:mb-20 lg:mb-24 reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <MapPin className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />
            <span className="font-sans text-sm text-gray-500">Lausanne, Suisse romande</span>
          </div>

          <div className="space-y-10 sm:space-y-14 max-w-4xl mx-auto">
            <div className="reveal" style={{ '--delay': '0.15s' } as React.CSSProperties}>
              <p className="font-sans text-xl sm:text-2xl lg:text-3xl text-white font-light leading-[1.5]" itemProp="description">
                Basée à Lausanne, ReactOP aide les entreprises de services romandes à renforcer leur présence sur Google afin de capter une demande déjà présente et de transformer ce trafic en leads qualifiés.
              </p>
            </div>

            <div className="reveal" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              <p className="font-sans text-xl sm:text-2xl lg:text-3xl text-white font-light leading-[1.5]">
                Chez ReactOP, nous croyons en la rapidité d'exécution, la proximité client et un travail clair, concret et transparent.
              </p>
            </div>

            <div className="reveal" style={{ '--delay': '0.25s' } as React.CSSProperties}>
              <p className="font-sans text-xl sm:text-2xl lg:text-3xl text-white font-light leading-[1.5]">
                Notre approche combine acquisition et compréhension des opérations, afin d'aligner plus efficacement le marketing avec la réalité du terrain.
              </p>
            </div>

            <div className="reveal" style={{ '--delay': '0.3s' } as React.CSSProperties}>
              <p className="font-sans text-xl sm:text-2xl lg:text-3xl text-white font-light leading-[1.5]">
                Grâce à un modèle de facturation orienté performance, nous réduisons au maximum la prise de risque de nos clients tout en maintenant un niveau d'exigence élevé sur les résultats. En d'autres termes, nous ne gagnons que lorsque nos clients gagnent aussi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-48 lg:py-56 px-6 sm:px-10 gpu-accelerated" aria-labelledby="faq-title" data-section="faq" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-title" className="reveal reveal-scale font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-10 sm:mb-20 lg:mb-24 text-white pb-3">
            Questions fréquentes
          </h2>

          <div className="reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border-t ${idx === faqs.length - 1 ? 'border-b' : ''} border-white/10`}
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-6 py-7 sm:py-8 text-left group"
                  aria-expanded={openFaqIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className={`font-sans text-base sm:text-xl font-medium transition-colors duration-200 ${openFaqIndex === idx ? 'text-white' : 'text-gray-200 group-hover:text-white'}`} itemProp="name">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-all duration-300 ${openFaqIndex === idx ? 'rotate-180 text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`}
                    aria-hidden="true"
                  />
                </button>
                {isMobile ? (
                  openFaqIndex === idx && (
                    <div
                      id={`faq-answer-${idx}`}
                      itemScope
                      itemType="https://schema.org/Answer"
                    >
                      <p className="font-sans text-sm text-gray-300 leading-relaxed pb-6 pr-8" itemProp="text">
                        {faq.answer}
                      </p>
                    </div>
                  )
                ) : (
                  <div
                    id={`faq-answer-${idx}`}
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: openFaqIndex === idx ? '1fr' : '0fr' }}
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div className="overflow-hidden">
                      <p className={`font-sans text-sm sm:text-lg text-gray-300 leading-relaxed pb-6 sm:pb-8 pr-8 sm:pr-12 transition-opacity duration-500 ${openFaqIndex === idx ? 'opacity-100' : 'opacity-0'}`} itemProp="text">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-36 lg:py-44 px-6 sm:px-10 gpu-accelerated" aria-labelledby="contact-title" data-section="contact" itemScope itemType="https://schema.org/ContactPage">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 sm:gap-20 lg:gap-24 items-center">
            <div itemScope itemType="https://schema.org/Organization" className="reveal">
              <h2 id="contact-title" className="font-display text-4xl leading-[1.1] sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 sm:mb-12 lg:mb-16 pr-8 text-white">
                <span>Parlons-</span>
                <span className="italic pr-6">en!</span>
              </h2>
              <div className="border-t border-gray-800/50 pt-6 sm:pt-8 lg:pt-10">
                <p className="font-sans text-gray-400 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">Email:</p>
                <a href="mailto:info@reactop.com" className="font-sans text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white hover:text-blue-400 transition-colors break-words" itemProp="email" aria-label="Envoyer un email à ReactOP">
                  info@reactop.com
                </a>
              </div>
            </div>

            <div className="reveal w-full glass-card rounded-3xl p-4 sm:p-6" style={{ '--delay': '0.2s' } as React.CSSProperties}>
              <iframe
                data-tally-src="https://tally.so/embed/A7LaDW?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="690"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800/50 py-12 sm:py-16 lg:py-20 px-6 sm:px-10" role="contentinfo" aria-label="Pied de page" itemScope itemType="https://schema.org/WPFooter">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 sm:gap-10 lg:gap-12">
            <div className="text-center md:text-left" itemScope itemType="https://schema.org/Organization">
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                <img src="/mobius_det.png" alt="ReactOP" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" itemProp="logo" />
                <div className="text-lg sm:text-xl lg:text-2xl font-medium tracking-wide text-white font-syne" itemProp="name">ReactOP</div>
              </div>
              <p className="font-sans text-sm sm:text-base lg:text-lg text-gray-400" itemProp="copyrightNotice">&copy; 2026 ReactOP. Tous droits reserves.</p>
            </div>

            <div className="text-center md:text-right" itemScope itemType="https://schema.org/ContactPoint">
              <h3 className="font-display text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-5 lg:mb-6 text-gray-400">Contact</h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <a href="mailto:info@reactop.com" className="font-sans block text-sm sm:text-base lg:text-lg text-gray-300 hover:text-blue-400 transition-colors duration-300" itemProp="email">info@reactop.com</a>
                <a href="tel:+41775211998" className="font-sans block text-sm sm:text-base lg:text-lg text-gray-300 hover:text-blue-400 transition-colors duration-300" itemProp="telephone">+41 77 521 19 98</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
