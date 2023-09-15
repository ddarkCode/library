import axios from "axios";

function googleBookServices(title, author) {
    return new Promise((resolve, reject) => {
        ( async function googleservices(){
            try {          
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${process.env.GOOGLE_API_KEY}`);
        const {selfLink} = response.data.items[0]
        const {data} = await axios.get(`${selfLink}?key=${process.env.GOOGLE_API_KEY}`);
        resolve(data.volumeInfo)
            } catch (err) {
                reject(err);
            }
        }())
    })
}

export default googleBookServices;