import { compare } from "bcryptjs";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

const { default: Seller } = require("@/models/seller");
const { default: connectDB } = require("@/utils/connectDB");

const handler = async (req, res)=>{
    if(req.method !== 'POST') return;
    
    const {email, password} = req.body
    if(!email || !password) return res.staus(401).json({status: 'failed', message: 'invalid data'})

    try{
        connectDB()
    }catch(err){
        res
        .status(500)
        .json({ status: "failed", message: "error in connecting DB" });
    }

    const user = await Seller.findOne({email: email})
    if(!user) return res.status(404).json({status: 'failed', message: 'user not found'})

    const validPass= await compare(password, user.password)
    if(!validPass) return res.status(422).json({status: 'failed', message: 'incorrct password'})

    const secretKey = process.env.SECRET_KEY
    const token = sign({email: email}, secretKey, {expiresIn: 60*60})
    const cookie = serialize('token', token, {maxAge: 60*60, path: '/', httpOnly: true})

    res.status(200).setHeader('Set-Cookie', cookie).json({status: 'success', message: 'logged in!'})
    
}

export default handler