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

        const token = 'abc123';

        return token;
    }
}

module.exports = { register };
