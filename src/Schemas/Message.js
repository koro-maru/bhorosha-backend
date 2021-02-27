import mongoose from 'mongoose'
import {User} from './User'
import {Schema} from 'mongoose'

const MessageSchema = new Schema({
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: String,
    dateSent: {type: Date, default: Date.now}
})


module.exports = mongoose.model('Message', MessageSchema);