const QuizDashboardRouter = require('express').Router();

QuizDashboardRouter.route('/create')
    .get(require('./editor.js'))

module.exports = QuizDashboardRouter
