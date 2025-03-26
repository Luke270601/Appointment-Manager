const { MongoClient } = require('mongodb');
require("dotenv").config();

const url = process.env.MONGODB_KEY; // Replace with your MongoDB connection URL
const dbName = 'mydb'; // Replace with your database name

const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (err) {
    throw err;
  }
}

module.exports = connectToDatabase;
