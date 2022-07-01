const QuizDashboardRouter = require('express').Router();

QuizDashboardRouter.route('/create')
    .get(require('./editor.js'))
    .post(require('./create.js'))


module.exports = QuizDashboardRouter
