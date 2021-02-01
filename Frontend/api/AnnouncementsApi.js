import API from './BaseApi';
import transformDate from '../util/transform';

exports.create = async (bearerToken, params) => {
  await API.post('/api/announcement', params, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

exports.getForClub = async (bearerToken, clubId) => {
  const resp = await API.get(`/api/announcement/club/${clubId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.update = async (bearerToken, announcementId, params) => {
  const resp = await API.put(`/api/announcement/${announcementId}`, params, {
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
