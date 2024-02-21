import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const seeded = await prisma.productionHouse.createMany({data: [
        {
            "name": "8cube",
            "address1": "",
            "postalCode": "",
            "city": "",
            "phone": "514-578-1462",
            "email": "info@8cube.ca"
        }
    ]})
}