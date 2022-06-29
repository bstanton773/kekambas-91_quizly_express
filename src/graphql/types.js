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
                type: GraphQLList(QuizType),
                resolve(parent, args){
                    return Quiz.find({ userId: parent.id })
                }
            },
            submissions: {
                type: GraphQLList(SubmissionType),
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
