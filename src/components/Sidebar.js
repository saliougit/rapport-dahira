import React, { useState } from 'react';
import KhassaidaForm from './KhassaidaForm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Sidebar = ({
  rapport,
  updateRapport,
  addKhassaida,
  updateKhassaida,
  deleteKhassaida,
  editingKhassaida,
  setEditingKhassaida,
  reorderKhassaidas,
  exportJSON,
  importJSON
}) => {
  const [showKhassaidaForm, setShowKhassaidaForm] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderKhassaidas(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-6">
      {/* Informations Générales */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          📋 Informations Générales
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kourel
            </label>
            <input
              type="text"
              value={rapport.kourel}
              onChange={(e) => updateRapport({ kourel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Section Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo du Dahira
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="logoType"
                    value="text"
                    checked={rapport.logoType === 'text'}
                    onChange={(e) => updateRapport({ logoType: e.target.value })}
                    className="mr-2"
                  />
                  Texte
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="logoType"
                    value="image"
                    checked={rapport.logoType === 'image'}
                    onChange={(e) => updateRapport({ logoType: e.target.value })}
                    className="mr-2"
                  />
                  Image
                </label>
              </div>

              {rapport.logoType === 'text' ? (
                <input
                  type="text"
                  value={rapport.logo}
                  onChange={(e) => updateRapport({ logo: e.target.value })}
                  placeholder="DMN"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          updateRapport({ 
                            logoImage: event.target.result,
                            logo: file.name 
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {rapport.logoImage && (
                    <div className="mt-2">
                      <img 
                        src={rapport.logoImage} 
                        alt="Logo prévisualisation" 
                        className="w-16 h-16 object-contain border rounded"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du Dahira
            </label>
            <input
              type="text"
              value={rapport.dahira}
              onChange={(e) => updateRapport({ dahira: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de Période
            </label>
            <select
              value={rapport.periode.type}
              onChange={(e) => updateRapport({ 
                periode: { ...rapport.periode, type: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="mois">Mois</option>
              <option value="periode">Période spécifique</option>
            </select>
          </div>

          {rapport.periode.type === 'mois' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mois
              </label>
              <input
                type="text"
                value={rapport.periode.mois}
                onChange={(e) => updateRapport({ 
                  periode: { ...rapport.periode, mois: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Mars 2025"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Début
                </label>
                <input
                  type="date"
                  value={rapport.periode.debut}
                  onChange={(e) => updateRapport({ 
                    periode: { ...rapport.periode, debut: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fin
                </label>
                <input
                  type="date"
                  value={rapport.periode.fin}
                  onChange={(e) => updateRapport({ 
                    periode: { ...rapport.periode, fin: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsable
            </label>
            <input
              type="text"
              value={rapport.responsable.nom}
              onChange={(e) => updateRapport({ 
                responsable: { ...rapport.responsable, nom: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre du Responsable
            </label>
            <input
              type="text"
              value={rapport.responsable.titre}
              onChange={(e) => updateRapport({ 
                responsable: { ...rapport.responsable, titre: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Gestion des Khassaïdas */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            🎵 Khassaïdas ({rapport.khassaidas.length})
          </h2>
          <button
            onClick={() => {
              setEditingKhassaida(null);
              setShowKhassaidaForm(true);
            }}
            className="px-3 py-1 bg-primary hover:bg-green-700 text-white text-sm rounded-md transition-colors"
          >
            + Ajouter
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="khassaidas">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {rapport.khassaidas.map((khassaida, index) => (
                  <Draggable key={khassaida.id} draggableId={khassaida.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {khassaida.nom}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {khassaida.chanteur}
                          </div>
                        </div>
                        <div className="flex space-x-1 ml-2">
                          <button
                            onClick={() => {
                              setEditingKhassaida(khassaida);
                              setShowKhassaidaForm(true);
                            }}
                            className="p-1 text-blue-600 hover:text-blue-800"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteKhassaida(khassaida.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Appréciation Générale */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          💬 Appréciation Générale
        </h2>
        <textarea
          value={rapport.appreciationGenerale}
          onChange={(e) => updateRapport({ appreciationGenerale: e.target.value })}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Saisissez votre appréciation générale..."
        />
      </div>

      {/* Programme */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          📅 Programme du Mois Prochain
        </h2>
        <textarea
          value={rapport.programme.join('\n')}
          onChange={(e) => updateRapport({ 
            programme: e.target.value.split('\n').filter(line => line.trim())
          })}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Saisissez chaque point sur une nouvelle ligne..."
        />
      </div>

      {/* Configuration des Sections */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          ⚙️ Sections du Rapport
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">📋 Informations Générales</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rapport.sectionsConfig?.informations !== false}
                onChange={(e) => updateRapport({
                  sectionsConfig: {
                    ...rapport.sectionsConfig,
                    informations: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">📊 Statistiques</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rapport.sectionsConfig?.statistiques !== false}
                onChange={(e) => updateRapport({
                  sectionsConfig: {
                    ...rapport.sectionsConfig,
                    statistiques: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">📋 Tableau des Khassaïdas</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rapport.sectionsConfig?.tableau !== false}
                onChange={(e) => updateRapport({
                  sectionsConfig: {
                    ...rapport.sectionsConfig,
                    tableau: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">💬 Appréciation</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rapport.sectionsConfig?.appreciation !== false}
                onChange={(e) => updateRapport({
                  sectionsConfig: {
                    ...rapport.sectionsConfig,
                    appreciation: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">📅 Programme du Mois</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rapport.sectionsConfig?.programme !== false}
                onChange={(e) => updateRapport({
                  sectionsConfig: {
                    ...rapport.sectionsConfig,
                    programme: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Sauvegarde/Chargement */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          💾 Gestion des Données
        </h2>
        <div className="space-y-3">
          <button
            onClick={exportJSON}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            📂 Exporter JSON
          </button>
          
          <label className="block">
            <input
              type="file"
              accept=".json"
              onChange={importJSON}
              className="hidden"
            />
            <div className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-center cursor-pointer transition-colors">
              📁 Importer JSON
            </div>
          </label>
        </div>
      </div>

      {/* Formulaire Khassaïda Modal */}
      {showKhassaidaForm && (
        <KhassaidaForm
          khassaida={editingKhassaida}
          onSave={(data) => {
            if (editingKhassaida) {
              updateKhassaida(editingKhassaida.id, data);
            } else {
              addKhassaida(data);
            }
            setShowKhassaidaForm(false);
            setEditingKhassaida(null);
          }}
          onCancel={() => {
            setShowKhassaidaForm(false);
            setEditingKhassaida(null);
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;