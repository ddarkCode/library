import passport from 'passport';
import { Strategy } from 'passport-local';
import debug from 'debug';

import User from '../../database/userModel.js';

const log = debug('app:localStrategy');

const local = () => {
    passport.use('signup', new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            (async function signup(){
               try {
             const userExist = await User.findOne({email});
             if (userExist) {
                return done(null, false, {message: 'User With This Email Already Exists'})
             } else {
                const user = new User({
                    email, 
                    password,
                    username: req.body.username
                });
                await user.save()
                done(null, user, {message: 'Registration was Successful'});
             }
               } catch (err) {
                log(err);
               }
            }())
        }
    ));

    passport.use('signin', new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            (async function signin(){
                try {
                    const user = await User.findOne({email});

                    if (!user) {
                        done(null, false, {message: 'No Such User In Database'});
                    } else if (!user.verifyPassword(password)) {
                        done(null, false, {message: 'Entered Incorrect Paaword'});
                    } else {
                        done(null, user, {message: 'Successfully Logged Into Your Account.'})
                    }
                } catch (err) {
                    debug(err);
                }
            }())
        }
    ));
}

export default local;