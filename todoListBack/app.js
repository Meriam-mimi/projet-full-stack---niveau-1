const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000

const cors = require('cors');
app.use(cors());

// Middleware pour traiter les données JSON
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017";


const JWT_SECRET = 'secret'; 
const dbName = "TodoList";
const collectionName = "tasks";
let usersCollection;
const db = global.db;

//const { connectToMongo} =  require ('./connexion.js')
const {findAllTasks} =  require ('./db_utils.js')
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})





let tasks;
connectToMongo(dbName,collectionName).then(collection => {
  
  //return col.find({}).toArray();
  return findAllTasks(collection);
}).then(listeTask => tasks = listeTask );


async function connectToMongo(dbName, collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    usersCollection = client.db(dbName).collection('users');

    client.db(dbName).collection(collectionName);
    global.db = client.db;
    //console.log("Connecté à MongoDB");
    return client.db(dbName).collection(collectionName);
    //return client.db(dbName);

  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

// Route de connexion
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await usersCollection.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur non trouvé' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Mot de passe incorrect' });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});


// récuperer tous les tâches
app.get('/tasks', async (request, response) => {
    response.json(tasks)
})

// récuperer une tâche
app.get("/task/:name", async (req, res) => {
  try {
    const collection = await connectToMongo(dbName, collectionName);

    // Récupérer la tâche en fonction du nom passé en paramètre
    const task = await collection.findOne({ name: req.params.name });

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération de la tâche" });
  }
});

// ajouter une tâche
app.post('/new', async (req, res) => {
  try {
    //const { name, description } = req.body;
    
    const collection = await connectToMongo(dbName, collectionName);
    // Créer une nouvelle tâche 
    const newTask = {
      name: req.body.name,  
      description: req.body.description
    }; 
    // Insère la nouvelle tâche dans la collection
    const result = await collection.insertOne(newTask);  

    res.status(201).json({ message: "Nouvelle tâche créée", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la tâche" });
  }
});
// modifier une tâche
app.put("/update/:name", async (req, res) => {
  try {
    const collection = await connectToMongo(dbName, collectionName);
    const result = await collection.updateOne(
      { name: req.params.name }, 
      { $set: { description: req.body.description } }
    );
    res.json({ message: "la tâche a été modifiée", result });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de MAJ de la tâche" });
  }
})

// supprimer une tâche
app.delete("/delete/:name", async (req, res) => {
  try {
    const collection = await connectToMongo(dbName, collectionName);

    // Supprimer la tâche en fonction du name
    const result = await collection.deleteOne(
      { name: req.params.name }
    );

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.json({ message: "Tâche supprimée avec succès", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la tâche" });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/////////////////::::
