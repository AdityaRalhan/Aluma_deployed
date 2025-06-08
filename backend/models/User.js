import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {type: String , required: true, unique: true},
    password : {type: String , required: true},
    name: {type: String, default: ''},
    occupation: {type: String, default: ''},
    age: Number,
    gender : String,
    createdAt: { type: Date, default: Date.now },
    description: { type: String, default: '' },
    Physical_Activity: { type: String, default: '' },
    Current_Medication: { type: String, default: '' },
    trustedContacts: [{
        name: String,
        phone: String,
        relationship: String
      }],
      
})

const User = mongoose.model('User', userSchema);
export default User;