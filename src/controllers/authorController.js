import debug from 'debug';
import translate from 'translate-google';

import Book from "../database/bookModel.js";
import googleAuthorServices from "../services/googleAuthorService.js";

const log = debug('app:authorController');

function controller() {
    const getAuthorList =  async (req, res) => {
        const books = await Book.find({});

        const authors = books.map((book, index) => ({name: book.author, bookId: book._id}));
        res.status(200);
        return res.render('authorListView', {authors});
    }

    const getAuthorInfo = (req, res) => {
        const {authorname} = req.params;
        (async function getInfo(){
        const authorInfo = await googleAuthorServices(authorname);
        try {  
            const translatedAuthorInfo = authorInfo.map(async(info, index) => {
                    return {
                        title: await translate(info.volumeInfo.title ? info.volumeInfo.title : 'trey bien', {from: 'fr', to: 'en'}),
                        subtitle: await translate(info.volumeInfo.subtitle ? info.volumeInfo.subtitle : 'trey bien', {from: 'fr', to: 'en'}),
                        description: await translate(info.volumeInfo.description ? info.volumeInfo.description : 'trey bien', {from: 'fr', to: 'en'}),
                    }
                })

                // log('Non Await ', translatedAuthorInfo)
           
           
             Promise.all(translatedAuthorInfo).then( value => {
                let authorInfoFiltered = value.map((filInfo, index) => {
                    return ({...filInfo, pageCount: authorInfo[index].volumeInfo.pageCount,
                        imageLinks: JSON.stringify(authorInfo[index].volumeInfo.imageLinks),
                        previewLink: authorInfo[index].volumeInfo.previewLink,
                        selfLink: authorInfo[index].selfLink,
                        authors: authorInfo[index].volumeInfo.authors})  
                 }).filter(bookk => bookk.description !== 'trey well');
                //  log('Promise: Await ', authorInfoFiltered);
                res.status(200);
                return res.render('authorView', {authorInfoFiltered, author: req.params.authorname});
             }).catch(err => {
                log(err);
             })
      
        } catch (error) {
            log(error);
        }
       }())
    }


    return {
        getAuthorList,
        getAuthorInfo
    }
}

export default controller;