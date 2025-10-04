import React, { useState, useEffect } from 'react';

const KhassaidaForm = ({ khassaida, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    chanteur: '',
    type: 'nouvelle',
    modeEvaluation: 'pages',
    pagesTotal: 25,
    pagesRealisees: 0,
    dadjs: [{ numero: 1, evaluation: 'maitrise', note: 100 }],
    commentaire: ''
  });

  useEffect(() => {
    if (khassaida) {
      setFormData(khassaida);
    }
  }, [khassaida]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addDadj = () => {
    setFormData(prev => ({
      ...prev,
      dadjs: [...prev.dadjs, { 
        numero: prev.dadjs.length + 1, 
        evaluation: 'maitrise', 
        note: 100 
      }]
    }));
  };

  const removeDadj = (index) => {
    if (formData.dadjs.length > 1) {
      setFormData(prev => ({
        ...prev,
        dadjs: prev.dadjs.filter((_, i) => i !== index)
          .map((dadj, i) => ({ ...dadj, numero: i + 1 }))
      }));
    }
  };

  const updateDadj = (index, field, value) => {
    const updatedDadjs = formData.dadjs.map((dadj, i) => 
      i === index ? { ...dadj, [field]: value } : dadj
    );
    setFormData(prev => ({ ...prev, dadjs: updatedDadjs }));
  };

  const getEvaluationColor = (evaluation) => {
    switch (evaluation) {
      case 'maitrise': return 'text-green-600';
      case 'bon': return 'text-blue-600';
      case 'moyen': return 'text-yellow-600';
      case 'faible': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {khassaida ? 'Modifier' : 'Ajouter'} une Khassaïda
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nom et Chanteur */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la Khassaïda *
              </label>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Hamat Souleymà"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chanteur *
              </label>
              <input
                type="text"
                required
                value={formData.chanteur}
                onChange={(e) => setFormData(prev => ({ ...prev, chanteur: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Serigne Moustapha Diop"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="nouvelle"
                  checked={formData.type === 'nouvelle'}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="mr-2"
                />
                <span>🆕 Nouvelle</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="revision"
                  checked={formData.type === 'revision'}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="mr-2"
                />
                <span>♻️ Révision</span>
              </label>
            </div>
          </div>

          {/* Mode d'évaluation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mode d'évaluation
            </label>
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="pages"
                  checked={formData.modeEvaluation === 'pages'}
                  onChange={(e) => setFormData(prev => ({ ...prev, modeEvaluation: e.target.value }))}
                  className="mr-2"
                />
                <span>Par Pages</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="dadj"
                  checked={formData.modeEvaluation === 'dadj'}
                  onChange={(e) => setFormData(prev => ({ ...prev, modeEvaluation: e.target.value }))}
                  className="mr-2"
                />
                <span>Par Dadj (Mélodies)</span>
              </label>
            </div>

            {formData.modeEvaluation === 'pages' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pages totales
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.pagesTotal}
                    onChange={(e) => setFormData(prev => ({ ...prev, pagesTotal: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pages réalisées
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={formData.pagesTotal}
                    value={formData.pagesRealisees}
                    onChange={(e) => setFormData(prev => ({ ...prev, pagesRealisees: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Évaluation des Dadj
                  </label>
                  <button
                    type="button"
                    onClick={addDadj}
                    className="px-3 py-1 bg-primary hover:bg-green-700 text-white text-sm rounded-md"
                  >
                    + Ajouter Dadj
                  </button>
                </div>
                
                {formData.dadjs.map((dadj, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium w-20">{dadj.numero}ème Dadj</span>
                    
                    <select
                      value={dadj.evaluation}
                      onChange={(e) => updateDadj(index, 'evaluation', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="maitrise">✅ Maîtrisé</option>
                      <option value="bon">🟢 Bon</option>
                      <option value="moyen">🟡 Moyen</option>
                      <option value="faible">🔴 Faible</option>
                    </select>
                    
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={dadj.note}
                      onChange={(e) => updateDadj(index, 'note', parseInt(e.target.value))}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Note"
                    />
                    
                    <span className={`font-medium ${getEvaluationColor(dadj.evaluation)}`}>
                      {dadj.note}%
                    </span>
                    
                    {formData.dadjs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDadj(index)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Commentaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Commentaire
            </label>
            <textarea
              value={formData.commentaire}
              onChange={(e) => setFormData(prev => ({ ...prev, commentaire: e.target.value }))}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Commentaire sur cette khassaïda..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-green-700 text-white rounded-md transition-colors"
            >
              {khassaida ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KhassaidaForm;