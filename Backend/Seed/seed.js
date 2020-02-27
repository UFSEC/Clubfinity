require("ts-node").register();
const config = require("../Config/config");
const { Seeder } = require("mongo-seeding");
const path = require('path');

const seedConfig = {
  database: {
    host: config.database.host,
    port: config.database.port,
    name: config.database.database
  },
  dropDatabase: true
};
const seeder = new Seeder(seedConfig);
console.log("Seeding from " + path.resolve("Seed", "data"));
const collections = seeder.readCollectionsFromPath( path.resolve('./Seed/data'), {
  extensions: ["ts"],
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
});

seeder
  .import(collections)
  .then(() => {
    console.log("Success loading data into database");
  })
  .catch(err => {
    console.log("Error loading data into database", err);
  });
