const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const express = require('express');
const config = require('../../config');
/**
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {Function} next 
 */
const auth = async function(req,res,next){
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        const data = jwt.verify(token,config.jwtSecret);

        const user = await User.findOne({_id: data._id,'tokens.token':token});
        if(!user){
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({error:'Not authorized to access this resource'})
    }
};

module.exports = auth;