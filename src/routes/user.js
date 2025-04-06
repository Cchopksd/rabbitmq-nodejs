const router = require("express").Router();
const { getUsersDataController } = require("../controllers/user");

router.get("/users", getUsersDataController);

module.exports = router;
