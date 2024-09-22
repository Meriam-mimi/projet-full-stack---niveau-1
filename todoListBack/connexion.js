const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const JWT_SECRET = 'secret'; 
const dbUrl = 'mongodb://localhost:27017'; 
const dbName = 'TodoList';
let db, usersCollection;

app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
MongoClient.connect(dbUrl)
  .then(client => {
    db = client.db(dbName);
    usersCollection = db.collection('users');
  })
  .catch(err => console.error(err));

// Route d'enregistrement
app.post('/inscription', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await usersCollection.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Utilisateur déjà existant' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await usersCollection.insertOne({ username, password: hashedPassword });
  res.status(201).json({ message: 'Utilisateur créé avec succès' });
});

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
