import { Router } from "express";
import passport from "passport";
import debug from 'debug';

const log = debug('app:authRoutes');


const router = (nav) => {
    const authRoutes = Router();

    authRoutes.route('/signup')
    .get((req, res) => {
        res.status(200);
        return res.render('signup');
    })
    .post(passport.authenticate('signup', {failureRedirect: '/auth/signup'}),(req, res) => {
        res.status(302);
        return res.redirect('/auth/profile')
    })
    authRoutes.route('/signin')
    .get((req, res) => {
        res.status(200);
        return res.render('signin');
    })
    .post(passport.authenticate('signin', {failureRedirect: '/auth/signin'}), (req, res) => {
        res.status(302);
        return res.redirect('/auth/profile');
    })

    authRoutes.route('/profile')
    .get((req, res) => {
        if (req.isAuthenticated()) {
            res.status(200);
            return res.render('profileView', {nav});
        } else {
            res.status(403);
            res.redirect('/auth/signin');
        }
    })

    return authRoutes;
}

export default router;