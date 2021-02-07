import mongoose from 'mongoose'
import {User} from './User'
const {Schema} = 'mongoose'

const MessageSchema = new Schema({
    sender: {type: User},
    reciever: {type: User},
    body: String,
    dateSent: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Message', MessageSchema);