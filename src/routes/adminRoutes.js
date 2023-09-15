import {Router} from 'express';
import debug from 'debug';

import Book from '../database/bookModel.js';

const log = debug('app:adminRoutes');

const books = [
    {
      title: 'War and Peace',
      genre: 'Historical Fiction',
      author: 'Lev Nikolayevich Tolstoy',
      bookId: 656,
      read: false
    },
    {
      title: 'Les Misérables',
      genre: 'Historical Fiction',
      author: 'Victor Hugo',
      bookId: 24280,
      read: false
    },
    {
      title: 'The Time Machine',
      genre: 'Science Fiction',
      author: 'H. G. Wells',
      bookId: 2493,
      read: false
    },
    {
      title: 'A Journey into the Center of the Earth',
      genre: 'Science Fiction',
      author: 'Jules Verne',
      bookId: 35262749,
      read: false
    },
    {
      title: 'The Dark World',
      genre: 'Fantasy',
      author: 'Henry Kuttner',
      bookId: 1881716,
      read: false
    },
    {
      title: 'The Wind in the Willows',
      genre: 'Fantasy',
      author: 'Kenneth Grahame',
      bookId: 2228208,
      read: false
    },
    {
      title: 'Life On The Mississippi',
      genre: 'History',
      author: 'Mark Twain',
      bookId: 99152,
      read: false
    },
    {
      title: 'Childhood',
      genre: 'Biography',
      author: 'Lev Nikolayevich Tolstoy',
      bookId: 69105624,
      read: false
    }];

function router() {
    const adminRoutes = Router();

    adminRoutes.route('/')
    .get(async (req, res) => {
        try {
            const foundBooks = await Book.find({});
            if (foundBooks.length === 0) {
                const insertedBooks = await Book.insertMany(books);
                res.status(201);
                return res.json(insertedBooks);
            } else {
                res.status(200);
                return res.json(foundBooks);
            }
        } catch (err) {
            log(err);
        }
    })

    return adminRoutes;
}

export default router;