import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
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

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="mb-8 lg:mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
            <CheckCircle className="w-20 h-20 lg:w-24 lg:h-24 text-blue-400 relative" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent mb-8 lg:mb-10 leading-tight py-4">
          Merci !
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-12 lg:mb-16 max-w-2xl mx-auto leading-relaxed">
          Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.
        </p>

        <button
          onClick={() => navigate('/')}
          className="group relative inline-flex items-center gap-3 px-10 py-5 font-semibold text-xl lg:text-2xl overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
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

export default ThankYou;
