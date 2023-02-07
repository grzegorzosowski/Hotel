const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Room", RoomSchema);
