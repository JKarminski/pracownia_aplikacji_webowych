let http = require('http');
const { readFile } = require('fs/promises');
const srv = http.createServer(async(req, res) => {
    const pathname = req.url
    switch (true) {
        case pathname === '/':
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('<h1>TEST</h1>')
            break
        case pathname === '/file':
            const file = await readFile('file.html', 'utf8')
            res.end(file.toString())
            break
        case pathname === '/json':
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify("siema"))
            break
        case pathname === '/tekst':
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('coswypisz')
            break
        case pathname === "/get_params":
            if (pathname === "/get_params")
                res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Parametry zostaly zebrane')
            console.log("parametry dzialaja")

            break
        default:
            res.status = 404
            res.end('Error: Not Found!')


    }
}).listen(8080);