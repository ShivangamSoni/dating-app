const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    blocked: { type: [Schema.Types.ObjectId] },
});

module.exports = new model("User", UserSchema);
