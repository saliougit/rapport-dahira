import React, { useState } from 'react';

const ProgrammeModal = ({ isOpen, onClose, onSave, itemExistant = null }) => {
  const [texte, setTexte] = useState(itemExistant?.texte || '');

  const handleSave = () => {
    if (!texte.trim()) {
      alert('Veuillez saisir un point du programme.');
      return;
    }

    onSave({
      id: itemExistant?.id || Date.now().toString(),
      texte: texte.trim()
    });

    // Reset form
    setTexte('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {itemExistant ? 'Modifier le point' : 'Ajouter un point'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Point du programme
              </label>
              <textarea
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ex: Révision de la Khassaïda Karamna..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary hover:bg-green-700 text-white rounded-md transition-colors"
            >
              {itemExistant ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeModal;