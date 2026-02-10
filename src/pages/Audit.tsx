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
    <div className="bg-black" style={{ margin: 0, minHeight: '100vh' }}>
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

      <iframe
        data-tally-src="https://tally.so/r/Pd5RD1?transparentBackground=1"
        width="100%"
        height="100vh"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Audit acquisition"
        style={{ display: 'block', border: 0 }}
      />
    </div>
  );
}

export default Audit;
