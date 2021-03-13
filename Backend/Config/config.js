const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 8080,
    jwtSecret: '4686E7A784E4176F122F7F00D5742225421',
    database: 'mongodb://localhost:27017/clubfinity',
    users: {
      collection: 'users',
    },
    email: {
      domain: 'sandbox1e52eaa57b3e40a0a15b04067684bce6.mailgun.org',
      from: 'Clubfinity <clubfinity@sandbox1e52eaa57b3e40a0a15b04067684bce6.mailgun.org>',
      apiKey: process.env.MAILGUN_API_KEY,
      publicKey: process.env.MAILGUN_PUBLIC_KEY,
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
    email: {
      domain: 'sandbox1e52eaa57b3e40a0a15b04067684bce6.mailgun.org',
      from: 'Clubfinity <clubfinity@sandbox1e52eaa57b3e40a0a15b04067684bce6.mailgun.org>',
      apiKey: process.env.MAILGUN_API_KEY,
      publicKey: process.env.MAILGUN_PUBLIC_KEY,
    },
  },
  ci: {
    port: process.env.PORT || 8080,
    jwtSecret: 'testSecret',
    database: 'mongodb://mongo:27017/clubfinity',
  },
};

module.exports = config[env];
