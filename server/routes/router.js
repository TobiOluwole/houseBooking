const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');

const services = require('../services/render');

// CONTROLLERS

const managerController = require('../controllers/managerController');
const bongalowController = require('../controllers/bongalowController');
const customerController = require('../controllers/customerController');
const reservationController = require('../controllers/reservationController');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if(typeof authHeader == undefined || typeof authHeader == 'undefined' || typeof authHeader == null) return res.sendStatus(403)

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403);

        req.user = user;

        next();
    });
}

/**
 * @description Root Route
 * @method GET /,/dashboard
 */
route.get('/', services.homeRoute);
route.get('/dashboard', services.homeRoute);
route.get('/add-bongalow', services.addBongalow);
route.get('/all-bongalows', services.allBongalows);
route.get('/all-accomodations', services.allReservations);
route.get('/add-customer', services.addCustomer);
route.get('/customer-search', services.customerSearch);
route.get('/customer-search/:name', services.customerSearch);


/**
 * @description Login Route
 * @method GET /login
 */
route.get('/login', services.loginRoute);



// APi

route.post('/api/user/:id', customerController.findByid);

route.post('/api/manager/login', managerController.login);

route.post('/api/add-bongalow', bongalowController.add);

route.post('/api/add-customer', customerController.add);

route.post('/api/add-reservation', reservationController.add);


module.exports = route;