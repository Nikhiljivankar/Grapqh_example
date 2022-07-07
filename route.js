const { Router } =require('express');
const mysql =require('./source/connectors/mysql');

const express =require('express');
const User =require('./source/graphql/schema/user/type');


const router = Router();

const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


const jwt = require('jsonwebtoken');
const fs = require('fs');
const _ = require('lodash');

export default () => {
    router.use((req, res, next) => {
        res.on('finish', () => {
        });
        next();
    });

    //   /** Parse the body of the request / Passport */
    router.use(express.urlencoded({ extended: false })); // Replaces Body Parser
    router.use(express.json()); // Replaces Body Parser

    //   /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.header('origin'));
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    router.post('/login', async (req, res) => {
        try {
            const user_name = req.body.username;
            let user = await mysql.models.user.findOne({
                where: { user_name: user_name },
            })
            if (!user) throw new Error('No user with that email');
            const isValid = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if(user.user_head_id != 0){
                if (!isValid) throw new Error('Incorrect password');
            }
            const token = jsonwebtoken.sign(
                {
                    name: user.user_name,
                    email: user.email,
                    permission: user.permission
                },
                process.env.JWT_SECRET,
                { expiresIn: '30d' },
            );
            res.json({
                user,
                token,
            });
        } catch (error) {
            res.send(error.message);
        }
    });
    return router;
}
