const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    Weight: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: String,
    image: {
        type: String,
        required: true
    },
    MRP: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 4.9
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);