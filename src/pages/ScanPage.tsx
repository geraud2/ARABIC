import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Upload, FileText, Home, Scan as ScanIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const ScanPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanHistory, setScanHistory] = useState<any[]>([]);

  // Charger l'historique des scans
  React.useEffect(() => {
    const savedScans = localStorage.getItem('fisabil_scanned_texts');
    if (savedScans) {
      setScanHistory(JSON.parse(savedScans));
    }
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        processImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setExtractedText('');
    
    // Simulation OCR - À REMPLACER PAR UN VRAI SERVICE OCR
    setTimeout(() => {
      const mockArabicText = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
      الرَّحْمَٰنِ الرَّحِيمِ
      مَالِكِ يَوْمِ الدِّينِ`;
      
      setExtractedText(mockArabicText);
      setIsProcessing(false);
      
      // Sauvegarder dans l'historique
      const newScan = {
        id: Date.now(),
        content: mockArabicText,
        date: new Date().toISOString(),
        wordCount: mockArabicText.split(/\s+/).length
      };
      
      const updatedHistory = [newScan, ...scanHistory];
      setScanHistory(updatedHistory);
      localStorage.setItem('fisabil_scanned_texts', JSON.stringify(updatedHistory));
    }, 2000);
  };

  const handleCameraCapture = () => {
    // Simulation caméra - À IMPLÉMENTER AVEC API CAMERA
    alert("Fonction caméra à implémenter avec l'API camera du navigateur");
  };

  const extractVocabulary = () => {
    if (!extractedText) return;
    
    // Simulation extraction vocabulaire
    const words = extractedText.split(/\s+/).filter(word => word.length > 2);
    const uniqueWords = [...new Set(words)].slice(0, 10);
    
    const vocabulary = uniqueWords.map((word, index) => ({
      id: Date.now() + index,
      arabic: word,
      translation: `Traduction de ${word}`,
      pronunciation: `Prononciation de ${word}`,
      masteryLevel: 0.1,
      lastReviewed: new Date().toISOString(),
      reviewInterval: 1
    }));
    
    // Sauvegarder le vocabulaire
    const existingVocabulary = JSON.parse(localStorage.getItem('fisabil_vocabulary') || '[]');
    const newVocabulary = [...existingVocabulary, ...vocabulary];
    localStorage.setItem('fisabil_vocabulary', JSON.stringify(newVocabulary));
    
    alert(`${vocabulary.length} nouveaux mots ajoutés à ton vocabulaire !`);
    navigate('/vocabulary');
  };

  const clearScan = () => {
    setSelectedImage(null);
    setExtractedText('');
  };

  const openScan = (scan: any) => {
    setExtractedText(scan.content);
    setSelectedImage(null); // Pas d'image pour les anciens scans
  };

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#53B16F]/20 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </button>

          <div className="text-center">
            <h1 className="text-lg font-semibold text-[#53B16F]">
              Scanner un Texte
            </h1>
            <p className="text-xs text-[#53B16F]/70">Extraction automatique de vocabulaire</p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="text-[#53B16F] hover:text-[#53B16F]/80 transition-colors"
          >
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Zone de scan principale */}
        {!selectedImage && !extractedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Bouton Caméra */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCameraCapture}
                className="bg-gradient-to-br from-[#53B16F] to-[#53B16F] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <Camera className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-semibold">Prendre une photo</div>
                <div className="text-xs opacity-80">Utiliser la caméra</div>
              </motion.button>

              {/* Bouton Upload */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-br from-[#53B16F] to-[#53B16F] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-semibold">Importer un fichier</div>
                <div className="text-xs opacity-80">PDF, JPG, PNG</div>
              </motion.button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*, .pdf"
              className="hidden"
            />

            {/* Info scan */}
            <div className="bg-[#53B16F]/5 rounded-2xl p-4 border border-[#53B16F]/20">
              <div className="flex items-center gap-2 text-[#53B16F] mb-2">
                <ScanIcon className="w-4 h-4" />
                <span className="font-semibold text-sm">Comment ça marche ?</span>
              </div>
              <ul className="text-xs text-[#53B16F]/70 space-y-1">
                <li>• Prends une photo d'un texte arabe</li>
                <li>• L'IA extrait automatiquement le texte</li>
                <li>• Crée ton vocabulaire personnalisé</li>
                <li>• Apprends avec tes propres textes</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Image sélectionnée */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Scanned" 
                className="w-full rounded-2xl shadow-lg border border-[#53B16F]/20"
              />
              <button
                onClick={clearScan}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Indicateur de traitement */}
            {isProcessing && (
              <div className="bg-[#53B16F]/5 rounded-2xl p-4 text-center border border-[#53B16F]/20">
                <div className="flex justify-center gap-1 mb-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-[#53B16F]"
                    />
                  ))}
                </div>
                <div className="text-sm text-[#53B16F] font-medium">
                  Analyse du texte en cours...
                </div>
                <div className="text-xs text-[#53B16F]/70">
                  Extraction du vocabulaire arabe
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Texte extrait */}
        {extractedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#53B16F]">Texte extrait</h3>
                <button
                  onClick={clearScan}
                  className="text-[#53B16F] hover:text-[#53B16F]/80"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-[#53B16F]/5 rounded-xl p-4 max-h-48 overflow-y-auto">
                <div className="text-lg font-arabic text-right leading-loose text-[#53B16F]">
                  {extractedText}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={extractVocabulary}
                  className="flex-1 bg-[#53B16F] text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-[#53B16F]/90 transition-colors"
                >
                  Extraire le vocabulaire
                </button>
                <button
                  onClick={() => navigate('/chat')}
                  className="flex-1 bg-white text-[#53B16F] py-2 px-4 rounded-xl text-sm font-medium border border-[#53B16F]/20 hover:bg-[#53B16F]/5 transition-colors"
                >
                  Discuter avec l'IA
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Historique des scans */}
        {scanHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-lg border border-[#53B16F]/20"
          >
            <h3 className="font-semibold text-[#53B16F] mb-3">Historique des scans</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {scanHistory.slice(0, 5).map((scan) => (
                <motion.button
                  key={scan.id}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => openScan(scan)}
                  className="w-full text-left p-3 rounded-xl bg-[#53B16F]/5 hover:bg-[#53B16F]/10 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-[#53B16F]" />
                    <span className="text-sm font-medium text-[#53B16F]">
                      {new Date(scan.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-[#53B16F]/70 line-clamp-2">
                    {scan.content.substring(0, 100)}...
                  </div>
                  <div className="text-xs text-[#53B16F]/50 mt-1">
                    {scan.wordCount} mots
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default ScanPage;