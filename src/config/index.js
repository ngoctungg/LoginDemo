const dotenv = require('dotenv').config();

if(!dotenv){
    throw new Error('⚠ Can not find file .env ⚠');
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    port: parseInt(process.env.PORT,10),

    databaseURI : process.env.MONGODB_URI,

    jwtSecret : process.env.JWT_KEY,

    api : {
        prefix: '/api',
    }
}

