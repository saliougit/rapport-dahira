export const defaultRapport = {
  dahira: "Dahira Madjmahoun Noreyni UCAD",
  logo: "DMN",
  logoImage: null, // URL ou base64 de l'image du logo
  logoType: "text", // "text" ou "image"
  kourel: "Kourel 1 National",
  periode: {
    type: "mois",
    mois: "Septembre 2025",
    debut: "",
    fin: ""
  },
  responsable: {
    nom: "Elhadji Ndiaye",
    titre: "Responsable Pôle Kourel 1 National DMN"
  },
  
  // Configuration des couleurs
  couleurs: {
    primaire: "#006633",
    secondaire: "#004d26"
  },
  
  // Configuration pour activer/désactiver les sections
  sectionsConfig: {
    informations: true,
    statistiques: true,
    tableau: true,
    appreciation: true,
    programme: true
  },
  khassaidas: [
    {
      id: "1",
      nom: "Hamat Souleymà",
      chanteur: "Serigne Moustapha Diop",
      type: "nouvelle",
      modeEvaluation: "pages",
      pagesTotal: 25,
      pagesRealisees: 17,
      commentaire: "Bon rythme de progression. Il reste 8 pages à finaliser."
    },
    {
      id: "2",
      nom: "Matlabou Fawzeyni",
      chanteur: "Serigne Tafsir Diop",
      type: "nouvelle",
      modeEvaluation: "pages",
      pagesTotal: 25,
      pagesRealisees: 25,
      commentaire: "Excellent travail ! La khassaïda est totalement maîtrisée."
    },
    {
      id: "3",
      nom: "Révision Karamna",
      chanteur: "Serigne Aladji Cisse",
      type: "revision",
      modeEvaluation: "dadj",
      dadjs: [
        { numero: 1, evaluation: "maitrise", note: 100 },
        { numero: 2, evaluation: "bon", note: 80 }
      ],
      commentaire: "Révision très satisfaisante."
    },
    {
      id: "4",
      nom: "Révision Mawahibou S. Mahib",
      chanteur: "Serigne Mbaye Sy",
      type: "revision",
      modeEvaluation: "dadj",
      dadjs: [
        { numero: 1, evaluation: "maitrise", note: 100 },
        { numero: 2, evaluation: "moyen", note: 60 },
        { numero: 3, evaluation: "faible", note: 20 }
      ],
      commentaire: "Situation contrastée nécessitant un renforcement."
    }
  ],
  appreciationGenerale: "Le travail réalisé jusqu'à présent montre une bonne dynamique globale, avec une khassaïda totalement achevée : Matlabou Fawzeyni. Cela témoigne d'un engagement sérieux de la part des membres impliqués.",
  programme: [
    "Finaliser les 8 pages restantes de Hamat Souleymà",
    "Intensifier le travail sur le 2ème Dadj de Mawahibou S. Mahib",
    "Reprendre entièrement le 3ème Dadj de Mawahibou S. Mahib",
    "Organisation d'une session de révision collective hebdomadaire",
    "Renforcement de l'équipe avec 2 membres supplémentaires"
  ],
  couleurs: {
    primaire: "#006633",
    secondaire: "#ffffff"
  }
};