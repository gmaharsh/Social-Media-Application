const Post = require('../../models/Post');
const check_auth = require('../../validators/check_auth');
const { UserInputError } = require('apollo-server');

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const user = check_auth(context)
            
            if (body.trim() === '') {
                throw new UserInputError('Empty Comment', { 
                    error: {
                        body:'Comment must not be empty'
                    }
                })
            }

            const post = await Post.findById(postId);

            if (post) {
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString
                })
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not found')
            }

            
        }
    }
}