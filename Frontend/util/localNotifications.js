import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Alert, Linking } from 'react-native';

const MS_IN_HOUR = 1000 * 60 * 60;

export async function askPermissions() {
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert(
      'No Notification Permission',
      'Please go to settings and turn on notification permission to receive event reminders!',
      [
        { text: 'Cancel' },
        { text: 'Give Access', onPress: () => Linking.openURL('app-settings:') },
      ],
      { cancelable: false },
    );
  }
  return true;
}

export async function scheduleNotification(name, date, eventID, userID) {
  const notificationsPermitted = askPermissions();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const trigger = new Date(Date.now() + ((date - Date.now()) - MS_IN_HOUR));
  trigger.setSeconds(0);
  if (notificationsPermitted) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Upcoming Event: ${name}`,
        body: 'Event will start in 1 hour!',
        data: { eventID: `${eventID}`, userID: `${userID}` },
      },
      trigger,
    });
  }
}

export async function cancelNotification(eventID, userID) {
  const allNotifications = await Notifications.getAllScheduledNotificationsAsync();
  let notificationID = null;
  allNotifications.forEach((notification) => {
    if (notification.content.data.eventID === `${eventID}` && notification.content.data.userID === `${userID}`) {
      notificationID = notification.identifier;
    }
  });
  await Notifications.cancelScheduledNotificationAsync(notificationID);
}
