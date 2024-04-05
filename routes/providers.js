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
        const authResponse = await axios.post('https://api.miluma.lumapr.com/miluma-api/auth', { username, password })
        const lumaToken = authResponse.data.data.token;
        // console.log(authResponse)

        // Getting luma user accounts
        // const endpointAccount = 'https://api.miluma.lumapr.com/miluma-api/api/v2/users/me' o
        const accountResponse = await axios.get('https://api.miluma.lumapr.com/miluma-api/api/v2/users/me', {
            headers: { Authorization: `Bearer ${lumaToken}` },
        })
        const accounts = accountResponse.data.data.accounts
        // username: {
        //     type: String,
        //     required: true
        // },
        // password: {
        //     type: String,
        //     required: true
        // },
        // type: {
        //     type: String,
        //     required: true
        // },
        // userId: {
        //guarda cuenta de luma
        const createdProvider = await Provider.create(
            {
                type: 'Luma',
                username,
                password,
                userId: req.user._id
            }
        )
        // const createdProvider = await Provider.updateOne(
        //     {
        //         type: 'Luma',
        //         username,
        //         userId: req.user._id
        //     }, //este objecto es el filter, para match si ya existe
        //     {
        //         username,
        //         password,
        //         type: 'Luma',
        //         userId: req.user._id
        //     }, //este objecto es el update que queremos hacer
        //     { upsert: true }, //crea uno nuevo si no existe
        //     { new: true } //para que devuelva el mas nuevo
        // )

        const accountList = []
        for (const account of accounts) {
            const createdAccount = await Account.create({...account, user: req.user._id, providerId: createdProvider._id}
            )
            accountList.push(createdAccount)
        };
        // for (const account of accounts) {
        //     const createdAccount = await Account.updateOne(
        //         {
        //             accountNumber: account.accountNumber,
        //             providerId: createdProvider._id
        //         },
        //         {
        //             accountNumber: account.accountNumber,
        //             currentBalance: account.currentBalance,
        //             userId: req.user._id,
        //             providerId: createdProvider._id //el que se creo en ese momento
        //         },
        //         { upsert: true }, //crea uno nuevo si no existe
        //         { new: true } //para que devuelva el mas nuevo

        //     )
        //     accountList.push(createdAccount)
        // };

        res.json({createdProvider, accountList});
    } catch (err) {
        console.log(err)
        res.json(err)
    }
})

router.get('/', isAuthenticated, async (req, res, next) => {
    console.log("backend providers ===>")
    try {
        const userProviders = await Provider.find({  //find all the providers with that userId
            userId: req.user._id
        })

        const accounts = await Account.find({user: req.user._id})  //find the accounts with that user ID

        console.log("These are the accounts =====>", {userProviders, accounts})

        let povidersWithAccounts = userProviders.map((prov) => {
            return {
                ...prov._doc,
                accounts: accounts.filter((account) => account.providerId.toString() == prov._id.toString()) //accounts that belong to that perticular provider
            }
        })
        
        console.log({ povidersWithAccounts })
        res.json(povidersWithAccounts);

    }
    catch (err) {
        console.log(err)
        res.json(err)

    }

})

router.get('/details/:providerId', isAuthenticated, async (req, res, next) => {

    try {

        let thisProvider = await Provider.findById(req.params.providerId)

        let username = thisProvider.username
        let password = thisProvider.password

        const authResponse = await axios.post('https://api.miluma.lumapr.com/miluma-api/auth', { username, password })
        const lumaToken = authResponse.data.data.token;
        // console.log(authResponse)

        // Getting luma user accounts
        // const endpointAccount = 'https://api.miluma.lumapr.com/miluma-api/api/v2/users/me' o
        const accountResponse = await axios.get('https://api.miluma.lumapr.com/miluma-api/api/v2/users/me', {
            headers: { Authorization: `Bearer ${lumaToken}` },
        })

        const accounts = accountResponse.data.data.accounts

        const accountList = []
        for (const account of accounts) {
            const updatedAccount = await Account.findOneAndUpdate(
                {accountNumber: account.accountNumber}, //filter
                {...account, user: req.user._id, providerId: thisProvider._id}, // change everything except ...
                {new: true}
            )
            accountList.push(updatedAccount)
        };


        console.log("this is the fresh provider", accountList)

        res.json({thisProvider, accountList})

    } catch(err) {

    }

})

router.delete('/:providerId', async (req, res, next) => {
    const { providerId } = req.params;

    Provider.findByIdAndDelete(providerId)
    .then((deletedProvider) => {
        Account.deleteMany({providerId})
            .then((deletedAccounts) => {

                res.json({deletedProvider, deletedAccounts})
            })
            .catch((err) => {
                res.status(501).json(err)
            })
    })
    .catch((err) => {
        console.log(err)
        res.status(502).json(err)
    })

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

