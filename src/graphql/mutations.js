const { GraphQLString } = require('graphql');
const { User } = require('../models');


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

module.exports = { register, login };
