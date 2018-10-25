const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const {Schema} = mongoose;



const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
      type: String,
      required: true,
  }
});

UserSchema.plugin(idValidator);

module.exports = mongoose.model('User', UserSchema);
