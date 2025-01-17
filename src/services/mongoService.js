// // Question: Pourquoi créer des services séparés ?
// // Réponse: 

const { connectMongo, getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

async function findOneById(collectionName, id) {
  const db = getDb();
  return db.collection(collectionName).findOne({ _id: new ObjectId(id) });
}

async function findAll(collectionName) {
  const db = getDb();
  return db.collection(collectionName).find({}).toArray();
}

async function insertOne(collectionName, document) {
  try {
    const db = getDb();
    const result = await db.collection(collectionName).insertOne(document);
    return result;
  } catch (error) {
    console.error('Error inserting document:', error);
    throw error;
  }
}

async function updateOneById(collectionName, id, updates) {
  const db = getDb();
  return await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
}

async function deleteOneById(collection, id) {
  const db = getDb();
  if (!id) {
    throw new Error('Invalid ID');
  }
  return await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  findOneById,
  findAll,
  insertOne,
  updateOneById,
  deleteOneById,
};