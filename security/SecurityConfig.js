const jwt = require('jsonwebtoken');
const SECRET = '3lz41fmg-bs1-1nf0'

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token']
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err) return res.status(401).end()

        req.userId = decoded.userId;
        //console.log(req.userId)
        const decoded1 = jwt.decode(token);
        //console.log(decoded1);
        next()
    })
}

module.exports = verifyJWT
