const express = require('express');
const helloworld = require('./routes/helloworld');
const user = require('./routes/user');

module.exports = function(){
    const app = express.Router();
    helloworld(app);
    user(app);
    console.log(process.cwd());
    return app;
}
