// import html2pdf from 'html2pdf.js';

// export const exportToPDF = (rapport) => {
//   // Générer le HTML du template basé sur votre code original
//   const htmlContent = generateHTMLTemplate(rapport);
  
//   // Créer un élément temporaire
//   const element = document.createElement('div');
//   element.innerHTML = htmlContent;
  
//   // Options pour le PDF
//   const opt = {
//     margin: 10,
//     filename: `rapport-${rapport.periode.mois || 'export'}.pdf`,
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//   };

//   // Générer le PDF
//   html2pdf().set(opt).from(element).save();
// };

// const generateHTMLTemplate = (rapport) => {
//   // Ici vous mettez votre template HTML/CSS complet
//   // C'est une version adaptée de votre code original
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <style>
//             /* Votre CSS complet ici */
//             ${getCSSTemplate()}
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <!-- En-tête -->
//             <div class="header">
//                 <div class="logo">${rapport.logo}</div>
//                 <div class="org-name">${rapport.dahira}</div>
//                 <h1 class="main-title">RAPPORT DE RÉPÉTITION MENSUEL</h1>
//                 <p class="subtitle">${getPeriodeDisplay(rapport.periode)} • ${rapport.kourel}</p>
//             </div>

//             <!-- Informations -->
//             <div class="info-section">
//                 <div class="info-grid">
//                     <div class="info-card">
//                         <div class="info-label">Kourel</div>
//                         <div class="info-value">${rapport.kourel}</div>
//                     </div>
//                     <div class="info-card">
//                         <div class="info-label">Période</div>
//                         <div class="info-value">${getPeriodeDisplay(rapport.periode)}</div>
//                     </div>
//                     <div class="info-card">
//                         <div class="info-label">Responsable</div>
//                         <div class="info-value">${rapport.responsable.nom}</div>
//                     </div>
//                 </div>
//             </div>

//             <!-- Statistiques -->
//             <div class="stats-section">
//                 <div class="stats-grid">
//                     ${generateStats(rapport)}
//                 </div>
//             </div>

//             <!-- Tableau des Khassaïdas -->
//             <div class="table-section">
//                 <h2 class="section-title">📊 Détail des Khassaïdas</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>N°</th>
//                             <th>Khassaïda / Mélodie</th>
//                             <th>Type</th>
//                             <th>Progression</th>
//                             <th>%</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${generateKhassaidasTable(rapport.khassaidas)}
//                     </tbody>
//                 </table>
//             </div>

//             <!-- Appréciation -->
//             <div class="appreciation-section">
//                 <h2 class="section-title">💬 Appréciation Générale</h2>
//                 <div class="appreciation-box">
//                     ${generateAppreciation(rapport)}
//                 </div>
//             </div>

//             <!-- Programme -->
//             <div class="program-section">
//                 <h2 class="section-title">📅 Programme du Mois Prochain</h2>
//                 <div class="program-box">
//                     <ul class="program-list">
//                         ${rapport.programme.map(item => `<li>${item}</li>`).join('')}
//                     </ul>
//                 </div>
//             </div>

//             <!-- Footer -->
//             <div class="footer">
//                 <div class="footer-content">
//                     <div>
//                         <div class="responsible-name">${rapport.responsable.nom}</div>
//                         <div class="responsible-title">${rapport.responsable.titre}</div>
//                     </div>
//                     <div class="org-footer">
//                         ${rapport.dahira}<br>
//                         Rapport officiel • ${getPeriodeDisplay(rapport.periode)}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </body>
//     </html>
//   `;
// };

// // Fonctions utilitaires pour générer le contenu dynamique
// const getPeriodeDisplay = (periode) => {
//   if (periode.type === 'mois') {
//     return periode.mois;
//   } else {
//     return `${formatDate(periode.debut)} - ${formatDate(periode.fin)}`;
//   }
// };

// const formatDate = (dateString) => {
//   if (!dateString) return '';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('fr-FR');
// };

