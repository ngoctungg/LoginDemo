const expxress = require('express');
const User = require('../../models/User');
const auth = require('../middlewares/auth');
const route = expxress.Router();

/**
 * 
 * @param {expxress.Router} app
 */
module.exports = function(app){
    app.use('/users',route);
    /**
     * @param {expxress.request} req
     * @param {expxress.response} res
     */
    route.post('/register',async function(req,res){
        try{
            const user = new User(req.body);
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({user,token});
        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    });

    route.use('/login',async function(req,res){
        try {
            const { password,email }= req.body;
            const user = await User.findByCredentials(email,password);
            if(!user){
               return res.status(401).send({error: 'Login failed! Check authentication credentials'});
            }
            const token = await user.generateAuthToken();
            res.status(202).send({user,token});
        } catch (err) {
            console.error(err);
            res.status(400).send(err);
        }
    });

    route.get('/me',auth,(req,res)=>{
        res.send(req.user);
    });

    route.post('/me/logout',auth,async (req,res)=>{
        try {
            const token = req.token;
            req.user.tokens = req.user.tokens.filter(t=>t.token !== token);
            await req.user.save();
            res.send({"message":"logout is successful"});
        } catch (error) {
            console.log(error);
        }
    });

    route.post('/me/logoutall',auth,async (req,res)=>{
        try {
            const token = req.token;
            req.user.tokens.splice(0,req.user.tokens.length);
            await req.user.save();
            res.send({"message":"logout is successful"});
        } catch (error) {
            console.log(error);
        }
    });

    route.get('/',(req,res)=>{
        res.json({"message":"OK"});
    })
}