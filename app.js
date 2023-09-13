import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

import bookRouter from './src/routes/bookRouter.js';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const log = debug('app');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));
app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')),
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/jquery/dist/jquery.js')),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));

const nav = {
  title: 'Library',
  nav: [
    {
      link: '/books', title: 'Books'
    },
    {
      link: '/authors', title: 'Authors'
    }
  ]
}

app.use('/books', bookRouter(nav));

app.get('/', (req, res) => {
  res.render('index', {title: 'Library', nav: [
    {
      link: '/books', title: 'Books'
    },
    {
      link: '/authors', title: 'Authors'
    }
  ]});
});

app.listen(port, () => {
  log((`Server running on port: ${chalk.green(port)}`));
});
