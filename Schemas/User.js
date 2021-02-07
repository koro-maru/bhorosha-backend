import mongoose from 'mongoose'
const {Schema} = 'mongoose'

const UserSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    biography: String,
    dateOfBirth: Date,
    password: String,
    address: String,
    savedUsers: [{type: mongoose.Types.ObjectId, ref: 'User'}], //I.E, following
    chatMessages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
    roles: [String],
    isActive: Boolean //Has completed email confirmation/not 
})


module.exports = mongoose.model('User', UserSchema);