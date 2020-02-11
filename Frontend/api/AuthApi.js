import { API } from "./BaseApi";

exports.authenticate = async (username, password) => {
  let axiosResponse = await API.post("/auth/login", {
    username: username,
    password: password
  })
    .then(async response => {
      return { token: response.data.token };
    })
    .catch(error => {
      console.log(error);
      return {
        errors: error.response.data.error || "Invalid Credentials. Try again"
      };
    });
  return axiosResponse;
};
