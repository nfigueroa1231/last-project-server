var axios = require('axios');
var express = require('express');
var router = express.Router();

const Provider = require('../models/Provider')

const isAuthenticated = require('../middleware/isAuthenticated');
const Account = require('../models/Account');

router.post('/', async (req, res, next) => {

    const { username, password } = req.body

    try {
       // Login user / getting luma token
        const authResponse = await axios.post('https://api.miluma.lumapr.com/miluma-api/auth', {username, password})
        const lumaToken = authResponse.data.data.token;
        console.log(authResponse)

        // Getting luma user accounts
        // const endpointAccount = 'https://api.miluma.lumapr.com/miluma-api/api/v2/users/me' o
        const accountResponse = await axios.get('https://api.miluma.lumapr.com/miluma-api/api/v2/users/me', {
            headers: { Authorization: `Bearer ${lumaToken}` },
        })
        const accounts = accountResponse.data.data.accounts

        //guarda cuenta de luma
        const createdProvider = await Provider.updateOne(
            {
                type: 'Luma',
                username,
                userId: req.user._id
            }, //este objecto es el filter, para match si ya existe
            {
                username,
                password,
                type: 'Luma',
                userId: req.user._id
            }, //este objecto es el update que queremos hacer
            { upsert: true }, //crea uno nuevo si no existe
            { new: true } //para que devuelva el mas nuevo
        )
        
        const accountList = []
        for (const account of accounts) {
            const createdAccount = await Account.updateOne(
                {
                    accountNumber: account.accountNumber,
                    providerId: createdProvider._id 
                },
                {
                    accountNumber: account.accountNumber,
                    currentBalance: account.currentBalance,
                    providerId: createdProvider._id //el que se creo en ese momento
                },
                { upsert: true }, //crea uno nuevo si no existe
                { new: true } //para que devuelva el mas nuevo

            )
            accountList.push(createdAccount)
        };

        res.json(accountList);
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})





module.exports = router;





    // o este modo

    //guarda cuenta de luma
    // Provider.create({
    //     username,
    //     password,
    //     userId: req.user._id
    // })
    //     .then((createdProvider) => {
    //         Account.create({
    //             accountNumber,
    //             currentBalance,
    //             providerId: createdProvider._id //el que se creo en ese momento
    //         })
    //         .then((createdProvider) => {
    //             console.log("Created Provider ====>", createdAccount)
    //         })
    //             .catch((err) => {
    //             console.log(err)
    //             res.json(err)
    //                 })

    //             res.json(createdProvider, createdAccount)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             res.json(err)
    //         })
    //     })

