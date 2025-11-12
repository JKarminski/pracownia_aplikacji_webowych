const express = require('express')
const { join } = require('node:path')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }))



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zapisy'})
db.connect(err => {
    if (err){ 
        console.error('Błąd połączenia z bazą danych: ', err)
        throw err
    }
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        imie VARCHAR(50) NOT NULL,
        nazwisko VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        wiadomosc TEXT NOT NULL
    )`
    db.query(createTableQuery, err => {
        if (err) throw err
        console.log('Tabela messages gotowa')
    })
})



app.get('/', (req, res) =>{
    res.sendFile(join(__dirname, 'glowna.html'))
})

app.get('/o-nas', (req, res) =>{
    res.sendFile(join(__dirname, 'o-nas.html'))
})

app.get('/oferta', (req, res) =>{
    res.sendFile(join(__dirname, 'oferta.html'))
})

app.get('/kontakt', (req, res) =>{
    res.sendFile(join(__dirname, 'kontakt.html'))
})

app.post('/kontakt', (req, res) =>{
    res.sendFile(join(__dirname, 'kontakt.html'))
    console.log('Imie: ' + req.body.imie)
    console.log('Nazwisko: ' + req.body.nazwisko)
    console.log('Email: ' + req.body.email)
    console.log('Wiadomosc: ' + req.body.wiadomosc)
    const insertQuery = 'INSERT INTO messages (imie, nazwisko, email, wiadomosc) VALUES (?, ?, ?, ?)'
    const values = [req.body.imie, req.body.nazwisko, req.body.email, req.body.wiadomosc]
    db.query(insertQuery, values, (err, result) => {
        if (err) {
            console.error('Błąd podczas wstawiania danych: ', err)
        } else {
            console.log('Dane zostały pomyślnie wstawione, ID rekordu: ', result.insertId)
        }
    })
    res.redirect('/')
})
app.get('/api/contact-messages', (req, res) => {
    db.query('SELECT * FROM messages', (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania danych: ', err)
            res.status(500).json('Blad serwera')
        } 
        else {
            res.json(results)
        }
    })
})
app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM messages WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania danych: ', err)
            res.status(500).json({ error: 'Blad serwera'})
        } 
        if (results.length === 0) {
            res.status(404).json('Wiadomosc nie znaleziona')
        }
        else {
        res.json(results[0])
        }
    })
})
app.listen(3000, () => {
    console.log('Serwer dziala na porcie 3000')
})
