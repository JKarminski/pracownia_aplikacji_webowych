const express = require('express')
const path = require('path')
const app = express()

const infoRouter = require('./routes/infoRouter')
const booksRouter = require('./routes/booksRouter')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', infoRouter)
app.use('/', booksRouter)


app.listen(4000, () => { 
    console.log("Serwer biblioteki dziala na porcie http://localhost:4000") 
})