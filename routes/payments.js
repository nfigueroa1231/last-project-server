var express = require('express');
var router = express.Router();

const Payment = require('../models/Payment')

const isAuthenticated = require('../middleware/isAuthenticated')

router.post('/', isAuthenticated, (req, res, next) => {

    let newPayment = req.body

    Payment.create({...newPayment, userId: req.user._id})
        .then((newPaymentMethod) => {
            res.json(newPaymentMethod)
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })
 
 })

router.get('/', isAuthenticated, (req, res, next) => {
    
    Payment.find({userId: req.user._id})
        .then((foundPaymentMethods) => {
            res.json(foundPaymentMethods)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/:id', isAuthenticated, (req, res, next) => {

    Payment.findById(req.params.id)
        .then((foundAccount) => {
            res.json(foundAccount)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.put('/:id', isAuthenticated, (req, res, next) => {

    Payment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        )
        .then((updatedAccount) => {
            res.json(updatedAccount)
        })
        .catch((err) => {
            console.log(err)
        })
 
})

router.delete('/:id', isAuthenticated, (req, res, next) => {

    Payment.findByIdAndDelete(req.params.id)
        .then((deletedAccount) => {
            res.json(deletedAccount)
        })
        .catch((err) => {
            console.log(err)
        })

})

module.exports = router;


//read provider,accountinfo,bankinfo