import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.productionHouse.createMany({
    data: [
      {
        name: '1 Maison de production I inc',
        address1: '1729, rue Fullum',
        city: 'Montréal',
        postalCode: 'H2K 3M7',
        email: 'info@plusun.ca ',
        phone: '(514) 770-5797',
        gps: '45.52924403146595,-73.55201730976732',
      },
      {
        name: 'Acéphale',
        address1: '3-161 Bernard O.',
        city: 'Montréal',
        postalCode: 'H2T 2K3',
        email: 'mustafa@acephale.ca',
        webSite: 'https://acephale.ca',
        gps: '45.52546029431594,-73.6041761353704',
      },
      {
        name: 'ACPAV',
        address1: '1030, rue Cherrier',
        address2: 'bureau 404',
        city: 'Montréal',
        postalCode: 'H2L 1H9',
        email: 'info@acpav.ca',
        phone: '(514) 849-2281',
        webSite: 'https://www.acpav.ca',
        gps: '45.521767311933495,-73.56665321835945',
      },
      {
        name: 'Anémone Films',
        address1: '6700, boul. Pierre-Bertrand',
        address2: 'bureau 208',
        city: 'Québec',
        postalCode: 'G2J 0B4',
        email: 'info@anemonefilms.com',
        phone: '(514) 287-1277',
        webSite: 'https://torqlegroupe.com',
        gps: '46.842302704820774,-71.28754537548663',
      },
      {
        name: 'Caribara Montréal',
        address1: '160 st. viateur E',
        address2: 'suite 305',
        city: 'Montréal',
        postalCode: 'H2T 1A8',
        email: 'contact@caribara-montreal.com',
        phone: '(438) 927-1053',
        webSite: 'https://caribara-montreal.com',
        gps: '45.52732323882642,-73.59743191822037',
      },
      {
        name: 'Catbird Productions',
        address1: '210b Av. Mozart O',
        city: 'Montréal',
        postalCode: 'H2S 1C4',
        email: 'info@catbirdproductions.ca',
        phone: '(514) 419-8590',
        webSite: 'https://catbirdproductions.ca',
        gps: '45.531180702572925,-73.61723166068933',
      },
      {
        name: 'Coco.TV',
        address1: '225, rue Roy E',
        address2: 'bureau 103',
        city: 'Montréal',
        postalCode: 'H2W 1M5',
        email: 'info@cocotv.ca',
        phone: '(438) 476-2626',
        webSite: 'https://www.cocotv.ca',
        gps: '45.51777267537136,-73.57450530302022',
      },
      {
        name: 'Cosmos films',
        address1: ' 6465 Rue Durocher',
        city: 'Outremont',
        postalCode: 'H2V 3Z1',
        email: 'info@filmscosmos.com',
        webSite: 'https://www.filmscosmos.com',
        gps: '45.52588740511594,-73.61324846068956',
      },
      {
        name: 'Datsit Sphère',
        address1: '4200, boul Saint-Laurent',
        address2: 'bureau 1200',
        city: 'Montréal',
        postalCode: 'H2W 2R2',
        email: 'info@datsitsphere.tv',
        phone: '(514) 866-3020',
        webSite: 'https://sphere-media.com',
        gps: '45.51824517391955,-73.58218784719453',
      },
      {
        name: 'Digital Dimension',
        address1: '5555 Av. Casgrain',
        address2: 'suite 301',
        city: 'Montréal',
        postalCode: 'H2T 1Y1',
        email: 'fgarcia@digitaldimension.com',
        webSite: 'https://digitaldimension.com',
        gps: '45.52787652744264,-73.59797054534998',
      },
      {
        name: 'Eurêka! Productions',
        address1: '9494, boulevard St-Laurent',
        address2: 'bureau 1011',
        city: 'Montréal',
        postalCode: 'H2N 1P4',
        email: 'info@eureka-tv.com',
        phone: '(514) 272-3500',
        webSite: 'https://eureka-tv.com/fr/',
        gps: '45.54542654869973,-73.65452736068877',
      },
      {
        name: 'Facet4 Media',
        address1: '1303 Ave Greene',
        address2: '#407',
        city: 'Westmount',
        postalCode: 'H3Z 2A9',
        email: 'jamie@facet4.ca',
        phone: '+1 818-907-0500',
        webSite: 'http://www.facet4.ca',
        gps: '45.48756841836861,-73.5900252453517',
      },
    ],
  });
}
main()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log('Seed successfull');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
