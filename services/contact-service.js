const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact-api' ,{ useNewUrlParser: true });


const db = mongoose.connection;
const Contact = require('../models/contact');


db.on('error', console.error);

class ContactService {
    static async create(data){
        const contact = new Contact(data);
        
        return await contact.save(); 
    }

    static async retrieve(id){
        let data;
        if (id){
            data = await Contact.findById(id)
            .populate('address')
            .exec();
        }else{
            data = await Contact.find().exec();
        }
        if(!data){
            throw new Error('Sorry!! can not retrieve data');
        }
        return data;
    }

    static async update(id, data){
        const updated = await Contact.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if(!updated){
            throw new Error('Failed updating data!');
        }
        return updated;
    }

    static async delete(id){
        const deleted = await Contact.findByIdAndRemove(id);
        if(!deleted){
            throw new Error('Failed deleting data!');
        }
        return deleted;
    }
    
}


module.exports = ContactService;