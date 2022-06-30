const { GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const { QuestionInputType } = require('./types')
const { User, Quiz, Question } = require('../models');


const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args){
        const checkUser = await User.findOne({ email: args.email });
        if (checkUser){
            throw new Error('User with this email already exists');
        }

        const { username, email, password } = args;
        const user = new User({ username, email, password });
        user.save();

        const token = 'hellothisisthetoken';

        return token;
    }
}


const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args){
        const user = await User.findOne({ email: args.email })
        if (!user || args.password !== user.password){
            throw new Error('Invalid Credentials')
        }

        const token = 'hellothisisthetoken';
        return token;
    }
}


const createQuiz = {
    type: GraphQLString,
    args: {
        questions: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(QuestionInputType)))
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        userId: {
            type: GraphQLString
        }
    },
    async resolve(parent, args){
        // Generate the slug to quiz for url
        let slugify = args.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
        let fullSlug;
        
        /* Add a random interger to the end of the slug, check that the slug doesn't exist
        If it does exist, generate a new slug, otherwise continue on */
        while (true){
            let slugId = Math.floor(Math.random()*10000);
            fullSlug = `${slugify}-${slugId}`;

            const existingQuiz = await Quiz.findOne({ slug: fullSlug });

            if (!existingQuiz){break}
        }

        const quiz = new Quiz({
            title: args.title,
            slug: fullSlug,
            description: args.description,
            userId: args.userId
        })

        await quiz.save();

        // Loop through the questions argument and create questions and connect to new quiz
        for (const question of args.questions){
            const questionItem = new Question({
                title: question.title,
                correctAnswer: question.correctAnswer,
                order: Number(question.order),
                quizId: quiz.id
            })
            questionItem.save()
        }

        return quiz.slug
    }
}

module.exports = { register, login, createQuiz };
