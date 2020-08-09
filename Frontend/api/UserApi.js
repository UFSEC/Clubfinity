import API from './BaseApi';

// TODO:
// Refactor backend to remove username/email
exports.createUser = async (name, major, year, username, password, email) => {
  const axiosResponse = await API.post('/api/user', {
    name,
    major,
    year,
    email,
    username,
    password,
  })
    .then(async (response) => ({ token: response.data.token }))
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return { error: 'Unable to create new user' };
    });
  return axiosResponse;
};

exports.getUser = async (bearerToken) => {
  const axiosResponse = await API.get(`/api/user/${bearerToken}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then(async (response) => response)
    .catch((error) => {
      if (error.message) {
        return { error };
      }
      return { error: 'Unable to get user' };
    });

  return axiosResponse;
};
