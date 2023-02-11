const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
});

module.exports = new model("User", UserSchema);
