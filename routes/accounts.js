var express = require('express');
var router = express.Router();

const Account = require('../models/Account')

const isAuthenticated = require('../middleware/isAuthenticated')

router.post('/', isAuthenticated, (req, res, next) => {

    const { accountNumber, currentBalance, providerId } = req.body

    Account.create({
        accountNumber,
        currentBalance,
        providerId,
        user: req.user._id
    })
        .then((createdAccount) => {
            console.log("Created Expense ====>", createdAccount)
            res.json(createdAccount)
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })

})

// matches user expenses
router.get('/user-accounts', isAuthenticated, (req, res, next) => {

  Account.find({
    user: req.user._id
  })
  .then((foundAccounts) => {
    console.log("These are the user's Account ===>", foundAccounts)
    res.json(foundAccounts)
  })
  .catch((err) => {
    console.log(err)
    res.json(err)
  })
  
})

router.get('/details/:accountId', isAuthenticated, (req, res, next) => {

  Account.findById(req.params.expenseId)
    .then((foundAccount) => {
      console.log("Found Account ====>", foundAccount)
      res.json(foundAccount)
    }) 
    .catch((err) => {
      console.log(err)
      res.json(err)
    }) 

})


router.post("/update/:accountId", isAuthenticated, (req, res, next) => {
    Account.findByIdAndUpdate(
      req.params.accountId,
      req.body,
      {new: true}
    )
      .then((updatedAccount) => {
        console.log("This is the updated Account ===>", updatedAccount)
        res.json(updatedAccount)
      })
      .catch((err) => {
        console.log(err)
        res.json(err)
      }) 
})


router.get("/delete/:accountId", isAuthenticated, (req, res, next) => {
    Account.findByIdAndDelete(
        req.params.accountId
    )
    .then((deletedAccount) =>{
        console.log("This is the deleted Account ====>", deletedAccount)
        res.json(deletedAccount)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    }) 
})



module.exports = router;
