// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 
const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  try {
    mongoClient = await MongoClient.connect(config.mongodb.uri);
    db = mongoClient.db(config.mongodb.dbName);
    console.log('MongoDB connection successful');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err; 
  }
}

async function connectRedis() {
  try {
    redisClient = redis.createClient({ url: config.redis.uri });

    redisClient.on('connect', () => {
      console.log('Redis connection successful');
    });

    redisClient.on('error', (err) => {
      console.error('Error connecting to Redis:', err);
    });

    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error; 
  }
}

function closeConnections() {
  if (mongoClient) {
    mongoClient.close();
    console.log('MongoDB connection closed');
  }
  if (redisClient) {
    redisClient.quit();
    console.log('Redis connection closed');
  }
}

module.exports = {
  connectMongo,
  connectRedis,
  getDb: () => db,
  getRedisClient: () => redisClient,
  closeConnections
};