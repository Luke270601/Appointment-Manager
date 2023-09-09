const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://lukescott270601:xLpEf3JGNbrvGKHK@appointmentsmanager.tquih5l.mongodb.net/'; // Replace with your MongoDB connection URL
const dbName = 'mydb'; // Replace with your database name

const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
}

module.exports = connectToDatabase;
