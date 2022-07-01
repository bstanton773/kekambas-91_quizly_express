const QuizDashboardRouter = require('express').Router();

QuizDashboardRouter.route('/create')
    .get(require('./editor.js'))
    .post(require('./create.js'))


QuizDashboardRouter.route('/:slug')
    .get(require('./view.js'))

module.exports = QuizDashboardRouter
