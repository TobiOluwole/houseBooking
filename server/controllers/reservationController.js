const ReservationDB = require('../models/reservation');

exports.add = (req, res) => {

    var strtDt = new Date(req.body.entry_date);
    var endDt = new Date(req.body.exit_date);

    if (endDt < strtDt) {
        return res.send({
            msg: 'Exit date must be after Entry date'
        })
    } else {



        var cutoff = new Date(req.body.entry_date);
        ReservationDB.find({ exit_date: { $gt: cutoff }, building_id: req.body.building_id }, function (err, data) {
            console.log(data)
            if (!data || data == [] || typeof data == 'undefined' || data == [] || data == null || Object.keys(data).length === 0) {

                var newRes = new ReservationDB({
                    customer_id: req.body.customer_id,
                    building_id: req.body.building_id,
                    entry_date: req.body.entry_date,
                    exit_date: req.body.exit_date
                })

                newRes
                    .save(newRes)
                    .then(data => {
                        return res.send({
                            canGo: true,
                            msg: 'Reservation Made!!'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        return res.send({
                            errCode: 500,
                            msg: 'Error encountered while making Reservation'
                        })
                    })
            } else {
                return res.send({
                    msg: 'That building is not free on the selected entry date, Try another.'
                })
            }
        });
    }
}