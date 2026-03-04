import { ArrowRight, TrendingUp, MousePointerClick, Menu, X, ChevronDown, Target, Zap, BarChart3, Users } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { num: "01", title: "Analyse", desc: "Audit marketing & identification des points de friction sur le tunnel de conversion", icon: Target },
    { num: "02", title: "Stratégie", desc: "Priorisation des leviers à plus fort impact et définition de vos objectifs et indicateurs de succès", icon: Zap },
    { num: "03", title: "Déploiement", desc: "Conception des campagnes et optimisation de la conversion", icon: BarChart3 },
    { num: "04", title: "Optimisation continue", desc: "Améliorations régulières et suivi des résultats basés sur le volume et la qualité des demandes", icon: Users }
  ];

  const faqs = [
    { question: "J'ai déjà essayé Google Ads mais ça n'a pas marché.", answer: "C'est souvent un problème de ciblage ou de page de destination, pas de Google Ads en soi. Nous testons toujours les campagnes avant de les scaler. Si votre entreprise n'est pas adaptée, nous vous le dirons." },
    { question: "Quelle est la durée d'engagement?", answer: "Pas de contrat long terme. Engagement mensuel, résiliable à tout moment." },
    { question: "Qu'est-ce que nous devons fournir?", answer: "Très peu, simplement un accès à vos outils existants et une idée de ce qu'est un bon lead pour vous." },
    { question: "Comment savoir si ça fonctionne?", answer: "Nous envoyons un rapport hebdomadaire sur les performances de vos campagnes et les optimisations en cours." },
    { question: "Vous créez aussi le site ou la landing page?", answer: "Nous optimisons vos pages existantes ou créons des landing pages dédiées si nécessaire." }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5' : 'py-6'}`} role="navigation" aria-label="Navigation principale">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3"
              aria-label="Retour en haut"
            >
              <img src="/mobius_det.png" alt="ReactOP" className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" itemProp="logo" />
              <span className="text-xl font-semibold text-white">ReactOP</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => scrollToSection('services')}
                className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                aria-label="Naviguer vers la section services"
              >
                Services
              </button>

              <button
                onClick={() => scrollToSection('processus')}
                className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                aria-label="Naviguer vers la section processus"
              >
                Processus
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                aria-label="Naviguer vers la section contact"
              >
                Contact
              </button>

              <button
                onClick={() => navigate('/audit')}
                className="ml-4 px-6 py-2.5 bg-white text-[#0a0a0f] text-sm font-semibold rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                Audit gratuit
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div className={`fixed top-20 left-4 right-4 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-[#141419] rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => scrollToSection('services')}
              className="text-lg font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-white/5"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('processus')}
              className="text-lg font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-white/5"
            >
              Processus
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-lg font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-white/5"
            >
              Contact
            </button>

            <div className="pt-4">
              <button
                onClick={() => {
                  navigate('/audit');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3.5 bg-white text-[#0a0a0f] font-semibold text-base rounded-xl transition-all"
              >
                Audit gratuit
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="min-h-[100svh] sm:min-h-[100vh] flex items-center relative overflow-hidden pt-20" role="banner" aria-label="Section hero" data-section="hero" itemScope itemType="https://schema.org/WPHeader">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <div className="animate-slide-in-stagger-1">
                <h1 className="text-[3rem] leading-[1.1] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold tracking-tight mb-8" itemProp="name headline">
                  <span className="text-white">Vos clients vous</span>
                  <br />
                  <span className="text-white">cherchent sur </span>
                  <span className="text-blue-400">Google</span>
                </h1>
              </div>

              <div className="animate-slide-in-stagger-2">
                <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed font-light" itemProp="description">
                  Nous aidons les entreprises ambitieuses a capter la demande sur <span className="text-blue-400 font-medium">Google</span> et a la transformer en <span className="text-emerald-400 font-medium">leads qualifies</span>.
                </p>
              </div>

              <div className="animate-slide-in-stagger-3 flex flex-col sm:flex-row items-start gap-4">
                <button
                  onClick={() => navigate('/audit')}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a0a0f] font-semibold text-base rounded-full hover:bg-gray-100 transition-all duration-300"
                  aria-label="Recevoir un audit gratuit avec ReactOP"
                  data-action="cta-primary"
                >
                  <span>Recevez votre audit gratuit</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="inline-flex items-center gap-2 px-8 py-4 text-gray-400 font-medium text-base hover:text-white transition-colors"
                >
                  En savoir plus
                </button>
              </div>

              <div className="animate-slide-in-stagger-3 mt-20 pt-12 border-t border-white/10">
                <div className="grid grid-cols-3 gap-8 sm:gap-16">
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">+147%</div>
                    <div className="text-sm text-gray-500">Conversions</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">-32%</div>
                    <div className="text-sm text-gray-500">CPA moyen</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">4.8%</div>
                    <div className="text-sm text-gray-500">CTR moyen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 relative" aria-labelledby="services-title" data-section="services" itemScope itemType="https://schema.org/Service">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 sm:mb-24">
            <div className="reveal">
              <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">Services</span>
            </div>
            <h2 id="services-title" className="reveal reveal-scale text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6" itemProp="name">
              Ce que nous faisons
            </h2>
            <p className="reveal text-xl text-gray-400 max-w-2xl" style={{ '--delay': '0.1s' } as React.CSSProperties} itemProp="description">
              Nous aidons les entreprises à tirer le maximum de la demande qualifiée présente sur Google
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" role="list">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="reveal group relative p-8 sm:p-10 lg:p-12 bg-[#141419] rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500"
                style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}
                role="listitem"
                data-service-type={service.keywords}
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8">
                    <service.icon className="w-7 h-7 text-blue-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4" itemProp="name">{service.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed" itemProp="description">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="processus" className="py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 relative" aria-labelledby="processus-title" data-section="process" itemScope itemType="https://schema.org/HowTo">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/3 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="mb-20 sm:mb-24">
            <div className="reveal">
              <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">Processus</span>
            </div>
            <h2 id="processus-title" className="reveal reveal-scale text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6" itemProp="name">
              Notre processus
            </h2>
            <p className="reveal text-xl text-gray-400 max-w-2xl" style={{ '--delay': '0.1s' } as React.CSSProperties} itemProp="description">
              Une méthodologie éprouvée en 4 étapes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="reveal group relative"
                style={{ '--delay': `${idx * 0.1}s` } as React.CSSProperties}
                role="listitem"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <div className="p-8 sm:p-10 bg-[#141419] rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500 h-full">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-blue-400/50 text-sm font-mono mb-2">{step.num}</div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3" itemProp="name">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed" itemProp="text">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12" aria-labelledby="faq-title" data-section="faq" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 sm:mb-20 text-center">
            <div className="reveal">
              <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">FAQ</span>
            </div>
            <h2 id="faq-title" className="reveal reveal-scale text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Questions fréquentes
            </h2>
          </div>

          <div className="reveal" style={{ '--delay': '0.1s' } as React.CSSProperties}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-white/10 last:border-b-0"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-6 py-6 sm:py-8 text-left group"
                  aria-expanded={openFaqIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className={`text-lg sm:text-xl font-medium transition-colors duration-200 ${openFaqIndex === idx ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} itemProp="name">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqIndex === idx ? 'bg-blue-500 rotate-180' : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <ChevronDown
                      className={`w-5 h-5 transition-colors duration-300 ${openFaqIndex === idx ? 'text-white' : 'text-gray-400'}`}
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
                    <p className={`text-base sm:text-lg text-gray-400 leading-relaxed pb-6 sm:pb-8 pr-16 transition-opacity duration-500 ${openFaqIndex === idx ? 'opacity-100' : 'opacity-0'}`} itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 sm:py-40 lg:py-48 px-6 sm:px-8 lg:px-12 relative" aria-labelledby="contact-title" data-section="contact" itemScope itemType="https://schema.org/ContactPage">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div itemScope itemType="https://schema.org/Organization" className="reveal">
              <span className="text-blue-400 text-sm font-medium tracking-wider uppercase mb-4 block">Contact</span>
              <h2 id="contact-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                Parlons-<span className="text-blue-400">en!</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-md">
                Discutons de votre projet et voyons comment nous pouvons vous aider a atteindre vos objectifs.
              </p>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Email</p>
                  <a href="mailto:info@reactop.com" className="text-2xl sm:text-3xl font-light text-white hover:text-blue-400 transition-colors" itemProp="email" aria-label="Envoyer un email à ReactOP">
                    info@reactop.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-2">Telephone</p>
                  <a href="tel:+41775211998" className="text-2xl sm:text-3xl font-light text-white hover:text-blue-400 transition-colors" itemProp="telephone">
                    +41 77 521 19 98
                  </a>
                </div>
              </div>
            </div>

            <div className="reveal bg-[#141419] rounded-3xl border border-white/5 p-6 sm:p-8" style={{ '--delay': '0.15s' } as React.CSSProperties}>
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

      <footer className="border-t border-white/5 py-16 sm:py-20 px-6 sm:px-8 lg:px-12" role="contentinfo" aria-label="Pied de page" itemScope itemType="https://schema.org/WPFooter">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div itemScope itemType="https://schema.org/Organization">
              <div className="flex items-center gap-3 mb-4">
                <img src="/mobius_det.png" alt="ReactOP" className="h-10 w-10" itemProp="logo" />
                <div className="text-xl font-semibold text-white" itemProp="name">
                  ReactOP
                </div>
              </div>
              <p className="text-sm text-gray-500" itemProp="copyrightNotice">&copy; 2026 ReactOP. Tous droits réservés.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">Navigation</h3>
                <div className="space-y-3">
                  <button onClick={() => scrollToSection('services')} className="block text-sm text-gray-400 hover:text-white transition-colors">Services</button>
                  <button onClick={() => scrollToSection('processus')} className="block text-sm text-gray-400 hover:text-white transition-colors">Processus</button>
                  <button onClick={() => scrollToSection('faq')} className="block text-sm text-gray-400 hover:text-white transition-colors">FAQ</button>
                </div>
              </div>

              <div itemScope itemType="https://schema.org/ContactPoint">
                <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href="mailto:info@reactop.com" className="block text-sm text-gray-400 hover:text-white transition-colors" itemProp="email">info@reactop.com</a>
                  <a href="tel:+41775211998" className="block text-sm text-gray-400 hover:text-white transition-colors" itemProp="telephone">+41 77 521 19 98</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
