import mongoose from 'mongoose'
import Company from './Company'
const {Schema} = 'mongoose'

const ListingSchema = new Schema({
    creator: {type: Company},
    skillsRequired: [String],
    details: String,
    dateStart: Date,
    dateEnd: Date
})

module.exports = mongoose.model("Listing", ListingSchema)