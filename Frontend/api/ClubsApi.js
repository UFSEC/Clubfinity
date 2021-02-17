import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './BaseApi';

exports.getAllClubs = async () => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const resp = await API.get('/api/clubs?type=all', {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return resp.data.data;
};

exports.getManaging = async () => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const resp = await API.get('/api/clubs?type=fromAdminId', {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  return resp.data.data;
};

exports.getAdmins = async (clubId) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const resp = await API.get(`/api/clubs/${clubId}?select=admins`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return resp.data.data.admins;
};

exports.getPosts = async (clubId) => {
  const bearerToken = await AsyncStorage.getItem('userToken');
  const resp = await API.get(`/api/clubs/${clubId}?select=posts`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return resp.data.data;
};

exports.createClub = async (
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
    const bearerToken = await AsyncStorage.getItem('userToken');
    const resp = await API.post('/api/clubs/', newClubData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return resp.data.ok
      ? { successfulRequest: true, data: resp.data.data }
      : { successfulRequest: false, error: resp.data.error };
  } catch (error) {
    return { successfulRequest: false, error };
  }
};

exports.updateClub = async (clubID, club) => {
  try {
    const bearerToken = await AsyncStorage.getItem('userToken');
    await API.put(`/api/clubs/${clubID}`, club, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return { successfulRequest: true };
  } catch (error) {
    return { successfulRequest: false, error };
  }
};
