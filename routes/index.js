const router = require('express').Router()
const employeeController = require('../controllers/employeeController')

router.post('/',employeeController.create)
router.put('/:id',employeeController.update)
router.delete('/:id', employeeController.delete)
router.get('/', employeeController.find)
router.get('/:id', employeeController.findOne)

module.exports = router