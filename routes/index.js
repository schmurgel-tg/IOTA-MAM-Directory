var express = require('express');
var router = express.Router();
var Address = require('../models/address');

// var possibleSorts = ['Title', 'Create', 'Website', 'Description'];
// router.get('/', function (req, res, next) {
//     var sortBy = req.query.sortBy;
//     if (sortBy != undefined &&
//         possibleSorts.includes(sortBy.toUpperCase())) {
//     }
//     else {
//         sortBy = '';
//     }
//     if (SortBy != sortBy) {
//         SortBy = sortBy;
//         console.log('Set SortBy to: ' + sortBy);
//     }
// });

//prüft ob es sich um eine zahl handelt und diese größer 0 ist, liefert ansonsten den default wert
function getNumberOrDefault(numberToCheck, defaultNumber) {
    if (isNaN(numberToCheck) == false && numberToCheck > 0)
        return parseInt(numberToCheck);
    else
        return defaultNumber;
}

router.get('/', function (req, res, next) {
    findAddress(res, next, null, 1, 10);
});

router.post('/', function (req, res, next) {
    let find = req.body.findValue;
    let page = getNumberOrDefault(req.body.page);
    let pageSize = getNumberOrDefault(req.body.pageSize);
    findAddress(res, next, find, page, pageSize);
});

function findAddress(res, next, find, page, pageSize) {

    let findVal = {};
    if (find && find != '')
        findVal = { $text: { $search: find } };

    Address.countDocuments(findVal).exec(function (err, completeCount) {
        if (err) return next(err);

        let pages = Math.ceil(completeCount / pageSize)
        if (page > pages)
            page = pages;

        let skip = (pageSize * page) - pageSize;
        if(skip < 0)
            skip = 0;

        Address
            .find(findVal)
            .sort('-timestamp')
            .skip(skip)
            .limit(pageSize)
            .exec(function (err, addresses) {
                if (err) return next(err);

                res.render('index', {
                    addresslist: addresses,
                    currentPage: page,
                    maxPages: pages,
                    pageSize: pageSize,
                    findValue: find
                })
            })
    })
};




module.exports = router;
