const express = require('express');
const router = express.Router;
const route = router();

/**
 * @param {express.Router} app
 */
module.exports = function(app){
    app.use('/helloworld',route);

    route.get('',(req,res,next)=>{
        res.json({message:'Hello world'});
    });

}