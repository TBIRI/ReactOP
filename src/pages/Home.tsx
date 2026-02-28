import { ArrowRight, TrendingUp, Target, Menu, X, MousePointerClick } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    const individualObserverOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const individualObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const animationType = element.dataset.animationType || 'fade';
          const delay = element.dataset.delay ? parseInt(element.dataset.delay) : 0;

          if (!element.classList.contains('animated')) {
            setTimeout(() => {
              element.classList.add('animated');

              switch(animationType) {
                case 'slide-left':
                  element.classList.add('animate-slide-from-left');
                  break;
                case 'slide-right':
                  element.classList.add('animate-slide-from-right');
                  break;
                case 'zoom':
                  element.classList.add('animate-zoom-in');
                  break;
                case 'fade-up':
                  element.classList.add('animate-fade-up');
                  break;
                default:
                  element.classList.add('animate-section-fade-in');
              }
            }, delay);
          }
        }
      });
    }, individualObserverOptions);

    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.scroll-reveal-target');
      animatedElements.forEach((element) => {
        individualObserver.observe(element);
      });
    }, 100);

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.glass-card-hover');

      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollProgress = (scrolled - elementTop + windowHeight) / (windowHeight + elementHeight);
          const translateY = Math.min(Math.max(scrollProgress * 20 - 10, -10), 10);

          if (!(element as HTMLElement).matches(':hover')) {
            (element as HTMLElement).style.transform = `translateY(${translateY}px)`;
          }
        }
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      individualObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
      <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-7xl px-2 sm:px-4" role="navigation" aria-label="Navigation principale">
        <div className="flex items-center justify-between px-0 md:px-8 py-2 md:py-3 md:glass-nav md:rounded-full md:shadow-2xl">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 md:ml-0"
            aria-label="Retour en haut"
          >
            <img src="/mobius_det.png" alt="ReactOP Logo - Agence Acquisition Digitale & CRO" className="w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:opacity-80 transition-opacity" itemProp="logo" />
            <span className="text-lg md:text-xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">ReactOP</span>
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
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-sans font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section services"
          >
            services
          </button>

          <button
            onClick={() => scrollToSection('processus')}
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-sans font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section processus"
          >
            processus
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-sans font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section contact"
          >
            contact
          </button>

          <button
            onClick={() => navigate('/audit')}
            className="group hidden md:inline-flex items-center px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-blue-600 hover:bg-blue-500 border-2 border-blue-400 font-sans font-semibold text-[10px] sm:text-xs md:text-base rounded-full whitespace-nowrap relative overflow-hidden shadow-lg shadow-blue-500/30 transition-all"
          >
            <span className="relative text-white">
              Audit gratuit
            </span>
          </button>
        </div>
      </nav>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Dropdown menu */}
      <div className={`fixed top-[88px] left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="glass-nav rounded-3xl shadow-2xl p-6">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('services')}
              className="font-sans text-2xl font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('processus')}
              className="font-sans text-2xl font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
            >
              Processus
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="font-sans text-2xl font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
            >
              Contact
            </button>

            <div className="pt-4">
              <button
                onClick={() => {
                  navigate('/audit');
                  setIsMobileMenuOpen(false);
                }}
                className="group relative w-full flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-500 border-2 border-blue-400 font-sans font-semibold text-lg rounded-2xl overflow-hidden shadow-lg shadow-blue-500/30 transition-all"
              >
                <span className="relative text-white">
                  Audit gratuit
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobius logo - very blurred background that follows scroll */}
      <div
        className="fixed top-[50%] left-[50%] pointer-events-none z-0 mobile-bg-fix"
        style={{
          backgroundImage: "url('/mobius_det.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(50px)',
          opacity: 0.3,
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '100vh',
          minWidth: '1600px',
          minHeight: '1600px'
        }}
      ></div>

      <section className="min-h-[100svh] sm:min-h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden gpu-accelerated py-24 sm:py-28 md:py-32 lg:py-20 xl:py-24" role="banner" aria-label="Section hero" data-section="hero"  itemScope itemType="https://schema.org/WPHeader">

        {/* Hero content - asymmetric layout */}
        <div className="relative z-10 w-full max-w-7xl px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left column - main content */}
            <div className="lg:col-span-7 xl:col-span-7 lg:col-start-1">
              <h1 className="font-display text-[2.75rem] leading-[1.15] sm:text-[5.5rem] md:text-[80px] lg:text-[60px] xl:text-[75px] 2xl:text-[120px] font-bold bg-gradient-to-br from-white via-blue-100 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-8 md:mb-10 lg:mb-6 xl:mb-8 md:leading-[1.12] lg:leading-[1.15] pb-2 sm:pb-4 animate-slide-in-stagger-1" itemProp="name headline">
                Votre partenaire acquisition <span className="font-display italic whitespace-nowrap">next-gen</span>
              </h1>
              <p className="font-sans text-base leading-relaxed sm:text-xl md:text-[26px] lg:text-[16px] xl:text-[18px] 2xl:text-[28px] mb-6 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 text-gray-300 max-w-2xl animate-slide-in-stagger-2" itemProp="description">
                Nous gérons vos <span className="font-semibold bg-gradient-to-r from-gray-200 to-blue-300 bg-clip-text text-transparent">Google Ads</span> de bout en bout et optimisons votre <span className="font-semibold bg-gradient-to-r from-gray-200 to-blue-300 bg-clip-text text-transparent">taux de conversion</span> pour générer plus de leads
              </p>
              <button
                onClick={() => navigate('/audit')}
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-10 sm:py-6 md:px-8 md:py-5 lg:px-7 lg:py-4 xl:px-9 xl:py-5 font-sans font-bold text-base sm:text-xl md:text-[22px] lg:text-base xl:text-lg 2xl:text-2xl overflow-hidden rounded-2xl bg-blue-600 hover:bg-blue-500 border-2 border-blue-400 shadow-xl shadow-blue-500/40 hover:shadow-blue-400/60 transition-all animate-slide-in-stagger-3"
                aria-label="Recevoir un audit gratuit avec ReactOP"
                data-action="cta-primary"
              >
                <span className="relative text-white whitespace-nowrap">
                  Recevez votre audit gratuit
                </span>
                <ArrowRight className="relative w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-5 lg:h-5 xl:w-5 xl:h-5 2xl:w-7 2xl:h-7 text-white group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>

            {/* Right column - decorative glass panel */}
            <div className="hidden xl:block lg:col-span-4 lg:col-start-9 opacity-0 animate-slide-in-stagger-3">
              <div className="glass-card rounded-3xl p-6 lg:p-8 xl:p-10 aspect-square flex items-center justify-center animate-float-delayed animate-pulse-glow">
                <div className="text-center">
                  <div className="font-display text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-bold bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent leading-tight">
                    Boosté par l'IA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="pt-20 pb-40 sm:pt-32 sm:pb-56 lg:pt-40 lg:pb-64 px-4 sm:px-6 gpu-accelerated scroll-reveal" aria-labelledby="services-title" data-section="services" itemScope itemType="https://schema.org/Service">
        <div className="max-w-7xl mx-auto">
          <h2 id="services-title" className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent pb-3 opacity-0 scroll-reveal-target" data-animation-type="zoom" data-delay="0" itemProp="name">
            Ce que nous faisons
          </h2>
          <p className="font-sans text-center mb-12 sm:mb-20 lg:mb-24 text-base sm:text-xl lg:text-2xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent opacity-0 scroll-reveal-target" data-animation-type="fade-up" data-delay="400" itemProp="description">
            Augmentation du volume de leads qualifiés basée sur les données
          </p>

          <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:gap-12" role="list">
            {[
              { icon: TrendingUp, title: "Audit du parcours d'acquisition lead", desc: "Identification des fuites de leads et des leviers correctifs applicables", keywords: "audit CRO, optimisation conversion, funnel vente" },
              { icon: Target, title: "Pilotage de vos campagnes Google Ads", desc: "Paramétrage, déploiement et optimisation continue de campagnes en ligne", keywords: "workflows IA, automatisation, pipeline vente" },
              { icon: MousePointerClick, title: "Optimisation du parcours de conversion", desc: "Réduction continue des points de friction de votre tunnel de conversion, du clic au lead", keywords: "landing page, conversion, optimisation CRO" }
            ].map((service, idx) => (
              <div key={idx} className="group p-6 sm:p-10 lg:p-12 glass-card glass-card-hover rounded-3xl opacity-0 scroll-reveal-target overflow-visible" data-animation-type={idx % 2 === 0 ? 'slide-left' : 'slide-right'} role="listitem" data-service-type={service.keywords} itemScope itemType="https://schema.org/Service">
                <service.icon className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent leading-[1.3] pb-2" itemProp="name">{service.title}</h3>
                <p className="font-sans text-base sm:text-lg lg:text-xl bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent leading-[1.6] pb-2" itemProp="description">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pour-qui" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 gpu-accelerated scroll-reveal" data-section="clients" itemScope itemType="https://schema.org/Audience">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-6xl mx-auto">
            <p className="font-display text-center mb-8 sm:mb-12 lg:mb-16 text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent max-w-4xl mx-auto px-2 sm:px-4 opacity-0 scroll-reveal-target" data-animation-type="zoom" data-delay="0">
              Exemples de fuites fréquentes
            </p>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-10 lg:mb-12">
              <div className="p-5 sm:p-6 lg:p-8 glass-card rounded-2xl flex flex-col border border-orange-500/20 opacity-0 scroll-reveal-target" data-animation-type="fade-up" data-delay="400">
                <div className="font-display font-semibold mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl text-white leading-tight">Campagnes mal paramétrées</div>
                <div className="flex items-start gap-2 sm:gap-3 mt-auto">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <p className="font-sans text-sm sm:text-base lg:text-lg text-gray-300 leading-snug">demande inexistante ou non qualifiée</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-8 glass-card rounded-2xl flex flex-col border border-orange-500/20 opacity-0 scroll-reveal-target" data-animation-type="fade-up" data-delay="600">
                <div className="font-display font-semibold mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl text-white leading-tight">Landing pages peu convaincantes</div>
                <div className="flex items-start gap-2 sm:gap-3 mt-auto">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <p className="font-sans text-sm sm:text-base lg:text-lg text-gray-300 leading-snug">clics ne deviennent pas leads</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-8 glass-card rounded-2xl flex flex-col border border-orange-500/20 opacity-0 scroll-reveal-target" data-animation-type="fade-up" data-delay="800">
                <div className="font-display font-semibold mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl text-white leading-tight">Tracking des conversions incomplet</div>
                <div className="flex items-start gap-2 sm:gap-3 mt-auto">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <p className="font-sans text-sm sm:text-base lg:text-lg text-gray-300 leading-snug">décisions sans visibilité sur ce qui fonctionne</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12 glass-card rounded-3xl text-center border border-green-500/20 opacity-0 scroll-reveal-target" data-animation-type="zoom" data-delay="1000" data-value-proposition="main">
              <p className="font-sans text-base sm:text-2xl lg:text-3xl bg-gradient-to-r from-gray-200 to-blue-200 bg-clip-text text-transparent font-medium leading-relaxed">
                Nous priorisons les améliorations à plus fort impact afin d'augmenter votre volume de demandes qualifiées.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="processus" className="py-24 sm:py-48 lg:py-56 px-4 sm:px-6 gpu-accelerated scroll-reveal" aria-labelledby="processus-title" data-section="process" itemScope itemType="https://schema.org/HowTo">
        <div className="max-w-6xl mx-auto">
          <h2 id="processus-title" className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent pb-3 opacity-0 scroll-reveal-target" data-animation-type="zoom" data-delay="0" itemProp="name">
            Notre processus
          </h2>
          <p className="font-sans text-center mb-12 sm:mb-20 lg:mb-24 text-base sm:text-xl lg:text-2xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent opacity-0 scroll-reveal-target" data-animation-type="fade-up" data-delay="400" itemProp="description">
            Une méthodologie éprouvée en 4 étapes
          </p>

          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8" role="list">
            {[
              { num: "01", title: "Analyse", desc: "Audit marketing & identification des points de friction sur le tunnel de conversion" },
              { num: "02", title: "Stratégie", desc: "Priorisation des leviers à plus fort impact et définition de vos objectifs et indicateurs de succès" },
              { num: "03", title: "Déploiement", desc: "Conception des campagnes et optimisation de la conversion" },
              { num: "04", title: "Optimisation continue", desc: "Améliorations régulières et suivi des résultats basés sur le volume et la qualité des demandes" }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 sm:p-8 lg:p-10 glass-card rounded-3xl opacity-0 scroll-reveal-target" data-animation-type={idx % 2 === 0 ? 'slide-left' : 'slide-right'} role="listitem" itemScope itemType="https://schema.org/HowToStep">
                <div className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-blue-500/30 mb-3 sm:mb-4" aria-hidden="true">{step.num}</div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent" itemProp="name">{step.title}</h3>
                <p className="font-sans bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent text-base sm:text-lg lg:text-xl" itemProp="text">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 sm:py-48 lg:py-56 px-4 sm:px-6 gpu-accelerated scroll-reveal" aria-labelledby="contact-title" data-section="contact" itemScope itemType="https://schema.org/ContactPage">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 sm:gap-20 lg:gap-24 items-center">
            <div itemScope itemType="https://schema.org/Organization" className="opacity-0 scroll-reveal-target">
              <h2 id="contact-title" className="font-display text-[3rem] leading-[1.4] sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-16 sm:mb-24 lg:mb-32 pb-12 pr-8">
                <span className="text-white">Parlons-</span>
                <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent italic pr-6">en!</span>
              </h2>
              <div className="border-t border-gray-800/50 pt-6 sm:pt-10 lg:pt-12">
                <p className="font-sans text-gray-400 text-base sm:text-lg sm:text-xl mb-3 sm:mb-4">Email:</p>
                <a href="mailto:info@reactop.com" className="font-sans text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white hover:text-blue-400 transition-colors break-words" itemProp="email" aria-label="Envoyer un email à ReactOP">
                  info@reactop.com
                </a>
              </div>
            </div>

            <div className="w-full glass-card rounded-3xl p-4 sm:p-6 opacity-0 scroll-reveal-target" style={{ animationDelay: '0.2s' }}>
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

      <footer className="border-t border-gray-800/50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6" role="contentinfo" aria-label="Pied de page" itemScope itemType="https://schema.org/WPFooter">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 sm:gap-10 lg:gap-12">
            <div className="text-center md:text-left" itemScope itemType="https://schema.org/Organization">
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                <img src="/mobius_det.png" alt="ReactOP Logo - Agence Acquisition Digitale & CRO" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" itemProp="logo" />
                <div className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="name">
                  ReactOP
                </div>
              </div>
              <p className="font-sans text-sm sm:text-base lg:text-lg bg-gradient-to-r from-gray-400 to-blue-300 bg-clip-text text-transparent" itemProp="copyrightNotice">© 2026 ReactOP. Tous droits réservés.</p>
            </div>

            <div className="text-center md:text-right" itemScope itemType="https://schema.org/ContactPoint">
              <h3 className="font-display text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-5 lg:mb-6 text-gray-400">Contact</h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <a href="mailto:info@reactop.com" className="font-sans block text-sm sm:text-base lg:text-lg bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-300 transition-all duration-300" itemProp="email">info@reactop.com</a>
                <a href="tel:+41775211998" className="font-sans block text-sm sm:text-base lg:text-lg bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-300 transition-all duration-300" itemProp="telephone">+41 77 521 19 98</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
