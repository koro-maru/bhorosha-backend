import mongoose from 'mongoose'
import {Schema} from 'mongoose'

const UserSchema =  new Schema({
    name: String,
    phone: String,
    email: String,
    biography: String,
    dateOfBirth: Date,
    password: String,
    address: String,
    savedUsers: [{type: mongoose.Types.ObjectId, ref: 'User', default:[]}], //I.E, following
    chatMessages: [{ type: mongoose.Types.ObjectId, ref: 'Message', default: []}],
    roles: String,
    isActive: Boolean //Has completed email confirmation/not 
})


module.exports = mongoose.model('User', UserSchema);