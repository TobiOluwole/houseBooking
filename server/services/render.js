const customerController = require('../controllers/customerController');
const BongalowDB = require('../models/bongalow');
const CustomerDB = require('../models/customer');
const ReservationDB = require('../models/reservation');

function sessCheck(req, res) {
    if (!req.session.token) {
        res.redirect('../login')
    }
}

exports.homeRoute = (req, res) => {
    sessCheck(req, res)
    res.render('index', {
        name: req.session.name
    });
};

exports.loginRoute = (req, res) => {
    res.render('login');
}

exports.addBongalow = (req, res) => {
    sessCheck(req, res);
    res.render('add_bongalow', {
        name: req.session.name
    });
}

exports.allBongalows = (req, res) => {
    sessCheck(req, res);

    BongalowDB.find()
        .then(data => {
            res.render('all_bongalows', {
                name: req.session.name,
                bongalows: data
            });
        })
        .catch(err => {
            console.log(err)
            return res
                .redirect('../login ')
        })

}

exports.addCustomer = (req, res) => {
    sessCheck(req, res);
    res.render('add_customer', {
        name: req.session.name
    });
}

exports.customerSearch = async (req, res) => {
    sessCheck(req, res);
    var toSend = {
        name: req.session.name
    }
    if (req.params.name) {

        await CustomerDB.find({ family_name: req.params.name })
            .then(data => {
                toSend.customers = data;
            })
            .catch(err => {
                console.log(err)
                return res
                    .redirect('../login ')
            });

        await BongalowDB.find()
            .then(data => {
                toSend.allBongalows = data;
            })
            .catch(err => {
                console.log(err)
                return res
                    .redirect('../login ')
            });

    }
    return res.render('find_customer', toSend);
}


exports.allReservations = async (req, res) => {
    sessCheck(req, res);

    var reservations;

    await ReservationDB.find()
        .then(data => {
            reservations = data
        })
        .catch(err => {
            console.log(err)
            return res
                .redirect('../login ')
        })

    var customers = {};
    for (i = 0; i < reservations.length; i++) {
        await CustomerDB.findOne({ _id: reservations[i].customer_id })
            .then(data => {
                customers[i] = data
            })
            .catch(err => {
                console.log(err)
                return res
                    .redirect('../login')
            })
    }

    var bongalows = {};
    for (i = 0; i < reservations.length; i++) {
        await BongalowDB.findOne({ _id: reservations[i].building_id })
            .then(data => {
                bongalows[i] = data
            })
            .catch(err => {
                console.log(err)
                return res
                    .redirect('../login')
            })
    }

    return res.render('all_reservations', {
        name: req.session.name,
        reservations: reservations,
        customers: customers,
        bongalows: bongalows 
    });

}