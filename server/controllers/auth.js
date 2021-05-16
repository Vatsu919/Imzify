import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signin = async (req,res) => {
    const {username,password} = req.body;
    

    try {

        const user = await User.findOne({username});
        console.log(user);
        if(!user)
        {
            return res.status(404).json({message:'User does not exist'});
        } 
        
        const validate = await bcrypt.compare(password,user.password);
        console.log(validate);
        if(!validate)
        {
            return res.status(400).json({message:'Incorrect password'});
        }

        const token = jwt.sign({username: user.username,id: user._id},'cloneyy',{expiresIn: '2h'});
        res.status(200).json({result: user, token});
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong'});
    }

}

export const signup = async (req,res) => {
    const {profilepic,fullname,username,password} = req.body;

    try {
        const user = await User.findOne({username});
        
        if(user)
        {
            res.status(400).json({message:'User already exists!!'});
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({profilepic,fullname,username,password:hashedPassword});
        const token = jwt.sign({username: result.username,id: result._id},'cloneyy',{expiresIn: '2h'});

        res.status(200).json({result,token});
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong'});
    }
}

export const listAll = async (req,res) => {
    try {
        const allUsers = await User.find();

        res.status(200).json({allUsers});
    } catch (error) {
        res.status(500).json({message:'Something went wrong'});
    }
}