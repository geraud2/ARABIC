import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // ← AJOUTER useNavigate

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Simulation connexion - redirection vers Home
    console.log('Connexion:', formData);
    navigate('/home'); // ← AJOUTER CETTE LIGNE
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6E5] to-[#F8F0E0] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        {/* En-tête */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 mx-auto bg-gradient-to-br from-[#CBA76A] to-[#8B5E3C] rounded-2xl flex items-center justify-center mb-4"
          >
            <span className="text-2xl text-white font-bold">ا</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-[#3E2C1E]">Bienvenue</h1>
          <p className="text-[#8B5E3C] mt-2">Connectez-vous à votre compte</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#3E2C1E] text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-[#CBA76A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CBA76A] focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-[#3E2C1E] text-sm font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-[#CBA76A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CBA76A] focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#CBA76A] to-[#8B5E3C] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Se connecter
          </motion.button>
        </form>

        {/* Lien vers inscription */}
        <div className="text-center mt-6">
          <p className="text-[#8B5E3C]">
            Pas de compte ?{' '}
            <Link to="/register" className="text-[#CBA76A] font-medium hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>

        {/* Élément décoratif */}
        <div className="text-center mt-8 opacity-30">
          <span className="text-[#8B5E3C] text-lg">🕌</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;