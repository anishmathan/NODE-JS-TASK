const User =require("../model/Employee");
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken');
const { json } = require("body-parser");

const register =(req, res, next)=>{
    bcrypt.hash(req.body.password, 10, function(err,hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let user=new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
        User.save()
        .then(User=>{
            res.json({
                message: 'User Added Successfully'
            })
        })
            .catch(error=>{
                res.json({
                    message:'an Error occured!'
                })
            })
        
    })

    
}

const  login =(req,res,next)=>{
    var username =req.body.username
    var password=req.body.password

    user.findOne({$or:[{email:username},{phone:username}]})
    .then(user=>{
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if (err){
                    res.json({
                        error:err
                    })
                }   
                if(result){
                    let token=jwt.sign({name : user.name},'thesecrettoken', {expiresIn:'30s'})
                    let refreshtoken=jwt.sign({name : user.name},'refreshtokensecret', {expiresIn:'48h'})
                    res.json({
                        message:'Login successful',
                        token
                    })
                }else{
                    res.json({
                        message:'Password does not matched'
                    })
                }        
            })

        }else{
            res.json({
                message:'no user found'
            })
        }
    })
}

const refreshToken =(req, res, next)=>{
    const refreshToken= req.body.refreshToken
    jwt.verify(refreshToken, 'refreshtokensecret', function(err, decode){
        if(err){
            res.status(400).json({
                err
            })
        }
        else {
            let token=jwt.sign({name : user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_SECRET_TIME})
            let refreshToken =req.body.refreshToken
            res.status(200).json({
                message:'Token refreshed successfully',
                token,
            })
        }
    })
}
module.exports={
    register, login, refreshToken
}