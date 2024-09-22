const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const dbName = "TodoList"; 
const collectionName = "tasks"

async function connectToMongo(dbName, collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

 function findAllTasks(collection) {
  return collection.find({}).toArray();
}

function main() {
  connectToMongo(dbName, collectionName)
    .then(collection => {
      return findAllTasks(collection);
    })
    .then(tasks => {
      console.log("Tâches trouvées :");
      console.log(tasks);
    })
    .catch(error => {
      console.error("Une erreur est survenue :", error);
    });
}

main();
module.exports  = {findAllTasks , connectToMongo };