import { PushNotificationIOS } from 'react-native';

const PushNotification = require('react-native-push-notification');

export function enableNotifications({ setToken, navigation }) {
	PushNotification.configure({
		// Called when Token is generated (iOS and Android)
		onRegister({ token, os }) {
			setToken({ token, os });
		},

		// (required) Called when a remote or local notification is opened or received
		onNotification(notification) {
			console.log('NOTIFICATION:', notification); // eslint-disable-line no-console

			const { gameId } = JSON.parse(notification && notification.data && notification.data.payload) || {};

			if (gameId) navigation.navigate('Game', { gameId });

			// process the notification
			// required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
			notification.finish(PushNotificationIOS.FetchResult.NoData);
		},

		// ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
		senderID: 'YOUR GCM SENDER ID',

		// IOS ONLY (optional): default: all - Permissions to register.
		permissions: {
			alert: true,
			badge: true,
			sound: true,
		},

		// Should the initial notification be popped automatically
		// default: true
		popInitialNotification: true,

		requestPermissions: true,
	});
}
