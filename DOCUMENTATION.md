# 📚 Documentation - Générateur de Rapports Dahira

## 🎯 Aperçu

Cette application permet de créer et générer des rapports mensuels de répétition pour les Dahiras. Elle offre une interface intuitive pour saisir les informations, gérer les Khassaïdas, et exporter en PDF.

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📋 Guide d'Utilisation

### 1. **Informations Générales**

#### Logo du Dahira
- **Champ texte simple** pour saisir le logo (ex: "DMN", "DMS", etc.)
- **Valeur par défaut** : "DMN"
- **Affichage** : Cercle blanc avec texte centré dans l'en-tête

#### Données de base
- **Kourel** : Nom du kourel (ex: "Kourel 1 National")
- **Type de période** : 
  - *Mois* : Sélection simple (ex: "Septembre 2025")
  - *Période spécifique* : Dates de début et fin
- **Responsable** : Nom et titre du responsable
- **Nom du Dahira** : Organisation complète

### 2. **Gestion des Khassaïdas**

#### Ajout d'une Khassaïda
1. Cliquez sur **"+ Ajouter"** dans la section Khassaïdas
2. Remplissez le formulaire :
   - **Nom** : Nom de la Khassaïda
   - **Chanteur/Mélodie** : Artiste de référence
   - **Type** : Nouvelle ou Révision
   - **Mode d'évaluation** :
     - *Pages* : Progression par pages (ex: 17/25 pages)
     - *Dadj* : Évaluation par dadj avec notes
   - **Commentaire** : Observations libres

#### Modes d'Évaluation

**Mode Pages :**
- Pages totales et pages réalisées
- Calcul automatique du pourcentage
- Barre de progression visuelle

**Mode Dadj :**
- Évaluation par dadj (1, 2, 3...)
- Notes de 0 à 100 pour chaque dadj
- Types d'évaluation : Maîtrise, Bon, Moyen, Faible
- Calcul automatique de la moyenne

#### Gestion
- **✏️ Modifier** : Éditer une Khassaïda existante
- **🗑️ Supprimer** : Retirer une Khassaïda
- **Glisser-déposer** : Réorganiser l'ordre

### 3. **Appréciation**

#### Appréciation Générale
- **Textarea libre** pour l'appréciation globale du mois
- **Placeholder** : Guide pour la saisie

#### Commentaires par Khassaïda
1. Cliquez sur **"+ Ajouter Commentaire"**
2. **Modal** s'ouvre avec :
   - **Liste déroulante** : Sélection de la Khassaïda
   - **Textarea** : Saisie du commentaire spécifique
3. **Gestion** :
   - **✏️ Modifier** : Éditer un commentaire existant
   - **✕ Supprimer** : Retirer un commentaire

### 4. **Programme du Mois Prochain**

#### Ajout de points
1. Cliquez sur **"+ Ajouter Point"**
2. **Modal** s'ouvre avec textarea
3. Saisissez le point du programme
4. **Affichage** avec puce 📌

#### Gestion
- **✏️ Modifier** : Éditer un point existant
- **✕ Supprimer** : Retirer un point
- **Liste organisée** avec puces visuelles

### 5. **Configuration des Sections**

#### Sections activables/désactivables
- ✅ **Informations** : Données de base
- ✅ **Statistiques** : Résumé chiffré
- ✅ **Tableau** : Détail des Khassaïdas
- ✅ **Appréciation** : Commentaires et appréciations
- ✅ **Programme** : Planning du mois suivant

**Utilisation :** Toggles ON/OFF pour inclure/exclure des sections

### 6. **Personnalisation**

