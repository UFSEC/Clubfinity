const { Expo } = require('expo-server-sdk');
const userDAO = require('../DAO/UserDAO');
const clubDAO = require('../DAO/ClubDAO');

exports.INVALID_TOKEN = 'INVALID';

const expo = new Expo();

exports.sendNotifications = async (clubId, title) => {
  const clubName = (await clubDAO.get(clubId)).name;
  const pushTokens = await userDAO.getPushTokens(clubId);
  const messages = pushTokens
    .filter((token) => token !== exports.INVALID_TOKEN)
    .map((pushToken) => ({
      to: pushToken,
      sound: 'default',
      title: clubName,
      body: title,
    }));
  const chunks = expo.chunkPushNotifications(messages);
  chunks.forEach(async (chunk) => {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
    } catch (error) {
      console.error(error);
    }
  });
};