// const generateStats = (rapport) => {
//   const total = rapport.khassaidas.length;
//   const nouvelles = rapport.khassaidas.filter(k => k.type === 'nouvelle').length;
//   const revisions = rapport.khassaidas.filter(k => k.type === 'revision').length;
//   const evolution = calculateEvolutionMoyenne(rapport.khassaidas);

//   return `
//     <div class="stat-card">
//         <div class="stat-icon">🎵</div>
//         <div class="stat-label">Total Khassaïdas</div>
//         <div class="stat-value">${total}</div>
//     </div>
//     <div class="stat-card">
//         <div class="stat-icon">🆕</div>
//         <div class="stat-label">Nouvelles Khassaïdas</div>
//         <div class="stat-value">${nouvelles}</div>
//     </div>
//     <div class="stat-card">
//         <div class="stat-icon">♻️</div>
//         <div class="stat-label">Révisions Khassaïdas</div>
//         <div class="stat-value">${revisions}</div>
//     </div>
//     <div class="stat-card">
//         <div class="stat-icon">📊</div>
//         <div class="stat-label">Évolution Globale</div>
//         <div class="stat-value">${evolution}%</div>
//     </div>
//   `;
// };

// const calculateEvolutionMoyenne = (khassaidas) => {
//   const pourcentages = khassaidas.map(k => {
//     if (k.modeEvaluation === 'pages') {
//       return Math.round((k.pagesRealisees / k.pagesTotal) * 100);
//     } else {
//       const moyenne = k.dadjs.reduce((sum, d) => sum + d.note, 0) / k.dadjs.length;
//       return Math.round(moyenne);
//     }
//   });
  
//   const moyenneGlobale = pourcentages.reduce((sum, p) => sum + p, 0) / pourcentages.length;
//   return Math.round(moyenneGlobale);
// };

// const generateKhassaidasTable = (khassaidas) => {
//   return khassaidas.map((khassaida, index) => {
//     const progression = calculateProgression(khassaida);
//     return `
//       <tr>
//         <td><strong>${index + 1}</strong></td>
//         <td>
//             <div class="khassaida-name">${khassaida.nom}</div>
//             <div class="melodie-name">${khassaida.chanteur}</div>
//         </td>
//         <td>
//             <span class="type-badge ${khassaida.type === 'nouvelle' ? 'type-new' : 'type-revision'}">
//                 ${khassaida.type === 'nouvelle' ? '🆕 Nouvelle' : '♻️ Révision'}
//             </span>
//         </td>
//         <td>
//             ${generateProgressionContent(khassaida, progression)}
//         </td>
//         <td>
//             <span class="percentage ${getPercentageClass(progression.pourcentage)}">
//                 ${progression.pourcentage}%
//             </span>
//         </td>
//       </tr>
//     `;
//   }).join('');
// };

// const calculateProgression = (khassaida) => {
//   if (khassaida.modeEvaluation === 'pages') {
//     const pourcentage = Math.round((khassaida.pagesRealisees / khassaida.pagesTotal) * 100);
//     return {
//       type: 'pages',
//       pourcentage,
//       texte: `${khassaida.pagesRealisees} / ${khassaida.pagesTotal} pages`
//     };
//   } else {
//     const pourcentage = Math.round(khassaida.dadjs.reduce((sum, d) => sum + d.note, 0) / khassaida.dadjs.length);
//     return {
//       type: 'dadj',
//       pourcentage,
//       dadjs: khassaida.dadjs
//     };
//   }
// };

// const generateProgressionContent = (khassaida, progression) => {
//   if (progression.type === 'pages') {
//     const width = progression.pourcentage + '%';
//     const progressClass = getProgressBarClass(progression.pourcentage);
    
//     return `
//       <div class="progress-info">${progression.texte}</div>
//       <div class="progress-bar-container">
//         <div class="progress-bar ${progressClass}" style="width: ${width};"></div>
//       </div>
//     `;
//   } else {
//     const dadjIcons = progression.dadjs.map(dadj => {
//       const icon = getDadjIcon(dadj.evaluation);
//       return `<div class="dadj-item">${dadj.numero}ème Dadj ${icon}</div>`;
//     }).join('');
    
