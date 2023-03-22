const { serialize } = require("cookie");

const handler = (req, res)=>{
    if(req.method !== 'GET') return;

    const cookie = serialize('token', '', {maxAge: 0, path: '/', httpOnly: true})

    res.status(200).setHeader('Set-Cookie', cookie).json({status: 'success', message: 'logged out!'})
}

export default handler