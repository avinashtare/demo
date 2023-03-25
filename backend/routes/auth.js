// import express
const express = require("express");
// import router from express
const router = express.Router();
// import models
const User = require("../models/User");
// import express validator
const { body, validationResult } = require('express-validator');
// import bycriptjs for password encription
const bcrypt = require('bcryptjs');
// import javasvirpt web token => session
const jwt = require('jsonwebtoken');
const { response } = require("express");
// fetchuser middleware import
const fetchuser = require("../middleware/fetchuser");

// jwt secret data
const JWT_SECRET = "Thisissecrettoken";


// without validation
// router.get("/", (req, res) => {

// ROUTE 1 : with validation ==> Sign In  POST:- http://localhost:5000/api/auth/createuser .NO login Only sign in send data => {"name":"aviansh tare","email":"example@gmail.com","password":"pass"}

router.post("/createuser", [
    body('name').isLength({ min: 3 }),
    body('email',).isEmail(),
    body('password').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });

    // cheaking user name is exist
    if (user != null) {
        return res.status(400).json({ "errors": [{ "value": "Email address is alredy exist!", "msg": "Email is unique please choose diffrent email", "param": "email", "location": "body" }] });
    };

    // save in database
    // const user = User(req.body);
    // user.save()
    // res.send("Every thig is ok")

    // password => hash convert
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    // console.log(secPassword);

    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
    }).then(user => {
        // setting jwd => session
        let jwtData = {
            user: {
                id: user.id,
            },
        };
        // console.log(jwtData);

        // satting  user token
        const authToken = jwt.sign(jwtData, JWT_SECRET);
        // res.json(authToken);

        let params = { name: user.name, email: user.email };

        // success response new data created
        res.status(200).json({
            "success": [{
                "value": "user created!", "msg": "Your Account Successfyly Created.","authToken":authToken, "param": params, "location": "body"
            }]
        });
    }).catch(err => res.status(500).json({ "errors": [{ "msg": "invalid error" }] }));

    // for response
    // console.log(req.body)
    // res.send(req.body)
});


// -----------------------------------------------------------------
// for login api
// ROUTE 2 : with validation ==> Sign In  POST:- http://localhost:5000/api/auth/login .NO login Only sign in send data => {"email":"example@gmail.com","password":"pass"}

router.post("/login", [
    body('email',).isEmail(),
    body('password').exists(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    const { email, password } = req.body;

    try {


        let user = await User.findOne({ email: req.body.email });
        // console.log(user)

        // cheaking email exist in server
        if (user != null) {
            // if email exits go to this if condition 
            if (user.email == email) {

                // chaking password 
                let passwordCompare = await bcrypt.compare(password, user.password); //if password math return true otherwise false
                // console.log(passwordCompare)

                if (passwordCompare) {
                    // user password math
                    let jwtData = {
                        user: {
                            id: user.id,
                        },
                    };

                    const authToken = jwt.sign(jwtData, JWT_SECRET);
                    // return res.status(200).send(authToken);

                    let params = { name: user.name, email: user.email };

                    res.status(200).json({
                        "success": [{
                            "value": "successfuly login!", "msg": "You Have Successfuly Logdin", "param": params, "authToken": authToken, "location": "body"
                        }]
                    });
                }
                else {
                    return res.status(400).json({ "errors": [{ "msg": "Please try to login with correct credentials!" }] });
                }
            }
            else {
                return res.status(400).json({ "errors": [{ "msg": "Please try to login with correct credentials!" }] });
            }
        }
        else {
            return res.status(400).json({ "errors": [{ "msg": "Please try to login with correct credentials!" }] });
        };
    } catch (error) {
        return res.status(500).json({ "errors": [{ "msg": "Internal Server Error!" }] });
    }

});



// -----------------------------------------------------------------
// for login api
// ROUTE 2 :  Get user details  POST:- http://localhost:5000/api/auth/login .login Required and get user details
router.post("/getuser", fetchuser, async (req, res) => {
    try {

        // geting id from fetchuser
        let userId = req.user.id;

        // userid to geting data
        let user = await User.findById(userId).select(["-_id", "-password", "-date"]);

        res.status(200).json({
            "success": [{
                "value": "user data", "param": user, "location": "body"
            }]
        });

    } catch (error) {
        return res.status(500).json({ "errors": [{ "msg": "Internal Server Error!" }] });
    };
})

module.exports = router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5NTA1MDhlYmVhNzI5YmQ0ZmZiNWMxIn0sImlhdCI6MTY1MzkzMzMyMH0.ZEAlACvni62_svtdmJc1XHioLC8k4O9iGd4ELccf-pE