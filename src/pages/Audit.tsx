import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Audit() {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Tally) {
      (window as any).Tally.loadEmbeds();
    }

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="bg-black" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      width: '100%',
      height: '100%'
    }}>
      <div className="fixed inset-0 pointer-events-none z-0 bg-blur-overlay" aria-hidden="true"></div>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 md:top-8 md:left-8 lg:top-10 lg:left-10 z-50 w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-full border-2 border-blue-400 shadow-lg shadow-blue-500/30 transition-all duration-200 group"
        aria-label="Retour à l'accueil"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <iframe
        data-tally-src="https://tally.so/r/Pd5RD1?transparentBackground=1&redirectUrl=/merci-audit"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Audit acquisition"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          border: 0,
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
}

export default Audit;
