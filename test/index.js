const chai = require('chai'),
  chaiHttp = require('chai-http'),
  {expect} = chai,
  app = require('../app'),
  Employee = require('../models/employee')

chai.use(chaiHttp)
let employeeId

before(function(done) {
    Employee
        .deleteMany({})
        .then(data => {
            return Employee.create({email: 'test@mail.com', fullName: 'test'})
        })
        .then(employee => {
            employeeId = employee._id
            done()
        })
        .catch(err => {
            console.log(err)
        })  
})

it('should find some employee by id', function(done) {
    chai.request(app)
        .get(`/employees/${employeeId}`)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.keys(['__v','_id', 'email', 'fullName'])
            done()
        }) 
})




