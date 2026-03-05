import { ArrowRight, TrendingUp, MousePointerClick, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

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
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);

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
    { question: "J'ai déjà essayé Google Ads mais ça n'a pas marché.", answer: "C'est souvent un problème de ciblage ou de page de destination, pas de Google Ads en soi. Nous testons toujours les campagnes avant de les scaler. Si votre entreprise n'est pas adaptée, nous vous le dirons." },
    { question: "Quelle est la durée d'engagement?", answer: "Pas de contrat long terme. Engagement mensuel, résiliable à tout moment." },
    { question: "Qu'est-ce que nous devons fournir?", answer: "Très peu, simplement un accès à vos outils existants et une idée de ce qu'est un bon lead pour vous." },
    { question: "Comment savoir si ça fonctionne?", answer: "Nous envoyons un rapport hebdomadaire sur les performances de vos campagnes et les optimisations en cours." },
    { question: "Vous créez aussi le site ou la landing page?", answer: "Nous optimisons vos pages existantes ou créons des landing pages dédiées si nécessaire." }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'} overflow-x-hidden transition-colors duration-300`} itemScope itemType="https://schema.org/WebPage">
      <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-6xl px-2 sm:px-4" role="navigation" aria-label="Navigation principale">
        <div className={`flex items-center justify-between px-0 md:px-8 py-2 md:py-3 ${isDark ? 'md:glass-nav-dark' : 'md:glass-nav-light'} md:rounded-full md:shadow-2xl`}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 md:ml-0"
            aria-label="Retour en haut"
          >
            <img src="/mobius_det.png" alt="ReactOP" className={`w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:opacity-80 transition-opacity ${!isDark && 'brightness-0'}`} itemProp="logo" />
            <span className={`text-lg md:text-xl font-medium tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}>ReactOP</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => scrollToSection('services')}
            className={`hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium tracking-wide ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-all duration-200`}
            aria-label="Naviguer vers la section services"
          >
            services
          </button>

          <button
            onClick={() => scrollToSection('processus')}
            className={`hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium tracking-wide ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-all duration-200`}
            aria-label="Naviguer vers la section processus"
          >
            processus
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className={`hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium tracking-wide ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-all duration-200`}
            aria-label="Naviguer vers la section contact"
          >
            contact
          </button>

          <button
            onClick={() => navigate('/audit')}
            className="group hidden md:inline-flex items-center px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-blue-600 hover:bg-blue-500 border-2 border-blue-400 font-medium tracking-wide text-[10px] sm:text-xs md:text-base rounded-full whitespace-nowrap relative overflow-hidden shadow-lg shadow-blue-500/30 transition-all"
          >
            <span className="relative text-white">
              Audit gratuit
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div className={`fixed top-[88px] left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className={`${isDark ? 'glass-nav-dark' : 'glass-nav-light'} rounded-3xl shadow-2xl p-6`}>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('services')}
              className={`text-2xl font-medium tracking-wide ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} py-3 text-left transition-colors px-4 rounded-xl ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100'}`}
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('processus')}
              className={`text-2xl font-medium tracking-wide ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} py-3 text-left transition-colors px-4 rounded-xl ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100'}`}
            >
              Processus
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className={`text-2xl font-medium tracking-wide ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} py-3 text-left transition-colors px-4 rounded-xl ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100'}`}
            >
              Contact
            </button>

            <div className="pt-4">
              <button
                onClick={() => {
                  navigate('/audit');
                  setIsMobileMenuOpen(false);
                }}
                className="group relative w-full flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-500 border-2 border-blue-400 font-medium tracking-wide text-lg rounded-2xl overflow-hidden shadow-lg shadow-blue-500/30 transition-all"
              >
                <span className="relative text-white">
                  Audit gratuit
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={isDark ? 'mobius-bg-dark' : 'mobius-bg-light'} aria-hidden="true"></div>
      <div
        className={`fixed inset-0 pointer-events-none z-0 ${isDark ? 'bg-blur-overlay' : 'bg-blur-overlay-light'}`}
        aria-hidden="true"
      ></div>

      {/* Hero */}
      <section className="min-h-[100svh] sm:min-h-[100vh] flex flex-col relative overflow-hidden gpu-accelerated" role="banner" aria-label="Section hero" data-section="hero" itemScope itemType="https://schema.org/WPHeader">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className={`absolute top-1/4 right-0 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}>
            <div className={`w-full h-full border ${isDark ? 'border-white/20' : 'border-gray-900/10'} rounded-full`}></div>
            <div className={`absolute inset-[15%] border ${isDark ? 'border-white/15' : 'border-gray-900/8'} rounded-full`}></div>
            <div className={`absolute inset-[30%] border ${isDark ? 'border-white/10' : 'border-gray-900/5'} rounded-full`}></div>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex items-center w-full px-6 sm:px-8 lg:px-16 xl:px-24 pt-24 sm:pt-0">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8 xl:col-span-7">
                <h1 className="font-display text-[2.9rem] leading-[1.05] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-bold mb-5 sm:mb-8 animate-slide-in-stagger-1" itemProp="name headline">
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>Vos clients vous</span>
                  <br />
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>cherchent sur </span>
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Google</span>
                </h1>

                <p className={`font-sans text-[1rem] sm:text-lg lg:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mb-8 sm:mb-10 leading-[1.6] animate-slide-in-stagger-2`} itemProp="description">
                  Nous aidons les entreprises ambitieuses à capter la demande sur <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-clip-text text-transparent font-semibold">Google</span> et à la transformer en <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent font-semibold">leads qualifiés</span>.
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
              </div>

              <div className="hidden lg:flex lg:col-span-4 xl:col-span-5 items-center justify-end">
                <div className="relative w-full max-w-sm xl:max-w-md animate-slide-in-stagger-2">
                  <div className="space-y-4">
                    <div className={`${isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-2xl p-5 border-l-2 border-l-blue-500/50`}>
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        <span className={`font-sans text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Trafic qualifié</span>
                      </div>
                      <p className={`font-sans text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Ciblage précis des intentions de recherche</p>
                    </div>

                    <div className={`${isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-2xl p-5 border-l-2 border-l-emerald-500/50 ml-6`}>
                      <div className="flex items-center gap-3 mb-2">
                        <MousePointerClick className="w-5 h-5 text-emerald-500" />
                        <span className={`font-sans text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Conversion optimisée</span>
                      </div>
                      <p className={`font-sans text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Chaque clic est une opportunité</p>
                    </div>

                    <div className={`${isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-2xl p-5 border-l-2 border-l-amber-500/50`}>
                      <div className="flex items-center gap-3 mb-2">
                        <ArrowRight className="w-5 h-5 text-amber-500" />
                        <span className={`font-sans text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Leads qualifiés</span>
                      </div>
                      <p className={`font-sans text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Des prospects prêts à passer à l'action</p>
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
            className={`flex flex-col items-center gap-2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-300`}
          >
            <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
            <div className={`w-[1px] h-8 bg-gradient-to-b ${isDark ? 'from-gray-500' : 'from-gray-400'} to-transparent`}></div>
          </button>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="pt-20 pb-40 sm:pt-32 sm:pb-56 lg:pt-40 lg:pb-64 px-6 sm:px-10 gpu-accelerated" aria-labelledby="services-title" data-section="services" itemScope itemType="https://schema.org/Service">
        <div className="max-w-6xl mx-auto">
          <h2 id="services-title" className={`reveal reveal-scale font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-3 sm:mb-6 lg:mb-8 ${isDark ? 'text-white' : 'text-gray-900'} pb-3`} itemProp="name">
            Nos Services
          </h2>
          <p className={`reveal font-sans text-center mb-12 sm:mb-20 lg:mb-24 text-base sm:text-xl lg:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ '--delay': '0.15s' } as React.CSSProperties} itemProp="description">
            Nous aidons les entreprises à tirer le maximum de la demande qualifiée présente sur Google
          </p>

          <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:gap-12" role="list">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`reveal group p-6 sm:p-10 lg:p-12 ${isDark ? 'glass-card-dark glass-card-hover-dark' : 'glass-card-light glass-card-hover-light'} rounded-3xl overflow-visible`}
                style={{ '--delay': `${idx * 0.15}s` } as React.CSSProperties}
                role="listitem"
                data-service-type={service.keywords}
                itemScope
                itemType="https://schema.org/Service"
              >
                <service.icon className="w-8 h-8 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-500 mb-3 sm:mb-6 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                <h3 className={`font-display text-xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'} leading-[1.3] pb-2`} itemProp="name">{service.title}</h3>
                <p className={`font-sans text-sm sm:text-lg lg:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-[1.6] pb-2`} itemProp="description">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section id="processus" className="py-24 sm:py-48 lg:py-56 px-6 sm:px-10 gpu-accelerated" aria-labelledby="processus-title" data-section="process" itemScope itemType="https://schema.org/HowTo">
        <div className="max-w-5xl mx-auto">
          <h2 id="processus-title" className={`reveal reveal-scale font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-3 sm:mb-6 lg:mb-8 ${isDark ? 'text-white' : 'text-gray-900'} pb-3`} itemProp="name">
            Notre processus
          </h2>
          <p className={`reveal font-sans text-center mb-12 sm:mb-20 lg:mb-24 text-base sm:text-xl lg:text-2xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ '--delay': '0.15s' } as React.CSSProperties} itemProp="description">
            Une méthodologie éprouvée en 4 étapes
          </p>

          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8" role="list">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`reveal relative flex items-center gap-6 sm:gap-10 lg:gap-14 p-6 sm:p-8 lg:p-10 ${isDark ? 'glass-card-dark glass-card-hover-dark' : 'glass-card-light glass-card-hover-light'} rounded-3xl`}
                style={{ '--delay': `${idx * 0.12}s` } as React.CSSProperties}
                role="listitem"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <div className={`font-display text-4xl sm:text-7xl lg:text-8xl font-bold ${isDark ? 'text-blue-500/20' : 'text-blue-500/25'} flex-shrink-0 w-12 sm:w-24 lg:w-32 text-right leading-none`} aria-hidden="true">{step.num}</div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-display text-xl sm:text-3xl lg:text-4xl font-semibold mb-1.5 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`} itemProp="name">{step.title}</h3>
                  <p className={`font-sans ${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-lg lg:text-xl leading-relaxed`} itemProp="text">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-48 lg:py-56 px-6 sm:px-10 gpu-accelerated" aria-labelledby="faq-title" data-section="faq" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto">
          <h2 id="faq-title" className={`reveal reveal-scale font-display text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-10 sm:mb-20 lg:mb-24 ${isDark ? 'text-white' : 'text-gray-900'} pb-3`}>
            Questions fréquentes
          </h2>

          <div className="reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border-t ${idx === faqs.length - 1 ? 'border-b' : ''} ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-6 py-7 sm:py-8 text-left group"
                  aria-expanded={openFaqIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className={`font-sans text-base sm:text-xl font-medium transition-colors duration-200 ${openFaqIndex === idx ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900')}`} itemProp="name">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-all duration-300 ${openFaqIndex === idx ? 'rotate-180 text-blue-500' : (isDark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600')}`}
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
                      <p className={`font-sans text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed pb-6 pr-8`} itemProp="text">
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
                      <p className={`font-sans text-sm sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed pb-6 sm:pb-8 pr-8 sm:pr-12 transition-opacity duration-500 ${openFaqIndex === idx ? 'opacity-100' : 'opacity-0'}`} itemProp="text">
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
              <h2 id="contact-title" className={`font-display text-4xl leading-[1.1] sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-6 sm:mb-12 lg:mb-16 pr-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span>Parlons-</span>
                <span className="italic pr-6">en!</span>
              </h2>
              <div className={`border-t ${isDark ? 'border-gray-800/50' : 'border-gray-200'} pt-6 sm:pt-8 lg:pt-10`}>
                <p className={`font-sans ${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm sm:text-base lg:text-lg mb-2 sm:mb-3`}>Email:</p>
                <a href="mailto:info@reactop.com" className={`font-sans text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors break-words`} itemProp="email" aria-label="Envoyer un email à ReactOP">
                  info@reactop.com
                </a>
              </div>
            </div>

            <div className={`reveal w-full ${isDark ? 'glass-card-dark' : 'glass-card-light'} rounded-3xl p-4 sm:p-6`} style={{ '--delay': '0.2s' } as React.CSSProperties}>
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

      <footer className={`border-t ${isDark ? 'border-gray-800/50' : 'border-gray-200'} py-12 sm:py-16 lg:py-20 px-6 sm:px-10`} role="contentinfo" aria-label="Pied de page" itemScope itemType="https://schema.org/WPFooter">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 sm:gap-10 lg:gap-12">
            <div className="text-center md:text-left" itemScope itemType="https://schema.org/Organization">
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                <img src="/mobius_det.png" alt="ReactOP" className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 ${!isDark && 'brightness-0'}`} itemProp="logo" />
                <div className={`text-lg sm:text-xl lg:text-2xl font-medium tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`} itemProp="name">ReactOP</div>
              </div>
              <p className={`font-sans text-sm sm:text-base lg:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`} itemProp="copyrightNotice">&copy; 2026 ReactOP. Tous droits reserves.</p>
            </div>

            <div className="text-center md:text-right" itemScope itemType="https://schema.org/ContactPoint">
              <h3 className={`font-display text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-5 lg:mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Contact</h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <a href="mailto:info@reactop.com" className={`font-sans block text-sm sm:text-base lg:text-lg ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300`} itemProp="email">info@reactop.com</a>
                <a href="tel:+41775211998" className={`font-sans block text-sm sm:text-base lg:text-lg ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors duration-300`} itemProp="telephone">+41 77 521 19 98</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
