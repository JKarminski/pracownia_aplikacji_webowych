const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

router.get('/about', async (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'))
})

module.exports = router