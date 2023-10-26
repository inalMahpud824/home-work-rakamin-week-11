const router = require('express').Router()
const {itemControllers} = require('../controllers')
const authMiddlewares = require('../middlewares/auth.middlewares')

router.use(authMiddlewares)
router.get('/', itemControllers.getAllItems)
router.get('/:id', itemControllers.getItemById)
router.post('/', itemControllers.createItem)
router.put('/:id', itemControllers.updateItem)
router.delete('/:id', itemControllers.deleteItem)

module.exports = router