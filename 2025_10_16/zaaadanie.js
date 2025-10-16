const express = require('express')
const path = require("node:path");
const fs = require('fs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Strona glowna')
})

app.get('/json', (req, res) => {
    res.json({
        Jakis: 'dokument',
    })
})

app.get('/htmlzkodu', (req, res) => {
    res.send(
        `<html>
        <head>
            <title>Jakis</title>
        </head>
        <body>
            <h2>jestes w kodzie z jsa :0</h2>
        </body>
        </html>
        `
    )
})

app.get('/pobrany', (req, res) => {
    res.sendFile(path.join(__dirname, 'pliczek.html'))
})
app.get('/get_params', (req, res) => {
    console.log(req.query)
    var parametry = 'params_' + Date.now(); + '.json'
    fs.writeFile(parametry, JSON.stringify(req.query), 'utf8', (err) => {})
    res.json({
        ok: "ok"
    })

})
app.listen(port, () => {
    console.log("App listening at http://localhost:" + port)
})
