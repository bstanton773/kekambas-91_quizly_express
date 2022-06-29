// Import built-in graphql types
const { GraphQLObjectType, GraphQLInputObjectType, 
    GraphQLID, GraphQLString, GraphQLList, GraphQLInt, 
    GraphQLBoolean, GraphQLFloat } = require('graphql');

// Import our models
const { User, Quiz, Question, Submission } = require('../models');


const UserType = new GraphQLObjectType(
    {
        name: 'User',
        description: 'User type',
        fields: () => ({
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            email: { type: GraphQLString },
            quizzes: {
                type: new GraphQLList(QuizType),
                resolve(parent, args){
                    return Quiz.find({ userId: parent.id })
                }
            },
            submissions: {
                type: new GraphQLList(SubmissionType),
                resolve(parent, args){
                    return Submission.find({ userId: parent.id })
                }
            }
        })
    }
)


const QuestionType = new GraphQLObjectType(
    {
        name: 'Question',
        description: 'Question type',
        fields: () => ({
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            correctAnswer: { type: GraphQLString },
            quizId: { type: GraphQLString },
            order: { type: GraphQLInt },
            quiz: {
                type: QuizType,
                resolve(parent, args){
                    return User.findById(parent.quizId)
                }
            }
        })
    }
)


const QuizType = new GraphQLObjectType(
    {
        name: 'Quiz',
        description: 'Quiz type',
        fields: () => ({
            id: { type: GraphQLID },
            slug: { type: GraphQLString },
            title: { type: GraphQLString },
            description: { type: GraphQLString },
            userId: { type: GraphQLString },
            user: { 
                type: UserType,
                resolve(parent, args){
                    return User.findById(parent.userId)
                } 
            },
            questions: {
                type: new GraphQLList(QuestionType),
                resolve(parent, args){
                    return Question.find({ quizId: parent.id })
                }
            },
            submissions: {
                type: new GraphQLList(SubmissionType),
                resolve(parent, args){
                    return Submission.find({ quizId: parent.id })
                }
            },
            avgScore: {
                type: GraphQLFloat,
                async resolve(parent, arg){
                    const submissions = await Submission.find({ quizId: parent.id });
                    let score = 0;

                    for (const sub of submissions){
                        score += sub.score
                    }

                    return score / submissions.length
                }
            }
        })
    }
)

const SubmissionType = new GraphQLObjectType(
    {
        name: 'Submission',
        description: 'Submission type',
        fields: () => ({
            id: { type: GraphQLID },
            quizId: { type: GraphQLString },
            userId: { type: GraphQLString },
            score: { type: GraphQLInt },
            user: {
                type: UserType,
                resolve(parent, args){
                    return User.findById(parent.userId)
                }
            },
            quiz: {
                type: QuizType,
                resolve(parent, args){
                    return Quiz.findById(parent.quizId)
                }
            }
        })
    }
)


const QuestionInputType = new GraphQLInputObjectType(
    {
        name: 'QuestionInput',
        description: 'Question Input Type',
        fields: () => ({
            title: { type: GraphQLString },
            order: { type: GraphQLInt },
            correctAnswer: { type: GraphQLString }
        })
    }
)


const AnswerInputType = new GraphQLInputObjectType(
    {
        name: 'AnswerInput',
        description: 'Answer Input Type',
        fields: () => ({
            questionId: { type: GraphQLString },
            answer: { type: GraphQLString }
        })
    }
)

module.exports = {
    UserType,
    QuizType,
    QuestionType,
    SubmissionType,
    QuestionInputType,
    AnswerInputType
}
