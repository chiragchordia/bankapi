const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries/queries')
const port = 7000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/bankbranch/:ifsc', db.getBanksByIfsc)
app.get('/bankdetails/:bankname/:city', db.getBanksDetails)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})