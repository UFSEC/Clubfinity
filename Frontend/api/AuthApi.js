import { API } from "./BaseApi";
import { AsyncStorage } from 'react-native';

exports.authenticate = async (username, password) => {
  let axiosResponse = await API.post("/auth/login", {
      username: username,
      password: password
    })
    .then(async response => {
      console.log("Cat?")
      await AsyncStorage.setItem('userToken', response.data.token);
      return { token: response.data.token };
    })
    .catch(error => {
      console.log("???")
      console.log(error);
      if (error.response) {
        return { error: error.response.data.error }
      }
      return {
        error: "Invalid user/password!"
      };
    });
  console.log("Mega cat");
  console.log(axiosResponse);
  return axiosResponse;
};
