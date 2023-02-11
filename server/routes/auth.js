const path = require("node:path");
const { Router } = require("express");
const { hash } = require("bcrypt");

const { User } = require("../Models/index");
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

    if (!/^image/.test(image.mimetype)) {
        return res.status(400).send({ message: "Only Images Allowed" });
    }

    image.mv(uploadFolder + "/" + image.name);

    const hashedPassword = await hash(password, 10);

    try {
        const user = await new User({
            email,
            password: hashedPassword,
            image: image.name,
        }).save();

        res.status(201).send({ message: "Registered Successfully" });
    } catch {
        res.status(500).send({ message: "Server Error. Try Again!" });
    }
});

module.exports = router;
