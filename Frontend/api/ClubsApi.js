import { API } from "./BaseApi";

exports.getFollowing = async bearerToken => {
  let resp = await API.get(`/api/club/following`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });
  return resp.data.data;
};

exports.createClub = async (
  bearerToken,
  clubName,
  clubCategory,
  clubDescription,
  tags,
  facebookLink
) => {
  let newClubData = {
    name: clubName,
    category: clubCategory,
    description: clubDescription,
    tags: tags
  };
  if (facebookLink) {
    newClubData["facebookLink"] = facebookLink;
  }
  try {
    let response = await API.post(`/api/club/`, newClubData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
    return { successfulRequest: true };
  } catch (error) {
    return { successfulRequest: false, error: error };
  }
};
