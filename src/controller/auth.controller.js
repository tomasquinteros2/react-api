const { default: mongoose } = require('mongoose')
const User = require('../models/User')
const bcrypt = require("bcryptjs")
const createAccessToken = require("../libs/jwt");
const jwt = require("jsonwebtoken")
module.exports = {
    register: async (req,res,next)=>{
        const {name,email,password} = req.body;
        try{
            const userFound = await User.findOne({email})
            if(userFound){return res.status(400).json(["The email already exists"])}
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new User({
                name,
                email,
                password : passwordHash,
            })
            const user = await newUser.save()
            const token = await createAccessToken({id: user._id})
            res.cookie("token", token)
            res.status(200).json({
                id:user._id,
                name:user.name,
                email:user.email,
            })
        }
        catch(e){
            console.log("no se pudo crear"+e)
        }
        
    },
    login: async (req,res,next)=>{
        const {email,password} = req.body;
        try{
            const userFound = await User.findOne({email})
            if(!userFound) return res.status(400).json({message:"User not found"})

            const isMatch = await bcrypt.compare(password, userFound.password)
            if(!isMatch) return res.status(400).json({message:"Incorret password"})
            
            const token = await createAccessToken({id: userFound._id})
            res.cookie('token', token, {
                httpOnly: true,
                secure: true, 
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });
            console.log(token.expires+"token expires")
            res.status(200).json({
                id:userFound._id,
                name:userFound.name,
                email:userFound.email,
                token: token
            })
        }
        catch(e){
            console.log("no se pudo crear"+e)
        }
        
    },
    logout: (req,res,next)=>{
        res.cookie("token","",{
            expires: new Date(0)
        })
        return res.sendStatus(200)
    },
    profile: async(req,res,next)=>{
        const userFound = await User.findById(req.user.payload.id)
        if(!userFound) return res.status(400).json({message:"User not found"})

        return res.json({
            id:userFound._id,
            name:userFound.name,
            email:userFound.email
        })
    },
    verifyToken: async(req,res)=>{
        
        const token  = req.headers.authorization;
        console.log(token)
        if (!token) return res.status(400).send({ message: 'Error' });

        jwt.verify(token, "secret123", async (error, user) => {
            if (error) {
                console.error("Error verifying JWT token:", error);
                return res.sendStatus(401);
            }

            const userFound = await User.findById(user.id);

            if (!userFound){ 
                console.error("Usuario no encontrado en la base de datos");
                return res.sendStatus(401);
            }
            return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            });
        });
    }
}