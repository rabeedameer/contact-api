const express = require('express');
const router = express.Router();
const Boom = require('boom'); 
const config = require('./config');
const jwt = require('jsonwebtoken'); // create, sign in, verify
const UserService = require('../services/user-service');
const User = require('../models/user');



const decodeToken = (req, res, next) => {
  const Token = req.headers['access-token'];
  if (!Token){
    return res.status(403).json({
      message: 'No Token provided'
    });
  }
  jwt.verify(Token, config.secret, (err, decoded)=> {
    if (err){
      res.status(401).json({
        message: 'Failed authenticating token.'
      });
    }else {
      req.decoded = decoded;
      next();
    }
  });

}
const validateUser= async (req, res, next)=>{
  const {_id} = req.decoded;
 
  try{
    const user = await UserService.findById(_id).exec();

    if (!user){
      return res.status(401).json({
        message: 'Failed authenticating token.'
      });
    }
    req.user = user;
    next();
  }catch(err){
    console.error(err);
    res.status(401).json({message: 'Failed authenticating token.'});
  }
}

const sendToken = (req, res) =>{
  const {user} = req;
  const payload = {
    _id: user._id
  }
  const token = jwt.sign(payload, config.secret, {
    expiresIn: 60 * 60 * 24         // 24 Hours
  });
  
  res.json({
    message: 'this is your token!', token
  });
}

/*New User*/
router.post('/signup', async(req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    if(!req.body.name || !req.body.password){
      next(Boom.badRequest(''))
    }
   req.user = user;
   next();
  } catch(err){
    next(Boom.badRequest('user already exists'));
    if(err.name === 'ValidationError'){
      next(Boom.badRequest(err));
    }
  }
},sendToken);


/* sign in a user */ 
router.post('/signin', async(req, res, next) => {
  const {name, password} = req.body;
  if (!name || !password) {
    next(Boom.badRequest('name or password missing'));
  }
  try {
    
    const user = await User.findOne({name});
    if(!user || !user.authenticate(password)){
      next(Boom.unauthorized('Authentication failed'));
    }
    req.user= user;
    next();
  } catch(err){
    console.error(err)
    next(Boom.notFound('No such a user'));
  }
}, sendToken);


router.use(decodeToken, validateUser);// this middleware verifies Token

module.exports = router;
