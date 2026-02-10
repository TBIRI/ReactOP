import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FallbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      website: formData.get('website'),
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
        setTimeout(() => {
          navigate('/thank-you');
        }, 1500);
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
    <div className="fixed inset-0 overflow-auto bg-black z-40">
      <div className="min-h-full flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Demander un audit gratuit
            </h1>
            <p className="text-gray-400 text-lg">
              Remplissez le formulaire ci-dessous pour recevoir votre audit personnalisé
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white text-lg mb-2">
                Nom complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 text-lg bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Jean Dupont"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-lg mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                className="w-full px-4 py-3 text-lg bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="jean@entreprise.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white text-lg mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 text-lg bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="+41 00 000 00 00"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-white text-lg mb-2">
                Entreprise
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full px-4 py-3 text-lg bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-white text-lg mb-2">
                Site web *
              </label>
              <input
                type="url"
                id="website"
                name="website"
                required
                className="w-full px-4 py-3 text-lg bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="https://votre-site.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white text-lg mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1000}
                className="w-full px-4 py-3 text-lg bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                placeholder="Parlez-nous de votre projet et de vos objectifs..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-center">
                Demande envoyée avec succès! Redirection...
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
                Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 font-semibold text-xl rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] text-white"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FallbackForm;
