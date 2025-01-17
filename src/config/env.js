// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : 
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : 

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      // Si une variable manque, lever une erreur explicative
      throw new Error(`La variable d'environnement ${envVar} n'existe pas`);
    }
  });
}
// appel de la fonction
validateEnv();

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};