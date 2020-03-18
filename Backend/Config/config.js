const env = process.env.NODE_ENV || "development";

const config = {
  "development": {
    "port": process.env.PORT || 8080,
    "jwtSecret": "4686E7A784E4176F122F7F00D5742225421",
    "database": {
      "host": "localhost",
      "port": 27017,
      "database": "test",
      "url": "mongodb://localhost:27017/"
    },
    "users": {
      "collection": "users"
    }
  },
  "test": {
    "port": process.env.PORT || 8080,
    "database": {
      "host": "localhost",
      "port": 27017,
      "database": "test",
      "url": "mongodb://localhost:27017/"
    },
    "jwtSecret": "4686E7A784E4176F122F7F00D5742225421",
  },
  "production": {
    "port": process.env.PORT || 8080,
    "jwtSecret": "testSecret",
    "database": {
      "host": process.env.DATABASE_HOST,
      "port": process.env.DATABASE_PORT,
      "database": process.env.DATABASE_NAME
    },
    "users": {
      "collection": "users"
    }
  }
}

module.exports = config[env];
