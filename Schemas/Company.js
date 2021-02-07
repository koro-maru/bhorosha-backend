import mongoose from 'mongoose'
import { User } from './User'
const { Schema } = 'mongoose'

const CompanySchema = User.discriminator('Company', 
    new Schema({
       jobListings: [{ type: mongoose.Types.ObjectId, ref: 'JobListing' }],
       skillsRequired: [String],
       sector: String,
       hiring: Boolean
    })
)

module.exports = mongoose.model('Applicant', ApplicantSchema);