//     return `
//       <div class="dadj-list">
//         ${dadjIcons}
//         <div style="margin-top: 5px; font-weight: 600;">Moyenne : ${progression.pourcentage}%</div>
//       </div>
//     `;
//   }
// };

// const getDadjIcon = (evaluation) => {
//   switch (evaluation) {
//     case 'maitrise': return '✅';
//     case 'bon': return '🟢';
//     case 'moyen': return '🟡';
//     case 'faible': return '🔴';
//     default: return '⚪';
//   }
// };

// const getProgressBarClass = (pourcentage) => {
//   if (pourcentage >= 80) return 'progress-high';
//   if (pourcentage >= 50) return 'progress-medium';
//   return 'progress-low';
// };

// const getPercentageClass = (pourcentage) => {
//   if (pourcentage >= 80) return 'perc-high';
//   if (pourcentage >= 50) return 'perc-medium';
//   return 'perc-low';
// };

// const generateAppreciation = (rapport) => {
//   return `
//     <p>${rapport.appreciationGenerale}</p>
    
//     <h3>📝 Commentaires par Khassaïda</h3>
    
//     ${rapport.khassaidas.map((khassaida, index) => {
//       const progression = calculateProgression(khassaida);
//       const icon = getAppreciationIcon(progression.pourcentage);
      
//       return `
//         <div class="khassaida-comment">
//           <h4>${index + 1}️⃣ ${khassaida.nom} (${khassaida.chanteur}) - ${progression.pourcentage}% ${icon}</h4>
//           <p>${khassaida.commentaire}</p>
//         </div>
//       `;
//     }).join('')}
//   `;
// };

// const getAppreciationIcon = (pourcentage) => {
//   if (pourcentage >= 80) return '✅';
//   if (pourcentage >= 50) return '🟡';
//   return '🔴';
// };

// const getCSSTemplate = () => {
//   // Retourne votre CSS complet du template original
//   return `
//     * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//     }

//     body {
//         font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         background: #f5f5f5;
//         padding: 20px;
//     }

//     .container {
//         max-width: 1200px;
//         margin: 0 auto;
//         background: white;
//         box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//     }

//     /* ... Votre CSS complet ... */
//   `;
// };


import html2pdf from 'html2pdf.js';

