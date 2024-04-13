import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const seeded = await prisma.cinema.createMany({data: [
        {
            "id": 1,
            "name": "Cinéma Beaumont",
            "address1": "541 rue Saint-Vallier Est",
            "address2": null,
            "city": "Québec",
            "postalCode": "G1K 3P9",
            "email": null,
            "phone": "418-524-2113",
            "photo": "https://i.ibb.co/Sv45XNR/meduse-vue-exterieure-de-meduse.jpg",
            "gps": "46.81293938122758;-71.22127317412927",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui cum quaerat molestiae, laudantium sed laborum voluptas cupiditate, earum aliquam id nesciunt impedit itaque debitis culpa.",
            "audio": null
        },
        {
            "id": 2,
            "name": "Cinéma Cartier",
            "address1": "1019 avenue Cartier",
            "address2": null,
            "city": "Québec",
            "postalCode": "G1R 2S3",
            "email": null,
            "phone": "418-522-1011",
            "photo": "https://i.ibb.co/wWm5TMr/cinema-cartier-is-on.jpg",
            "gps": "46.804231969085244;-71.22623480220928",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui cum quaerat molestiae, laudantium sed laborum voluptas cupiditate, earum aliquam id nesciunt impedit itaque debitis culpa.",
            "audio": null
        },
        {
            "id": 3,
            "name": "Musée national des beaux-arts",
            "address1": "179 Grande Allée Ouest",
            "address2": null,
            "city": "Québec",
            "postalCode": "G1R 2H1",
            "email": null,
            "phone": "418-643-2150",
            "photo": "https://aws-tiqets-cdn.imgix.net/images/content/ee95e375eeb04bfc96cb9aa6e2b7455d.jpg",
            "gps": "46.80105431881655;-71.22505404833768",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui cum quaerat molestiae, laudantium sed laborum voluptas cupiditate, earum aliquam id nesciunt impedit itaque debitis culpa.",
            "audio": null
        },
        {
            "id": 4,
            "name": "Cineplex IMAX",
            "address1": "5401 boulevard des Galeries",
            "address2": null,
            "city": "Québec",
            "postalCode": "G2K 1N4",
            "email": null,
            "phone": "418-624-4629",
            "photo": "https://m1.quebecormedia.com/emp/jdx-prod-images/8f7bcb9f-c099-4fe4-9704-16e1886225b1_JDX-NO-RATIO_WEB.jpg?impolicy=resize&quality=80&width=1400",
            "gps": "46.83079977306554;-71.29934846738078",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui cum quaerat molestiae, laudantium sed laborum voluptas cupiditate, earum aliquam id nesciunt impedit itaque debitis culpa.",
            "audio": null
        },
        {
            "id": 5,
            "name": "Cineplex Odéon Beauport",
            "address1": "825 rue Clémenceau",
            "address2": null,
            "city": "Québec",
            "postalCode": "G1C 2K6",
            "email": null,
            "phone": "418-661-9494",
            "photo": "https://i.ibb.co/VgP2hwN/2017-05-14.jpg",
            "gps": "46.869923503067305;-71.20867034529195",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui cum quaerat molestiae, laudantium sed laborum voluptas cupiditate, earum aliquam id nesciunt impedit itaque debitis culpa.",
            "audio": null
        },
        {
            "id": 6,
            "name": "Cineplex Odéon Sainte-Foy",
            "address1": "1200 autoroute Duplessis",
            "address2": null,
            "city": "Québec",
            "postalCode": "G2G 2B5",
            "email": null,
            "phone": "418-871-6812",
            "photo": "https://photos.cinematreasures.org/production/photos/215322/1501695859/large.jpg?1501695859",
            "gps": "46.78604291561606;-71.35388988416115",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui cum quaerat molestiae, laudantium sed laborum voluptas cupiditate, earum aliquam id nesciunt impedit itaque debitis culpa.",
            "audio": null
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