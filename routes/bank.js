var express = require('express');
var router = express.Router();
var queries = require("../queries/queries.js");


/*Get banks details by ifsc. */
router.get('/bankbranch/:ifsc', function (req, res, next) {
	let ifsc = req.params.ifsc;
	global.connection.query({
		sql: queries.query_fetch_branch,
		timeout: 40000,
		values: [ifsc]
	}, function (error, rows) {
		if (!!error) {
			console.log(error);
		}
		else {
			res.end(JSON.stringify(rows, null, 4));
		}
	});
});

/*Get banks details by bankname & City. */
router.get('/bankdetails/:bankname/:city', function (req, res, next) {
	let bankname = req.params.bankname;
	let city = req.params.city;
	global.connection.query({
		sql: queries.query_fetch_details,
		timeout: 40000,
		values: [bankname, city]
	}, function (error, rows) {
		if (!!error) {
			console.log(error);
		}
		else {
			res.end(JSON.stringify(rows, null, 4));
		}
	});
});

module.exports = router;