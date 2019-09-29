const { Router } = require('express')
const Item = require('../models/Item')

const router = Router()

router.get('/items', (req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.json(err))
})

router.post('/items', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })

  newItem.save()
    .then(item => res.json(item))
})

router.delete('/items/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => {
      item.remove()
        .then(() => res.json({ message: 'Success deleted item' }))
    })
    .catch(err => {
      res.status(404).json({
        message: 'Something wrong'
      })
    })
})

module.exports = router
