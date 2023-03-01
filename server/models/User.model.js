const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    accountType: {
        type: String,
        required: [true, "Account Type must be specified"]
    },
    orgName: {
        type: String,
        minlength: [1,"Organization Name is required"]
    },
    firstname: {
        type: String,
        required: [true, "First Name is required"],
        minlength: 2
    },
    lastname: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    city: {
        type: String,
        required: [true, "City is required"]
    },
    state: {
        type: String,
        required: [true, "State is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    languages: {
        type: [String],
    },
    frameworks: {
        type: [String]
    },
    shortBio: {
        type: String
    }
})

UserSchema.pre('save', async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    }catch{
        console.log("Error whilst trying to create User");
    }
})



module.exports = mongoose.model("User",UserSchema)