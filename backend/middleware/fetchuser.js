const jwt = require('jsonwebtoken');
const JWT_SECRET = "Thisissecrettoken";

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and ad id to req object

    // geting jwt token from header 
    const token = req.header("auth-token"); //<= add header name is auth=token

    // console.log(token)
    // header token not exists
    if (!token) {
        res.status(401).send({ "errors": [{"value":"token not exists", "msg": "Please authenticate using a valid token!" }] })
    }
    else {
        try {
            // header token exists
            
            const data = jwt.verify(token, JWT_SECRET);
            // console.log(data) giving like this => { user: { id: '62950508ebea729bd4ffb5c1' }, iat: 1653933320 }

            // setting user data for next function
            req.user = data.user;

            // next function called
            next()
        } catch (error) {
            res.status(401).send({ "errors": [{ "msg": "Please authenticate using a valid token!" }] })
        };
    };
};

module.exports = fetchuser;

// notes
// weare gating sisson token =>  id and giving data

// next means auth file fetchuser next function