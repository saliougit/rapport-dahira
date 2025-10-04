# Script de déploiement PowerShell pour Rapport Dahira
# Usage: .\deploy.ps1 [full|test|build]

param(
    [string]$Action = ""
)

# Couleurs pour les messages
function Write-ColoredOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

function Write-Info {
    param([string]$Message)
    Write-ColoredOutput "[INFO] $Message" "Cyan"
}

function Write-Success {
    param([string]$Message)
    Write-ColoredOutput "[SUCCESS] $Message" "Green"
}

function Write-Warning {
    param([string]$Message)
    Write-ColoredOutput "[WARNING] $Message" "Yellow"
}

function Write-Error {
    param([string]$Message)
    Write-ColoredOutput "[ERROR] $Message" "Red"
}

# Vérification des prérequis
function Test-Prerequisites {
    Write-Info "Vérification des prérequis..."
    
    # Vérifier Node.js
    try {
        $nodeVersion = node --version
        Write-Success "Node.js détecté: $nodeVersion"
    }
    catch {
        Write-Error "Node.js n'est pas installé. Téléchargez-le depuis https://nodejs.org/"
        exit 1
    }
    
    # Vérifier npm
    try {
        $npmVersion = npm --version
        Write-Success "npm détecté: $npmVersion"
    }
    catch {
        Write-Error "npm n'est pas disponible"
        exit 1
    }
    
    # Vérifier git
    try {
        $gitVersion = git --version
        Write-Success "git détecté: $gitVersion"
    }
    catch {
        Write-Error "git n'est pas installé"
        exit 1
    }
    
    Write-Success "Tous les prérequis sont satisfaits"
}

# Installation des dépendances
function Install-Dependencies {
    Write-Info "Installation des dépendances..."
    try {
        npm ci
        Write-Success "Dépendances installées avec succès"
    }
    catch {
        Write-Error "Erreur lors de l'installation des dépendances"
        exit 1
    }
}

# Exécution des tests
function Invoke-Tests {
    Write-Info "Exécution des tests..."
    try {
        npm test -- --coverage --ci --watchAll=false
        Write-Success "Tous les tests sont passés"
    }
    catch {
        Write-Error "Échec des tests"
        exit 1
    }
}

# Build de l'application
function Build-Application {
    Write-Info "Build de l'application..."
    try {
        npm run build
        Write-Success "Build terminé avec succès"
    }
    catch {
        Write-Error "Erreur lors du build"
        exit 1
    }
}

# Test du build
function Test-Build {
    Write-Info "Vérification du build..."
    
    if (Test-Path "build") {
        $buildSize = (Get-ChildItem "build" -Recurse | Measure-Object -Property Length -Sum).Sum
        $buildSizeMB = [math]::Round($buildSize / 1MB, 2)
        Write-Success "Build généré avec succès (Taille: $buildSizeMB MB)"
        
        # Lister les fichiers principaux
        Write-Info "Fichiers JavaScript principaux:"
        Get-ChildItem "build/static/js/*.js" | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}} | Format-Table
        
        Write-Info "Fichiers CSS principaux:"
        Get-ChildItem "build/static/css/*.css" | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}} | Format-Table
    }
    else {
        Write-Error "Le dossier build n'existe pas"
        exit 1
    }
}

# Commit et push
function Commit-And-Push {
    Write-Info "Vérification des changements git..."
    
    $changes = git status --porcelain
    if ($changes) {
        git add .
        
        $commitMessage = Read-Host "Message de commit (optionnel)"
        if ([string]::IsNullOrWhiteSpace($commitMessage)) {
            $commitMessage = "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        }
        
        try {
            git commit -m $commitMessage
            git push origin main
            Write-Success "Changements committés et pushés"
        }
        catch {
            Write-Error "Erreur lors du commit/push"
            exit 1
        }
    }
    else {
        Write-Warning "Aucun changement à committer"
    }
}

# Vérification du déploiement
function Test-Deployment {
    Write-Info "Informations de déploiement..."
    
    try {
        $repoUrl = git config --get remote.origin.url
        if ($repoUrl -match "github\.com[:/]([^/]+)/([^/]+)\.git") {
            $username = $matches[1]
            $repoName = $matches[2]
            
            $pagesUrl = "https://$username.github.io/$repoName"
            $actionsUrl = "https://github.com/$username/$repoName/actions"
            
            Write-Success "Déploiement initié !"
            Write-Info "URL de l'application: $pagesUrl"
            Write-Info "Statut des Actions GitHub: $actionsUrl"
            Write-Warning "Le déploiement peut prendre quelques minutes..."
            
            # Optionnel: ouvrir l'URL dans le navigateur
            $openBrowser = Read-Host "Ouvrir l'URL dans le navigateur ? (y/N)"
            if ($openBrowser -eq "y" -or $openBrowser -eq "Y") {
                Start-Process $pagesUrl
                Start-Process $actionsUrl
            }
        }
    }
    catch {
        Write-Warning "Impossible de déterminer l'URL de déploiement"
    }
}

# Menu principal
function Show-Menu {
    Write-Host ""
    Write-ColoredOutput "🚀 Script de Déploiement - Rapport Dahira" "Blue"
    Write-ColoredOutput "======================================" "Blue"
    Write-Host ""
    Write-Host "1) Déploiement complet (recommandé)"
    Write-Host "2) Tests seulement"
    Write-Host "3) Build seulement"
    Write-Host "4) Vérifier les prérequis"
    Write-Host "5) Quitter"
    Write-Host ""
    $choice = Read-Host "Votre choix (1-5)"
    return $choice
}

# Déploiement complet
function Start-FullDeployment {
    Write-Info "🚀 Début du déploiement complet..."
    
    Test-Prerequisites
    Install-Dependencies
    Invoke-Tests
    Build-Application
    Test-Build
    Commit-And-Push
    Test-Deployment
    
    Write-Success "🎉 Déploiement terminé avec succès !"
}

# Script principal
function Main {
    # Traitement des arguments
    switch ($Action.ToLower()) {
        "full" {
            Start-FullDeployment
            return
        }
        "test" {
            Test-Prerequisites
            Install-Dependencies
            Invoke-Tests
            return
        }
        "build" {
            Test-Prerequisites
            Install-Dependencies
            Build-Application
            Test-Build
            return
        }
    }
    
    # Menu interactif
    do {
        $choice = Show-Menu
        
        switch ($choice) {
            "1" {
                Start-FullDeployment
                break
            }
            "2" {
                Test-Prerequisites
                Install-Dependencies
                Invoke-Tests
            }
            "3" {
                Test-Prerequisites
                Install-Dependencies
                Build-Application
                Test-Build
            }
            "4" {
                Test-Prerequisites
            }
            "5" {
                Write-Info "Au revoir !"
                return
            }
            default {
                Write-Error "Choix invalide. Veuillez choisir 1-5."
            }
        }
        
        if ($choice -ne "1" -and $choice -ne "5") {
            Write-Host ""
            Read-Host "Appuyez sur Entrée pour continuer..."
        }
    } while ($choice -ne "1" -and $choice -ne "5")
}

# Exécution du script
Main