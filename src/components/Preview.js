// import React from 'react';

// const Preview = ({ rapport }) => {
//   const calculateProgression = (khassaida) => {
//     if (khassaida.modeEvaluation === 'pages') {
//       const pourcentage = Math.round((khassaida.pagesRealisees / khassaida.pagesTotal) * 100);
//       return {
//         type: 'pages',
//         pourcentage,
//         texte: `${khassaida.pagesRealisees} / ${khassaida.pagesTotal} pages`
//       };
//     } else {
//       const pourcentage = Math.round(khassaida.dadjs.reduce((sum, d) => sum + d.note, 0) / khassaida.dadjs.length);
//       return {
//         type: 'dadj',
//         pourcentage,
//         dadjs: khassaida.dadjs
//       };
//     }
//   };

//   const getProgressBarClass = (pourcentage) => {
//     if (pourcentage >= 80) return 'progress-high';
//     if (pourcentage >= 50) return 'progress-medium';
//     return 'progress-low';
//   };

//   const getPercentageClass = (pourcentage) => {
//     if (pourcentage >= 80) return 'perc-high';
//     if (pourcentage >= 50) return 'perc-medium';
//     return 'perc-low';
//   };

//   const getDadjIcon = (evaluation) => {
//     switch (evaluation) {
//       case 'maitrise': return '✅';
//       case 'bon': return '🟢';
//       case 'moyen': return '🟡';
//       case 'faible': return '🔴';
//       default: return '⚪';
//     }
//   };

//   const getPeriodeDisplay = () => {
//     if (rapport.periode.type === 'mois') {
//       return rapport.periode.mois;
//     } else {
//       return `${rapport.periode.debut} - ${rapport.periode.fin}`;
//     }
//   };

//   const calculateStats = () => {
//     const total = rapport.khassaidas.length;
//     const nouvelles = rapport.khassaidas.filter(k => k.type === 'nouvelle').length;
//     const revisions = rapport.khassaidas.filter(k => k.type === 'revision').length;
    
//     const evolution = Math.round(
//       rapport.khassaidas.reduce((sum, k) => {
//         const progression = calculateProgression(k);
//         return sum + progression.pourcentage;
//       }, 0) / rapport.khassaidas.length
//     );

//     return { total, nouvelles, revisions, evolution };
//   };

//   const stats = calculateStats();

//   return (
//     <div className="bg-white rounded-lg shadow-sm border">
//       <div className="p-6 border-b">
//         <h2 className="text-xl font-bold text-gray-900">Aperçu du Rapport</h2>
//         <p className="text-gray-600">Prévisualisation en temps réel</p>
//       </div>

//       <div className="p-6">
//         {/* Simulation du template */}
//         <div className="bg-gradient-to-r from-green-800 to-green-700 text-white p-8 rounded-lg text-center mb-6">
//           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-green-800 font-bold text-2xl mx-auto mb-4">
//             {rapport.logo}
//           </div>
//           <div className="text-sm uppercase tracking-wider opacity-90 mb-4">
//             {rapport.dahira}
//           </div>
//           <h1 className="text-3xl font-bold mb-2">RAPPORT DE RÉPÉTITION MENSUEL</h1>
//           <p className="text-lg opacity-90">
//             {getPeriodeDisplay()} • {rapport.kourel}
//           </p>
//         </div>

//         {/* Informations */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
//             <div className="text-xs text-gray-500 uppercase">Kourel</div>
//             <div className="font-semibold">{rapport.kourel}</div>
//           </div>
//           <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
//             <div className="text-xs text-gray-500 uppercase">Période</div>
//             <div className="font-semibold">{getPeriodeDisplay()}</div>
//           </div>
//           <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
//             <div className="text-xs text-gray-500 uppercase">Responsable</div>
//             <div className="font-semibold">{rapport.responsable.nom}</div>
//           </div>
//         </div>

