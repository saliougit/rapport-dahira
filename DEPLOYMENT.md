# 🚀 Déploiement - Rapport Dahira

## 📋 Table des Matières
- [Configuration GitHub Pages](#configuration-github-pages)
- [GitHub Actions](#github-actions)
- [Déploiement Local](#déploiement-local)
- [Variables d'Environnement](#variables-denvironnement)
- [Résolution de Problèmes](#résolution-de-problèmes)

## 🔧 Configuration GitHub Pages

### 1. Activation de GitHub Pages

1. **Allez dans les Settings** de votre repository GitHub
2. **Scrollez vers "Pages"** dans le menu gauche
3. **Source** : Sélectionnez "GitHub Actions"
4. **Sauvegardez** les changements

### 2. Configuration du Repository

```bash
# Cloner le repository
git clone https://github.com/saliougit/rapport-dahira.git
cd rapport-dahira

# Installer les dépendances
npm install

# Test local
npm start
```

### 3. URL de Déploiement

Une fois configuré, votre application sera accessible à :
```
https://saliougit.github.io/rapport-dahira
```

## ⚙️ GitHub Actions

### 🔄 Workflows Configurés

#### 1. **Deploy Workflow** (`.github/workflows/deploy.yml`)
- **Déclenchement** : Push sur `main`/`master`
- **Actions** :
  - ✅ Checkout du code
  - ✅ Installation Node.js 18.x
  - ✅ Installation des dépendances
  - ✅ Exécution des tests
  - ✅ Build de l'application
  - ✅ Déploiement sur GitHub Pages

#### 2. **CI Pipeline** (`.github/workflows/ci.yml`)
- **Déclenchement** : Push sur toutes les branches + PR
- **Matrix Testing** : Node.js 16.x, 18.x, 20.x
- **Actions** :
  - ✅ Tests de compatibilité
  - ✅ Linting du code
  - ✅ Tests unitaires avec coverage
  - ✅ Build et test de l'application

### 📊 Badges de Statut

Ajoutez ces badges à votre README principal :

```markdown
[![Deploy](https://github.com/saliougit/rapport-dahira/actions/workflows/deploy.yml/badge.svg)](https://github.com/saliougit/rapport-dahira/actions/workflows/deploy.yml)
[![CI](https://github.com/saliougit/rapport-dahira/actions/workflows/ci.yml/badge.svg)](https://github.com/saliougit/rapport-dahira/actions/workflows/ci.yml)
```

## 💻 Déploiement Local

### 1. Installation et Démarrage

```bash
# Installation
npm install

# Démarrage en développement
npm start

# Build de production
npm run build

# Test du build local
npx serve -s build
```

### 2. Variables d'Environnement

Créez un fichier `.env` à la racine :

```env
# URL de base pour le déploiement
PUBLIC_URL=/rapport-dahira

# Mode de développement
REACT_APP_ENV=development

# Version de l'application
REACT_APP_VERSION=1.0.0
```

### 3. Configuration du Build

Le build est optimisé pour GitHub Pages avec :
- **Minification** des fichiers CSS/JS
- **Optimisation** des images
- **Service Worker** pour le cache
- **Paths relatifs** pour la compatibilité

## 🔧 Variables d'Environnement

### Variables Supportées

| Variable | Description | Défaut |
|----------|-------------|---------|
| `PUBLIC_URL` | URL de base de l'app | `/` |
| `REACT_APP_ENV` | Environnement | `production` |
| `REACT_APP_VERSION` | Version de l'app | `0.1.0` |
| `GENERATE_SOURCEMAP` | Génération sourcemaps | `false` |

### Configuration dans GitHub

1. **Settings** → **Secrets and variables** → **Actions**
2. **Repository secrets** :
   - `PUBLIC_URL` : `/rapport-dahira`
   - Autres variables si nécessaires

## 🚨 Résolution de Problèmes

### ❌ Échecs de Déploiement Courants

#### 1. **Erreur 404 après déploiement**

**Cause** : Configuration du routing pour SPA

**Solution** : Ajoutez un fichier `public/404.html` :
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Rapport Dahira</title>
    <script type="text/javascript">
        var pathSegmentsToKeep = 1;
        var l = window.location;
        l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + 
            '/?/' + l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
            (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
            l.hash
        );
    </script>
</head>
<body></body>
</html>
```

#### 2. **Tests qui échouent en CI**

**Cause** : Environment différent

**Solution** : Modifiez le script de test :
```json
{
  "scripts": {
    "test:ci": "CI=true react-scripts test --coverage --watchAll=false"
  }
}
```

#### 3. **Build qui échoue**

**Causes possibles** :
- ❌ Warnings ESLint traités comme erreurs
- ❌ Dépendances manquantes
- ❌ Erreurs TypeScript

**Solutions** :
```bash
# Ignorer les warnings pendant le build
CI=false npm run build

# Vérifier les dépendances
npm audit
npm install

# Fixer les erreurs de linting
npm run lint:fix
```

#### 4. **Actions GitHub qui ne se déclenchent pas**

**Vérifications** :
1. ✅ Fichiers `.yml` dans `.github/workflows/`
2. ✅ Syntaxe YAML correcte
3. ✅ Permissions GitHub Pages activées
4. ✅ Branch `main`/`master` configurée

### 🔍 Debug des Actions

#### Activer les logs détaillés :

```yaml
# Dans votre workflow
- name: Enable debug logging
  run: echo "ACTIONS_STEP_DEBUG=true" >> $GITHUB_ENV
```

#### Vérifier les artifacts :

```yaml
- name: List build contents
  run: ls -la build/
  
- name: Check build size
  run: du -sh build/
```

## 📈 Monitoring et Maintenance

### 1. **Surveillance des Déploiements**

- **GitHub Actions tab** : Statut des builds
- **Issues tracker** : Problèmes de déploiement
- **Dependabot** : Mises à jour de sécurité

### 2. **Métriques de Performance**

Ajoutez Web Vitals monitoring :

```javascript
// src/reportWebVitals.js
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  // Envoi vers service d'analytics
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 3. **Automatisation des Mises à Jour**

Configurez Dependabot dans `.github/dependabot.yml` :

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    reviewers:
      - "[USERNAME]"
    assignees:
      - "[USERNAME]"
```

## 🔐 Sécurité

### 1. **Variables Sensibles**

- ❌ **Jamais** commiter d'API keys
- ✅ Utiliser GitHub Secrets
- ✅ Préfixer avec `REACT_APP_` seulement si public

### 2. **Audit de Sécurité**

```bash
# Audit des vulnérabilités
npm audit

# Fix automatique
npm audit fix

# Audit forcé
npm audit fix --force
```

## 📚 Ressources Supplémentaires

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites)

---

**📞 Support Déploiement**  
En cas de problème, vérifiez d'abord les [Actions GitHub](https://github.com/[USERNAME]/rapport-dahira/actions) pour les logs détaillés.