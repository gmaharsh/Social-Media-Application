//Resolver is a collection of functions that generate response for a GraphQL query. In simple terms, a resolver acts as a GraphQL query handler
const Post = require('../../models/Post');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}