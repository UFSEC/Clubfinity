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
  instagramLink,
  slackLink,
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
  if (instagramLink) {
    newClubData.instagramLink = instagramLink;
  }
  if (slackLink) {
    newClubData.slackLink = slackLink;
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
