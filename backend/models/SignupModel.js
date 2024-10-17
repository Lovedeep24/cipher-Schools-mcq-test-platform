const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
    },
    email: {
        type: String,
        required: [true, "Please add Email"],
        unique: true // Ensure emails are unique
    },
    password: {
        type: String,
        required: [true, "Please enter Password"],
    },
    role: {
        type: String,
        required: [true, "Please enter Role"],
        default: "User" // Set default role to "User"
    }
}, {
    timestamps: true  
});

module.exports = mongoose.model("Signup", SignupSchema);
