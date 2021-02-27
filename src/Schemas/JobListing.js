import mongoose from 'mongoose'
import Company from './Company'
import {Schema} from 'mongoose'

const ListingSchema = new Schema({
    creator: {type: mongoose.Types.ObjectId, ref: "Company", required: true},
    skillsRequired: [String],
    details: {type: String, required: true},
    dateStart: Date,
    dateEnd: Date
})

module.exports = mongoose.model("Listing", ListingSchema)