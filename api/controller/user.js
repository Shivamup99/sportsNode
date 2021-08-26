const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.getUser = async(req,res)=>{
    try {
        let user = await User.find().select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.getUserById = async(req,res)=>{
    try {
        let user = await User.findById({_id:req.params._id}).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.postUser = async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(user) return res.status(400).json({message:'user allready exist'})
    try {
        let user = new User(req.body)
        let salt = await bcrypt.genSalt(15)
        user.password = await bcrypt.hash(user.password,salt)
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.userLogin = async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(422).json({message:"email invalid"})
    let checkPassword = await bcrypt.compare(req.body.password,user.password )
    if(!checkPassword) return res.status(403).json({message:"invalid password"})
    try {
        let token = await jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"10h"})
        res.header('Authorization',token).status(200).json({token:token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.putUser = async(req,res)=>{
    try {
        let user = await User.findByIdAndUpdate({_id:req.params._id},{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            mobile:req.body.mobile,
        },{new:true})
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

exports.deleteUser = async(req,res)=>{
    try {
        let user = await User.findByIdAndDelete({_id:req.params._id})
        if(user){
            res.status(200).json({message:'user deleted'})
        } else{
            res.status(400).json({message:'user not found'})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



