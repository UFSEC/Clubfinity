import API from './BaseApi';

exports.updateAnnouncement = async (announcementId, bearerToken, update) => {
  const axiosResponse = await API.put(
    `/api/announcement/${announcementId}`,
    update,
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
      return { error: 'Unable to update announcement' };
    });
  return axiosResponse;
};

exports.getAnnouncement = async (announcementId, bearerToken) => {
  const axiosResponse = await API.get(`/api/announcement/${announcementId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then(async (response) => response)
    .catch((error) => {
      if (error.message) {
        return { error };
      }
      return { error: 'Unable to get announcement' };
    });

  return axiosResponse;
};
