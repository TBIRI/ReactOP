import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ContactThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="mobius-bg" aria-hidden="true" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-blur-overlay" aria-hidden="true" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="mb-8 lg:mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
            <CheckCircle className="w-20 h-20 lg:w-24 lg:h-24 text-blue-500 relative" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-8 lg:mb-10 leading-tight py-4">
          Message reçu !
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-500 mb-12 lg:mb-16 max-w-2xl mx-auto leading-relaxed">
          Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
        </p>

        <button
          onClick={() => navigate('/')}
          className="group relative inline-flex items-center gap-3 px-10 py-5 font-semibold text-xl lg:text-2xl overflow-hidden rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          <span className="relative text-white">
            Retour à l'accueil
          </span>
        </button>
      </div>
    </div>
  );
}

export default ContactThankYou;
