import API from './BaseApi';

exports.create = async (bearerToken, announcement) => {
  await API.post('/api/announcement/', announcement, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};
