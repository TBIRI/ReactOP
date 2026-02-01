import { ArrowRight, TrendingUp, Target } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-4xl px-2 sm:px-4" role="navigation" aria-label="Navigation principale">
        <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6 py-2 bg-gray-900/80 backdrop-blur-xl rounded-full border border-gray-800/50 shadow-2xl">
          <img src="/mobius_det.png" alt="ReactOP Logo - Agence CRO Immobilier" className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" itemProp="logo" />

          <button
            onClick={() => scrollToSection('services')}
            className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section services"
          >
            services
          </button>

          <button
            onClick={() => scrollToSection('pour-qui')}
            className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 whitespace-nowrap"
            aria-label="Naviguer vers la section clients"
          >
            clients
          </button>

          <button
            onClick={() => scrollToSection('processus')}
            className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section processus"
          >
            processus
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            aria-label="Naviguer vers la section contact"
          >
            contact
          </button>

          <div className="border-beam-wrapper" style={{ borderRadius: '9999px' }}>
            <a
              href="https://calendar.app.google/jScJ2XUgZ22C1RRr5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 bg-gray-950 font-medium text-[10px] sm:text-xs lg:text-sm rounded-full transition-all duration-200 whitespace-nowrap inline-block"
            >
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Réservez un appel
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobius logo - very blurred background that follows scroll */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0"
        style={{
          backgroundImage: "url('/public_assets/mobius_det.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(50px)',
          opacity: 0.3
        }}
      ></div>

      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" role="banner" aria-label="Section hero" data-section="hero"  itemScope itemType="https://schema.org/WPHeader">

        {/* Planet horizon background image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-full w-full pointer-events-none bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url(/public_assets/capture_d'écran_2026-01-31_à_09.57.02.png)" }}
        ></div>

        {/* ReactOP title - above the curve */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 text-center z-20 px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="name headline">
            ReactOP
          </h1>
        </div>

        {/* Content below the curve */}
        <div className="absolute bottom-[44%] left-1/2 -translate-x-1/2 w-full max-w-4xl text-center z-10 px-6">
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent" itemProp="description">
            Des leads mieux traités. Des résultats mesurés.
          </p>
          <div className="border-beam-wrapper group inline-block mb-4" style={{ borderRadius: '0.75rem' }}>
            <a
              href="https://calendar.app.google/jScJ2XUgZ22C1RRr5"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-4 bg-gray-950 font-semibold text-lg transition-all duration-300 flex items-center gap-2"
              style={{ borderRadius: '0.75rem' }}
              aria-label="Réserver un appel gratuit de 15 minutes avec ReactOP"
              data-action="cta-primary"
              itemProp="potentialAction"
              itemScope
              itemType="https://schema.org/ReserveAction"
            >
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Réservez un appel
              </span>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
          <p className="text-sm bg-gradient-to-r from-gray-400 to-blue-200 bg-clip-text text-transparent" data-offer="free-audit">
            Audit gratuit de 15min
          </p>
        </div>
      </section>

      <section id="services" className="pt-20 pb-40 px-6 bg-gradient-to-b from-transparent to-gray-900/30" aria-labelledby="services-title" data-section="services" itemScope itemType="https://schema.org/Service">
        <div className="max-w-6xl mx-auto">
          <h2 id="services-title" className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="name">
            Ce que nous faisons
          </h2>
          <p className="text-center mb-16 text-base sm:text-lg bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent" itemProp="description">
            Optimisation de la conversion basée sur les données
          </p>

          <div className="grid md:grid-cols-2 gap-8" role="list">
            {[
              { icon: TrendingUp, title: "Audit CRO", desc: "Identification des fuites de conversion et des opportunités d'amélioration de vos tunnels de vente.", keywords: "audit CRO, conversion immobilier, funnel vente" },
              { icon: Target, title: "Implémentation de workflows correctifs", desc: "Mise en place de systèmes IA qui sécurisent les opportunités et rendent le pipeline plus prévisible.", keywords: "workflows IA, automatisation, pipeline vente" }
            ].map((service, idx) => (
              <div key={idx} className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10" role="listitem" data-service-type={service.keywords} itemScope itemType="https://schema.org/Service">
                <service.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent" itemProp="name">{service.title}</h3>
                <p className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent" itemProp="description">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pour-qui" className="py-40 px-6 bg-gradient-to-b from-gray-900/30 to-transparent" aria-labelledby="clients-title" data-section="clients" itemScope itemType="https://schema.org/Audience">
        <div className="max-w-6xl mx-auto">
          <h2 id="clients-title" className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="audienceType">
            Clients
          </h2>
          <p className="text-center mb-16 text-lg sm:text-xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent max-w-3xl mx-auto px-4" data-target-audience="agences-immobilieres">
            Agences immobilières souhaitant transformer plus de leads en RDV — puis en mandats
          </p>

          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-400 text-sm mb-6 px-4">
              Exemples de fuites fréquentes
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gray-900/50 border border-orange-500/30 rounded-xl">
                <div className="font-semibold mb-3 text-lg text-white">Leads traités trop tard</div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-300">opportunités perdues</p>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 border border-orange-500/30 rounded-xl">
                <div className="font-semibold mb-3 text-lg text-white">Suivi irrégulier</div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-300">no-show / ghosting</p>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 border border-orange-500/30 rounded-xl sm:col-span-2 lg:col-span-1">
                <div className="font-semibold mb-3 text-lg text-white">Pas de visibilité</div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <p className="text-gray-300">impossible d'optimiser</p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl text-center" data-value-proposition="main">
              <p className="text-lg sm:text-xl bg-gradient-to-r from-gray-200 to-blue-200 bg-clip-text text-transparent font-medium mb-4">
                Nous identifions les fuites propres à chaque agence et mettons en place un système mesurable pour les corriger.
              </p>
              <div className="pt-4 border-t border-blue-500/20" data-guarantee="results">
                <p className="text-sm bg-gradient-to-r from-gray-400 to-blue-300 bg-clip-text text-transparent font-medium">
                  Garantie de résultats · pas de résultat = vous ne payez pas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="processus" className="py-40 px-6" aria-labelledby="processus-title" data-section="process" itemScope itemType="https://schema.org/HowTo">
        <div className="max-w-4xl mx-auto">
          <h2 id="processus-title" className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="name">
            Notre processus
          </h2>
          <p className="text-center mb-16 text-base sm:text-lg bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent" itemProp="description">
            Une méthodologie éprouvée en 4 étapes
          </p>

          <div className="flex flex-col gap-4" role="list">
            {[
              { num: "01", title: "Analyse", desc: "Audit complet de vos funnels de vente (gratuit, ~15min)" },
              { num: "02", title: "Stratégie", desc: "Plan d'action personnalisé basé sur vos objectifs" },
              { num: "03", title: "Implémentation", desc: "Mise en place des systèmes" },
              { num: "04", title: "Maintenance et amélioration", desc: "Après le déploiement des solutions, notre équipe continuera à surveiller et à améliorer vos systèmes" }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl" role="listitem" itemScope itemType="https://schema.org/HowToStep">
                <div className="text-5xl font-semibold text-blue-500/20 mb-3" aria-hidden="true">{step.num}</div>
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent" itemProp="name">{step.title}</h3>
                <p className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent text-sm" itemProp="text">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-40 px-6" aria-labelledby="contact-title" data-section="contact" itemScope itemType="https://schema.org/ContactPage">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div itemScope itemType="https://schema.org/Organization">
              <h2 id="contact-title" className="text-5xl sm:text-6xl md:text-7xl font-bold mb-12">
                <span className="text-white">Parlons-</span>
                <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">en!</span>
              </h2>
              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 text-base sm:text-lg mb-2">Email:</p>
                <a href="mailto:theo@reactop.com" className="text-xl sm:text-2xl md:text-3xl font-light text-white hover:text-blue-400 transition-colors break-words" itemProp="email" aria-label="Envoyer un email à ReactOP">
                  theo@reactop.com
                </a>
              </div>
            </div>

            <div className="w-full">
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulaire de contact"  itemScope itemType="https://schema.org/ContactForm">
                <div>
                  <label htmlFor="name" className="block text-lg mb-3 text-white">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Smith"
                    required
                    className="w-full px-6 py-4 bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg mb-3 text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Veuillez entrer une adresse email valide"
                    required
                    className="w-full px-6 py-4 bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg mb-3 text-white">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder=""
                    maxLength={1000}
                    required
                    className="w-full px-6 py-4 bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                    Message envoyé avec succès!
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                    Erreur lors de l'envoi. Veuillez réessayer.
                  </div>
                )}

                <div className="border-beam-wrapper" style={{ borderRadius: '0.75rem' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-gray-950 font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                    style={{ borderRadius: '0.75rem' }}
                  >
                    <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-12 px-6" role="contentinfo" aria-label="Pied de page" itemScope itemType="https://schema.org/WPFooter">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left" itemScope itemType="https://schema.org/Organization">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <img src="/public_assets/mobius_det.png" alt="ReactOP Logo - Agence CRO Immobilier" className="h-8 w-8" itemProp="logo" />
                <div className="text-2xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent" itemProp="name">
                  ReactOP
                </div>
              </div>
              <p className="bg-gradient-to-r from-gray-400 to-blue-300 bg-clip-text text-transparent" itemProp="copyrightNotice">© 2026 ReactOP. Tous droits réservés.</p>
            </div>

            <div className="text-center md:text-right" itemScope itemType="https://schema.org/ContactPoint">
              <h3 className="text-base font-semibold mb-4 text-gray-400">Contact</h3>
              <div className="space-y-2">
                <p className="text-base bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent" itemProp="email">theo@reactop.com</p>
                <p className="text-base bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent" itemProp="telephone">+41 77 521 19 98</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
