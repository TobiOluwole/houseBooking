const BongalowDB = require('../models/bongalow');

exports.add = (req, res) => {

    BongalowDB.findOne({
        building_id: req.body.building_id
    }).then(data => {
        if (data !== null) {
            return res.send({
                msg: 'Building Number already in use'
            }).end()
        } else {

            if (!req.body.pic_link_1) {
                req.body.pic_link_1 = ''
            }
            if (!req.body.pic_link_2) {
                req.body.pic_link_2 = ''
            }

            var newBuild = new BongalowDB({
                building_name: req.body.building_name,
                building_id: req.body.building_id,
                location: req.body.location,
                pic_link_1: req.body.pic_link_1 || 'none',
                pic_link_2: req.body.pic_link_2 || 'none',
            })

            newBuild
                .save(newBuild)
                .then(data => {
                    return res.send({
                        canGo: true,
                        msg: 'Building added!!'
                    })
                })
                .catch(err => {
                    return res.send({
                        errCode: 500,
                        msg: 'Error encountered while saving building'
                    })
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
