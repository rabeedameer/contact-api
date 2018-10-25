const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const {Schema} = mongoose;

const NameSchema = require('./name-schema.js');

const ContactSchema = new Schema({
  name: {
    type: NameSchema,
    required: true
  },
  phone_number: [String],
  emails: [String],
  date_of_birth : Date,
}); 

ContactSchema.virtual('addresses',{
  ref:'Address',
  localField:'_id',
foreignField:'contact'
});


ContactSchema.plugin(idValidator);

module.exports = mongoose.model('Contact', ContactSchema);
