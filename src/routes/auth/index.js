const MainAuthRouter = require('express').Router();


MainAuthRouter.route('/register')
    .get(require('./register.view.js'))
    .post(require('./register.js'))

module.exports = MainAuthRouter
