const { Expo } = require('expo-server-sdk')
const userDAO = require('../DAO/UserDAO');

exports.INVALID_TOKEN = "INVALID"

const expo = new Expo();

exports.sendNotifications = async (clubId, title, description) => {
    pushTokens = await userDAO.getPushTokens(clubId)
    messages = pushTokens
        .filter(token => token !== exports.INVALID_TOKEN)
        .map(pushToken => ({
            to: pushToken,
            sound: 'default',
            title: title, 
            body: description,
        }))
    const chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
        } catch (error) {
            console.error(error);
        }
    }
}