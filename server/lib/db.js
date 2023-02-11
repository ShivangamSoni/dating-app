const mongoose = require("mongoose");

module.exports = async function connect() {
    const { MONGODB_URI } = process.env;
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log("Failed to Connected to MongoDB");
        console.log(e);
        process.exit();
    }
};
