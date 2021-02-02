const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../../config');

module.exports = {
    Mutation: {
        async register(_, {registerInput:{username, email, password, confirmPassword}}, context, info) {
            //Validate User Data
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