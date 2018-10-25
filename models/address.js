const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const {Schema} = mongoose;


const AddressSchema = new Schema({
  street : String,
  street_num: Number,
  city: String,
  state:String,
  country: String,
  zip: String,
  contact : {
      type: Schema.Types.ObjectId,
      ref: 'Contact',
      required: true
  }
});

AddressSchema.plugin(idValidator);

module.exports = mongoose.model('Address', AddressSchema);
