const CustomerDB = require('../models/customer');

exports.add = (req, res) => {

    var newCus = new CustomerDB({
        family_name: req.body.family_name.toLowerCase(),
        customer_name: req.body.customer_name.toLowerCase(),
        age: req.body.age,
        gender: req.body.gender.toLowerCase()
    })

    newCus
        .save(newCus)
        .then(data => {
            return res.send({
                canGo: true,
                msg: 'Customer Saved!!'
            })
        })
        .catch(err => {
            console.log(err)
            return res.send({
                errCode: 500,
                msg: 'Error encountered while saving Customer'
            })
        })
}

exports.findByid = (req, res) => {
    const id = req.params.id;

    if (id == '') return res.send({ errCode: 400, msg: 'Cannot search empty query' })

    CustomerDB.find(id)
        .then(data => {
            if (data == null) return res.send({ errCode: 204, msg: 'No Customer found' })

            return res.send(data)
        })
        .catch(err => {
            console.log(err)
            return res
                .status(500)
                .send({
                    msg: 'Server Error'
                })
        })
}

exports.find = (req, res) => {
    const name = req.params.name;

    if (name == '') return res.send({ errCode: 400, msg: 'Cannot search empty query' })

    CustomerDB.find({ family_name: name })
        .then(data => {
            if (data == null) return res.send({ errCode: 204, msg: 'No Customer found' })

            return res.send(data)
        })
        .catch(err => {
            console.log(err)
            return res
                .status(500)
                .send({
                    msg: 'Server Error'
                })
        })
}