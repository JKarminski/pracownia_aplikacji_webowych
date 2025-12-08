require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { MongoClient } = require('mongodb');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const accessLogger = require('./middleware/accessLogger')();
app.use(accessLogger);

//CRUD dla wpisow

app.post('/wpisy', async (req, res, next) => {
  try {
    const { Autor, Tytul, Zawartosc, KatId } = req.body;
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
    next(error);
  }
});

app.get('/wpisy', async (req, res, next) => {
  try {
    const wpisy = await prisma.wpis.findMany({
      include: { Kategoria: true, Komentarz: true }
    });
    if (!wpisy || wpisy.length === 0) {
      return res.status(404).json({ error: "Nie znaleziono wpisu" });
    }
    res.json(wpisy);
  } catch (error) {
    next(error);
  }
});

app.get('/wpisy/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const wpis = await prisma.wpis.findUnique({
      where: { id_wpis: id },
      include: { Kategoria: true, Komentarz: true }
    });

    if (!wpis) {
      const err = new Error('Nie znaleziono wpisu');
      err.status = 404;
      return next(err);
    }

    res.json(wpis);
  } catch (error) {
    next(error);
  }
});

app.put('/wpisy/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const { Autor, Tytul, Zawartosc, KatId } = req.body;
    const aktualizowanyWpis = await prisma.wpis.update({
      where: { id_wpis: id },
      data: { Autor, Tytul, Zawartosc, KatId }
    });
    res.json(aktualizowanyWpis);
  } catch (error) {
    next(error);
  }
});

app.delete('/wpisy/:id', async (req, res, next) => {
  try {
    const idWpisu = parseInt(req.params.id);
    if (Number.isNaN(idWpisu)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const usutnieteKomentarze = await prisma.komentarz.deleteMany({
      where: { WpisId: idWpisu }
    });
    const usunietyWpis = await prisma.wpis.delete({
      where: { id_wpis: idWpisu }
    });

    res.json("Wpis o id: " + idWpisu + " wraz z komentarzami usuniety!");
    console.log(usunietyWpis);
    console.log(usutnieteKomentarze);
  } catch (error) {
    next(error);
  }
});

//CRUD dla kategorii (tylko odczyt poniewaz tabela jest oparta na enumach i ma seeda ktory automatycznie wypelnia tabele {package.json})

app.get('/kategoriezwpisami', async (req, res, next) => {
  try {
    const kategorie = await prisma.kategoria.findMany({
      include: { Wpis: true }
    });
    res.json(kategorie);
  } catch (error) {
    next(error);
  }
});

app.get('/kategorie', async (req, res, next) => {
  try {
    const kategorie = await prisma.kategoria.findMany();
    res.json(kategorie);
  } catch (error) {
    next(error);
  }
});

app.get('/kategoriezwpisami/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const kategoria = await prisma.kategoria.findUnique({
      where: { id_kat: id },
      include: { Wpisy: true }
    });
    res.json(kategoria);
  } catch (error) {
    next(error);
  }
});
app.get('/kategorie/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const kategoria = await prisma.kategoria.findUnique({
      where: { id_kat: id }
    });
    res.json(kategoria);
  } catch (error) {
    next(error);
  }
});

//CRUD dla komentarzy
app.post('/komentarze', async (req, res, next) => {
  try {
    const { AutorKom, Zawartosc, WpisId } = req.body;
    const nowyKomentarz = await prisma.komentarz.create({
      data: {
        AutorKom,
        Zawartosc,
        WpisId
      },
    });
    res.json(nowyKomentarz);
  } catch (error) {
    next(error);
  }
});

app.get('/komentarze', async (req, res, next) => {
  try {
    const komentarze = await prisma.komentarz.findMany();
    res.json(komentarze);
  } catch (error) {
    next(error);
  }
});

app.get('/komentarze/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const komentarz = await prisma.komentarz.findUnique({
      where: { id_kom: id }
    });
    if (!komentarz) {
      return res.status(404).json({ error: "Nie znaleziono komentarza" });
    }
    res.json(komentarz);
  } catch (error) {
    next(error);
  }
});

// Zwraca komentarze tylko dla danego wpisu
app.get('/komentarze_dla_wpisu/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const komentarze = await prisma.komentarz.findMany({
      where: { WpisId: id }
    });
    res.json(komentarze);
  } catch (error) {
    next(error);
  }
});

app.put('/komentarze/:id', async (req, res, next) => {
  try {
    console.log("Aktualizacja komentarza o id: " + req.params.id + "o tresci: " + req.body.Zawartosc);
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const { AutorKom, Zawartosc, WpisId } = req.body;
    const aktualizowanyKomentarz = await prisma.komentarz.update({
      where: { id_kom: id },
      data: { AutorKom, Zawartosc, WpisId }
    });
    res.json(aktualizowanyKomentarz);
    console.log(aktualizowanyKomentarz);
  } catch (error) {
    next(error);
  }
});

app.delete('/komentarze/:id', async (req, res, next) => {
  try {
    const idKomentarza = parseInt(req.params.id);
    if (Number.isNaN(idKomentarza)) {
      const err = new Error('Invalid id');
      err.status = 400;
      return next(err);
    }
    const usunietyKomentarz = await prisma.komentarz.delete({
      where: { id_kom: idKomentarza }
    });
    res.json("Komentarz o id: " + idKomentarza + " usuniety!");
    console.log(usunietyKomentarz);
  } catch (error) {
    next(error);
  }
});


const errorHandler = require('./middleware/errorHandler')();
app.use(errorHandler);

async function start() {
  const client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  app.locals.db = client.db();

  const server = app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });


  const gracefulShutdown = async () => {
    console.log('Shutting down...');
    try {
      await prisma.$disconnect();
      await client.close();
      server.close(() => process.exit(0));
    } catch (e) {
      console.error('Error during shutdown', e);
      process.exit(1);
    }
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection', reason);
  });
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception', err);
    process.exit(1);
  });
}

start().catch(err => {
  console.error('Failed to start', err);
  process.exit(1);
});
