const path = require("node:path");
const { Router } = require("express");

const { User } = require("../Models/index");
const { authRequired } = require("../Middleware/authRequired");

const uploadFolder = path.join(__dirname, "../upload");
const router = Router();

/**
 * Get All Users Data
 */
router.get("/", authRequired, async (req, res) => {
    const payload = req.payload;
    const users = await User.find({ _id: { $ne: payload.sub } });
    const usersData = users.map((user) => ({
        id: user.id,
        email: user.email,
    }));
    res.send({ users: usersData });
});

/**
 * Get User Image
 */
router.get("/:id/image", authRequired, async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    const imageFile = uploadFolder + "/" + user.image;
    res.sendFile(imageFile);
});

module.exports = router;
