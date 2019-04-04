// require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes')
const databaseName = 'employees'
const port =  process.env.PORT || 3000
mongoose.connect(`mongodb://localhost:27017/Employee-${process.env.NODE_ENV}?retryWrites=true`, {useNewUrlParser: true})

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use('/employees', router)

app.listen(port, function() {
  console.log(`this is port ${port}...`)
})

module.exports = app