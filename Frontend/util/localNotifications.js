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

export async function scheduleNotification(name, date) {
  // First, set the handler that will cause the notification
  // to show the alert
  const checking = askPermissions();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  // Second, call the method
  // set notification time to one hour before the event
  const timeDiff = (date - Date.now()) - (1000 * 60 * 60);
  const trigger = new Date(Date.now() + timeDiff);
  trigger.setSeconds(0);
  notificationID = null;
  if (checking) {
    notifactionID = Notifications.scheduleNotificationAsync({
      content: {
        title: `Upcoming Event: ${name}`,
        body: 'Event will start in 1 hour!',
      },
      //trigger: null, for immediate notification
      trigger,
    });
  }
  return notificationID;
}

export async function cancelNotification(notificationID){
  if(notificationID != null){
    await Notifications.cancelScheduledNotificationAsync(notificationID);
  }
}