const { store, index, updateCategory, trashCategory, singleCategory } = require('../Controller/category.controller')

const router = require('express').Router()

router
    .route('/')
    .post(store)
    .get(index)
    
router.put("/:id", updateCategory)
router.delete("/:id", trashCategory)
router.get("/:id", singleCategory)

module.exports = router