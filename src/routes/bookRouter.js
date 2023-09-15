import {Router} from 'express';
import debug from 'debug';

import bookController from '../controllers/bookController.js'

const log = debug('app:bookRouter');



function bookRouter(nav) {

    const bookRoutes = Router();
    // bookRoutes.use()
    const {getBooks, getBookById,bookByIdMiddleware, allBookMiddleware} = bookController(nav)

    bookRoutes.route('/')
    .get(getBooks);

    bookRoutes.route('/:id')
    .all(bookByIdMiddleware)
    .get(getBookById)

    return bookRoutes;
}


export default bookRouter;