import { verify } from "jsonwebtoken";

const handler = (req, res)=> {
    if(req.method !== 'GET') return;

    const { token } = req.cookies
    if(!token) return res.status(401).json({status: 'failed', message: 'token does not exist'})

    const secretKey = process.env.SECRET_KEY
    try{
        const tokenData = verify(token, secretKey )
        if(tokenData) return res.status(200).json({status: 'success', message: 'logged in', data: tokenData})
    }catch(err){
        res.status(401).json({status: 'failed', message: 'invalid token', data: err})
    }
}

export default handler