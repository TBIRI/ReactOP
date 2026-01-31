import { ArrowRight, TrendingUp, Target } from 'lucide-react';

function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-6">
        <div className="flex items-center justify-between px-6 py-2 bg-gray-900/80 backdrop-blur-xl rounded-full border border-gray-800/50 shadow-2xl">
          <img src="/mobius_det.png" alt="ReactOP" className="w-10 h-10" />

          <button
            onClick={() => scrollToSection('services')}
            className="px-6 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
          >
            services
          </button>

          <button
            onClick={() => scrollToSection('processus')}
            className="px-6 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
          >
            processus
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
          >
            contact
          </button>

          <div className="border-beam-wrapper" style={{ borderRadius: '9999px' }}>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-gray-950 font-medium text-sm rounded-full transition-all duration-200 whitespace-nowrap"
            >
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Réservez un appel
              </span>
            </button>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Planet horizon background image */}
        <div
          className="absolute bottom-0 left-0 right-0 h-full w-full pointer-events-none bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url(/public_assets/capture_d'écran_2026-01-31_à_09.57.02.png)" }}
        ></div>

        {/* ReactOP title - above the curve */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 text-center z-20">
          <h1 className="text-7xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            ReactOP
          </h1>
        </div>

        {/* Content below the curve */}
        <div className="absolute bottom-[42%] left-1/2 -translate-x-1/2 w-full max-w-4xl text-center z-10 px-6">
          <p className="text-3xl mb-12 bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Des leads mieux traités. Des résultats mesurés.
          </p>
          <div className="border-beam-wrapper group inline-block" style={{ borderRadius: '0.75rem' }}>
            <button className="relative px-8 py-4 bg-gray-950 font-semibold text-lg transition-all duration-300 flex items-center gap-2" style={{ borderRadius: '0.75rem' }}>
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Réservez un appel
              </span>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <section id="services" className="pt-60 pb-40 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Ce que nous faisons
          </h2>
          <p className="text-center mb-16 text-lg bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
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
                <p className="bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="processus" className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-semibold text-center mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Notre processus
          </h2>
          <p className="text-center mb-16 text-lg bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Une méthodologie éprouvée en 4 étapes
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Analyse", desc: "Audit complet de vos funnels de vente" },
              { num: "02", title: "Stratégie", desc: "Plan d'action personnalisé basé sur vos objectifs" },
              { num: "03", title: "Test", desc: "Expérimentations et itérations rapides" },
              { num: "04", title: "Scale", desc: "Déploiement des gagnants à grande échelle" }
            ].map((step, idx) => (
              <div key={idx} className="relative p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl">
                <div className="text-6xl font-semibold text-blue-500/20 mb-4">{step.num}</div>
                <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">{step.title}</h3>
                <p className="bg-gradient-to-r from-gray-300 to-blue-200 bg-clip-text text-transparent">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-semibold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Prêt à optimiser votre conversion ?
          </h2>
          <p className="text-xl mb-12 bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent">
            Discutons de vos objectifs et de comment nous pouvons vous aider
          </p>
          <div className="border-beam-wrapper group" style={{ borderRadius: '0.75rem' }}>
            <button className="relative px-10 py-5 bg-gray-950 font-semibold text-xl transition-all duration-300 flex items-center gap-3" style={{ borderRadius: '0.75rem' }}>
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Réservez un appel gratuit
              </span>
              <ArrowRight className="w-6 h-6 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-semibold mb-2 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                ReactOP
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
