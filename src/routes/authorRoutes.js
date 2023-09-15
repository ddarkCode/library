import { Router } from 'express';
import debug from 'debug';

const log = debug('app:authorRoutes');

import authorController from '../controllers/authorController.js';
 
function router() {
    const authorRoutes = Router();
    const {getAuthorInfo, getAuthorList} = authorController()

    authorRoutes.route('/')
    .get(getAuthorList);

    authorRoutes.route('/:authorname')
    .get(getAuthorInfo);

    return authorRoutes;
}

export default router;