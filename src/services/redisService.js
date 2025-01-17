// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :
const db = require("../config/db");
// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl = 3600) {
  try {
    const redisClient = db.getRedisClient();
    await redisClient.set(key, JSON.stringify(data), "EX", ttl);
    return true;
  } catch (error) {
    console.error("Redis cache error:", error);
    return false;
  }
}

async function getCachedData(key) {
  try {
    const redisClient = db.getRedisClient();
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Redis get error:", error);
    return null;
  }
}

async function deleteCachedData(key) {
  try {
    const redisClient = db.getRedisClient();
    const result = await redisClient.del(key);
    if (result === 1) {
      console.log(`Cache key "${key}" deleted successfully`);
    } else {
      console.log(`Cache key "${key}" not found`);
    }
    return result;
  } catch (error) {
    console.error(`Error deleting cache key "${key}":`, error);
    throw error;
  }
}

module.exports = {
    // TODO: Exporter les fonctions utilitaires
  cacheData,
  getCachedData,
  deleteCachedData,
};
