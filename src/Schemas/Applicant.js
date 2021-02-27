import mongoose from 'mongoose'
import  User  from './User'
import {Schema} from 'mongoose'

export default User.discriminator('Applicant', 
    new mongoose.Schema({
       savedListings: [{ type: mongoose.Types.ObjectId, ref: 'JobListing' }],
       skills: [String],
       workHistory: [String],
       isLookingForJob: Boolean,
    })
)

