const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const UserSchema = new Schema({
    firstname: {
        required: true,
        type: String,
        minlength: 3,
        
    },
    lastname: {
        required: true,
        type: String,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email id already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("invalid Enail");
            }
          },
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = user = mongoose.model('users', UserSchema);