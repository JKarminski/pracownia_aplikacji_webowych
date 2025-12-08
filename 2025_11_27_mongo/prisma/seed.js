const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.kategoria.createMany({
    data: [
      { NazwaKat: 'Artykul_biologiczny' },
      { NazwaKat: 'Artykul_naukowy' },
      { NazwaKat: 'Blog' },
      { NazwaKat: 'Newsy' },
      { NazwaKat: 'Opowiadanie' }
    ],
    skipDuplicates: true
  });
  console.log('Kategorie zostały dodane!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
