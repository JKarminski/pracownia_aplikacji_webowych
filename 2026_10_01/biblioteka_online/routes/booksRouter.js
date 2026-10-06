const express = require('express')
const fs = require('fs').promises
const path = require('path')
const router = express.Router()

router.get('/books', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../data/books.json')
        const data = await fs.readFile(filePath, 'utf-8')

        const books = JSON.parse(data)

        res.json(books)

    } catch (err) {
        console.log("Blad odczytu: ", err)
        res.status(500).send({ error: "Blad serwera przy probie odczytu" })
    }
})

router.post('/books', async (req, res) => {
    try {
        const { title, author, year } = req.body

        if (!title || !author || !year) {
            return res.status(400).send({ error: "Tytul, autor i rok musza byc podane poprawnie" })
        }

        const filePath = path.join(__dirname, '../data/books.json')
        const data = await fs.readFile(filePath, 'utf-8')
        const books = JSON.parse(data)

        const newBook = {
            id: books.length > 0 ? books[books.length - 1].id + 1 : 0,
            title: title,
            author: author,
            year: year
        }

        books.push(newBook)

        await fs.writeFile(filePath, JSON.stringify(books, null, 2), 'utf-8')

        res.redirect('/')

    } catch (err) {
        console.log("Blad zapisu: ", err)
        res.status(500).send("Blad serwera przy probie zapisu")
    }
})

router.get('/add', async (req, res) => {
    res.sendFile(path.join(__dirname, '../views/add.html'))
})

router.get('/books/search', async (req, res) => {
    try {
        const searchTitle = req.query.title

        if (!searchTitle) {
            return res.status(400).json({ error: "Tytul jest wymagany" })
        }

        const filePath = path.join(__dirname, '../data/books.json')
        const data = await fs.readFile(filePath, 'utf-8')
        const books = JSON.parse(data)

        const findedBooks = books.filter(b => b.title.toLowerCase().includes(searchTitle.toLowerCase())
        )

        if (findedBooks.length === 0) {
            return res.status(404).json({ error: "Book not found" })
        } else {
            res.json(findedBooks)
        }

    } catch (err) {
        console.log("Blad wyszukiwania: ", err)
        res.status(500).json({ error: "Blad serwera przy probie wyszukania" })
    }
})

router.get('/books/:id', async (req, res) => {
    try {
        const bookId = req.params.id
        const filePath = path.join(__dirname, '../data/books.json')
        const data = await fs.readFile(filePath, 'utf-8')
        const books = JSON.parse(data)
        const findedBook = books.find(b => b.id == Number(bookId))

        if (!findedBook) {
            res.status(404).send({ error: "Book not found" })
        } else {
            res.json(findedBook)
        }
    } catch (err) {
        console.log("Blad odczytu: ", err)
        res.status(500).send("Blad serwera przy probie odczytu")
    }
})

module.exports = router