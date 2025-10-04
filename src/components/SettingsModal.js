import React, { useState } from 'react';

const SettingsModal = ({ rapport, updateRapport, onClose }) => {
  const [formData, setFormData] = useState({
    dahira: rapport.dahira,
    logo: rapport.logo,
    couleurs: { ...rapport.couleurs }
  });

  const handleSave = () => {
    updateRapport(formData);
    onClose();
  };

  const handleColorChange = (colorType, value) => {
    setFormData(prev => ({
      ...prev,
      couleurs: {
        ...prev.couleurs,
        [colorType]: value
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">⚙️ Paramètres</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Nom du Dahira */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du Dahira
            </label>
            <input
              type="text"
              value={formData.dahira}
              onChange={(e) => setFormData(prev => ({ ...prev, dahira: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Dahira Moutakhabirouna Naby"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo (texte ou emoji)
            </label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="D ou 🕌"
              maxLength="2"
            />
            <p className="text-xs text-gray-500 mt-1">
              Caractère unique ou emoji pour le logo
            </p>
          </div>

          {/* Couleurs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Couleurs du thème
            </label>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Couleur principale</span>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: formData.couleurs.primaire }}
                  ></div>
                  <input
                    type="color"
                    value={formData.couleurs.primaire}
                    onChange={(e) => handleColorChange('primaire', e.target.value)}
                    className="w-20 h-8 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Couleur secondaire</span>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: formData.couleurs.secondaire }}
                  ></div>
                  <input
                    type="color"
                    value={formData.couleurs.secondaire}
                    onChange={(e) => handleColorChange('secondaire', e.target.value)}
                    className="w-20 h-8 border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Prévisualisation couleurs */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Aperçu</h4>
            <div className="flex space-x-2">
              <div 
                className="w-12 h-8 rounded"
                style={{ backgroundColor: formData.couleurs.primaire }}
              ></div>
              <div 
                className="w-12 h-8 rounded border"
                style={{ backgroundColor: formData.couleurs.secondaire }}
              ></div>
              <div className="flex-1 text-xs text-gray-500 flex items-center">
                {formData.dahira} - {formData.logo}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;