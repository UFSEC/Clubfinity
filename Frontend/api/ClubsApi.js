import API from './BaseApi';

exports.getFollowing = async (bearerToken) => {
  const resp = await API.get('/api/club/following', {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return resp.data.data;
};

exports.createClub = async (
  bearerToken,
  clubName,
  clubCategory,
  clubDescription,
  tags,
  thumbnailUrl,
  facebookLink,
) => {
  const newClubData = {
    name: clubName,
    category: clubCategory,
    description: clubDescription,
    tags,
  };
  if (thumbnailUrl) {
    newClubData.thumbnailUrl = thumbnailUrl;
  }
  if (facebookLink) {
    newClubData.facebookLink = facebookLink;
  }
  try {
    await API.post('/api/club/', newClubData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return { successfulRequest: true };
  } catch (error) {
    return { successfulRequest: false, error };
  }
};
