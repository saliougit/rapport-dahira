import * as XLSX from 'xlsx';

export const exportToExcel = (rapport) => {
  // Préparer les données pour Excel
  const data = prepareExcelData(rapport);
  
  // Créer un nouveau classeur
  const wb = XLSX.utils.book_new();
  
  // Feuille des statistiques générales
  const wsStats = XLSX.utils.json_to_sheet(data.stats);
  XLSX.utils.book_append_sheet(wb, wsStats, "Statistiques");
  
  // Feuille des khassaïdas détaillées
  const wsDetails = XLSX.utils.json_to_sheet(data.khassaidas);
  XLSX.utils.book_append_sheet(wb, wsDetails, "Khassaïdas Détail");
  
  // Générer le fichier Excel
  XLSX.writeFile(wb, `rapport-${rapport.periode.mois || 'export'}.xlsx`);
};

const prepareExcelData = (rapport) => {
  // Statistiques générales
  const stats = [
    { Catégorie: 'Dahira', Valeur: rapport.dahira },
    { Catégorie: 'Kourel', Valeur: rapport.kourel },
    { Catégorie: 'Période', Valeur: getPeriodeDisplay(rapport.periode) },
    { Catégorie: 'Responsable', Valeur: rapport.responsable.nom },
    { Catégorie: 'Total Khassaïdas', Valeur: rapport.khassaidas.length },
    { Catégorie: 'Nouvelles', Valeur: rapport.khassaidas.filter(k => k.type === 'nouvelle').length },
    { Catégorie: 'Révisions', Valeur: rapport.khassaidas.filter(k => k.type === 'revision').length },
    { Catégorie: 'Évolution Globale', Valeur: `${calculateEvolutionMoyenne(rapport.khassaidas)}%` }
  ];

  // Détail des khassaïdas
  const khassaidas = rapport.khassaidas.map((k, index) => {
    const progression = calculateProgression(k);
    return {
      'N°': index + 1,
      'Khassaïda': k.nom,
      'Chanteur': k.chanteur,
      'Type': k.type === 'nouvelle' ? 'Nouvelle' : 'Révision',
      'Mode Évaluation': k.modeEvaluation === 'pages' ? 'Par Pages' : 'Par Dadj',
      'Progression': progression.pourcentage + '%',
      'Détail Progression': progression.type === 'pages' 
        ? `${k.pagesRealisees}/${k.pagesTotal} pages`
        : k.dadjs.map(d => `${d.numero}ème: ${d.note}%`).join(', '),
      'Commentaire': k.commentaire
    };
  });

  return { stats, khassaidas };
};

// Réutiliser les fonctions utilitaires de exportPdf.js
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

const calculateProgression = (khassaida) => {
  if (khassaida.modeEvaluation === 'pages') {
    const pourcentage = Math.round((khassaida.pagesRealisees / khassaida.pagesTotal) * 100);
    return {
      type: 'pages',
      pourcentage,
      texte: `${khassaida.pagesRealisees} / ${khassaida.pagesTotal} pages`
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