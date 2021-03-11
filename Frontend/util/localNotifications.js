import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Alert, Linking } from 'react-native';

export async function askPermissions() {
  // See if app already has permission
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  // No existing permisson, ask for it
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  // Permission denied
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
  const MS_FROM_NOW = (date - Date.now()) - (1000 * 60 * 60);
  // First, set the handler that will cause the notification
  // to show the alert
  const notificationsPermitted = askPermissions();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  // Second, call the method
  // set notification time to one hour before the event
  const trigger = new Date(Date.now() + MS_FROM_NOW);
  trigger.setSeconds(0);
  if (notificationsPermitted) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Upcoming Event: ${name}`,
        body: 'Event will start in 1 hour!',
        data: { eventID: `${eventID}`, userID: `${userID}` },
      },
      // trigger: null, for immediate notification
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
