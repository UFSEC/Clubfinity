const app = require('../app');

after(() => {
  app.stop();
});
