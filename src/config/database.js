const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URI,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
    return createTable();
  })
  .catch((err) => {
    console.log("Database URI:", process.env.DATABASE_URI);
    console.error("Connection error", err.stack);
  });

// Create the users table (if it doesn't exist)
const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    )
  `;
  try {
    await client.query(query);
    console.log("Table 'users' created successfully");
  } catch (err) {
    console.error("Error creating table", err.stack);
  }
};

// Make the client available for other parts of the app
module.exports = client;

