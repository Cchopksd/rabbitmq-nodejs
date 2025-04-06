const userService = require("../services/user");

exports.getUsersDataController = async (req, res) => {
  try {
    const users = await userService.getUsersData();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getting user data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};