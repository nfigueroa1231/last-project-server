var express = require('express');
var router = express.Router();

var axios = require('axios')

/* GET users listing. */
router.post('/account-info', (req, res, next) => {


    const { token } = req.body

    console.log("this is the token", token)

    const endpoint = 'https://api.miluma.lumapr.com/miluma-api/api/v2/users/me'



        axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("This is the MiLuma response ===>", response.data)
            res.json(response.data)
          })
          .catch((err) => {
            console.log("Error retrieving user infor", err)
            res.json(err)
          })

});

router.post('/', (req, res, next) => {
    console.log("hitting miLuma login route")
    axios.post('https://api.miluma.lumapr.com/miluma-api/auth', req.body)
    .then((response) => {
        console.log("this is the user auth response", response.data)
        res.json(response.data)
    })
    .catch((err) => {
        console.log("Error logging in", err)
        res.json({errorMessage: "Error logging in", err})
    })
})

module.exports = router;