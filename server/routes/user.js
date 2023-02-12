const path = require("node:path");
const { Router } = require("express");

const { User } = require("../Models/index");
const { authRequired } = require("../Middleware/authRequired");
const { sendNotification } = require("../lib/socket");

const uploadFolder = path.join(__dirname, "../upload");
const router = Router();

/**
 * Get All Users Data
 */
router.get("/", authRequired, async (req, res) => {
    const { sub } = req.payload;
    let currentPage = req.query.p || 1;
    currentPage = parseInt(currentPage);
    const usersPerPage = 3;

    try {
        const authUser = await User.findById(sub);
        const usersCount = await User.countDocuments({
            _id: { $ne: sub, $nin: authUser.blocked },
        });

        const totalPages = Math.ceil(usersCount / usersPerPage);

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const users = await User.find({
            _id: { $ne: sub, $nin: authUser.blocked },
        })
            .skip((currentPage - 1) * usersPerPage)
            .limit(usersPerPage);
        const usersData = users.map((user) => ({
            id: user.id,
            email: user.email,
        }));
        res.send({ users: usersData, totalPages });
    } catch {
        res.status(500).send({ message: "Server Error! Try Again!" });
    }
});

/**
 * Get User Image
 */
router.get("/:id/image", authRequired, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        const imageFile = uploadFolder + "/" + user.image;
        res.sendFile(imageFile);
    } catch {
        res.status(500).send({ message: "Server Error! Try Again!" });
    }
});

/**
 * Block a User
 */
router.post("/block", authRequired, async (req, res) => {
    const { userId } = req.body;
    const { sub } = req.payload;

    if (!userId || userId === "") {
        return res.status(400).send({ message: "Invalid Data" });
    }

    try {
        const userToBlock = await User.findById(userId);
        if (!userToBlock) {
            return res.status(400).send({ message: "Invalid User ID" });
        }

        await User.findByIdAndUpdate(sub, {
            $addToSet: {
                blocked: userToBlock.id,
            },
        });
        res.send({ message: "User Blocked" });
    } catch {
        res.status(500).send({ message: "Server Error! Try Again!" });
    }
});

/**
 * Like a User
 */
router.post("/like", authRequired, async (req, res) => {
    const { userId } = req.body;

    sendNotification(userId, {
        type: "Like",
        message: "Someone Liked Your Image",
    });
    res.send({ message: "Like Sent!" });
});

/**
 * Super Like a User
 */
router.post("/super-like", authRequired, async (req, res) => {
    const { userId } = req.body;
    const { sub } = req.payload;

    sendNotification(userId, {
        type: "Super Like",
        message: "Someone Super Liked Your Image",
        userId: sub,
    });
    res.send({ message: "Super Like Sent!" });
});

/**
 * Get Auth Users Data
 */
router.get("/me", authRequired, async (req, res) => {
    const { sub } = req.payload;
    try {
        const user = await User.findById(sub);
        res.send({
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch {
        res.status(500).send({ message: "Server Error! Try Again!" });
    }
});

module.exports = router;
