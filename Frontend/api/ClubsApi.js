import { API } from './BaseApi';

exports.getFollowing = async bearerToken => {
  let resp = await API.get(`/api/club/following`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });

  return resp.data.data;
};
