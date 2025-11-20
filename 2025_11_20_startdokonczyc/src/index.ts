import express, { Express } from 'express'

const app: Express = express()

app.use(express.json())

// REST API
// [GET] /resource -> (200) lista resource
// [GET] /resource/:id -> (200) obiekt resource
// [POST] /resource -> (201) utworzony obiekt
// [PUT] /resource/:id -> (200) nowy stan obiektu \\ Musimy podać cały obiekt
// [PATCH] /resource/:id -> (200) nowy stan obiektu \\ Podajemy tylko to, co chcemy zmienić
// [DELETE] /resource/:id -> (204)

// C.R.U.D -> Create, Read/Retrieve, Update, Delete
// F.U.C.K -> Find, Update, Create, Kill
// D.U.P.A -> Dodaj, Usuń, Pobierz, Aktualizuj

app.head('/post', (req, res) => {
  res.status(200).send('ok')
})

app.post('/post', (req, res) => {
  const { title, content } = req.body

  if (!title || !content) {
    res.status(400).json({ error: 'required fields: title, content' })
  }

  console.log('Title:', title)
  console.log('Content:', content)

  res.status(201).json(req.body)
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
