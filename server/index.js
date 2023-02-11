require("dotenv").config();
const express = require("express");
const connectToDb = require("./lib/db");

const apiRouter = require("./routes/api");

const app = express();

app.use("/api", apiRouter);

(async function main() {
    await connectToDb();
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server Started at PORT: ${PORT}`);
    });
})();
