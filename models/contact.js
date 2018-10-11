const mongoose = require('mongoose');
    
    const ContactSchema = new mongoose.Schema({
        name : {
            type : 
                {
                    first: String,
                    last: String
                },
            required : true
        },
        address: String,
        phoneNumber: [String],
        birthDate : Date
       });



module.exports = mongoose.model('Contact', ContactSchema);
