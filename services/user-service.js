const mongoose = require('mongoose');
const config  = require('../routes/config');
const db      = mongoose.connection;
const User    = require('../models/user');


mongoose.connect(config.db,{ useNewUrlParser: true });

db.on('error', console.error);

class UserService {
    static async create(data){
        const user = new User(data);
        
        return await user.save(); 
    }

    static async retrieve(id){
        let data;
        if (id){
            data = await User.findById(id)
            .exec();
        }else{
            data = await User.find().exec();
        }
        if(!data){
            throw new Error('Sorry!! can not retrieve data');
        }
        return data;
    }

    
}


module.exports = UserService;