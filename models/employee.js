const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email harus diisi',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Contoh email : email@mail.com'],
        validate : {
          validator (value){
            return new Promise((resolve, reject) => {
                Employee.findOne({
                email : value
              })
              .then(employee => {
                if(employee != undefined && String(employee._id) !== String(this._id)) {
                  throw err
                } else {
                  resolve()
                }
              })
              .catch(err => {
                reject(err)
              })
            })
          }, message : 'Email already in use'
        }
    },
    fullName: String
})

const Employee = mongoose.model('Employee',employeeSchema)
module.exports = Employee