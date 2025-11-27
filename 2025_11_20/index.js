const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

//CRUD dla wpisow

app.post('/wpisy', async (req, res) => {
  try {
  const {Autor, Tytul, Zawartosc, KatId} = req.body;
  const nowyWpis = await prisma.wpis.create({
    data: {
      Autor,
      Tytul,
      Zawartosc,
      KatId
    },
  });
  res.json(nowyWpis);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas tworzenia wpisu." });
  }
})

app.get('/wpisy', async (req, res) => {
  try {
  const wpisy = await prisma.wpis.findMany({
    include: { Kategoria: true, Komentarz: true }
  });
  res.json(wpisy);

  if (!wpis || wpis.length === 0) {
    return res.status(404).json({ error: "Nie znaleziono wpisu" });
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Wystapil blad podczas pobierania wpisow." });
  }
})

app.get('/wpisy/:id', async (req, res) => {
  try {
  const wpis = await prisma.wpis.findUnique({
    where: { id_wpis: parseInt(req.params.id) },
    include: { Kategoria: true, Komentarz: true }
  });

  if (!wpis) {
    return res.status(404).json({ error: "Nie znaleziono wpisu" });
  }

  res.json(wpis);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas pobierania wpisu!" });
  }
})

app.put('/wpisy/:id', async (req, res) => {
  try{
  const {Autor, Tytul, Zawartosc, KatId} = req.body;
  const aktualizowanyWpis = await prisma.wpis.update({
    where: {id_wpis : parseInt(req.params.id)},
    data: {Autor, Tytul, Zawartosc, KatId}
  });
  res.json(aktualizowanyWpis);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas aktualizacji wpisu!" });
  }
})

app.delete('/wpisy/:id', async (req, res) => {
  try {
  const idWpisu = req.params.id;
  const usutnieteKomentarze = await prisma.komentarz.deleteMany({
    where: {WpisId : parseInt(idWpisu)}
  });
  const usunietyWpis = await prisma.wpis.delete({
    where: {id_wpis : parseInt(idWpisu)}
  });
  
  res.json("Wpis o id: "+ idWpisu +" wraz z komentarzami usuniety!");
  console.log(usunietyWpis);
  console.log(usutnieteKomentarze);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas usuwania wpisu!" });
  }
})

//CRUD dla kategorii (tylko odczyt poniewaz tabela jest oparta na enumach i ma seeda ktory automatycznie wypelnia tabele {package.json})

app.get('/kategoriezwpisami', async (req, res) => {
  try {
  const kategorie = await prisma.kategoria.findMany({
    include: { Wpis: true }
  });
  res.json(kategorie);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas pobierania kategorii z wpisami." });
  }
})

app.get('/kategorie', async (req, res) => {
  try {
  const kategorie = await prisma.kategoria.findMany();
  res.json(kategorie);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas pobierania kategorii." });
  }
})

app.get('/kategoriezwpisami/:id', async (req, res) => {
  try {
  const kategoria = await prisma.kategoria.findUnique({
    where: { id_kat: parseInt(req.params.id) },
    include: { Wpisy: true }
  });
  res.json(kategoria);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas pobierania kategorii z wpisami." });
  }
})
app.get('/kategorie/:id', async (req, res) => {
  try {
  const kategoria = await prisma.kategoria.findUnique({
    where: { id_kat: parseInt(req.params.id) }
  });
  res.json(kategoria);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas pobierania kategorii." });
  }
})

//CRUD dla komentarzy
app.post('/komentarze', async (req, res) => {
  try {
  const {AutorKom, Zawartosc, WpisId} = req.body;
  const nowyKomentarz = await prisma.komentarz.create({
    data: {
      AutorKom,
      Zawartosc,
      WpisId
    },
  });
  res.json(nowyKomentarz);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas tworzenia komentarza." });
  }
})

app.get('/komentarze', async (req, res) => {
  try {
  const komentarze = await prisma.komentarz.findMany();
  res.json(komentarze);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas pobierania komentarzy." });
  }
})

app.get('/komentarze/:id', async (req, res) => {
  try {
  const komentarz = await prisma.komentarz.findUnique({
    where: { id_kom: parseInt(req.params.id) }
  });
  if(!komentarz){
    return res.status(404).json({ error: "Nie znaleziono komentarza" });
  }
  res.json(komentarz);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas pobierania komentarza." });
  }
})

// Zwraca komentarze tylko dla danego wpisu
app.get('/komentarze_dla_wpisu/:id', async (req, res) => {
  try {
  const komentarze = await prisma.komentarz.findMany({
    where: { WpisId: parseInt(req.params.id) }
  });
  res.json(komentarze);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas pobierania komentarzy dla wpisu." });
  }
})

app.put('/komentarze/:id', async (req, res) => {
  try {
  console.log("Aktualizacja komentarza o id: " + req.params.id + "o tresci: " + req.body.Zawartosc);
  const {AutorKom, Zawartosc, WpisId} = req.body;
  const aktualizowanyKomentarz = await prisma.komentarz.update({
    where: {id_kom : parseInt(req.params.id)},
    data: {AutorKom, Zawartosc, WpisId}
  });
  res.json(aktualizowanyKomentarz);
  console.log(aktualizowanyKomentarz);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas aktualizacji komentarza!" });
  }
})

app.delete('/komentarze/:id', async (req, res) => {
  try {
  const idKomentarza = req.params.id;
  const usunietyKomentarz = await prisma.komentarz.delete({
    where: {id_kom : parseInt(idKomentarza)}
  });
  res.json("Komentarz o id: "+ idKomentarza +" usuniety!");
  console.log(usunietyKomentarz);
  } catch (error) {
    res.status(500).json({ error: "Wystapil blad podczas usuwania komentarza!" });
  }
})


app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
