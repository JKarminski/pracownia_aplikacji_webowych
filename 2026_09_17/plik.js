let http = require('http');
const { readFile } = require('fs/promises');
const srv = http.createServer(async(req, res) => {
    const pathname = req.url
    switch (true) {
        case pathname === '/':

            const index = await readFile('index.html', 'utf8')
            res.end(index.toString())
            break

        case pathname === '/css/style.css':
            
            try {
                const css = await readFile('./css/style.css', 'utf8')
                res.writeHead(200, { 'Content-Type': 'text/css' })
                res.end(css)
            } catch (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Nie znaleziono pliku CSS')
            }
            
            break
        
        case pathname === '/kontakt':

            const contact = await readFile('contact.html', 'utf-8')
            res.end(contact.toString())
            break

        default:
            
            res.status = 404
            res.end('Error: Not Found!')
        


    }
}).listen(8080);