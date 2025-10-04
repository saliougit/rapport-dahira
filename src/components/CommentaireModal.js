import React, { useState } from 'react';

const CommentaireModal = ({ isOpen, onClose, onSave, khassaidas, commentaireExistant = null }) => {
  const [selectedKhassaidaId, setSelectedKhassaidaId] = useState(
    commentaireExistant?.khassaidaId || ''
  );
  const [commentaire, setCommentaire] = useState(
    commentaireExistant?.commentaire || ''
  );

  const handleSave = () => {
    if (!selectedKhassaidaId || !commentaire.trim()) {
      alert('Veuillez sélectionner une Khassaïda et saisir un commentaire.');
      return;
    }

    onSave({
      id: commentaireExistant?.id || Date.now().toString(),
      khassaidaId: selectedKhassaidaId,
      commentaire: commentaire.trim()
    });

    // Reset form
    setSelectedKhassaidaId('');
    setCommentaire('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {commentaireExistant ? 'Modifier le commentaire' : 'Ajouter un commentaire'}
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
                Sélectionner une Khassaïda
              </label>
              <select
                value={selectedKhassaidaId}
                onChange={(e) => setSelectedKhassaidaId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={commentaireExistant} // Ne pas permettre de changer la khassaïda en modification
              >
                <option value="">-- Choisir une Khassaïda --</option>
                {khassaidas.map((khassaida) => (
                  <option key={khassaida.id} value={khassaida.id}>
                    {khassaida.nom} ({khassaida.chanteur})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaire
              </label>
              <textarea
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Saisissez votre commentaire..."
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
              {commentaireExistant ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentaireModal;