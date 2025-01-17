# Projet de fin de module NoSQL

Ce projet consiste à développer une API simple servant de backend pour une plateforme d'apprentissage en ligne. La structure du projet est conçue pour garantir maintenabilité, clarté et extensibilité


## 📦 Configuration du projet

Suivez ces étapes pour configurer le projet localement :

### 1. Cloner le dépôt

Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/KarnasZiad/learning-platform-nosql.git
cd learning-platform-nosql
```

### 2. Installer les dépendances

Exécutez la commande suivante pour installer toutes les dépendances requises :

```bash
npm install
```

### 3. Lancer MongoDB et Redis avec Docker (optionnel)

Si vous souhaitez utiliser Docker pour MongoDB et Redis, assurez-vous d'avoir [Docker](https://www.docker.com/) installé, puis exécutez la commande suivante :

```bash
docker-compose up
```

Cela démarrera les conteneurs MongoDB et Redis. L'application pourra se connecter à ces services tant que les bonnes variables d'environnement sont définies dans le fichier `.env`.

- **MongoDB** sera accessible à `mongodb://localhost:27017`.
- **Redis** sera accessible à `redis://localhost:6379`.

Si vous n'utilisez pas Docker pour MongoDB ou Redis, assurez-vous que ces services sont en cours d'exécution localement.

### 4. Démarrer l'application

Une fois que les services nécessaires sont lancés, vous pouvez démarrer le serveur API avec la commande suivante :

```bash
npm start
```

Par défaut, l'application sera accessible à `http://localhost:3000`.


---

## Structure du projet

La structure du projet est la suivante :

```
.
├── docker-compose.yml     # Configuration Docker Compose pour lancer l'app
├── package.json           # Dépendances et scripts Node.js
├── package-lock.json      # Versions verrouillées des dépendances
├── README.md              # Ce fichier README
└── src                    # Code source de l'application
    ├── app.js             # Point d'entrée principal de l'app
    ├── config
    │   ├── db.js          # Configuration de la base de données
    │   └── env.js         # Variables d'environnement
    ├── controllers
    │   ├── courseController.js  # Logique de l'API pour les cours
    │   └── studentController.js # Logique de l'API pour les étudiants
    ├── routes
    │   ├── courseRoutes.js     # Routes de l'API pour les cours
    │   └── studentRoutes.js    # Routes de l'API pour les étudiants
    └── services
        ├── mongoService.js     # Fonctions de service MongoDB
        └── redisService.js     # Fonctions de service Redis
```

---

## Documentation des points de terminaison de l'API

### Cours

- **POST /api/courses/create** : Créer un nouveau cours.
- **GET /api/courses/stats** : Obtenir les statistiques des cours.
- **GET /api/courses/:id** : Obtenir les détails d'un cours spécifique.
- **GET /api/courses** : Obtenir la liste de tous les cours.
- **PUT /api/courses/:id** : Mettre à jour un cours spécifique.
- **DELETE /api/courses/:id** : Supprimer un cours spécifique.

### Étudiants

- **POST /api/students/create** : Créer un nouvel étudiant.
- **GET /api/students/:id** : Obtenir les détails d'un étudiant spécifique.
- **GET /api/students** : Obtenir la liste de tous les étudiants.
- **PUT /api/students/:id** : Mettre à jour un étudiant spécifique.
- **DELETE /api/students/:id** : Supprimer un étudiant spécifique.
- **POST /api/students/:id/enroll** : Inscrire un étudiant à un cours.
- **GET /api/students/:id/courses** : Obtenir les cours auxquels un étudiant est inscrit.


## 💡 Explications des concepts clés

### ✅ Variables d'environnement (env.js)
Contient les configurations essentielles comme les URL des bases de données ou les clés d'API.
Pourquoi les valider ?
Cela évite les erreurs dues à des configurations incorrectes et garantit un fonctionnement sécurisé.


### ✅ Connexion aux bases de données (db.js)
Centralise la gestion des connexions à MongoDB et Redis.
Avantages :
Simplifie la maintenance.
Facilite la réutilisation du code.
Permet une fermeture propre des connexions avec des méthodes dédiées (mongoClient.close(), redisClient.quit()).


### ✅ Services métier (mongoService.js et redisService.js)
Encapsulent la logique des interactions avec les bases de données.
Avantages :
Améliorent la modularité.
Facilitent les tests unitaires.
Séparent clairement les responsabilités.


### ✅ Contrôleurs (courseController.js, studentController.js)
Contiennent la logique métier des fonctionnalités.
Différence entre contrôleurs et routes :
Routes : Définissent les points d'entrée de l'API.
Contrôleurs : Centralisent le traitement des requêtes.


### ✅ Routes de l'API (courseRoutes.js, studentRoutes.js)
Organisées par domaine fonctionnel.
Bonnes pratiques :
Grouper les routes dans des fichiers spécifiques.
Documenter les routes pour plus de clarté.