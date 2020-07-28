const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 8080,
    jwtSecret: '4686E7A784E4176F122F7F00D5742225421',
    database: 'mongodb://localhost:27017/clubfinity',
    users: {
      collection: 'users',
    },
  },
  test: {
    port: process.env.PORT || 8080,
    database: 'mongodb://localhost:27017/clubfinity',
    jwtSecret: '4686E7A784E4176F122F7F00D5742225421',
  },
  production: {
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET,
    database: process.env.DATABASE_URL,
    users: {
      collection: 'users',
    },
  },
  ci: {
    port: process.env.PORT || 8080,
    jwtSecret: 'testSecret',
    database: 'mongodb://mongo:27017/clubfinity',
  },
};

module.exports = config[env];
