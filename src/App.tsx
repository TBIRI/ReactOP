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
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-4xl px-2 sm:px-4">
        <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6 py-2 bg-gray-900/80 backdrop-blur-xl rounded-full border border-gray-800/50 shadow-2xl">
          <img src="/mobius_det.png" alt="ReactOP - Optimisation CRO pour Agences Immobilières" className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />

          <button
            onClick={() => scrollToSection('services')}
            className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
          >
            services
          </button>

          <button
            onClick={() => scrollToSection('pour-qui')}
            className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 whitespace-nowrap"
          >
            clients
          </button>

          <button
            onClick={() => scrollToSection('processus')}
            className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
          >
            processus
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
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

      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">

        {/* Planet horizon background image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-full w-full pointer-events-none bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url(/public_assets/capture_d'écran_2026-01-31_à_09.57.02.png)" }}
        ></div>

        {/* ReactOP title - above the curve */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 text-center z-20 px-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            ReactOP
          </h1>
        </div>

        {/* Content below the curve */}
        <div className="absolute bottom-[44%] left-1/2 -translate-x-1/2 w-full max-w-4xl text-center z-10 px-6">
          <p className="text-xl sm:text-2xl md:text-3xl mb-4 bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Transformez plus de leads immobiliers en mandats
          </p>
          <p className="text-base sm:text-lg mb-8 text-gray-400 max-w-2xl mx-auto">
            Audit CRO + Workflows IA pour agences immobilières qui veulent arrêter de perdre des opportunités
          </p>
          <div className="border-beam-wrapper group inline-block" style={{ borderRadius: '0.75rem' }}>
            <a
              href="https://calendar.app.google/jScJ2XUgZ22C1RRr5"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-4 bg-gray-950 font-semibold text-lg transition-all duration-300 flex items-center gap-2"
              style={{ borderRadius: '0.75rem' }}
              aria-label="Réserver un appel de consultation gratuit avec ReactOP"
            >
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Audit gratuit de 30 min
              </span>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3">Places limitées - 5 audits par mois</p>
        </div>
      </section>

      <section id="services" className="pt-20 pb-40 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
              <p className="text-sm text-blue-400">Résultats moyens constatés</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">+35%</div>
                <p className="text-sm text-gray-400 mt-1">Taux de conversion leads → RDV</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">-60%</div>
                <p className="text-sm text-gray-400 mt-1">No-shows évités</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">2x</div>
                <p className="text-sm text-gray-400 mt-1">Mandats signés</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Comment nous aidons les agences immobilières
          </h2>
          <p className="text-center mb-16 text-base sm:text-lg bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Solutions CRO et IA pour maximiser chaque lead immobilier
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Audit CRO Immobilier Complet",
                desc: "Analyse approfondie de votre tunnel de vente immobilier : landing pages, formulaires, temps de réponse, process de qualification, taux de transformation lead→RDV→mandat.",
                points: ["Analyse des fuites de conversion", "Benchmark vs concurrence", "Recommandations actionnables"]
              },
              {
                icon: Target,
                title: "Workflows IA & Automation",
                desc: "Systèmes automatisés qui répondent instantanément aux leads, qualifient les prospects, rappellent les no-shows et libèrent votre équipe pour les tâches à haute valeur.",
                points: ["Réponse instantanée 24/7", "Qualification automatique", "Suivi intelligent des prospects"]
              }
            ].map((service, idx) => (
              <div key={idx} className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                <service.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">{service.title}</h3>
                <p className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pour-qui" className="py-40 px-6 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Pour les agences immobilières ambitieuses
          </h2>
          <p className="text-center mb-16 text-lg sm:text-xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent max-w-3xl mx-auto px-4">
            Vous générez des leads mais perdez trop d'opportunités en cours de route ? Vous n'êtes pas seul.
          </p>

          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-400 text-sm mb-6 px-4">
              Les 3 fuites les plus coûteuses dans l'immobilier
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gray-900/50 border border-orange-500/30 rounded-xl hover:border-orange-500/50 transition-colors">
                <div className="font-semibold mb-3 text-lg text-white">Leads traités trop tard</div>
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-gray-300">Le prospect a déjà contacté 3 autres agences</p>
                </div>
                <p className="text-xs text-orange-400">Coût estimé : 40% des leads perdus</p>
              </div>

              <div className="p-6 bg-gray-900/50 border border-orange-500/30 rounded-xl hover:border-orange-500/50 transition-colors">
                <div className="font-semibold mb-3 text-lg text-white">Suivi irrégulier</div>
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-gray-300">No-shows, ghosting, prospects qui disparaissent</p>
                </div>
                <p className="text-xs text-orange-400">Coût estimé : 35% des RDV perdus</p>
              </div>

              <div className="p-6 bg-gray-900/50 border border-orange-500/30 rounded-xl sm:col-span-2 lg:col-span-1 hover:border-orange-500/50 transition-colors">
                <div className="font-semibold mb-3 text-lg text-white">Aucune visibilité</div>
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-gray-300">Impossible de savoir ce qui fonctionne vraiment</p>
                </div>
                <p className="text-xs text-orange-400">Impact : Décisions basées sur l'intuition</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-green-500/30 rounded-2xl text-center mb-8">
              <p className="text-lg sm:text-xl bg-gradient-to-r from-gray-200 to-blue-200 bg-clip-text text-transparent font-medium mb-4">
                Nous identifions les fuites propres à votre agence et mettons en place un système mesurable pour les corriger.
              </p>
              <p className="text-sm text-gray-400">Approche data-driven • Résultats mesurables • ROI garanti</p>
            </div>

            <div className="text-center">
              <div className="border-beam-wrapper group inline-block" style={{ borderRadius: '0.75rem' }}>
                <a
                  href="https://calendar.app.google/jScJ2XUgZ22C1RRr5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-8 py-4 bg-gray-950 font-semibold text-lg transition-all duration-300 flex items-center gap-2"
                  style={{ borderRadius: '0.75rem' }}
                  aria-label="Obtenir un audit CRO gratuit pour votre agence immobilière"
                >
                  <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Obtenir mon audit gratuit
                  </span>
                  <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-3">30 minutes d'analyse offerte • Sans engagement</p>
            </div>
          </div>
        </div>
      </section>

      <section id="processus" className="py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Comment nous procédons
          </h2>
          <p className="text-center mb-16 text-base sm:text-lg bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Méthodologie CRO éprouvée pour agences immobilières
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                num: "01",
                title: "Audit CRO Approfondi",
                desc: "Analyse complète de votre tunnel de vente immobilier : taux de conversion à chaque étape (lead→contact→RDV→visite→mandat), points de friction, temps de réponse moyen, qualité de la qualification.",
                duration: "Semaine 1"
              },
              {
                num: "02",
                title: "Plan d'Action Personnalisé",
                desc: "Stratégie sur-mesure pour votre agence : priorisation des quick wins, roadmap d'optimisation, projections de ROI, workflows d'automation à déployer.",
                duration: "Semaine 2"
              },
              {
                num: "03",
                title: "Implémentation & Automation",
                desc: "Mise en place des systèmes d'optimisation : workflows IA, automatisation du suivi, systèmes de rappel no-shows, tableaux de bord de performance.",
                duration: "Semaines 3-4"
              },
              {
                num: "04",
                title: "Optimisation Continue",
                desc: "Monitoring des performances, A/B testing, ajustements basés sur les données, rapports mensuels détaillés avec recommandations d'amélioration.",
                duration: "Ongoing"
              }
            ].map((step, idx) => (
              <div key={idx} className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl hover:border-blue-500/30 transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-5xl font-semibold text-blue-500/20 group-hover:text-blue-500/30 transition-colors">{step.num}</div>
                  <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">{step.duration}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">{step.title}</h3>
                <p className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <p className="text-center text-gray-300">
              <span className="font-semibold text-white">Garantie résultats :</span> Si nous n'identifions pas au moins 3 fuites de conversion majeures lors de l'audit, vous ne payez rien.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-12">
                <span className="text-white">Parlons-</span>
                <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">en!</span>
              </h2>
              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 text-base sm:text-lg mb-2">Email:</p>
                <a href="mailto:theo@reactop.com" className="text-xl sm:text-2xl md:text-3xl font-light text-white hover:text-blue-400 transition-colors break-words">
                  theo@reactop.com
                </a>
              </div>
            </div>

            <div className="w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
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

      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <img src="/public_assets/mobius_det.png" alt="ReactOP - Agence CRO spécialisée immobilier" className="h-8 w-8" />
                <div className="text-2xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  ReactOP
                </div>
              </div>
              <p className="bg-gradient-to-r from-gray-400 to-blue-300 bg-clip-text text-transparent">© 2026 ReactOP. Tous droits réservés.</p>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-base font-semibold mb-4 text-gray-400">Contact</h3>
              <div className="space-y-2">
                <p className="text-base bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent">theo@reactop.com</p>
                <p className="text-base bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent">+41 77 521 19 98</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
