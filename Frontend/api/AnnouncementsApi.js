import API from './BaseApi';
import transformDate from '../util/transform';

exports.getForClub = async (bearerToken, clubId) => {
  const resp = await API.get(`/api/announcement/club/${clubId}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return transformDate(resp.data.data);
};
