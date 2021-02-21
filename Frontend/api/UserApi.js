import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './BaseApi';

// TODO:
// Refactor backend to remove username/email
exports.createUser = async (name, major, year, username, password, email) => {
  const axiosResponse = await API.post('/api/users', {
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

exports.getUser = async () => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const axiosResponse = await API.get('/api/users/', {
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

exports.updateUser = async (user) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const axiosResponse = await API.put(
    '/api/users/',
    user,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  )
    .then(async (response) => response)
    .catch((error) => {
      if (error) {
        return error;
      }
      return { error: 'Unable to update profile' };
    });
  return axiosResponse;
};

exports.updateClub = async (clubId, isFollowing) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const axiosResponse = await API.patch(
    `/api/users/clubs/${clubId}?isFollowing=${isFollowing}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  )
    .then(async (response) => response)
    .catch((error) => {
      if (error) {
        return error;
      }
      return { error: 'Unable to follow club' };
    });
  return axiosResponse;
};

exports.updatePushToken = async (pushToken) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const axiosResponse = await API.patch(
    `/api/users?pushToken=${pushToken}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  )
    .then(async (response) => response)
    .catch((error) => {
      if (error) {
        return error;
      }
      return { error: 'Unable to update push token' };
    });
  return axiosResponse;
}

exports.followClub = async (clubId) => exports.updateClub(clubId, true);

exports.unfollowClub = async (clubId) => exports.updateClub(clubId, false);
