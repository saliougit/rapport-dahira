#!/bin/bash

# Script de déploiement automatisé pour Rapport Dahira
# Usage: ./deploy.sh [environment]

set -e  # Arrêter le script en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé. Veuillez l'installer : https://nodejs.org/"
        exit 1
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        log_error "npm n'est pas installé."
        exit 1
    fi
    
    # Vérifier git
    if ! command -v git &> /dev/null; then
        log_error "git n'est pas installé."
        exit 1
    fi
    
    log_success "Tous les prérequis sont satisfaits"
}

# Installation des dépendances
install_dependencies() {
    log_info "Installation des dépendances..."
    npm ci
    log_success "Dépendances installées"
}

# Exécution des tests
run_tests() {
    log_info "Exécution des tests..."
    npm test -- --coverage --ci --watchAll=false
    log_success "Tests réussis"
}

# Build de l'application
build_app() {
    log_info "Build de l'application..."
    npm run build
    log_success "Build terminé"
}

# Test du build
test_build() {
    log_info "Test du build..."
    if [ -d "build" ]; then
        BUILD_SIZE=$(du -sh build | cut -f1)
        log_success "Build généré avec succès (Taille: $BUILD_SIZE)"
        
        # Lister les fichiers principaux
        log_info "Fichiers principaux du build:"
        ls -la build/static/js/*.js | head -3
        ls -la build/static/css/*.css | head -3
    else
        log_error "Le dossier build n'existe pas"
        exit 1
    fi
}

# Commit et push
commit_and_push() {
    log_info "Commit et push des changements..."
    
    # Vérifier s'il y a des changements
    if [[ -n $(git status --porcelain) ]]; then
        git add .
        
        # Demander le message de commit
        echo -n "Message de commit (optionnel): "
        read COMMIT_MESSAGE
        
        if [ -z "$COMMIT_MESSAGE" ]; then
            COMMIT_MESSAGE="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
        fi
        
        git commit -m "$COMMIT_MESSAGE"
        git push origin main
        log_success "Changements committés et pushés"
    else
        log_warning "Aucun changement à committer"
    fi
}

# Vérification du déploiement
check_deployment() {
    log_info "Vérification du déploiement..."
    
    # Récupérer l'URL du repository
    REPO_URL=$(git config --get remote.origin.url)
    if [[ $REPO_URL == *"github.com"* ]]; then
        # Extraire le nom d'utilisateur et le repository
        REPO_PATH=$(echo $REPO_URL | sed 's/.*github\.com[:/]\([^/]*\/[^/]*\)\.git.*/\1/')
        USERNAME=$(echo $REPO_PATH | cut -d'/' -f1)
        REPO_NAME=$(echo $REPO_PATH | cut -d'/' -f2)
        
        PAGES_URL="https://$USERNAME.github.io/$REPO_NAME"
        ACTIONS_URL="https://github.com/$REPO_PATH/actions"
        
        log_success "Déploiement initié !"
        log_info "URL de l'application: $PAGES_URL"
        log_info "Statut des Actions: $ACTIONS_URL"
        log_warning "Le déploiement peut prendre quelques minutes..."
    fi
}

# Menu principal
show_menu() {
    echo -e "\n${BLUE}🚀 Script de Déploiement - Rapport Dahira${NC}"
    echo -e "${BLUE}======================================${NC}\n"
    echo "1) Déploiement complet (recommandé)"
    echo "2) Tests seulement"
    echo "3) Build seulement"
    echo "4) Vérifier les prérequis"
    echo "5) Quitter"
    echo ""
    echo -n "Votre choix (1-5): "
}

# Déploiement complet
full_deployment() {
    log_info "🚀 Début du déploiement complet..."
    
    check_prerequisites
    install_dependencies
    run_tests
    build_app
    test_build
    commit_and_push
    check_deployment
    
    log_success "🎉 Déploiement terminé avec succès !"
}

# Script principal
main() {
    # Si un argument est passé, exécuter directement
    if [ "$1" = "full" ]; then
        full_deployment
        return
    elif [ "$1" = "test" ]; then
        check_prerequisites
        install_dependencies
        run_tests
        return
    elif [ "$1" = "build" ]; then
        check_prerequisites
        install_dependencies
        build_app
        test_build
        return
    fi
    
    # Sinon, afficher le menu
    while true; do
        show_menu
        read choice
        
        case $choice in
            1)
                full_deployment
                break
                ;;
            2)
                check_prerequisites
                install_dependencies
                run_tests
                ;;
            3)
                check_prerequisites
                install_dependencies
                build_app
                test_build
                ;;
            4)
                check_prerequisites
                ;;
            5)
                log_info "Au revoir !"
                break
                ;;
            *)
                log_error "Choix invalide. Veuillez choisir 1-5."
                ;;
        esac
        
        echo ""
        echo "Appuyez sur Entrée pour continuer..."
        read
    done
}

# Exécution du script
main "$@"