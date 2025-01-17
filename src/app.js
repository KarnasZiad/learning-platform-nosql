// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require("express");
const config = require("./config/env");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");
const db = require("./config/db");

const app = express();

// Montez les routes ici
function configureRoutes(app) {
  app.use("/api/courses", courseRoutes);
  app.use("/api/students", studentRoutes);
}

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    app.use(express.json());
    // TODO: Monter les routes
    configureRoutes(app);

    // Démarrer le serveur
    const PORT = config.port || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// TODO: Implémenter la fermeture propre des connexions
process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await db.closeConnections();
  
});

startServer();