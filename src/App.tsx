import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import CoursesPage from './pages/CoursesPage';
import ScanPage from './pages/ScanPage'; // 
import VocabularyPage from './pages/VocabularyPage'; 
import AudioPage from './pages/AudioPage'; // 
import SubscriptionPage from './pages/SubscriptionPage'; // 
import SettingsPage from './pages/SettingsPage'; // 

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* Routes principales Fisabil */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/scan" element={<ScanPage />} /> {/* 📸 NOUVELLE */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} /> {/* 📚 NOUVELLE */}
       
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/audio" element={<AudioPage />} /> {/* 🎤 NOUVELLE */}
        
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} /> {/* 💰 NOUVELLE */}
        <Route path="/settings" element={<SettingsPage />} /> {/* ⚙️ NOUVELLE */}
        // Dans App.jsx - ajouter cette route :
<Route path="/review" element={<CoursesPage />} />
<Route path="/courses" element={<CoursesPage />} />
        {/* Route de fallback */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;