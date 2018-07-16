var express = require('express');
var router = express.Router();
var Address = require('../models/address');

var possibleSorts = ['Title', 'Create', 'Website', 'Description'];
var PageSize = 10;
var CurrentPage = 1;
var LastCount = 0;
var SortBy = '';
/* GET home page. */
// router.get('/', function (req, res, next) {
//     var db = req.db;
//     var collection = db.get('addresses');
//     var counting = collection.count();
//     collection.find({}, {}, function (e, docs) {
//         res.render('index', {
//             addresscount: counting,
//             addresslist: docs
//         });
//     });
// });

router.get('/', function (req, res, next) {
    var sortBy = req.query.sortBy;
    if (sortBy != undefined &&
        possibleSorts.includes(sortBy.toUpperCase())) {
    }
    else {
        sortBy = '';
    }
    if (SortBy != sortBy) {
        SortBy = sortBy;
        console.log('Set SortBy to: ' + sortBy);
    }
    var pageSize = req.query.pageSize;
    if (isNaN(pageSize) == false) {
        PageSize = parseInt(pageSize);
        if (LastCount !== 0 && CurrentPage * PageSize > LastCount) {
            CurrentPage = Math.ceil(LastCount / PageSize);
            console.log('Reset CurrentPage to:' + CurrentPage);
        }
        console.log('Set PageSize to:' + pageSize);
    }
    var page = req.query.page;
    if (isNaN(page) == false) {
        CurrentPage = parseInt(page);
        console.log('Set CurrentPage to: ' + page);
    }
    //res.redirect(req.path);
    next();
});


router.get('/', function (req, res, next) {
    Address
        .find({})
        .sort('-timestamp')
        .skip((PageSize * CurrentPage) - PageSize)
        .limit(PageSize)
        .exec(function (err, addresses) {
            Address.countDocuments().exec(function (err, count) {
                if (err) return next(err)
                LastCount = count;
                res.render('index', {
                    addresslist: addresses,
                    current: CurrentPage,
                    pages: Math.ceil(count / PageSize),
                    pageSize: PageSize
                })
            })
        })
});

router.post('/', function (req, res, next) {
    var findVal = {};
    if (req.body.find && req.body.find != '')
        findVal = { $text: { $search: req.body.find } }

    Address
        .find(findVal)
        .sort('-timestamp')
        .skip((PageSize * CurrentPage) - PageSize)
        .limit(PageSize)
        .exec(function (err, addresses) {
            Address.countDocuments().exec(function (err, count) {
                if (err) return next(err)
                LastCount = count;
                res.render('index', {
                    addresslist: addresses,
                    current: CurrentPage,
                    pages: Math.ceil(count / PageSize),
                    pageSize: PageSize
                })
            })
        })
});
module.exports = router;
