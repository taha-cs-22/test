import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//Log-in User
const loginUser = async (req,res) => {
    const{email,password } = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentails"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})

    }catch(error){
        console.log(error)
        res.status(500)
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register User
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        //Checking is User already exists
        const exists = await userModel.findOne({email})
        if (exists){
            return res.json({success:false,message:"User already exists"})
        }
        //Validating Email & Strong Password
        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a Valid Email"})
        }

        if (password.length < 8){
            return res.json({success:false,message:"Please Enter a Strong Password"})
        }

        //hashing user Passwordc
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.status(500)
    }
}

export{loginUser , registerUser}