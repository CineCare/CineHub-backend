import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const seeded = await prisma.cinema.createMany({data: [
        {
            "name": "Cinéma Beaumont",
            "address1": "541 rue Saint-Vallier Est",
            "postalCode": "G1K 3P9",
            "city": "Québec",
            "phone": "418-524-2113"
        },
        {
            "name": "Cinéma Cartier",
            "address1": "1019 avenue Cartier",
            "postalCode": "G1R 2S3",
            "city": "Québec",
            "phone" : "418-522-1011"
        },
        {
            "name": "Musée national des beaux-arts",
            "address1": "179 Grande Allée Ouest",
            "postalCode": "G1R 2H1",
            "city": "Québec",
            "phone": "418-643-2150"
        },
        {
            "name": "Cineplex IMAX",
            "address1": "5401 boulevard des Galeries",
            "postalCode": "G2K 1N4",
            "city": "Québec",
            "phone": "418-624-4629"
        },
        {
            "name": "cineplex Odéon Beauport",
            "address1": "825 rue Clémenceau",
            "postalCode": "G1C 2K6",
            "city": "Québec",
            "phone": "418-661-9494"
        },
        {
            "name": "Cineplex Odéon Sainte-Foy",
            "address1": "1200 autoroute Duplessis",
            "postalCode": "G2G 2B5",
            "city": "Québec",
            "phone": "418-871-6812"
        }
    ]})
}
main()
  .then(async () => {
    console.log("Seed successfull");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })