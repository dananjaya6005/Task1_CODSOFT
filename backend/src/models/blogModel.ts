import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
    username : String,
    title: String,
    summary: String,
    author: String,
    content: String,
    imageURL : String,
    published : Boolean
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default mongoose.model('Blog', blogSchema);
