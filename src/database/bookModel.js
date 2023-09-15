import {Schema, model} from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    bookId: {
        type: Number,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
})

const Book = model('Book', bookSchema)

export default Book;