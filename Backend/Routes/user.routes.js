const express = require('express');
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
// const UserRouter = Router();
const bcrypt = require("bcrypt");
const Usermodel = require("../models/userModel");

// Get all records
UserRouter.get("/", async (req, res) => {

    try {
        const user = await Usermodel.find();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})



// Add a new record
UserRouter.post('/create', async (req, res) => {
    const { firstName, lastName } = req.body;

    try {
        const newRecord = new Usermodel({
            firstName,
            lastName
        });

        await newRecord.save();
        res.send(newRecord);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




// Update a record
UserRouter.put('/:id', async (req, res) => {
    const { firstName, lastName } = req.body;

    try {
        let user = await Usermodel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.firstName = firstName;
        user.lastName = lastName;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Delete a record
UserRouter.delete('/:id', async (req, res) => {
    try {
        let user = await Usermodel.findByIdAndDelete(req.params.id);

        if (user) {
            return res.status(404).send({ msg: 'User delete Successfully' });
        }

        else{
            res.send({ msg: "User not Found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    
});

module.exports = { UserRouter } 