#### Couleurs du thème
1. Cliquez sur l'icône **⚙️ Paramètres**
2. **Sélecteurs de couleurs** :
   - **Couleur primaire** : Couleur principale (défaut: vert #006633)
   - **Couleur secondaire** : Couleur d'accent (défaut: vert foncé #004d26)
3. **Aperçu en temps réel**
4. Cliquez **"Sauvegarder"**

**Application :** Couleurs appliquées dans Preview et PDF

### 7. **Export et Sauvegarde**

#### Export PDF
- **Bouton** : "📄 Exporter PDF"
- **Génération** automatique avec mise en page optimisée
- **Nom de fichier** : `rapport-[mois].pdf`
- **Respect des sections** activées/désactivées

#### Export Excel
- **Bouton** : "📊 Exporter Excel"
- **Format** : Tableau structuré des données

#### Gestion des données
- **📂 Exporter JSON** : Sauvegarde complète des données
- **📁 Importer JSON** : Restauration depuis sauvegarde
- **Sauvegarde automatique** : localStorage du navigateur

## 🎨 Interface et Design

### Mise en Page
- **Sidebar gauche** : Saisie et configuration
- **Zone principale** : Prévisualisation en temps réel
- **Design responsive** : Adapté aux différentes tailles d'écran

### Prévisualisation
- **Temps réel** : Mise à jour immédiate des modifications
- **Style professionnel** : En-tête avec dégradé et logo
- **Sections organisées** : Mise en page claire et structurée
- **Tableaux stylisés** : Progression visuelle et codes couleur

### Codes Couleur des Progressions
- 🟢 **Vert (80%+)** : Excellent
- 🟡 **Jaune (50-79%)** : Bon
- 🔴 **Rouge (<50%)** : À améliorer

## 💾 Persistance des Données

### Sauvegarde Automatique
- **localStorage** : Toutes les modifications sont sauvegardées automatiquement
- **Récupération** : Données restaurées au rechargement de la page
- **Sécurité** : Données stockées localement (pas de serveur)

### Import/Export
- **Format JSON** : Structure complète des données
- **Compatibilité** : Transfert entre appareils/navigateurs
- **Backup** : Sauvegarde manuelle possible

## 🔧 Fonctionnalités Avancées

### Drag & Drop
- **Réorganisation** : Glisser-déposer les Khassaïdas
- **Numérotation automatique** : Mise à jour des numéros

### Validation
- **Champs obligatoires** : Vérification avant sauvegarde
- **Formats** : Validation des données saisies
- **Messages d'erreur** : Guidance utilisateur

### Calculs Automatiques
- **Pourcentages** : Progression automatique
- **Moyennes** : Calcul des notes Dadj
- **Statistiques** : Résumé global du mois

## 🚨 Résolution de Problèmes

### Problèmes Courants

**Le PDF ne se génère pas :**
- Vérifiez que toutes les données obligatoires sont remplies
- Attendez la fin du chargement de la page
- Rechargez la page et réessayez

**Les couleurs ne s'appliquent pas :**
- Ouvrez les Paramètres (⚙️)
- Modifiez et sauvegardez les couleurs
- Rechargez la page si nécessaire

**Données perdues :**
- Vérifiez le localStorage du navigateur
- Importez une sauvegarde JSON si disponible
- Les données sont sauvegardées automatiquement

**Performance lente :**
- Réduisez le nombre de Khassaïdas très élevé
- Fermez les autres onglets du navigateur
- Videz le cache si nécessaire

## 🛠️ Développement

### Structure du Projet
```
src/
├── components/          # Composants React
│   ├── Sidebar.js      # Interface de saisie
│   ├── Preview.js      # Prévisualisation
│   ├── KhassaidaForm.js # Formulaire Khassaïda
│   ├── CommentaireModal.js # Modal commentaires
│   ├── ProgrammeModal.js   # Modal programme
│   └── SettingsModal.js    # Paramètres
├── data/
│   └── defaultData.js  # Données par défaut
├── utils/
│   ├── exportPdf.js    # Génération PDF
│   └── exportExcel.js  # Export Excel
└── App.js              # Composant principal
```

### Technologies
- **React.js** : Framework frontend
- **Tailwind CSS** : Styles et design
- **html2pdf.js** : Génération PDF côté client
- **react-beautiful-dnd** : Drag & drop
- **XLSX** : Export Excel

### Commandes de Développement
```bash
npm start          # Démarrage développement
npm run build      # Build production
npm test           # Tests
npm run deploy     # Déploiement
```

## 📞 Support

### Contact
- **Développeur** : [Votre nom]
- **Email** : [Votre email]
- **GitHub** : [Repository URL]

### Contributions
Les contributions sont les bienvenues :
1. Fork du projet
2. Créer une branche feature
3. Commit des modifications
4. Push vers la branche
5. Ouvrir une Pull Request

---

**Version** : 1.0.0  
**Dernière mise à jour** : Octobre 2025  
**Licence** : MIT