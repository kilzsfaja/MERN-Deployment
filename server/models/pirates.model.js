// import mongoose to build the model 
const mongoose = require('mongoose');

// the model - the rules the entries need to follow
const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    chests: {
        type: Number,
        required: [true, "Treasure chests is required"],
    },
    catchPhrase: {
        type: String,
        required: [true, "Catch phrase is required"],
    },
    position: {
        type: String,
        required: [true, "Crew position is required"],
    },
    pegLeg: {
        type: Boolean,
        default: true
    },
    eyePatch: {
        type: Boolean,
        default: true
    },
    hookHand: {
        type: Boolean,
        default: true
    },
}, {timestamps: true})

const Pirate = mongoose.model('Pirate', PirateSchema);

module.exports = Pirate