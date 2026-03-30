<img width="1758" height="1050" alt="Capture d’écran 2026-03-03 à 16 55 41" src="https://github.com/user-attachments/assets/e1f68e1e-f553-43c7-aee2-ece91436f5ec" />


Shopwise - Procédure de déploiement Docker & CI/CD

    -   Présentaion : 
        Shopwise est une application web composée d’un backend Spring Boot, d’un frontend Angular, et d’une base de données MySQL.
        L'ensemble est dockerisé pour simplifier le développement, la montée en production et le déploiement continu.

    -   Prérequis : 
        Docker installé sur votre ordinateur (Windows/Mac/Linux)
        Accès à Docker Hub (compte gratuit)
        Accès au dépôt GitHub : shopwise

    -   Les captures d'écran sont dans le dossier livrable

    1.  Contruction des images Docker
        Les Dockerfiles sont inclus dans chaque dépôt :
        Backend : backend/Dockerfile
        Frontend : frontend/Dockerfile

        Directement à la racine du projet (dossier shopwise)
        Pour construire et lancer les services :
            docker-compose down -v && docker-compose build && docker-compose up -d
        
        Lancer l'ensembre avec : 
            docker-compose up

        Arrêtez l'ensemble avec :
            docker-compose down

    2. Accéder à l’application 
        Frontend : http://localhost:4200
        Backend : http://localhost:8080
        MySQL : localhost:3307

        PS : si vous souhaitez créer un client, pour recuperer son mot de passe, vous devrez aller le recuperer dans la base de données.

    3. Déploiement continu - GitHub Actions
        Chaque dépôt dispose d'un workflow CI/CD pour builder et pousser les images Docker sur Docker Hub automatiquement à chaque commit sur la branche principale (main).