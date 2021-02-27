import mongoose from 'mongoose'
import  User  from './User'
import {Schema} from 'mongoose'

export default User.discriminator('Company', 
    new Schema({
       jobListings: [{ type: mongoose.Types.ObjectId, ref: 'JobListing' }],
       skillsRequired: [String],
       sector: String,
       hiring: Boolean
    })
)
