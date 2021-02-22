import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './BaseApi';
import transformDate from '../util/transform';

exports.create = async (params) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  await API.post('/api/announcements', params, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

exports.getForClub = async (clubId) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const resp = await API.get(`/api/announcements?filterBy=club&clubId=${clubId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.update = async (announcementId, params) => {
  const bearerToken = await AsyncStorage.getItem('userToken');

  const resp = await API.put(`/api/announcements/${announcementId}`, params, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then(async (response) => response)
    .catch((error) => {
      if (error) {
        return error;
      }
      return { error: 'Unable to update announcement' };
    });
  return resp;
};
