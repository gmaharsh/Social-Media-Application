const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    username: String,
    body: String,
    created_at: Date,
    comments: [
        {
            body: String,
            userName: String,
            created_at: Date 
        },
    ],
    likes: [
        {
            userName: String,
            created_at: Date
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
    }
});

module.exports = model('Post', postSchema);