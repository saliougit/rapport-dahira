#!/bin/bash

# Script de configuration automatique GitHub Pages
# Ce script sera exécuté par GitHub Actions pour s'assurer que Pages est correctement configuré

echo "🔧 Configuration GitHub Pages..."

# Vérifier si le fichier index.html existe
if [ ! -f "index.html" ]; then
    echo "❌ Erreur: index.html introuvable"
    exit 1
fi

# Créer le fichier .nojekyll si inexistant
if [ ! -f ".nojekyll" ]; then
    echo "📝 Création du fichier .nojekyll"
    touch .nojekyll
fi

# Créer 404.html si inexistant (pour SPA routing)
if [ ! -f "404.html" ]; then
    echo "📝 Création du fichier 404.html pour SPA routing"
    cp index.html 404.html
fi

echo "✅ Configuration GitHub Pages terminée"

# Afficher les fichiers créés
echo "📁 Fichiers dans le build:"
ls -la

echo "🌐 URL attendue: https://saliougit.github.io/rapport-dahira/"