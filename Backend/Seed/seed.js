const tsNode = require('ts-node');
const { Seeder } = require('mongo-seeding');
const path = require('path');

const seedConfig = {
  database: {
    host: 'localhost',
    port: 27017,
    name: 'test',
  },
  dropDatabase: true,
};
tsNode.register();
const seeder = new Seeder(seedConfig);
console.log(`Seeding from ${path.resolve('Seed', 'data')}`);
const collections = seeder.readCollectionsFromPath(path.resolve('./Seed/data'), {
  extensions: ['ts'],
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
});

seeder
  .import(collections)
  .then(() => {
    console.log('Success loading data into database');
  })
  .catch((err) => {
    console.log('Error loading data into database', err);
  });
