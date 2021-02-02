const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    username: String,
    body: String,
    created_at: Date,
    comments: [
        {
            body: String,
            userName: String,
            createdAt: Date 
        },
    ],
    likes: [
        {
            userName: String,
            createdAt: Date
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
    }
});

module.exports = model('Post', postSchema);