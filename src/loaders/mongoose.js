const config = require('../config');
const mongoose = require('mongoose');

module.exports =async function () {
    await mongoose.connect(config.databaseURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
}