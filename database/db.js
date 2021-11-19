const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

exports.connect = () => {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('DB connection established');
    }).catch(e => {
        console.log(e);
    })
}