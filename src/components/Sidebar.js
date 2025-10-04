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

  // Fonctions temporaires pour remplacer les modals
  const handleAddCommentaire = () => {
    const khassaidas = rapport.khassaidas.map(k => `${k.nom} - ${k.chanteur}`);
    if (khassaidas.length === 0) {
      alert("Ajoutez d'abord des Khassaïdas avant d'ajouter des commentaires.");
      return;
    }
    const choix = prompt(`Choisissez une Khassaïda (1-${khassaidas.length}):\n${khassaidas.map((k, i) => `${i+1}. ${k}`).join('\n')}`);
    if (!choix) return;
    
    const index = parseInt(choix) - 1;
    if (index < 0 || index >= khassaidas.length) {
      alert("Choix invalide");
      return;
    }
    
    const commentaire = prompt("Entrez votre commentaire:");
    if (!commentaire) return;
    
    const nouveauxCommentaires = [...(rapport.commentaires || [])];
    nouveauxCommentaires.push({
      khassaidaId: rapport.khassaidas[index].id,
      commentaire: commentaire
    });
    updateRapport({ commentaires: nouveauxCommentaires });
  };

  const handleAddProgrammeItem = () => {
    const item = prompt("Entrez un point du programme:");
    if (!item) return;
    
    const nouveauProgramme = [...(rapport.programme || [])];
    nouveauProgramme.push(item);
    updateRapport({ programme: nouveauProgramme });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderKhassaidas(result.source.index, result.destination.index);
  };

  return (
    <div className="space-y-6">
      {/* Header avec navigation */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            📊 Générateur de Rapports
          </h1>
          <a 
            href="/documentation" 
            className="flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:text-green-500 hover:bg-green-50 rounded-md transition-colors"
          >
            📚 Documentation
          </a>
        </div>
      </div>

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
              Logo du Dahira (Texte)
            </label>
            <input
              type="text"
              value={rapport.logo}
              onChange={(e) => updateRapport({ logo: e.target.value, logoType: 'text' })}
              placeholder="DMN"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
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
        
        {/* Commentaires par Khassaïda */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium text-gray-800">📝 Commentaires par Khassaïda</h3>
            <button
              onClick={handleAddCommentaire}
              className="px-3 py-1 bg-primary hover:bg-green-700 text-white text-sm rounded-md transition-colors"
            >
              + Ajouter Commentaire
            </button>
          </div>
          
          {/* Liste des commentaires */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {(rapport.commentairesKhassaidas || []).map((comment) => {
              const khassaida = rapport.khassaidas.find(k => k.id === comment.khassaidaId);
              return (
                <div key={comment.id} className="flex items-start justify-between p-3 bg-gray-50 rounded border">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-900 truncate">
                      {khassaida?.nom || 'Khassaïda supprimée'}
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{comment.commentaire}</div>
                  </div>
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={() => {
                        const nouveauCommentaire = prompt("Modifier le commentaire:", comment.commentaire);
                        if (nouveauCommentaire !== null && nouveauCommentaire !== comment.commentaire) {
                          const nouveauxCommentaires = rapport.commentairesKhassaidas.map(c => 
                            c.id === comment.id ? { ...c, commentaire: nouveauCommentaire } : c
                          );
                          updateRapport({ commentairesKhassaidas: nouveauxCommentaires });
                        }
                      }}
                      className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        const nouveauxCommentaires = rapport.commentairesKhassaidas.filter(c => c.id !== comment.id);
                        updateRapport({ commentairesKhassaidas: nouveauxCommentaires });
                      }}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Programme */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            📅 Programme du Mois Prochain
          </h2>
          <button
            onClick={handleAddProgrammeItem}
            className="px-3 py-1 bg-primary hover:bg-green-700 text-white text-sm rounded-md transition-colors"
          >
            + Ajouter Point
          </button>
        </div>
        
        {/* Liste des points du programme */}
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {(rapport.programmeItems || []).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
              <div className="flex items-center flex-1">
                <span className="mr-3 text-green-600 text-lg">📌</span>
                <span className="text-sm text-gray-700">{item.texte}</span>
              </div>
              <div className="flex space-x-1 ml-2">
                <button
                  onClick={() => {
                    const nouveauTexte = prompt("Modifier le point du programme:", item.texte);
                    if (nouveauTexte !== null && nouveauTexte !== item.texte) {
                      const nouveauxItems = rapport.programmeItems.map(i => 
                        i.id === item.id ? { ...i, texte: nouveauTexte } : i
                      );
                      updateRapport({ programmeItems: nouveauxItems });
                    }
                  }}
                  className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                >
                  ✏️
                </button>
                <button
                  onClick={() => {
                    const nouveauxItems = rapport.programmeItems.filter(i => i.id !== item.id);
                    updateRapport({ programmeItems: nouveauxItems });
                  }}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          
          {(!rapport.programmeItems || rapport.programmeItems.length === 0) && (!rapport.programme || rapport.programme.length === 0) && (
            <div className="text-center py-6 text-gray-500">
              <span className="text-2xl">📝</span>
              <p className="mt-2 text-sm">Aucun point de programme ajouté</p>
              <p className="text-xs">Cliquez sur "+ Ajouter Point" pour commencer</p>
            </div>
          )}
        </div>
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