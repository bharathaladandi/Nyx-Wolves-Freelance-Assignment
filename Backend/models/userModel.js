const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {

        firstName: { type: String },
        lastName: { type: String },
        age:{type:Number},
        role: { type: String, default: "user" },
    },

    {
        timestamps: true,
    });

const Usermodel = mongoose.model("user", userSchema)    

module.exports = Usermodel