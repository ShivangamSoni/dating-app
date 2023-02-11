require("dotenv").config();
const { hash } = require("bcrypt");

const connectToDb = require("../lib/db");
const { User } = require("../Models/index");

const password = "Test@123";

(async function seed() {
    try {
        await connectToDb();
        for (let i = 1; i <= 10; i++) {
            const email = `user-${i}@test.com`;
            const hashedPassword = await hash(password, 10);
            const user = await new User({
                email,
                password: hashedPassword,
                image: "test.jpg",
            }).save();
        }

        console.log(
            `\nCreated 10 Test Users.\nEmail: user-<n>@test.com [n = 1...10]\nPassword: ${password}`,
        );
        process.exit();
    } catch (e) {
        console.log("Error");
        console.log(e);
    }
})();
