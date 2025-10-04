# 📊 Générateur de Rapports Dahira

[![Deploy](https://github.com/[USERNAME]/rapport-dahira/actions/workflows/deploy.yml/badge.svg)](https://github.com/[USERNAME]/rapport-dahira/actions/workflows/deploy.yml)
[![CI](https://github.com/[USERNAME]/rapport-dahira/actions/workflows/ci.yml/badge.svg)](https://github.com/[USERNAME]/rapport-dahira/actions/workflows/ci.yml)

Application web moderne pour créer et générer des rapports mensuels de répétition pour les Dahiras. Interface intuitive avec export PDF/Excel et personnalisation complète.

## 🚀 Demo Live

**Application déployée :** [https://[USERNAME].github.io/rapport-dahira](https://[USERNAME].github.io/rapport-dahira)

## ✨ Fonctionnalités

- 📝 **Saisie intuitive** des informations de Dahira
- 🎵 **Gestion des Khassaïdas** avec progression et évaluation
- 📊 **Modes d'évaluation** : Pages ou Dadj avec notes
- 💬 **Commentaires détaillés** par Khassaïda
- 📅 **Programme du mois** suivant
- 🎨 **Personnalisation** des couleurs et thèmes
- 📄 **Export PDF** professionnel avec mise en page optimisée
- 📊 **Export Excel** des données structurées
- 💾 **Sauvegarde automatique** et import/export JSON
- 🔧 **Sections configurables** (activables/désactivables)

## 🛠️ Installation Rapide

```bash
# Cloner le repository
git clone https://github.com/[USERNAME]/rapport-dahira.git
cd rapport-dahira

# Installer les dépendances
npm install

# Démarrer en mode développement
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📚 Documentation Complète

- **[📖 Guide d'Utilisation](./DOCUMENTATION.md)** - Documentation détaillée des fonctionnalités
- **[🚀 Guide de Déploiement](./DEPLOYMENT.md)** - Configuration et déploiement GitHub Pages

## 🔧 Scripts Disponibles

### Développement
```bash
# Démarrer en mode développement
npm start

# Exécuter les tests
npm test

# Build de production
npm run build
```

### Déploiement Automatisé

**Windows (PowerShell) :**
```powershell
# Déploiement complet
.\deploy.ps1 full

# Tests seulement
.\deploy.ps1 test

# Build seulement
.\deploy.ps1 build

# Menu interactif
.\deploy.ps1
```

**Linux/Mac (Bash) :**
```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Déploiement complet
./deploy.sh full

# Menu interactif
./deploy.sh
```

## 🚀 Déploiement GitHub Pages

### Configuration Automatique

1. **Forkez ce repository**
2. **Activez GitHub Pages** :
   - Settings → Pages → Source : "GitHub Actions"
3. **Modifiez le README** : Remplacez `[USERNAME]` par votre nom d'utilisateur
4. **Commit et Push** : Le déploiement se lance automatiquement

### URL de Déploiement
```
https://[USERNAME].github.io/rapport-dahira
```

### Statut des Déploiements
- **Actions GitHub** : Suivi en temps réel des builds
- **Déploiement automatique** sur push vers `main`
- **Tests automatisés** avant déploiement

## 🎯 Guide d'Utilisation Rapide

1. **Remplir les informations** générales (Kourel, période, responsable)
2. **Ajouter des Khassaïdas** avec leur progression
3. **Configurer l'évaluation** (Pages ou Dadj)
4. **Ajouter commentaires** et appréciation
5. **Définir le programme** du mois suivant
6. **Personnaliser** les couleurs si souhaité
7. **Exporter** en PDF ou Excel

## 🛠️ Technologies

- **Frontend** : React.js + Hooks
- **Styling** : Tailwind CSS
- **PDF** : html2pdf.js
- **Excel** : XLSX
- **Drag & Drop** : react-beautiful-dnd
- **CI/CD** : GitHub Actions
- **Hosting** : GitHub Pages

## 📱 Captures d'Écran

*[Ajoutez des captures d'écran de votre application ici]*

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. **Fork** le projet
2. **Créez** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**[Votre Nom]**
- GitHub: [@[USERNAME]](https://github.com/[USERNAME])
- Email: [votre.email@example.com]

## 🙏 Remerciements

- Communauté Dahira pour les spécifications
- Create React App pour le bootstrap
- Tailwind CSS pour le design system
- Tous les contributeurs du projet

---

**⭐ N'hésitez pas à mettre une étoile si ce projet vous aide !**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
