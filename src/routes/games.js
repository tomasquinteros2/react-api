const express = require('express')
const router = express.Router()

const {index,newGame,updateGame,deleteGame} = require('../controller/game')

router.get('/',index)
router.post('/',newGame)
router.put('/:id',updateGame)
router.delete('/:id',deleteGame)

module.exports= router