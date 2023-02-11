require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const connectToDb = require("./lib/db");

const apiRouter = require("./routes/api");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000, // Around 10MB
        },
        abortOnLimit: true,
    }),
);

app.use("/api", apiRouter);

(async function main() {
    await connectToDb();
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server Started at PORT: ${PORT}`);
    });
})();
