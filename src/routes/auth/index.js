const MainAuthRouter = require('express').Router();


MainAuthRouter.route('/register')
    .get((req, res) => {
        console.log('Get of the register')
        res.send('Register')
    })
    .post((req, res) => {})

module.exports = MainAuthRouter
