const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://lukescott270601:BRbKPruFoN2aQ6tv@appointmentsmanager.tquih5l.mongodb.net/?retryWrites=true&w=majority&appName=AppointmentsManager'; // Replace with your MongoDB connection URL
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
