const MainAuthRouter = require('express').Router();


MainAuthRouter.route('/register')
    .get(require('./register.view.js'))
    .post((req, res) => {})

module.exports = MainAuthRouter
