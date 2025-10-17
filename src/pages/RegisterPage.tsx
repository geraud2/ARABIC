import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Simulation inscription - redirection vers onboarding
    console.log('Inscription:', formData);
    
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-[#53B16F]/20"
      >
        {/* En-tête avec Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 mx-auto mb-4"
          >
            <img 
              src="/fisa.jpeg" 
              alt="Fisabil"
              className="w-full h-full object-cover rounded-full border-4 border-[#53B16F] shadow-lg"
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#53B16F]">Rejoignez-nous</h1>
          <p className="text-[#53B16F] mt-2">Commencez votre voyage arabe</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#53B16F] text-sm font-medium mb-2">
              Nom complet
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-[#53B16F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent"
              placeholder="Votre nom"
              required
            />
          </div>

          <div>
            <label className="block text-[#53B16F] text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-[#53B16F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-[#53B16F] text-sm font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-[#53B16F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-[#53B16F] text-sm font-medium mb-2">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border border-[#53B16F] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#53B16F] focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#53B16F] to-[#53B16F] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Créer mon compte
          </motion.button>
        </form>

        {/* Lien vers connexion */}
        <div className="text-center mt-6">
          <p className="text-[#53B16F]">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#53B16F] font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

        {/* Élément décoratif */}
        <div className="text-center mt-8 opacity-30">
          <span className="text-[#53B16F] text-2xl">﷽</span>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;