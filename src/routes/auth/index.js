const MainAuthRouter = require('express').Router();


MainAuthRouter.route('/register')
    .get(require('./register.view.js'))
    .post(require('./register.js'))


MainAuthRouter.route('/login')
    .get(require('./login.view.js'))
    .post(require('./login.js'))

module.exports = MainAuthRouter
