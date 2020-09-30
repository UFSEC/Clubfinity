import { DateTime } from 'luxon';
import API from './BaseApi';

const transformEvents = (events) => events.map((event) => {
  const date = DateTime.fromISO(event.date);

  return {
    ...event,
    date,
  };
});

exports.getFollowing = async (bearerToken) => {
  const resp = await API.get('/api/event/following', {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformEvents(resp.data.data);
};

exports.getInMonth = async (bearerToken, date) => {
  const resp = await API.get(`/api/event/inMonth/${date.toISODate()}?filter=following`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformEvents(resp.data.data);
};

exports.create = async (bearerToken, eventData) => {
  await API.post('/api/event', eventData, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};
