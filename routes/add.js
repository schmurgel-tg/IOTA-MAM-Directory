var express = require('express');
var router = express.Router();
var faker = require('faker')
var Address = require('../models/address');



router.post('/submit_root', function (req, res) {
    var address = new Address();
    address.title = req.body.title;
    address.root = req.body.root;
    address.website = req.body.website;
    address.description = req.body.description;
    address.timestamp = new Date();

    address.save(function (err) {
        if (err) throw err
        res.redirect('/')
    });
});

/* GET mongo page. */
router.get('/', function (req, res) {
    res.render('add');
});

router.get('/generate-fake-data', function (req, res, next) {
    for (var i = 0; i < 90; i++) {
        var address = new Address();
        address.title = faker.random.words();
        address.root = faker.random.alphaNumeric(81);
        address.website = faker.internet.url();
        address.description = faker.lorem.paragraph();
        address.timestamp = faker.date.recent();

        address.save(function (err) {
            if (err) throw err
        })
    }
    res.redirect('/')
})

module.exports = router;