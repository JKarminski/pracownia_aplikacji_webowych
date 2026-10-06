let http = require('http')
const { readFile, writeFile } = require('fs/promises')
const srv = http.createServer(async(req, res) => {

    const reqUrl = new URL(req.url, `http://${req.headers.host}`)
    const pathname = reqUrl.pathname

    switch (true) {

        case pathname === '/':

            try {
            const index = await readFile('index.html', 'utf8')
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(index)
            } catch (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
                res.end('Nie znalezniono pliku index.html')
            }
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
            
            const name = reqUrl.searchParams.get('name')
            const email = reqUrl.searchParams.get('email')
            const message = reqUrl.searchParams.get('message')

            if (name && email && message) {
                const timestamp = Date.now()
                const formData = {
                    name: name || '',
                    email: email || '',
                    message: message || '',
                    timestamp: timestamp
                }

                const fileName = `message_${timestamp}.json`

                try {
                    await writeFile(fileName, JSON.stringify(formData, null, 2), 'utf-8')
                    console.log(`Zapisano pomyslnie plik: ${fileName}`)
                } catch (err) {
                    console.error(`Błąd podczas zapisu pliku: `, err)
                }
            }

            try {
                const contact = await readFile('contact.html', 'utf-8')
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(contact)
            } catch (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
                res.end('Nie znaleziono pliku contact.html')
            }

            break

        default:
            
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
            res.end('Error: Not Found!')

    }
}).listen(8080, () => {
    console.log('Serwer http uruchomiony pod adresem http://localhost:8080')
})