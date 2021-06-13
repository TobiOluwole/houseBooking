const ManagerDB = require('../models/manager');
const jwt = require('jsonwebtoken');
const { now } = require('mongoose');

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username == null || password == null) {
        return res
            .send({
                errCode: 400,
                msg: "Username and Password are Required"
            })
    }

    ManagerDB.findOne({ "username" : username })
        .then(data => {
            if (data == null) {
                return res
                    .send({
                        errCode: 404,
                        msg: 'Manager not found'
                    })
            }

            if (password == data.password) {
                const accessToken = jwt.sign(username + now(),process.env.ACCESS_TOKEN_SECRET)
                req.session.token = accessToken
                req.session.name = data.name
                return res
                    .send({
                        canGo: true,
                        msg: 'Login Successfull, Welcome!!',
                        token: accessToken
                    })
            } else {
                return res
                    .send({
                        errCode: 401,
                        msg: 'Incorrect login, try again'
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return res
                .send({
                    errCode: 500,
                    msg: 'Server Error'
                })
        });
}