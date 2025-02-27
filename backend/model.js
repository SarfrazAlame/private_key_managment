
const mongoose = require("mongoose")

mongoose.connect()

const UserSchema = mongoose.Schema({
    username:String,
    password:String,
    privateKey:String,
    publicKey:String
})

const userModel = mongoose.model(UserSchema)

module.exports = {
    userModel,
}