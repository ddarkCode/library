import {config} from 'dotenv';
config()

import express from 'express';
import chalk from 'chalk';
import debug from 'debug';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import { connect } from 'mongoose';
import session from 'express-session';

import bookRouter from './src/routes/bookRouter.js';
import adminRoutes from './src/routes/adminRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import authorRoutes from './src/routes/authorRoutes.js';
import passportConfig from './src/config/passport.js';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const log = debug('app');

const {MONGO_URL_LOCAL, SESSION_SECRET} = process.env;

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
app.use(morgan('combined'));

//Session Config

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

//Passport Config
passportConfig(app);


(async function mongo(){
  try {
    await connect(MONGO_URL_LOCAL);
    log('Mongo Database Connected Successfully.')
  } catch (err) {
    debug(err)
  }
}())


app.use('/books', bookRouter());
app.use('/admin', adminRoutes());
app.use('/auth', authRoutes());
app.use('/authors', authorRoutes())

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  log((`Server running on port: ${chalk.green(port)}`));
});
