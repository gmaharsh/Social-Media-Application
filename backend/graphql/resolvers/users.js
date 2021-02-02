const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {validateRegisterInput} = require('../../validators/validators')
const { JWT_SECRET } = require('../../config');
const { UserInputError } = require('apollo-server');

module.exports = {
    Mutation: {
        async register(_, {registerInput:{username, email, password, confirmPassword}}, context, info) {
            //Validate User Data
            const { valid, error } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', {error})
            }
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username is taken', {
                    error: {
                        username:'This username is taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, JWT_SECRET, { expiresIn: '1h' });

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}