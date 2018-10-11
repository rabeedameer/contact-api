const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact-api');


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
            data = await Contact.findById(id).exec();
        }else{
            data = await Contact.find().exec();
        }
        if(!data){
            throw new Error('Sorry!! can not retrieve data');
        }
        return data;
    }

    static async update(id){
        return {
            message : 'contact update'
        };
    }

    static async delete(id){
        return {
            message : 'contact delete'
        };
    }
    
}


module.exports = ContactService;