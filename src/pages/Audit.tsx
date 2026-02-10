import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Audit() {
  const navigate = useNavigate();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-black" style={{ margin: 0, height: '100vh', overflow: 'hidden' }}>
      {/* Mobius logo - very blurred background */}
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

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-900/80 backdrop-blur-xl rounded-full border border-gray-800/50 shadow-2xl hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Retour à l'accueil"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
        <img src="/mobius_det.png" alt="ReactOP Logo" className="w-8 h-8" />
        <span className="text-base md:text-lg font-semibold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">ReactOP</span>
      </button>

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
