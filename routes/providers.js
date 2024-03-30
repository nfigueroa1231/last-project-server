var express = require('express');
var router = express.Router();

const Provider = require('../models/Provider')

const isAuthenticated = require('../middleware/isAuthenticated')

router.post('/create', (req, res, next) => {

    const { username, password } = req.body

    console.log(req.user)

    Provider.create({
        username,
        password,
        userId: req.user._id
    })
        .then((createdProvider) => {
            console.log("Created Provider ====>", createdProvider)
            res.json(createdProvider)
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
})

module.exports = router;
