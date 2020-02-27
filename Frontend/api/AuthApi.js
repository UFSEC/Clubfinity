import { API } from "./BaseApi";
import { AsyncStorage } from 'react-native';

exports.authenticate = async (username, password) => {
  let axiosResponse = await API.post("/auth/login", {
      username: username,
      password: password
    })
    .then(async response => {
      await AsyncStorage.setItem('userToken', response.data.token);
      return { token: response.data.token };
    })
    .catch(error => {
      if (error.response) {
        return { error: error.response.data.error }
      }
      return {
        error: "Invalid user/password!"
      };
    });
  return axiosResponse;
};
