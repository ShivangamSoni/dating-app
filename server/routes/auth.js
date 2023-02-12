const path = require("node:path");
const { Router } = require("express");
const { hash, compare } = require("bcrypt");

const { User } = require("../Models/index");
const { signJwt } = require("../lib/jwt");
const { authRequired } = require("../Middleware/authRequired");

const uploadFolder = path.join(__dirname, "../upload");
const router = Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const { image } = req.files;

    if (
        !email ||
        email.trim() === "" ||
        !password ||
        password.trim() === "" ||
        !image
    ) {
        return res.status(400).send({ message: "Incomplete Data" });
    }

    const count = await User.countDocuments({ email });

    if (count > 0) {
        return res.status(409).send({ message: "Email already Registered" });
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        image: image.name,
    });

    if (!/^image/.test(image.mimetype)) {
        return res.status(400).send({ message: "Only Images Allowed" });
    }

    image.mv(uploadFolder + "/" + user.id + "-" + image.name);

    try {
        await user.save();

        res.status(201).send({ message: "Registered Successfully" });
    } catch {
        res.status(500).send({ message: "Server Error. Try Again!" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(400).send({ message: "Incomplete Data" });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).send({
                message: "Incorrect Email or Password",
            });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                message: "Incorrect Email or Password",
            });
        }

        const token = signJwt(user.id);
        res.status(201).send({ message: "Logged In", token });
    } catch {
        res.status(500).send({ message: "Server Error. Try Again!" });
    }
});

/**
 * Verify Token
 */
router.get("/verify", authRequired, async (req, res) => {
    const { sub } = req.payload;
    try {
        const user = await User.findById(sub);
        res.status(200).send({ message: "Logged In" });
    } catch {
        res.status(500).send({ message: "Server Error. Try Again!" });
    }
});

module.exports = router;
