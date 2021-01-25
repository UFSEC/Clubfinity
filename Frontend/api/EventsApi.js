import API from './BaseApi';
import transformDate from '../util/transform';

exports.getFollowing = async (bearerToken) => {
  const resp = await API.get('/api/event/following', {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.getInMonth = async (bearerToken, date) => {
  const resp = await API.get(`/api/event/inMonth/${date.toISODate()}?filter=following`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.getForClub = async (bearerToken, clubId) => {
  const resp = await API.get(`/api/event/club/${clubId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.create = async (bearerToken, eventData) => {
  await API.post('/api/event', eventData, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

exports.update = async (eventId, bearerToken, event) => {
  const axiosResponse = await API.put(`/api/event/${eventId}`,
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

exports.addGoingUser = async (eventId, bearerToken) => {
  const axiosResponse = await API.post(
    `/api/event/${eventId}/going-users`, {},
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );
  return axiosResponse;
};

exports.removeGoingUser = async (eventId, bearerToken) => {
  const axiosResponse = await API.delete(
    `/api/event/${eventId}/going-users`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );
  return axiosResponse;
};

exports.addInterestedUser = async (eventId, bearerToken) => {
  const axiosResponse = await API.post(
    `/api/event/${eventId}/interested-users`,
    {},
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );

  return axiosResponse;
};

exports.removeInterestedUser = async (eventId, bearerToken) => {
  const axiosResponse = await API.delete(
    `/api/event/${eventId}/interested-users`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );
  return axiosResponse;
};

exports.addMutedUser = async (eventId, bearerToken) => {
  const axiosResponse = await API.post(
    `/api/event/${eventId}/muted-users`,
    {},
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );
  return axiosResponse;
};

exports.removeMutedUser = async (eventId, bearerToken) => {
  const axiosResponse = await API.delete(
    `/api/event/${eventId}/muted-users`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );
  return axiosResponse;
};
