// import express
const express = require("express");
const fetchuser = require("../middleware/fetchuser");
// import router from express
const router = express.Router();
// import express validator
const { body, validationResult } = require('express-validator');
// import models
const Note = require("../models/Note");
const { deleteOne } = require("../models/Note");

// Route 1 : Get All The Notes from server GET:"http://localhost:5000/api/notes/fetchallnotes" <= login requird

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        // id from fetchuser middleware
        const user = (req.user.id)
        const notes = await Note.find({ "user": user }).select("-user");

        res.send(notes);
    }
    catch (error) {
        res.status(500).json({
            "errors": [{ "msg": "invalid error" }],
        });
    }
});

// Route 2 : Add new not useing POST:"http://localhost:5000/api/notes/addnote" <= login requird =< body {"title":"aviansh tare","description":"my name is lakhan 4","tag":"today"}
router.post("/addnote", fetchuser, [
    body("title").isLength(3),
    body("description").isLength(5),
], async (req, res) => {
    // request send data
    const { title, description, tag } = req.body;
    // validtion show error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = (req.user.id)

        await Note.create({
            title: title,
            description: description,
            tag: tag,
            user: user
        }).then(user => {
            res.status(200).json({
                "success": [{
                    "value": "Success!", "msg": "You note successfuly saved.", "param": user, "location": "body"
                }],
            });
        }).catch(err => res.status(500).json({ "errors": [{ "msg": "invalid error" }] }));
    }
    catch (error) {
        res.status(500).json({
            "errors": [{ "msg": "invalid error" }],
        });
    };
});


// Route 3 : Update exexting note PUT:"http://localhost:5000/api/notes/updatenote/:id" <= login requird => sned id in urlhttp://localhost:5000/api/notes/updatenote/thisismyid and sed params => {"title":"new title","description":"new description 2021-2022","tag":"new world"}

router.put("/updatenote/:id", fetchuser, [
    // update vlaue validation
    body("title").isLength(3),
    body("description").isLength(5),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    try {
        const { title, description, tag } = req.body;

        let noteId = (req.params.id); // <= giving id in url
        let user = (req.user.id); // <= gating user id header middleware

        let newNote = { title: title, description: description, tag: tag };

        // server get user id 
        let serverUser = await Note.findById(noteId);
        serverUser = (serverUser.user)

        // cheaking user id is valid
        if (user != serverUser) { return res.status(500).json({ "errors": [{ "msg": "This Requist Not Allowd!" }] }); }

        // update note sql requist form server
        // let note = await Note.findByIdAndUpdate(noteId, { $set: newNote }, { new: true });
        // without id and user
        let note = await Note.findByIdAndUpdate(noteId, { $set: newNote }, { new: true }).select(["-user", "-_id"]);
        // console.log(note)

        res.status(200).json({
            "success": [{
                "value": "Successfuly updated!", "msg": "You Note successfuly updated !", "param": note, "location": "body"
            }]
        });

    } catch (error) {
        return res.status(500).json({ "errors": [{ "msg": "Internal Server Error!" }] });
    };
});


// Route 4 : Update exexting note DELETE:"http://localhost:5000/api/notes/deletenote/:id" <= login requird => sned id in urlhttp://localhost:5000/api/notes/deletenote/thisismyid

router.delete("/deletenote/:id", fetchuser, async (req, res) => {

    try {

        let noteId = (req.params.id); // <= giving id in url
        let user = (req.user.id); // <= gating user id header middleware

        // server get user id 
        let serverUser = await Note.findById(noteId);
        serverUser = serverUser.user;

        // cheaking user id is valid
        if (user != serverUser) { return res.status(500).json({ "errors": [{ "msg": "This Requist Not Allowd!" }] }); }

        // delte note sql request
        let deleteNote = await Note.findByIdAndDelete(noteId);
        // console.log(deleteNote);

        res.status(200).json({
            "success": [{
                "value": "Successfuly deleted!", "msg": "You Note successfuly deleted !", "param": deleteNote, "location": "body"
            }]
        });

    } catch (error) {
        return res.status(500).json({ "errors": [{ "msg": "Internal Server Error!" }] });
    }
});

module.exports = router;