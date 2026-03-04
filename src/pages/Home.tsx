import { ArrowRight, TrendingUp, MousePointerClick, Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const init = useCallback(() => {
    if (observerRef.current) return;

    const targets = document.querySelectorAll('.reveal');

    const isMobile = window.innerWidth <= 640 ||
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
    { question: "J'ai déjà essayé Google Ads mais ça n'a pas marché.", answer: "C'est souvent un problème de ciblage ou de page de destination, pas de Google Ads en soi. Nous testons toujours les campagnes avant de les scaler. Si votre entreprise n'est pas adaptée, nous vous le dirons." },
    { question: "Quelle est la durée d'engagement?", answer: "Pas de contrat long terme. Engagement mensuel, résiliable à tout moment." },
    { question: "Qu'est-ce que nous devons fournir?", answer: "Très peu, simplement un accès à vos outils existants et une idée de ce qu'est un bon lead pour vous." },
    { question: "Comment savoir si ça fonctionne?", answer: "Nous envoyons un rapport hebdomadaire sur les performances de vos campagnes et les optimisations en cours." },
    { question: "Vous créez aussi le site ou la landing page?", answer: "Nous optimisons vos pages existantes ou créons des landing pages dédiées si nécessaire." }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
      <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-6xl px-2 sm:px-4" role="navigation" aria-label="Navigation principale">
        <div className="flex items-center justify-between px-0 md:px-8 py-2 md:py-3 md:glass-nav md:rounded-full md:shadow-2xl">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 md:ml-0"
            aria-label="Retour en haut"
          >
            <img src="/mobius_det.png" alt="ReactOP" className="w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:opacity-80 transition-opacity" itemProp="logo" />
            <span className="text-lg md:text-xl font-medium tracking-wide text-white">ReactOP</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <button
            onClick={() => scrollToSection('services')}
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section services"
          >
            services
          </button>

          <button
            onClick={() => scrollToSection('processus')}
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section processus"
          >
            processus
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div className={`fixed top-[88px] left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="glass-nav rounded-3xl shadow-2xl p-6">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('services')}
              className="text-2xl font-medium tracking-wide text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('processus')}
              className="text-2xl font-medium tracking-wide text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
            >
              Processus
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-2xl font-medium tracking-wide text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
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

      <div className="mobius-bg" aria-hidden="true"></div>
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-blur-overlay"
        aria-hidden="true"
      ></div>

      {/* Hero */}
      <section className="min-h-[100svh] sm:min-h-[100vh] flex items-center relative overflow-hidden gpu-accelerated pt-24 sm:pt-0" role="banner" aria-label="Section hero" data-section="hero" itemScope itemType="https://schema.org/WPHeader">
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="font-display text-[2.75rem] leading-[1.05] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] font-bold mb-6 sm:mb-8 animate-slide-in-stagger-1" itemProp="name headline">
                <span className="text-white">Vos clients vous</span>
                <br />
                <span className="text-white">cherchent sur </span>
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Google</span>
              </h1>
              <p className="font-sans text-lg sm:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed animate-slide-in-stagger-2" itemProp="description">
                Nous aidons les entreprises ambitieuses a capter la demande sur <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 bg-clip-text text-transparent font-semibold">Google</span> et a la transformer en <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent font-semibold">leads qualifies</span>.
              </p>
              <div className="flex items-start animate-slide-in-stagger-3">
                <button
                  onClick={() => navigate('/audit')}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 font-sans font-semibold text-base overflow-hidden rounded-xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 transition-all duration-300"
                  aria-label="Recevoir un audit gratuit avec ReactOP"
                  data-action="cta-primary"
                >
                  <span className="relative text-white">Recevez votre audit gratuit</span>
                  <ArrowRight className="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="pt-20 pb-32 sm:pt-32 sm:pb-48 lg:pt-40 lg:pb-56 px-6 sm:px-10 gpu-accelerated" aria-labelledby="services-title" data-section="services" itemScope itemType="https://schema.org/Service">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-20 sm:mb-28 lg:mb-36">
            <p className="font-sans text-blue-400 text-sm sm:text-base tracking-widest uppercase mb-4">Services</p>
            <h2 id="services-title" className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white" itemProp="name">
              Ce que nous faisons
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5" role="list">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="reveal group relative bg-black p-8 sm:p-12 lg:p-16 overflow-hidden"
                style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}
                role="listitem"
                data-service-type={service.keywords}
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors duration-500">
                      <service.icon className="w-5 h-5 text-white/60 group-hover:text-blue-400 transition-colors duration-500" aria-hidden="true" />
                    </div>
                    <span className="font-sans text-white/30 text-sm tracking-wider">0{idx + 1}</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white" itemProp="name">{service.title}</h3>
                  <p className="font-sans text-base sm:text-lg text-gray-500 leading-relaxed max-w-md" itemProp="description">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section id="processus" className="py-24 sm:py-40 lg:py-48 px-6 sm:px-10 gpu-accelerated" aria-labelledby="processus-title" data-section="process" itemScope itemType="https://schema.org/HowTo">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-20 sm:mb-28 lg:mb-36">
            <p className="font-sans text-blue-400 text-sm sm:text-base tracking-widest uppercase mb-4">Processus</p>
            <h2 id="processus-title" className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white" itemProp="name">
              Comment ca marche
            </h2>
          </div>

          <div className="relative" role="list">
            <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent hidden sm:block" />

            <div className="space-y-0">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="reveal group relative"
                  style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/HowToStep"
                >
                  <div className="flex items-start gap-6 sm:gap-12 py-10 sm:py-14 border-b border-white/5 last:border-0">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-white/10 flex items-center justify-center bg-black group-hover:border-blue-500/30 transition-colors duration-500">
                        <span className="font-display text-2xl sm:text-4xl font-bold text-white/20 group-hover:text-blue-400/60 transition-colors duration-500">{step.num}</span>
                      </div>
                    </div>
                    <div className="flex-1 pt-2 sm:pt-4">
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-white group-hover:text-blue-50 transition-colors duration-300" itemProp="name">{step.title}</h3>
                      <p className="font-sans text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl" itemProp="text">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-40 lg:py-48 px-6 sm:px-10 gpu-accelerated" aria-labelledby="faq-title" data-section="faq" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-4xl mx-auto">
          <div className="reveal text-center mb-20 sm:mb-28 lg:mb-36">
            <p className="font-sans text-blue-400 text-sm sm:text-base tracking-widest uppercase mb-4">FAQ</p>
            <h2 id="faq-title" className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white">
              Questions frequentes
            </h2>
          </div>

          <div className="reveal space-y-4" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`group border border-white/5 rounded-2xl overflow-hidden transition-colors duration-300 ${openFaqIndex === idx ? 'bg-white/[0.02] border-white/10' : 'hover:border-white/10'}`}
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-6 p-6 sm:p-8 text-left"
                  aria-expanded={openFaqIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className={`font-sans text-base sm:text-lg font-medium transition-colors duration-200 ${openFaqIndex === idx ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} itemProp="name">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaqIndex === idx ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10 group-hover:border-white/20'}`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-all duration-300 ${openFaqIndex === idx ? 'rotate-180 text-blue-400' : 'text-gray-500'}`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
                <div
                  id={`faq-answer-${idx}`}
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: openFaqIndex === idx ? '1fr' : '0fr' }}
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div className="overflow-hidden">
                    <p className={`font-sans text-base sm:text-lg text-gray-500 leading-relaxed px-6 sm:px-8 pb-6 sm:pb-8 transition-opacity duration-500 ${openFaqIndex === idx ? 'opacity-100' : 'opacity-0'}`} itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 sm:py-40 lg:py-48 px-6 sm:px-10 gpu-accelerated" aria-labelledby="contact-title" data-section="contact" itemScope itemType="https://schema.org/ContactPage">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-16 sm:mb-24">
            <p className="font-sans text-blue-400 text-sm sm:text-base tracking-widest uppercase mb-4">Contact</p>
            <h2 id="contact-title" className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              Parlons de votre projet
            </h2>
            <p className="font-sans text-gray-500 text-lg max-w-xl mx-auto">
              Remplissez le formulaire et nous vous recontactons sous 24h.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="reveal lg:col-span-2 space-y-8" style={{ '--delay': '0.1s' } as React.CSSProperties} itemScope itemType="https://schema.org/Organization">
              <div className="space-y-6">
                <div className="group">
                  <p className="font-sans text-white/30 text-xs tracking-widest uppercase mb-2">Email</p>
                  <a href="mailto:info@reactop.com" className="font-sans text-xl sm:text-2xl text-white hover:text-blue-400 transition-colors" itemProp="email">
                    info@reactop.com
                  </a>
                </div>
                <div className="group">
                  <p className="font-sans text-white/30 text-xs tracking-widest uppercase mb-2">Telephone</p>
                  <a href="tel:+41775211998" className="font-sans text-xl sm:text-2xl text-white hover:text-blue-400 transition-colors" itemProp="telephone">
                    +41 77 521 19 98
                  </a>
                </div>
              </div>
            </div>

            <div className="reveal lg:col-span-3 border border-white/5 rounded-2xl p-6 sm:p-8 bg-white/[0.01]" style={{ '--delay': '0.2s' } as React.CSSProperties}>
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

      <footer className="border-t border-white/5 py-12 sm:py-16 px-6 sm:px-10" role="contentinfo" aria-label="Pied de page" itemScope itemType="https://schema.org/WPFooter">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3" itemScope itemType="https://schema.org/Organization">
              <img src="/mobius_det.png" alt="ReactOP" className="h-8 w-8" itemProp="logo" />
              <span className="text-lg font-medium text-white" itemProp="name">ReactOP</span>
            </div>
            <p className="font-sans text-sm text-gray-600" itemProp="copyrightNotice">&copy; 2026 ReactOP. Tous droits reserves.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
