require("ts-node").register();
const config = require("../Config/config.json");
const { Seeder } = require("mongo-seeding");

const seedConfig = {
  database: {
    host: config.development.database.host,
    port: config.development.database.port,
    name: config.development.database.database
  },
  dropDatabase: true
};
const seeder = new Seeder(seedConfig);
console.log("Seeding from " + __filename + "/data")
const collections = seeder.readCollectionsFromPath( __filename.replace("seed.js", "data"), {
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
