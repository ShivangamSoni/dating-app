require("dotenv").config();
const { join } = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const connectToDb = require("./lib/db");
const apiRouter = require("./routes/api");
const { createSocket } = require("./lib/socket");

const app = express();
const server = require("http").createServer(app);
createSocket(server);

app.use(express.static(join(__dirname, "../", "client", "dist")));

app.use(cors({ origin: "*" }));
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
    server.listen(PORT, () => {
        console.log(`Server Started at PORT: ${PORT}`);
    });
})();
