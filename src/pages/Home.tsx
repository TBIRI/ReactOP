import { ArrowRight, TrendingUp, Target, Menu, X, MousePointerClick } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      website: formData.get('website'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('https://hook.eu2.make.com/f4u45tf7ael86ndagh8831p2hhr6i9ox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white" itemScope itemType="https://schema.org/WebPage">
      <nav className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-7xl px-2 sm:px-4" role="navigation" aria-label="Navigation principale">
        <div className="flex items-center justify-between px-0 md:px-8 py-2 md:py-3 md:bg-gray-900/80 md:backdrop-blur-xl md:rounded-full md:border md:border-gray-800/50 md:shadow-2xl">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 md:ml-0"
            aria-label="Retour en haut"
          >
            <img src="/mobius_det.png" alt="ReactOP Logo - Agence CRO Immobilier" className="w-10 h-10 md:w-12 md:h-12 cursor-pointer hover:opacity-80 transition-opacity" itemProp="logo" />
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
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section services"
          >
            services
          </button>

          <button
            onClick={() => scrollToSection('processus')}
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section processus"
          >
            processus
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block px-2 sm:px-3 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section contact"
          >
            contact
          </button>

          <button
            onClick={() => navigate('/audit')}
            className="group hidden md:inline-flex items-center px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 font-medium text-[10px] sm:text-xs md:text-base rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 whitespace-nowrap relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
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
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl p-6">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollToSection('services')}
              className="text-2xl font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection('processus')}
              className="text-2xl font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
            >
              Processus
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-2xl font-medium text-white py-3 text-left hover:text-blue-400 transition-colors px-4 rounded-xl hover:bg-gray-800/50"
            >
              Contact
            </button>

            <div className="pt-4">
              <button
                onClick={() => {
                  navigate('/audit');
                  setIsMobileMenuOpen(false);
                }}
                className="group relative w-full flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 font-medium text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
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
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] min-w-[1200px] min-h-[1200px] lg:min-w-[1600px] lg:min-h-[1600px] pointer-events-none z-0"
        style={{
          backgroundImage: "url('/mobius_det.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(50px)',
          opacity: 0.3
        }}
      ></div>

      <section className="h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden" role="banner" aria-label="Section hero" data-section="hero"  itemScope itemType="https://schema.org/WPHeader">

        {/* Hero content - centered vertically */}
        <div className="relative z-10 text-center w-full max-w-6xl px-2 sm:px-4">
          <h1 className="text-[2.5rem] leading-[1.15] sm:text-7xl md:text-[80px] lg:text-[96px] font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent mb-5 sm:mb-9 lg:mb-10 md:leading-[1.1] pb-2" itemProp="name headline">
            Votre partenaire acquisition <span className="whitespace-nowrap">next-gen</span>
          </h1>
          <p className="text-base leading-relaxed sm:text-xl md:text-[22px] lg:text-[26px] mb-6 sm:mb-9 lg:mb-10 text-gray-400 max-w-4xl mx-auto" itemProp="description">
            Nous gérons vos <span className="font-semibold bg-gradient-to-r from-gray-200 to-blue-300 bg-clip-text text-transparent">Google Ads</span> de bout en bout et optimisons votre <span className="font-semibold bg-gradient-to-r from-gray-200 to-blue-300 bg-clip-text text-transparent">taux de conversion</span> pour générer plus de demandes qualifiées.
          </p>
          <button
            onClick={() => navigate('/audit')}
            className="group relative inline-flex items-center gap-2 sm:gap-3 px-6 py-3.5 sm:px-9 sm:py-5 font-semibold text-base sm:text-xl lg:text-2xl overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Recevoir un audit gratuit avec ReactOP"
            data-action="cta-primary"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
            <span className="relative text-white">
              Recevez votre audit gratuit
            </span>
            <ArrowRight className="relative w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </section>

      <section id="services" className="pt-20 pb-32 sm:pt-32 sm:pb-48 lg:pt-40 lg:pb-56 px-4 sm:px-6 bg-gradient-to-b from-transparent to-gray-900/30" aria-labelledby="services-title" data-section="services" itemScope itemType="https://schema.org/Service">
        <div className="max-w-7xl mx-auto">
          <h2 id="services-title" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="name">
            Ce que nous faisons
          </h2>
          <p className="text-center mb-12 sm:mb-20 lg:mb-24 text-base sm:text-xl lg:text-2xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent" itemProp="description">
            Augmentation du volume de leads qualifiés basée sur les données
          </p>

          <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:gap-12" role="list">
            {[
              { icon: TrendingUp, title: "Audit du parcours d'acquisition lead", desc: "Identification des fuites de leads et des leviers correctifs applicables", keywords: "audit CRO, conversion immobilier, funnel vente" },
              { icon: Target, title: "Pilotage de vos campagnes Google Ads", desc: "Paramétrage, déploiement et optimisation continue de campagnes en ligne", keywords: "workflows IA, automatisation, pipeline vente" },
              { icon: MousePointerClick, title: "Optimisation des landing pages", desc: "Amélioration continue des landing pages afin d'augmenter la conversion des clics en lead", keywords: "landing page, conversion, optimisation CRO" }
            ].map((service, idx) => (
              <div key={idx} className="group p-6 sm:p-10 lg:p-12 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10" role="listitem" data-service-type={service.keywords} itemScope itemType="https://schema.org/Service">
                <service.icon className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent" itemProp="name">{service.title}</h3>
                <p className="text-base sm:text-lg lg:text-xl bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent" itemProp="description">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pour-qui" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-900/30 to-transparent" data-section="clients" itemScope itemType="https://schema.org/Audience">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-6xl mx-auto">
            <p className="text-center mb-8 sm:mb-12 lg:mb-16 text-lg sm:text-2xl lg:text-3xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent max-w-4xl mx-auto px-2 sm:px-4">
              Exemples de fuites fréquentes
            </p>

            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-10 lg:mb-12">
              <div className="p-5 sm:p-6 lg:p-8 bg-gray-900/50 border border-orange-500/30 rounded-xl flex flex-col">
                <div className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl text-white leading-tight">Campagnes mal paramétrées</div>
                <div className="flex items-start gap-2 sm:gap-3 mt-auto">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-snug">demande inexistante ou non qualifiée</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-8 bg-gray-900/50 border border-orange-500/30 rounded-xl flex flex-col">
                <div className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl text-white leading-tight">Landing pages peu convaincantes</div>
                <div className="flex items-start gap-2 sm:gap-3 mt-auto">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-snug">clics ne deviennent pas leads</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-8 bg-gray-900/50 border border-orange-500/30 rounded-xl flex flex-col">
                <div className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl text-white leading-tight">Tracking des conversions incomplet</div>
                <div className="flex items-start gap-2 sm:gap-3 mt-auto">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-snug">décisions sans visibilité sur ce qui fonctionne</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12 bg-gray-900/50 border border-green-500/20 rounded-2xl text-center" data-value-proposition="main">
              <p className="text-base sm:text-2xl lg:text-3xl bg-gradient-to-r from-gray-200 to-blue-200 bg-clip-text text-transparent font-medium leading-relaxed">
                Nous identifions les axes d'amélioration du parcours d'acquisition lead et activons les leviers clés afin d'augmenter le volume de demandes qualifiées
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="processus" className="py-24 sm:py-48 lg:py-56 px-4 sm:px-6" aria-labelledby="processus-title" data-section="process" itemScope itemType="https://schema.org/HowTo">
        <div className="max-w-6xl mx-auto">
          <h2 id="processus-title" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="name">
            Notre processus
          </h2>
          <p className="text-center mb-12 sm:mb-20 lg:mb-24 text-base sm:text-xl lg:text-2xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent" itemProp="description">
            Une méthodologie éprouvée en 4 étapes
          </p>

          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8" role="list">
            {[
              { num: "01", title: "Analyse", desc: "Audit du parcours d'acquisition d'un lead et des landing pages" },
              { num: "02", title: "Stratégie", desc: "Priorisation des leviers à plus fort impact et définition de vos objectifs et indicateurs de succès." },
              { num: "03", title: "Déploiement", desc: "Conception des campagnes et amélioration des landing pages." },
              { num: "04", title: "Optimisation continue", desc: "Améliorations régulières et suivi des résultats basés sur le volume et la qualité des demandes." }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl" role="listitem" itemScope itemType="https://schema.org/HowToStep">
                <div className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-blue-500/20 mb-3 sm:mb-4" aria-hidden="true">{step.num}</div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent" itemProp="name">{step.title}</h3>
                <p className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent text-base sm:text-lg lg:text-xl" itemProp="text">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 sm:py-48 lg:py-56 px-4 sm:px-6" aria-labelledby="contact-title" data-section="contact" itemScope itemType="https://schema.org/ContactPage">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 sm:gap-20 lg:gap-24 items-center">
            <div itemScope itemType="https://schema.org/Organization">
              <h2 id="contact-title" className="text-[3rem] leading-[1.1] sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 sm:mb-16 lg:mb-20">
                <span className="text-white">Parlons-</span>
                <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">en!</span>
              </h2>
              <div className="border-t border-gray-800 pt-6 sm:pt-10 lg:pt-12">
                <p className="text-gray-400 text-base sm:text-lg sm:text-xl mb-3 sm:mb-4">Email:</p>
                <a href="mailto:info@reactop.com" className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white hover:text-blue-400 transition-colors break-words" itemProp="email" aria-label="Envoyer un email à ReactOP">
                  info@reactop.com
                </a>
              </div>
            </div>

            <div className="w-full">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-8 lg:space-y-10" aria-label="Formulaire de contact"  itemScope itemType="https://schema.org/ContactForm">
                <div>
                  <label htmlFor="name" className="block text-base sm:text-xl lg:text-2xl mb-2 sm:mb-4 text-white">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    required
                    className="w-full px-4 py-3 sm:px-6 sm:py-5 text-base sm:text-lg lg:text-xl bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base sm:text-xl lg:text-2xl mb-2 sm:mb-4 text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Veuillez entrer une adresse email valide"
                    required
                    className="w-full px-4 py-3 sm:px-6 sm:py-5 text-base sm:text-lg lg:text-xl bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-base sm:text-xl lg:text-2xl mb-2 sm:mb-4 text-white">Site web</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="entreprise.com"
                    className="w-full px-4 py-3 sm:px-6 sm:py-5 text-base sm:text-lg lg:text-xl bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-base sm:text-xl lg:text-2xl mb-2 sm:mb-4 text-white">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Décrivez votre demande"
                    maxLength={1000}
                    required
                    className="w-full px-4 py-3 sm:px-6 sm:py-5 text-base sm:text-lg lg:text-xl bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 sm:p-5 text-base sm:text-lg lg:text-xl bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                    Message envoyé avec succès!
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 sm:p-5 text-base sm:text-lg lg:text-xl bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                    Erreur lors de l'envoi. Veuillez réessayer.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 font-semibold text-base sm:text-xl lg:text-2xl rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span className="relative text-white">
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-12 sm:py-16 lg:py-20 px-4 sm:px-6" role="contentinfo" aria-label="Pied de page" itemScope itemType="https://schema.org/WPFooter">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 sm:gap-10 lg:gap-12">
            <div className="text-center md:text-left" itemScope itemType="https://schema.org/Organization">
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3">
                <img src="/mobius_det.png" alt="ReactOP Logo - Agence CRO Immobilier" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" itemProp="logo" />
                <div className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="name">
                  ReactOP
                </div>
              </div>
              <p className="text-sm sm:text-base lg:text-lg bg-gradient-to-r from-gray-400 to-blue-300 bg-clip-text text-transparent" itemProp="copyrightNotice">© 2026 ReactOP. Tous droits réservés.</p>
            </div>

            <div className="text-center md:text-right" itemScope itemType="https://schema.org/ContactPoint">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-5 lg:mb-6 text-gray-400">Contact</h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                <a href="mailto:info@reactop.com" className="block text-sm sm:text-base lg:text-lg bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-300 transition-all duration-300" itemProp="email">info@reactop.com</a>
                <a href="tel:+41775211998" className="block text-sm sm:text-base lg:text-lg bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent hover:from-blue-400 hover:to-blue-300 transition-all duration-300" itemProp="telephone">+41 77 521 19 98</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
