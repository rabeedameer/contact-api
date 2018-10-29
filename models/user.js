const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

function encrypt(password){
    if (!password) return '';
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}


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
UserSchema.pre('save', function(next){
    if(!this.isModified('password')) return next();

    this.password = encrypt(this.password);
    next();
});

UserSchema.methods = {
    authenticate :  function(password){
        return bcrypt.compareSync(password, this.password);
    },
    toJSON: function(){
        const user = this.toObject();
        delete user.password;
        return user;
    }
}



module.exports = mongoose.model('User', UserSchema);
