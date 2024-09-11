const mongoose = require('mongoose')
require('dotenv').config()

const connectDatabase = async () => {
    let mongodbConnectionString = process.env.mongodbConnectionString || ''
    mongoose.connect(mongodbConnectionString,)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log('MongoDB Connection Error:', err));
}

module.exports = { connectDatabase }