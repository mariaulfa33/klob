const Employee = require('../models/employee')

class EmployeeController {

    static create(req, res) {
        Employee
            .create({
                email: req.body.email,
                fullName: req.body.fullName
            })
            .then(newEmployee => {
                res.status(201).json(newEmployee)
            })
            .catch(err => {
                res.status(500).json({msg:  err.message})
            })
    }

    static update(req, res) {
        Employee
            .findOneAndUpdate({
                _id: req.params.id
            },req.body,
            {new: true})
            .then(employee => {
                res.status(200).json(employee)
            })
            .catch(err => {
                res.status(500).json({msg: err.message})
            })
    }

    static delete(req, res) {
        Employee
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(employeeDeleted => {
                res.status(200).json(employeeDeleted)
            })
            .catch(err => {
                res.status(400).json({msg: 'bad request'})
            })
    }

    static findOne(req, res) {
        Employee
            .findById(req.params.id)
            .then(employee => {
                res.status(200).json(employee)
            })
            .catch(err => {
                res.status(500).json({msg: err.message})
            })
    }

    static find(req, res) {
        let skip = (Number(req.query.page)-1)*10 || 0
        let queryFind
        if(req.query.keyword) {
            queryFind ={
                $or: [
                    {email: req.query.keyword},
                    {fullName: req.query.keyword},
                ] 
            }
        } else {
            queryFind = {}
        }
        Employee
            .find(queryFind)
            .limit(10)
            .skip(skip)
            .then(employees => {
                res.status(200).json({employees: employees})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({msg: err.message})
            })
    } 
}

module.exports = EmployeeController