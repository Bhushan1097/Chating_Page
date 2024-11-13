const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {   // Corrected 'form' to 'from'
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        maxlength: 50,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,  // Adding default date
    },
});

// Model name should be "chat", not "chta"
const Chat = mongoose.model("Chat", chatSchema);

module.exports=Chat;