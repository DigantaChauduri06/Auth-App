const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: 'string',
        required: [true, 'First Name is required']
    },
    lastName: {
        type: 'string',
        required: [true, 'Last Name is required']    
    },
    email: {
        type: 'string',
        required: [true, 'Email is required']    
    },
    password: {
        type: 'string',
        required: [true, 'Password is required']
    },
    ImageUrl: {
        type: 'string',
    },

})

const model = mongoose.model('user', userSchema);
module.exports = model;