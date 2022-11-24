const mongoose =require('mongoose')
const Schema = mongoose.Schema

const mongoosePaginate =require('mongoose-paginate-v2')
const Employee = require('./User')




const UserSchema=new Schema({
    name:{
        type: String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },
    avatar:{
        type:String
    }
},{timestamps :true})

//const Employee =mongoose.model("Employee", EmployeeSchema)
module.exports=Employee