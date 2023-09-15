import axios from "axios";
import debug from 'debug';

const log = debug('app:googleAuthorServices')

function googleAuthorServices(author) {
    return new Promise((resolve, reject) => {
        ( async function googleservices(){
            try {          
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=${process.env.GOOGLE_API_KEY}`);
        const {items} = response.data
        resolve(items)
            } catch (err) {
                reject(err);
            }
        }())
    })
}

export default googleAuthorServices;