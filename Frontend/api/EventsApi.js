import { DateTime } from 'luxon';
import { API } from "./BaseApi";

exports.getFollowing = async bearerToken => {
  let resp = await API.get('/api/event/following', {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });

  return transformEvents(resp.data.data);
};

exports.getInMonth = async (bearerToken, date) => {
  const resp = await API.get(`/api/event/inMonth/${date.toISODate()}?filter=following`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });

  return transformEvents(resp.data.data);
};

const transformEvents = (events) => {
  return events.map(event => {
    const date = DateTime.fromISO(event.date);

    return {
      ...event,
      date
    }
  })
};