//         {/* Statistiques */}
//         <div className="grid grid-cols-4 gap-4 mb-6">
//           <div className="bg-gray-50 p-6 rounded-lg text-center border-t-4 border-green-600">
//             <div className="text-2xl mb-2">🎵</div>
//             <div className="text-xs text-gray-500 uppercase mb-1">Total Khassaïdas</div>
//             <div className="text-2xl font-bold text-green-700">{stats.total}</div>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg text-center border-t-4 border-green-600">
//             <div className="text-2xl mb-2">🆕</div>
//             <div className="text-xs text-gray-500 uppercase mb-1">Nouvelles</div>
//             <div className="text-2xl font-bold text-green-700">{stats.nouvelles}</div>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg text-center border-t-4 border-green-600">
//             <div className="text-2xl mb-2">♻️</div>
//             <div className="text-xs text-gray-500 uppercase mb-1">Révisions</div>
//             <div className="text-2xl font-bold text-green-700">{stats.revisions}</div>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg text-center border-t-4 border-green-600">
//             <div className="text-2xl mb-2">📊</div>
//             <div className="text-xs text-gray-500 uppercase mb-1">Évolution Globale</div>
//             <div className="text-2xl font-bold text-green-700">{stats.evolution}%</div>
//           </div>
//         </div>

//         {/* Tableau des khassaïdas */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-4 border-b-2 border-green-600 pb-2">
//             📊 Détail des Khassaïdas
//           </h3>
          
//           <div className="overflow-hidden rounded-lg border">
//             <table className="min-w-full">
//               <thead className="bg-green-700 text-white">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase">N°</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase">Khassaïda / Mélodie</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase">Type</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase">Progression</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium uppercase">%</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {rapport.khassaidas.map((khassaida, index) => {
//                   const progression = calculateProgression(khassaida);
                  
//                   return (
//                     <tr key={khassaida.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                       <td className="px-4 py-3 font-semibold">{index + 1}</td>
//                       <td className="px-4 py-3">
//                         <div className="font-semibold">{khassaida.nom}</div>
//                         <div className="text-sm text-gray-500 italic">{khassaida.chanteur}</div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                           khassaida.type === 'nouvelle' 
//                             ? 'bg-blue-100 text-blue-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {khassaida.type === 'nouvelle' ? '🆕 Nouvelle' : '♻️ Révision'}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         {progression.type === 'pages' ? (
//                           <div>
//                             <div className="text-sm mb-1">{progression.texte}</div>
//                             <div className="w-full bg-gray-200 rounded-full h-2">
//                               <div 
//                                 className={`h-2 rounded-full ${getProgressBarClass(progression.pourcentage)}`}
//                                 style={{ width: `${progression.pourcentage}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                         ) : (
//                           <div>
//                             <div className="flex flex-wrap gap-2 mb-1">
//                               {progression.dadjs.map((dadj, i) => (
//                                 <span key={i} className="text-sm">
//                                   {dadj.numero}ème Dadj {getDadjIcon(dadj.evaluation)}
//                                 </span>
//                               ))}
//                             </div>
//                             <div className="text-sm font-semibold">
//                               Moyenne : {progression.pourcentage}%
//                             </div>
//                           </div>
//                         )}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`font-bold ${getPercentageClass(progression.pourcentage)}`}>
//                           {progression.pourcentage}%
//                         </span>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Appréciation */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-4 border-b-2 border-green-600 pb-2">
//             💬 Appréciation Générale
//           </h3>
//           <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-600">
//             <p className="text-gray-700 leading-relaxed">{rapport.appreciationGenerale}</p>
//           </div>
//         </div>

//         {/* Programme */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 border-b-2 border-green-600 pb-2">
//             📅 Programme du Mois Prochain
//           </h3>
//           <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
//             <ul className="space-y-2">
//               {rapport.programme.map((item, index) => (
//                 <li key={index} className="flex items-start">
//                   <span className="mr-3 mt-1">📌</span>
//                   <span className="text-gray-700">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Preview;

import React from 'react';

