const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    generated_code:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User