module.exports = {
	query_fetch_branch: "select * from bank_details where bank_ifsc=?",
	query_fetch_details: "select * from bank_details where bank_name=? and bank_city=?"
}