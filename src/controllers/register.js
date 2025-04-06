const registerService = require("../services/register");

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await registerService.registerService({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

