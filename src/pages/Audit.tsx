import { useEffect, useState } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FallbackForm from '../components/FallbackForm';

function Audit() {
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');

    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true);
      setLoadingTimeout(false);
    };

    script.onerror = () => {
      setLoadingTimeout(true);
      setUseFallback(true);
    };

    document.body.appendChild(script);

    const timeout = setTimeout(() => {
      if (!scriptLoaded) {
        setLoadingTimeout(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [scriptLoaded]);

  return (
    <div className="bg-black" style={{ margin: 0, height: '100vh', overflow: 'hidden' }}>
      {/* Mobius logo - very blurred background */}
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

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 md:top-8 md:left-8 lg:top-10 lg:left-10 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 group"
        aria-label="Retour à l'accueil"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      {!scriptLoaded && !loadingTimeout && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-white/70 text-lg">Chargement du formulaire...</p>
            <button
              onClick={() => setUseFallback(true)}
              className="mt-4 text-sm text-gray-400 hover:text-white underline transition-colors"
            >
              Le formulaire tarde à charger? Cliquez ici
            </button>
          </div>
        </div>
      )}

      {loadingTimeout && !useFallback && (
        <div className="fixed inset-0 flex items-center justify-center z-40 px-4">
          <div className="bg-gray-900/90 backdrop-blur-lg border border-gray-800 rounded-2xl p-8 max-w-md text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Problème de chargement
            </h3>
            <p className="text-gray-400 mb-6">
              Le formulaire met plus de temps que prévu à charger. Vous pouvez attendre encore un peu ou utiliser notre formulaire alternatif.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setUseFallback(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 font-semibold rounded-xl transition-all text-white"
              >
                Utiliser le formulaire alternatif
              </button>
              <button
                onClick={() => {
                  setLoadingTimeout(false);
                  setScriptLoaded(false);
                }}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 font-medium rounded-xl transition-all text-white"
              >
                Continuer d'attendre
              </button>
            </div>
          </div>
        </div>
      )}

      {useFallback ? (
        <FallbackForm />
      ) : (
        <iframe
          data-tally-src="https://tally.so/r/Pd5RD1?transparentBackground=1"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Audit acquisition"
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }}
        />
      )}
    </div>
  );
}

export default Audit;
