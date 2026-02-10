import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Audit() {
  const navigate = useNavigate();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');

    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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

      {!scriptLoaded && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-white/70 text-lg">Chargement du formulaire...</p>
          </div>
        </div>
      )}

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
    </div>
  );
}

export default Audit;
