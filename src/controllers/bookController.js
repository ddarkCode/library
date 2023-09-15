import debug from 'debug';
import translate from 'translate-google';

import Book from "../database/bookModel.js";
import googleBookServices from '../services/googleBookService.js';

const log = debug('app:bookController')

function controller() {
    const allBookMiddleware = (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.status(302);
            return res.redirect('/auth/signin');
        }
    } 
    const bookByIdMiddleware = async(req, res, next) => {
        const {id} = req.params;
        const book = await Book.findOne({_id: id});
        let {title, author} = book;
    
        req.book = await googleBookServices(title, author);
      
        next();
    }
    const getBooks = async (req, res) => {
        const books = await Book.find();
        res.status(200);
        res.render('bookListView', {books})
    }

    const getBookById = async (req, res) => {
        let {book} = req;
        const translatedDes = await translate(book.description, {from: 'fr', to: 'en'})
        book = Object.assign({}, book, {description: translatedDes})
        res.status(200);
        return res.render('bookView', {book});
    }


    return {
        allBookMiddleware,
        getBooks,
        bookByIdMiddleware,
        getBookById
    }
}

export default controller;