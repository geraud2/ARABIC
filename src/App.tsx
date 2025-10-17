import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ScanPage from './pages/ScanPage';
import CoursesPage from './pages/CoursesPage';
import AudioPage from './pages/AudioPage';
import VocabularyPage from './pages/VocabularyPage';
import ProfilePage from './pages/ProfilePage';
import SubscriptionPage from './pages/SubscriptionPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulation du chargement de l'app
    const loadApp = async () => {
      try {
        // Vérifier si l'utilisateur est déjà connecté
        const userData = localStorage.getItem('fisabilUser');
        
        // Simuler un temps de chargement minimum (2-3 secondes)
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 2500));
        
        // Attendre que l'app soit prête
        await Promise.all([minLoadTime]);
        
        setIsAppReady(true);
        
        // Cacher le splash screen après un délai supplémentaire
        setTimeout(() => {
          setShowSplash(false);
        }, 1000);
        
      } catch (error) {
        console.error('Erreur de chargement:', error);
        // En cas d'erreur, cacher quand même le splash après 4s
        setTimeout(() => {
          setShowSplash(false);
        }, 4000);
      }
    };

    loadApp();
  }, []);

  // Si le splash doit être affiché
  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* Routes principales Fisabil */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/review" element={<CoursesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/audio" element={<AudioPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Route de fallback */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;