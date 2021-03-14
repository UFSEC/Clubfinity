import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './BaseApi';
import transformDate from '../util/transform';

exports.getFollowing = async () => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const resp = await API.get('/api/events?filterBy=userId', {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.getInMonth = async (date) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const resp = await API.get(`/api/events?filterBy=month&date=${date.toISODate()}&filter=following`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.getForClub = async (clubId) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const resp = await API.get(`/api/events?filterBy=club&clubId=${clubId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.create = async (eventData) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  await API.post('/api/events', eventData, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

exports.update = async (eventId, event) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const axiosResponse = await API.put(`/api/events/${eventId}`,
    event,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })
    .then(async (response) => response)
    .catch((error) => {
      if (error) {
        return error;
      }
      return { error: 'Unable to update event' };
    });
  return axiosResponse;
};

exports.updateUsersList = async (eventId, userListType, op) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const axiosResponse = await API.patch(
    `/api/events/${eventId}/${userListType}?op=${op}`, {},
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );
  return axiosResponse;
};

exports.addGoingUser = async (eventId) => exports.updateUsersList(eventId, 'going-users', 'add');

exports.removeGoingUser = async (eventId) => exports.updateUsersList(eventId, 'going-users', 'remove');

exports.addInterestedUser = async (eventId) => exports.updateUsersList(eventId, 'interested-users', 'add');

exports.removeInterestedUser = async (eventId) => exports.updateUsersList(eventId, 'interested-users', 'remove');

exports.addUninterestedUser = async (eventId) => exports.updateUsersList(eventId, 'uninterested-users', 'add');

exports.removeUninterestedUser = async (eventId) => exports.updateUsersList(eventId, 'uninterested-users', 'remove');

exports.delete = async (eventId) => {
  const bearerToken = await AsyncStorage.getItem('userToken');

  return API.delete(`/api/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .catch((error) => error || { error: 'Internal server error. Unable to delete event' });
};
