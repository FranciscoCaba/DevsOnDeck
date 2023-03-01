const mongoose = require('mongoose')

const PositionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        minlength: [2, "The name must be at least 2 characters long"]
    },
    description: {
        type: String,
        required: [true, "The description is required"],
        minlength: [10, "The description must be at least 10 characters long"]
    },
    skills: {
        type: [String],
        default: undefined,
        required: [true, "Skills are required"],
        validate: {
            validator: function(value){
                return value.length < 6
            },
            message: "Must be 5 or less skills"
        }
    },
    userId: {
        type: String,
        required: [true, "userId is required"]
    }
})

module.exports = mongoose.model("Position", PositionSchema)