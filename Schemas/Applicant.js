import mongoose from 'mongoose'
import { User } from './User'
const { Schema } = 'mongoose'

const ApplicantSchema = User.discriminator('Applicant', 
    new Schema({
       savedListings: [{ type: mongoose.Types.ObjectId, ref: 'JobListing' }],
       skills: [String],
       workHistory: [String],
       isLookingForJob: Boolean,
    })
)

module.exports = mongoose.model('Applicant', ApplicantSchema);