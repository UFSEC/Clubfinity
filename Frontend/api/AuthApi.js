import { AsyncStorage } from 'react-native';
import API from './BaseApi';

exports.authenticate = async (email, password) => {
  const axiosResponse = await API.post('/auth/login', {
    email,
    password,
  })
    .then(async (response) => {
      await AsyncStorage.setItem('userToken', response.data.token);
      return { token: response.data.token, user: response.data.user };
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: 'Invalid email/password!',
      };
    });
  return axiosResponse;
};
