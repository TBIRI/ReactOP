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
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-6 py-2 bg-gray-900/80 backdrop-blur-xl rounded-full border border-gray-800/50 shadow-2xl">
          <img src="/mobius_det.png" alt="ReactOP" className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />

          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollToSection('services')}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 whitespace-nowrap"
            >
              services
            </button>

            <button
              onClick={() => scrollToSection('pour-qui')}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 whitespace-nowrap"
            >
              pour qui
            </button>

            <button
              onClick={() => scrollToSection('processus')}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 whitespace-nowrap"
            >
              processus
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 whitespace-nowrap"
            >
              contact
            </button>
          </div>

          <div className="border-beam-wrapper flex-shrink-0" style={{ borderRadius: '9999px' }}>
            <a
              href="https://calendar.app.google/jScJ2XUgZ22C1RRr5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 bg-gray-950 font-medium text-xs sm:text-sm rounded-full transition-all duration-200 whitespace-nowrap inline-block"
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
          <p className="text-xl sm:text-2xl md:text-3xl mb-12 bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Des leads mieux traités. Des résultats mesurés.
          </p>
          <div className="border-beam-wrapper group inline-block" style={{ borderRadius: '0.75rem' }}>
            <a
              href="https://calendar.app.google/jScJ2XUgZ22C1RRr5"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-4 bg-gray-950 font-semibold text-lg transition-all duration-300 flex items-center gap-2"
              style={{ borderRadius: '0.75rem' }}
            >
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Réservez un appel
              </span>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="pt-20 pb-40 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Ce que nous faisons
          </h2>
          <p className="text-center mb-16 text-base sm:text-lg bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Optimisation de la conversion basée sur les données
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: TrendingUp, title: "Audit CRO", desc: "Identification des fuites de conversion et des opportunités d'amélioration de vos tunnels de vente." },
              { icon: Target, title: "Implémentation de workflows correctifs", desc: "Mise en place de systèmes IA qui sécurisent les opportunités et rendent le pipeline plus prévisible." }
            ].map((service, idx) => (
              <div key={idx} className="group p-8 bg-gray-900/50 border border-gray-800 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                <service.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">{service.title}</h3>
                <p className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pour-qui" className="py-40 px-6 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Pour qui
          </h2>
          <p className="text-center mb-16 text-lg sm:text-xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent max-w-3xl mx-auto px-4">
            Agences immobilières qui veulent transformer plus de leads en RDV — puis en mandats.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gray-900/50 border border-red-500/30 rounded-xl">
                <div className="text-red-400 font-semibold mb-3 text-lg">Leads traités trop tard</div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-gray-300">opportunités perdues</p>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 border border-red-500/30 rounded-xl">
                <div className="text-red-400 font-semibold mb-3 text-lg">Suivi irrégulier</div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-gray-300">no-show / ghosting</p>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 border border-red-500/30 rounded-xl sm:col-span-2 lg:col-span-1">
                <div className="text-red-400 font-semibold mb-3 text-lg">Pas de visibilité</div>
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-gray-300">impossible d'optimiser</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 text-sm mb-6 italic px-4">
              Ces points sont des exemples fréquents. L'audit identifie les fuites prioritaires propres à chaque agence.
            </p>

            <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl text-center">
              <p className="text-lg sm:text-xl bg-gradient-to-r from-gray-200 to-blue-200 bg-clip-text text-transparent font-medium">
                Nous identifions les fuites et mettons en place un système mesurable pour les corriger.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="processus" className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Notre processus
          </h2>
          <p className="text-center mb-16 text-base sm:text-lg bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Une méthodologie éprouvée en 4 étapes
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Analyse", desc: "Audit complet de vos funnels de vente" },
              { num: "02", title: "Stratégie", desc: "Plan d'action personnalisé basé sur vos objectifs" },
              { num: "03", title: "Implémentation", desc: "Mise en place des systèmes" },
              { num: "04", title: "Maintenance et amélioration", desc: "Après le déploiement des solutions, notre équipe continuera à surveiller et à améliorer vos systèmes" }
            ].map((step, idx) => (
              <div key={idx} className="relative p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="text-6xl font-semibold text-blue-500/20 mb-4">{step.num}</div>
                <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">{step.title}</h3>
                <p className="bg-gradient-to-r from-gray-500 to-gray-400 bg-clip-text text-transparent">{step.desc}</p>
              </div>
            ))}
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
                <img src="/public_assets/mobius_det.png" alt="ReactOP Logo" className="h-8 w-8" />
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