export const exportToPDF = (rapport) => {
  // Générer le HTML du template avec les styles INLINE
  const htmlContent = generateHTMLTemplate(rapport);
  
  // Créer un élément temporaire
  const element = document.createElement('div');
  element.innerHTML = htmlContent;
  
  // Options pour le PDF
  const opt = {
    margin: 10,
    filename: `rapport-${rapport.periode.mois || 'export'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };

  // Générer le PDF
  html2pdf().set(opt).from(element).save();
};

const generateHTMLTemplate = (rapport) => {
  const sectionsConfig = rapport.sectionsConfig || {};
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            ${getCSSTemplate()}
        </style>
    </head>
    <body>
        <div class="container">
            <!-- En-tête -->
            <div class="header">
                <div class="logo">${rapport.logo}</div>
                <div class="org-name">${rapport.dahira}</div>
                <h1 class="main-title">RAPPORT DE RÉPÉTITION MENSUEL</h1>
                <p class="subtitle">${getPeriodeDisplay(rapport.periode)} • ${rapport.kourel}</p>
            </div>

            ${sectionsConfig.informations !== false ? `
            <!-- Informations -->
            <div class="info-section">
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Kourel</div>
                        <div class="info-value">${rapport.kourel}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Période</div>
                        <div class="info-value">${getPeriodeDisplay(rapport.periode)}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Responsable</div>
                        <div class="info-value">${rapport.responsable.nom}</div>
                    </div>
                </div>
            </div>
            ` : ''}

            ${sectionsConfig.statistiques !== false ? `
            <!-- Statistiques -->
            <div class="stats-section">
                <div class="stats-grid">
                    ${generateStats(rapport)}
                </div>
            </div>
            ` : ''}

            ${sectionsConfig.tableau !== false ? `
            <!-- Tableau des Khassaïdas -->
            <div class="table-section">
                <h2 class="section-title">📊 Détail des Khassaïdas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Khassaïda / Mélodie</th>
                            <th>Type</th>
                            <th>Progression</th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateKhassaidasTable(rapport.khassaidas)}
                    </tbody>
                </table>
            </div>
            ` : ''}

            ${sectionsConfig.appreciation !== false ? `
            <!-- Appréciation -->
            <div class="appreciation-section">
                <h2 class="section-title">💬 Appréciation Générale</h2>
                <div class="appreciation-box">
                    ${generateAppreciation(rapport)}
                </div>
            </div>
            ` : ''}

            ${sectionsConfig.programme !== false ? `
            <!-- Programme -->
            <div class="program-section">
                <h2 class="section-title">📅 Programme du Mois Prochain</h2>
                <div class="program-box">
                    <ul class="program-list">
                        ${rapport.programme.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            ` : ''}
        </div>
    </body>
    </html>
  `;
};

const getPeriodeDisplay = (periode) => {
  if (periode.type === 'mois') {
    return periode.mois;
  } else {
    return `${formatDate(periode.debut)} - ${formatDate(periode.fin)}`;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

const generateStats = (rapport) => {
  const total = rapport.khassaidas.length;
  const nouvelles = rapport.khassaidas.filter(k => k.type === 'nouvelle').length;
  const revisions = rapport.khassaidas.filter(k => k.type === 'revision').length;
  const evolution = calculateEvolutionMoyenne(rapport.khassaidas);

  return `
    <div class="stat-card">
        <div class="stat-icon">🎵</div>
        <div class="stat-label">Total Khassaïdas</div>
        <div class="stat-value">${total}</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">🆕</div>
        <div class="stat-label">Nouvelles Khassaïdas</div>
        <div class="stat-value">${nouvelles}</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">♻️</div>
        <div class="stat-label">Révisions Khassaïdas</div>
        <div class="stat-value">${revisions}</div>
    </div>
    <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-label">Évolution Globale</div>
        <div class="stat-value">${evolution}%</div>
    </div>
  `;
};

const calculateEvolutionMoyenne = (khassaidas) => {
  const pourcentages = khassaidas.map(k => {
    if (k.modeEvaluation === 'pages') {
      return Math.round((k.pagesRealisees / k.pagesTotal) * 100);
    } else {
      const moyenne = k.dadjs.reduce((sum, d) => sum + d.note, 0) / k.dadjs.length;
      return Math.round(moyenne);
    }
  });
  
  const moyenneGlobale = pourcentages.reduce((sum, p) => sum + p, 0) / pourcentages.length;
  return Math.round(moyenneGlobale);
};

const generateKhassaidasTable = (khassaidas) => {
  return khassaidas.map((khassaida, index) => {
    const progression = calculateProgression(khassaida);
    return `
      <tr>
        <td><strong>${index + 1}</strong></td>
        <td>
            <div class="khassaida-name">${khassaida.nom}</div>
            <div class="melodie-name">${khassaida.chanteur}</div>
        </td>
        <td>
            <span class="type-badge ${khassaida.type === 'nouvelle' ? 'type-new' : 'type-revision'}">
                ${khassaida.type === 'nouvelle' ? '🆕 Nouvelle' : '♻️ Révision'}
            </span>
        </td>
        <td>
            ${generateProgressionContent(khassaida, progression)}
        </td>
        <td>
            <span class="percentage ${getPercentageClass(progression.pourcentage)}">
                ${progression.pourcentage}%
            </span>
        </td>
      </tr>
    `;
  }).join('');
};

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
      dadjs: khassaida.dadjs
    };
  }
};

