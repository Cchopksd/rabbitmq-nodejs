const bcrypt = require("bcrypt");
const client = require("../config/database"); // Import the client

exports.registerService = async ({ name, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
    `;

    const values = [name, email, hashedPassword];

    const result = await client.query(query, values);
    const user = result.rows[0];

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Internal server error");
  }
};

