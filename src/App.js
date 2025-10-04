import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import SettingsModal from './components/SettingsModal';
import Documentation from './components/Documentation';
import { exportToPDF } from './utils/exportPdf';
import { exportToExcel } from './utils/exportExcel';
import { defaultRapport } from './data/defaultData';

// Composant principal de l'application
function MainApp() {
  const [rapport, setRapport] = useState(defaultRapport);
  const [showSettings, setShowSettings] = useState(false);
  const [editingKhassaida, setEditingKhassaida] = useState(null);

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('rapport-dahira');
    if (saved) {
      setRapport(JSON.parse(saved));
    }
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    localStorage.setItem('rapport-dahira', JSON.stringify(rapport));
  }, [rapport]);

  // Appliquer les couleurs CSS personnalisées
  useEffect(() => {
    if (rapport.couleurs) {
      document.documentElement.style.setProperty('--color-primary', rapport.couleurs.primaire);
      document.documentElement.style.setProperty('--color-secondary', rapport.couleurs.secondaire);
    }
  }, [rapport.couleurs]);

  const updateRapport = (updates) => {
    setRapport(prev => ({ ...prev, ...updates }));
  };

  const addKhassaida = (khassaida) => {
    const newKhassaida = {
      ...khassaida,
      id: Date.now().toString()
    };
    setRapport(prev => ({
      ...prev,
      khassaidas: [...prev.khassaidas, newKhassaida]
    }));
  };

  const updateKhassaida = (id, updates) => {
    setRapport(prev => ({
      ...prev,
      khassaidas: prev.khassaidas.map(k => 
        k.id === id ? { ...k, ...updates } : k
      )
    }));
  };

  const deleteKhassaida = (id) => {
    if (window.confirm('Supprimer cette khassaïda ?')) {
      setRapport(prev => ({
        ...prev,
        khassaidas: prev.khassaidas.filter(k => k.id !== id)
      }));
    }
  };

  const reorderKhassaidas = (startIndex, endIndex) => {
    const result = Array.from(rapport.khassaidas);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    setRapport(prev => ({ ...prev, khassaidas: result }));
  };

  const handleExportPDF = () => {
    exportToPDF(rapport);
  };

  const handleExportExcel = () => {
    exportToExcel(rapport);
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(rapport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `rapport-${rapport.periode.mois || 'export'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setRapport(importedData);
          alert('Rapport importé avec succès !');
        } catch (error) {
          alert('Erreur lors de l\'import du fichier');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = ''; // Reset input
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                D
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Générateur de Rapports
                </h1>
                <p className="text-sm text-gray-500">{rapport.dahira}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ⚙️ Paramètres
              </button>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  📄 PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  📊 Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Formulaire */}
          <div className="w-80 flex-shrink-0">
            <Sidebar
              rapport={rapport}
              updateRapport={updateRapport}
              addKhassaida={addKhassaida}
              updateKhassaida={updateKhassaida}
              deleteKhassaida={deleteKhassaida}
              editingKhassaida={editingKhassaida}
              setEditingKhassaida={setEditingKhassaida}
              reorderKhassaidas={reorderKhassaidas}
              exportJSON={exportJSON}
              importJSON={importJSON}
            />
          </div>

          {/* Preview */}
          <div className="flex-1">
            <Preview rapport={rapport} />
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          rapport={rapport}
          updateRapport={updateRapport}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

// Composant Router principal avec navigation
function App() {
  // Déterminer le basename pour GitHub Pages
  const basename = process.env.NODE_ENV === 'production' ? '/rapport-dahira' : '';
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;