const generateProgressionContent = (khassaida, progression) => {
  if (progression.type === 'pages') {
    if (progression.termine) {
      return `<div class="progress-info">✅ Terminé</div>`;
    } else {
      const width = progression.pourcentage + '%';
      const progressClass = getProgressBarClass(progression.pourcentage);
      
      return `
        <div class="progress-info">${progression.texte}</div>
        <div class="progress-bar-container">
          <div class="progress-bar ${progressClass}" style="width: ${width};"></div>
        </div>
      `;
    }
  } else {
    const dadjIcons = progression.dadjs.map(dadj => {
      const icon = getDadjIcon(dadj.evaluation);
      return `<div class="dadj-item">${dadj.numero}ème Dadj ${icon}</div>`;
    }).join('');
    
    return `
      <div class="dadj-list">
        ${dadjIcons}
        <div style="margin-top: 5px; font-weight: 600;">Moyenne : ${progression.pourcentage}%</div>
      </div>
    `;
  }
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

const getProgressBarClass = (pourcentage) => {
  if (pourcentage >= 80) return 'progress-high';
  if (pourcentage >= 50) return 'progress-medium';
  return 'progress-low';
};

const getPercentageClass = (pourcentage) => {
  if (pourcentage >= 80) return 'perc-high';
  if (pourcentage >= 50) return 'perc-medium';
  return 'perc-low';
};

const generateAppreciation = (rapport) => {
  return `
    <p>${rapport.appreciationGenerale}</p>
    
    <h3>📝 Commentaires par Khassaïda</h3>
    
    ${rapport.khassaidas.map((khassaida, index) => {
      const progression = calculateProgression(khassaida);
      const icon = getAppreciationIcon(progression.pourcentage);
      
      return `
        <div class="khassaida-comment">
          <h4>${index + 1}️⃣ ${khassaida.nom} (${khassaida.chanteur}) - ${progression.pourcentage}% ${icon}</h4>
          <p>${khassaida.commentaire}</p>
        </div>
      `;
    }).join('')}
  `;
};

const getAppreciationIcon = (pourcentage) => {
  if (pourcentage >= 80) return '✅';
  if (pourcentage >= 50) return '🟡';
  return '🔴';
};

const getCSSTemplate = () => {
  return `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: #f5f5f5;
        padding: 20px;
        color: #333;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        background: white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }

    /* En-tête */
    .header {
        background: linear-gradient(135deg, #006633 0%, #004d26 100%);
        color: white;
        padding: 40px;
        text-align: center;
    }

    .logo {
        width: 70px;
        height: 70px;
        background: white;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: bold;
        color: #006633;
        margin-bottom: 20px;
    }

    .org-name {
        font-size: 13px;
        letter-spacing: 2px;
        margin-bottom: 20px;
        opacity: 0.9;
        text-transform: uppercase;
    }

    .main-title {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .subtitle {
        font-size: 20px;
        opacity: 0.9;
    }

    /* Informations */
    .info-section {
        padding: 30px 40px;
        background: #f8f9fa;
        border-bottom: 3px solid #006633;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    .info-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        border-left: 4px solid #006633;
    }

    .info-label {
        font-size: 12px;
        color: #6c757d;
        text-transform: uppercase;
        margin-bottom: 5px;
    }

    .info-value {
        font-size: 18px;
        color: #212529;
        font-weight: 600;
    }

    /* Statistiques */
    .stats-section {
        padding: 40px;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 30px;
    }

    .stat-card {
        background: #f8f9fa;
        padding: 25px;
        border-radius: 10px;
        text-align: center;
        border-top: 4px solid #006633;
    }

    .stat-icon {
        font-size: 28px;
        margin-bottom: 10px;
    }

    .stat-label {
        font-size: 12px;
        color: #6c757d;
        text-transform: uppercase;
        margin-bottom: 8px;
    }

    .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: #006633;
    }

    /* Tableau */
    .table-section {
        padding: 0 40px 40px;
    }

    .section-title {
        font-size: 22px;
        color: #212529;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 3px solid #006633;
        font-weight: 600;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
    }

    thead {
        background: #006633;
        color: white;
    }

    th {
        padding: 15px;
        text-align: left;
        font-weight: 600;
        font-size: 13px;
        text-transform: uppercase;
    }

    td {
        padding: 15px;
        border-bottom: 1px solid #e9ecef;
    }

    tbody tr:nth-child(even) {
        background: #f8f9fa;
    }

    tbody tr:hover {
        background: #e9ecef;
    }

    .khassaida-name {
        font-weight: 600;
        color: #212529;
        font-size: 15px;
    }

    .melodie-name {
        font-size: 13px;
        color: #6c757d;
        font-style: italic;
        margin-top: 3px;
    }

    .type-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
    }

    .type-new {
        background: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
    }

    .type-revision {
        background: #fff3cd;
        color: #856404;
        border: 1px solid #ffeaa7;
    }

    /* Progression */
    .progress-info {
        font-size: 14px;
        color: #495057;
        margin-bottom: 8px;
    }

    .progress-bar-container {
        width: 100%;
        height: 8px;
        background: #e9ecef;
        border-radius: 10px;
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        border-radius: 10px;
    }

    .progress-high {
        background: #28a745;
    }

    .progress-medium {
        background: #ffc107;
    }

    .progress-low {
        background: #dc3545;
    }

    .dadj-list {
        font-size: 13px;
        line-height: 1.8;
    }

    .dadj-item {
        display: inline-block;
        margin-right: 8px;
    }

    .percentage {
        font-weight: 700;
        font-size: 16px;
    }

    .perc-high { color: #28a745; }
    .perc-medium { color: #ffc107; }
    .perc-low { color: #dc3545; }

    /* Appréciation */
    .appreciation-section {
        padding: 0 40px 40px;
    }

    .appreciation-box {
        background: #f8f9fa;
        padding: 30px;
        border-radius: 10px;
        border-left: 5px solid #006633;
        line-height: 1.8;
    }

    .appreciation-box h3 {
        color: #006633;
        margin-bottom: 20px;
        font-size: 18px;
    }

    .appreciation-box p {
        margin-bottom: 15px;
        color: #495057;
    }

    .khassaida-comment {
        background: white;
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 8px;
        border-left: 3px solid #006633;
    }

    .khassaida-comment h4 {
        color: #212529;
        margin-bottom: 8px;
        font-size: 15px;
    }

    .khassaida-comment p {
        font-size: 14px;
        margin: 0;
    }

    .conclusion-list {
        list-style: none;
        padding: 0;
    }

    .conclusion-list li {
        padding: 8px 0;
        padding-left: 25px;
        position: relative;
    }

    .conclusion-list li::before {
        content: '●';
        position: absolute;
        left: 5px;
        color: #006633;
    }

    /* Programme */
    .program-section {
        padding: 0 40px 40px;
    }

    .program-box {
        background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
        padding: 30px;
        border-radius: 10px;
    }

    .program-box h3 {
        color: #006633;
        margin-bottom: 20px;
        font-size: 18px;
    }

    .program-list {
        list-style: none;
        padding: 0;
    }

    .program-list li {
        padding: 10px 0;
        padding-left: 30px;
        position: relative;
        color: #2d5016;
    }

    .program-list li::before {
        content: '📌';
        position: absolute;
        left: 0;
    }

    /* Footer */
    .footer {
        background: #212529;
        color: white;
        padding: 30px 40px;
        text-align: center;
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .responsible-name {
        font-size: 16px;
        font-weight: 600;
    }

    .responsible-title {
        font-size: 12px;
        opacity: 0.8;
        text-transform: uppercase;
    }

    .org-footer {
        text-align: right;
        opacity: 0.7;
        font-size: 13px;
    }

    @media print {
        body {
            background: white;
            padding: 0;
        }
        .container {
            box-shadow: none;
        }
    }
  `;
};