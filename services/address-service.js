const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact-api',{ useNewUrlParser: true });


const db = mongoose.connection;
const Address = require('../models/address');


db.on('error', console.error);

class AddressService {
    static async create(data){
        const address = new Address(data);
        
        return await address.save(); 
    }

    static async retrieve(id){
        let data;
        if (id){
            data = await Address.findById(id)
            .exec();
        }else{
            data = await Address.find().exec();
        }
        if(!data){
            throw new Error('Sorry!! can not retrieve data');
        }
        return data;
    }

    static async update(id, data){
        const updated = await Address.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if(!updated){
            throw new Error('Failed updating data!');
        }
        return updated;
    }

    static async delete(id){
        const deleted = await Address.findOneAndDelete(id);
        if(!deleted){
            throw new Error('Failed deleting data!');
        }
        return deleted;
    }
    
}


module.exports = AddressService;