const Pool = require('pg').Pool
const pool = new Pool({
	user: 'mbfqfcdptylngh',
	host: 'ec2-23-21-165-188.compute-1.amazonaws.com',
	database: 'd2uv20f2cqaj1u',
	password: 'cb8728d1f2c34c8cc1b0891f6b99757240c3ce5996b7821e6d8539498a2845fe',
	port: 5432,
})
pool.on('error', (err, client) => {
	console.error('Unexpected error on idle client', err)
	process.exit(-1)
})

const getBanksByIfsc = (request, response) => {
	const ifsc = request.params.ifsc;
	console.log(ifsc);
	pool.query('select * from bank_details where bank_ifsc=$1', [ifsc], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const getBanksDetails = (request, response) => {
	const bankName = request.params.bankname;
	const bankCity = request.params.city;
	pool.query('select * from bank_details where bank_name=$1 and bank_city=$2', [bankName], [bankCity], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

module.exports = {
	getBanksByIfsc,
	getBanksDetails,
}