const Preview = ({ rapport }) => {
  const calculateProgression = (khassaida) => {
    if (khassaida.modeEvaluation === 'pages') {
      const pourcentage = Math.round((khassaida.pagesRealisees / khassaida.pagesTotal) * 100);
      return {
        type: 'pages',
        pourcentage,
        texte: `${khassaida.pagesRealisees} / ${khassaida.pagesTotal} pages`,
        termine: pourcentage === 100
      };
    } else {
      const pourcentage = Math.round(khassaida.dadjs.reduce((sum, d) => sum + d.note, 0) / khassaida.dadjs.length);
      return {
        type: 'dadj',
        pourcentage,
        dadjs: khassaida.dadjs,
        texte: `Moyenne : ${pourcentage}%`
      };
    }
  };

  const getProgressBarClass = (pourcentage) => {
    if (pourcentage >= 80) return 'bg-green-500';
    if (pourcentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPercentageClass = (pourcentage) => {
    if (pourcentage >= 80) return 'text-green-600 font-bold';
    if (pourcentage >= 50) return 'text-yellow-600 font-bold';
    return 'text-red-600 font-bold';
  };

  const getDadjIcon = (evaluation) => {
    switch (evaluation) {
      case 'maitrise': return '✅';
      case 'bon': return '🟢';
      case 'moyen': return '🟡';
      case 'faible': return '🔴';
      default: return '⚪';
    }
  };

  const getDadjText = (evaluation) => {
    switch (evaluation) {
      case 'maitrise': return 'Maîtrisé';
      case 'bon': return 'Bon';
      case 'moyen': return 'Moyen';
      case 'faible': return 'Faible';
      default: return 'Non évalué';
    }
  };

  const getPeriodeDisplay = () => {
    if (rapport.periode.type === 'mois') {
      return rapport.periode.mois;
    } else {
      return `${rapport.periode.debut} - ${rapport.periode.fin}`;
    }
  };

  const calculateStats = () => {
    const total = rapport.khassaidas.length;
    const nouvelles = rapport.khassaidas.filter(k => k.type === 'nouvelle').length;
    const revisions = rapport.khassaidas.filter(k => k.type === 'revision').length;
    
    const evolution = Math.round(
      rapport.khassaidas.reduce((sum, k) => {
        const progression = calculateProgression(k);
        return sum + progression.pourcentage;
      }, 0) / rapport.khassaidas.length
    );

    return { total, nouvelles, revisions, evolution };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white rounded-lg shadow-lg border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Aperçu du Rapport</h2>
        <p className="text-gray-600">Prévisualisation en temps réel</p>
      </div>

      <div className="p-8">
        {/* EN-TÊTE AVEC GRADIENT COMME VOTRE TEMPLATE */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-12 rounded-2xl text-center mb-8 shadow-2xl">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary font-bold text-4xl mx-auto mb-6 shadow-lg overflow-hidden">
            {rapport.logoType === 'image' && rapport.logoImage ? (
              <img 
                src={rapport.logoImage} 
                alt="Logo Dahira" 
                className="w-full h-full object-contain"
              />
            ) : (
              <span>{rapport.logo || 'DMN'}</span>
            )}
          </div>
          <div className="text-sm uppercase tracking-widest opacity-90 mb-4 font-light">
            {rapport.dahira}
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            RAPPORT DE RÉPÉTITION MENSUEL
          </h1>
          <p className="text-xl opacity-90 font-light">
            {getPeriodeDisplay()} • {rapport.kourel}
          </p>
        </div>

        {/* INFORMATIONS GÉNÉRALES */}
        {rapport.sectionsConfig?.informations !== false && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600 shadow-sm">
            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Kourel</div>
            <div className="font-bold text-gray-900 text-lg">{rapport.kourel}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600 shadow-sm">
            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Période</div>
            <div className="font-bold text-gray-900 text-lg">{getPeriodeDisplay()}</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-green-600 shadow-sm">
            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Responsable</div>
            <div className="font-bold text-gray-900 text-lg">{rapport.responsable.nom}</div>
          </div>
        </div>
        )}

        {/* STATISTIQUES */}
        {rapport.sectionsConfig?.statistiques !== false && (
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 p-8 rounded-2xl text-center border-t-4 border-green-600 shadow-sm">
            <div className="text-3xl mb-3">🎵</div>
            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Total Khassaïdas</div>
            <div className="text-3xl font-bold text-green-700">{stats.total}</div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl text-center border-t-4 border-green-600 shadow-sm">
            <div className="text-3xl mb-3">🆕</div>
            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Nouvelles Khassaïdas</div>
            <div className="text-3xl font-bold text-green-700">{stats.nouvelles}</div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl text-center border-t-4 border-green-600 shadow-sm">
            <div className="text-3xl mb-3">♻️</div>
            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Révisions Khassaïdas</div>
            <div className="text-3xl font-bold text-green-700">{stats.revisions}</div>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl text-center border-t-4 border-green-600 shadow-sm">
            <div className="text-3xl mb-3">📊</div>
            <div className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Évolution Globale</div>
            <div className="text-3xl font-bold text-green-700">{stats.evolution}%</div>
          </div>
        </div>
        )}

        {/* TABLEAU DES KHASSAÏDAS */}
        {rapport.sectionsConfig?.tableau !== false && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-600">
            📊 Détail des Khassaïdas
          </h3>
          
          <div className="overflow-hidden rounded-xl shadow-lg border">
            <table className="min-w-full">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">N°</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Khassaïda / Mélodie</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Progression</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rapport.khassaidas.map((khassaida, index) => {
                  const progression = calculateProgression(khassaida);
                  
                  return (
                    <tr key={khassaida.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                      <td className="px-6 py-4">
                        <span className="font-bold text-lg">{index + 1}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 text-base">{khassaida.nom}</div>
                        <div className="text-sm text-gray-600 italic mt-1">{khassaida.chanteur}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          khassaida.type === 'nouvelle' 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {khassaida.type === 'nouvelle' ? '🆕 Nouvelle' : '♻️ Révision'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {progression.type === 'pages' ? (
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700">
                              {progression.termine ? '✅ Terminé' : progression.texte}
                            </div>
                            {!progression.termine && (
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full ${getProgressBarClass(progression.pourcentage)}`}
                                  style={{ width: `${progression.pourcentage}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-3">
                              {progression.dadjs.map((dadj, i) => (
                                <div key={i} className="flex items-center space-x-1">
                                  <span className="text-xs font-medium text-gray-600">
                                    {dadj.numero}ère Dadj
                                  </span>
                                  <span className="text-sm" title={getDadjText(dadj.evaluation)}>
                                    {getDadjIcon(dadj.evaluation)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="text-sm font-semibold text-gray-700">
                              {progression.texte}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-lg ${getPercentageClass(progression.pourcentage)}`}>
                          {progression.pourcentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* APPRÉCIATION GÉNÉRALE */}
        {rapport.sectionsConfig?.appreciation !== false && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-600">
            💬 Appréciation Générale
          </h3>
          <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-green-600 shadow-sm">
            <p className="text-gray-700 leading-relaxed text-lg">{rapport.appreciationGenerale}</p>
            
            {/* Commentaires par Khassaïda */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">📝 Commentaires par Khassaïda</h4>
              <div className="space-y-4">
                {rapport.khassaidas.map((khassaida, index) => {
                  const progression = calculateProgression(khassaida);
                  const getAppreciationIcon = (pourcentage) => {
                    if (pourcentage >= 80) return '✅';
                    if (pourcentage >= 50) return '🟡';
                    return '🔴';
                  };
                  const icon = getAppreciationIcon(progression.pourcentage);
                  
                  return (
                    <div key={khassaida.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        {index + 1}️⃣ {khassaida.nom} ({khassaida.chanteur}) - {progression.pourcentage}% {icon}
                      </h5>
                      <p className="text-gray-700">{khassaida.commentaire}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* PROGRAMME */}
        {rapport.sectionsConfig?.programme !== false && (
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-green-600">
            📅 Programme du Mois Prochain
          </h3>
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-8 rounded-xl border border-green-200 shadow-sm">
            <ul className="space-y-3">
              {rapport.programme.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-4 mt-1 text-green-600 text-lg">📌</span>
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Preview;