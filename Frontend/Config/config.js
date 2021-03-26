// eslint-disable-next-line no-undef
const env = __DEV__ ? 'development' : 'production';

const config = {
  development: {
    url: 'http://35.238.13.210:8080/',
  },
  production: {
    url: 'http://34.121.184.156:8080/',
  },
};

export default config[env];
