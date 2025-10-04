import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('guide');

  const sections = {
    guide: 'Guide d\'Utilisation',
    fonctionnalites: 'Fonctionnalités',
    interface: 'Interface',
    export: 'Export & Sauvegarde',
    troubleshooting: 'Dépannage'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">📚 Documentation</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Générateur de Rapports Dahira</span>
              <div className="h-6 w-px bg-gray-300"></div>
              <Link 
                to="/index.html" 
                className="text-sm font-medium text-green-600 hover:text-green-500"
              >
                ← Retour à l'application
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Sommaire</h3>
              <nav className="space-y-2">
                {Object.entries(sections).map(([key, title]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === key
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              
              {/* Guide d'Utilisation */}
              {activeSection === 'guide' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Guide d'Utilisation</h2>
                    <p className="text-gray-600 mb-6">
                      Découvrez comment utiliser efficacement le générateur de rapports Dahira pour créer des rapports professionnels.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Informations Générales</h3>
                      <div className="prose text-gray-600">
                        <p><strong>Logo du Dahira :</strong> Saisissez le logo sous forme de texte (ex: "DMN", "DMS")</p>
                        <p><strong>Kourel :</strong> Nom du kourel (ex: "Kourel 1 National")</p>
                        <p><strong>Période :</strong> Choisissez entre mois simple ou période spécifique</p>
                        <p><strong>Responsable :</strong> Nom et titre du responsable</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Gestion des Khassaïdas</h3>
                      <div className="prose text-gray-600">
                        <p><strong>Ajout :</strong> Cliquez sur "+ Ajouter" pour créer une nouvelle Khassaïda</p>
                        <p><strong>Modes d'évaluation :</strong></p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li><strong>Pages :</strong> Progression par pages (ex: 17/25)</li>
                          <li><strong>Dadj :</strong> Évaluation par dadj avec notes sur 100</li>
                        </ul>
                        <p><strong>Gestion :</strong> Glisser-déposer pour réorganiser, modifier ou supprimer</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Commentaires et Appréciations</h3>
                      <div className="prose text-gray-600">
                        <p><strong>Appréciation générale :</strong> Zone de texte libre pour commentaire global</p>
                        <p><strong>Commentaires par Khassaïda :</strong> Ajoutez des commentaires spécifiques à chaque Khassaïda</p>
                        <p><strong>Programme du mois :</strong> Définissez les points du programme suivant</p>
                      </div>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Personnalisation</h3>
                      <div className="prose text-gray-600">
                        <p><strong>Couleurs :</strong> Cliquez sur ⚙️ Paramètres pour personnaliser les couleurs</p>
                        <p><strong>Sections :</strong> Activez/désactivez les sections selon vos besoins</p>
                        <p><strong>Prévisualisation :</strong> Voyez le résultat en temps réel</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Fonctionnalités */}
              {activeSection === 'fonctionnalites' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ Fonctionnalités</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <span className="text-2xl">📝</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Saisie Intuitive</h3>
                      </div>
                      <p className="text-gray-600">Interface simple et claire pour saisir toutes les informations nécessaires au rapport.</p>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <span className="text-2xl">🎵</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Gestion des Khassaïdas</h3>
                      </div>
                      <p className="text-gray-600">Ajout, modification et organisation des Khassaïdas avec différents modes d'évaluation.</p>
                    </div>

                    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-purple-100 rounded-lg mr-3">
                          <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Évaluations Flexibles</h3>
                      </div>
                      <p className="text-gray-600">Mode Pages ou Dadj avec calculs automatiques de progression et moyennes.</p>
                    </div>

                    <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-orange-100 rounded-lg mr-3">
                          <span className="text-2xl">📄</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Export PDF</h3>
                      </div>
                      <p className="text-gray-600">Génération automatique de PDF professionnels avec mise en page optimisée.</p>
                    </div>

                    <div className="p-6 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-teal-100 rounded-lg mr-3">
                          <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Personnalisation</h3>
                      </div>
                      <p className="text-gray-600">Couleurs personnalisables et sections configurables selon vos besoins.</p>
                    </div>

                    <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-red-100 rounded-lg mr-3">
                          <span className="text-2xl">💾</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Sauvegarde Auto</h3>
                      </div>
                      <p className="text-gray-600">Vos données sont automatiquement sauvegardées et restaurées à chaque visite.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Interface */}
              {activeSection === 'interface' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🖥️ Interface</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mise en Page</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">📝 Sidebar Gauche</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Saisie des informations</li>
                            <li>• Configuration des sections</li>
                            <li>• Paramètres et couleurs</li>
                            <li>• Actions d'export</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">👁️ Zone Principale</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Prévisualisation en temps réel</li>
                            <li>• Mise en page finale</li>
                            <li>• Style professionnel</li>
                            <li>• Responsive design</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Codes Couleur des Progressions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center p-3 bg-green-100 rounded-lg">
                          <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                          <div>
                            <div className="font-medium text-green-800">Excellent</div>
                            <div className="text-sm text-green-600">80% et plus</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-yellow-100 rounded-lg">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                          <div>
                            <div className="font-medium text-yellow-800">Bon</div>
                            <div className="text-sm text-yellow-600">50% - 79%</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-red-100 rounded-lg">
                          <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                          <div>
                            <div className="font-medium text-red-800">À améliorer</div>
                            <div className="text-sm text-red-600">Moins de 50%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Export & Sauvegarde */}
              {activeSection === 'export' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">💾 Export & Sauvegarde</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-2">📄</span>
                        Export PDF
                      </h3>
                      <div className="prose text-gray-600">
                        <p><strong>Génération automatique</strong> avec mise en page professionnelle</p>
                        <p><strong>Respect des sections</strong> activées/désactivées</p>
                        <p><strong>Nom automatique :</strong> rapport-[mois].pdf</p>
                        <p><strong>Optimisé pour impression</strong> et lecture</p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-2">📊</span>
                        Export Excel
                      </h3>
                      <div className="prose text-gray-600">
                        <p><strong>Format structuré</strong> pour analyse de données</p>
                        <p><strong>Tableaux organisés</strong> par section</p>
                        <p><strong>Compatible</strong> avec Excel, LibreOffice, Google Sheets</p>
                        <p><strong>Idéal pour</strong> le suivi et les statistiques</p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-2">💾</span>
                        Sauvegarde & Restauration
                      </h3>
                      <div className="prose text-gray-600">
                        <p><strong>Sauvegarde automatique</strong> dans le navigateur</p>
                        <p><strong>Export JSON</strong> pour backup manuel</p>
                        <p><strong>Import JSON</strong> pour restauration</p>
                        <p><strong>Transfert</strong> entre appareils possible</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dépannage */}
              {activeSection === 'troubleshooting' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">🚨 Dépannage</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-800 mb-3">❌ Le PDF ne se génère pas</h3>
                      <div className="space-y-2 text-red-700">
                        <p>• Vérifiez que toutes les données obligatoires sont remplies</p>
                        <p>• Attendez la fin du chargement de la page</p>
                        <p>• Rechargez la page et réessayez</p>
                        <p>• Vérifiez que votre navigateur autorise les téléchargements</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Les couleurs ne s'appliquent pas</h3>
                      <div className="space-y-2 text-yellow-700">
                        <p>• Ouvrez les Paramètres (⚙️) dans la sidebar</p>
                        <p>• Modifiez et sauvegardez les couleurs</p>
                        <p>• Rechargez la page si nécessaire</p>
                        <p>• Vérifiez que les couleurs sont au format hexadécimal</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">💾 Données perdues</h3>
                      <div className="space-y-2 text-blue-700">
                        <p>• Les données sont sauvegardées automatiquement</p>
                        <p>• Vérifiez le localStorage de votre navigateur</p>
                        <p>• Importez une sauvegarde JSON si disponible</p>
                        <p>• Évitez la navigation privée pour la persistance</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">🐌 Performance lente</h3>
                      <div className="space-y-2 text-green-700">
                        <p>• Réduisez le nombre de Khassaïdas si très élevé</p>
                        <p>• Fermez les autres onglets du navigateur</p>
                        <p>• Videz le cache du navigateur</p>
                        <p>• Utilisez un navigateur moderne (Chrome, Firefox, Safari)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">📞 Support</h3>
                    <div className="text-gray-600">
                      <p>Si vous rencontrez d'autres problèmes :</p>
                      <p className="mt-2">
                        <strong>GitHub :</strong> 
                        <a href="https://github.com/saliougit/rapport-dahira/issues" className="text-blue-600 hover:text-blue-500 ml-1">
                          Ouvrir un ticket
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;