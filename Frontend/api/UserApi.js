import { API } from "./BaseApi";

// TODO:
// Refactor backend to remove username/email
exports.createUser = async (name, username, password, email) => {
  let axiosResponse = await API.post('/api/user', {
    name: name,
    dob: '2000-01-01',
    email: email,
    username: username,
    password: password
  })
  .then(async response => {
    return { token: response.data.token };
  })
  .catch(error => {
    if (error.response) {
      return { error: error.response.data.error }
    }
    return { error: "Unable to create new user" };
  });
  return axiosResponse;
};