require("dotenv").config();

const express = require('express');
const config = require('./config');
const loaders = require('./loaders');

async function startServer(){

    const app = express();
    
    await loaders(app);

    app.listen(config.port,err=>{
        if(err){
            console.error(err);
            process.exit(1);
        }

        console.log(` Server listen on port: ${config.port}`);
    });
};

startServer();

