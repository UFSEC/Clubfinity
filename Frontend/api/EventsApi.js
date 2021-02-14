import API from './BaseApi';
import transformDate from '../util/transform';

exports.getFollowing = async (bearerToken) => {
  const resp = await API.get('/api/events?filterBy=userId', {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.getInMonth = async (bearerToken, date) => {
  const resp = await API.get(`/api/events?filterBy=month&date=${date.toISODate()}&filter=following`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.getForClub = async (bearerToken, clubId) => {
  const resp = await API.get(`/api/events?filterBy=club&clubId=${clubId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};

exports.create = async (bearerToken, eventData) => {
  await API.post('/api/events', eventData, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

exports.update = async (eventId, bearerToken, event) => {
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

exports.updateUsersList = async (eventId, bearerToken, userListType, op) => {
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

exports.addGoingUser = async (eventId, bearerToken) => {
  return await exports.updateUsersList(eventId, bearerToken, 'going-users', 'add')
};

exports.removeGoingUser = async (eventId, bearerToken) => {
  return await exports.updateUsersList(eventId, bearerToken, 'going-users', 'remove')
};

exports.addInterestedUser = async (eventId, bearerToken) => {
  return await exports.updateUsersList(eventId, bearerToken, 'interested-users', 'add')
};

exports.removeInterestedUser = async (eventId, bearerToken) => {
  return await exports.updateUsersList(eventId, bearerToken, 'interested-users', 'remove')
};

exports.addUninterestedUser = async (eventId, bearerToken) => {
  return await exports.updateUsersList(eventId, bearerToken, 'uninterested-users', 'add')
};

exports.removeUninterestedUser = async (eventId, bearerToken) => {
  return await exports.updateUsersList(eventId, bearerToken, 'uninterested-users', 'remove')
};