import React from 'react';
import * as firebase from 'firebase';
import {Permissions, Notifications} from 'expo';
/* import * as fromNotification from "../Notification"; then use fromNotification.method()*/
export const sendPushNotification = (title, body, uid) => {
	 //this.currentUser = firebase.auth().currentUser;
	// var ref = firebase.database().ref('users/' + this.currentUser.uid + '/push_token');
	var fer = firebase.database().ref('users/' + uid + '/allow_notifications');
	fer.once("value")
	  .then(function(snapshot) {
	  const allow = snapshot.val();
	  if(allow == 'on')
	  {
		  var ref = firebase.database().ref('users/' + uid + '/push_token');
		   ref.once("value")
			 .then(function(snapshot) {
			   const key = snapshot.val();
			   let response = fetch('https://exp.host/--/api/v2/push/send', {
			   method: 'POST',
			   headers: {
				 Accept: 'application/json',
				 'Content-Type': 'application/json'
			   },
			   body: JSON.stringify({
				 to: key,
				 sound: 'default',
				 title: title,
				 body: body,
			   })
			   });
			 });
	  }
  });
 };

 export const registerForPushNotificationsAsync = async () => {
	 this.currentUser = await firebase.auth().currentUser;
	 const { status: existingStatus } = await Permissions.getAsync(
	   Permissions.NOTIFICATIONS
	 );
	 let finalStatus = existingStatus;
	 if (existingStatus !== 'granted') {
	   // Android remote notification permissions are granted during the app
	   // install, so this will only ask on iOS
	   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
	   finalStatus = status;
	 }
	 // Stop here if the user did not grant permissions
	 if (finalStatus !== 'granted') {
		 firebase
	    .database()
	    .ref('users/' + this.currentUser.uid + '/allow_notifications')
	    .set('off');
	   return;
	 }
	let token = await Notifications.getExpoPushTokenAsync();
	firebase
	.database()
	.ref('users/' + this.currentUser.uid + '/push_token')
	.set(token);
	firebase
   .database()
   .ref('users/' + this.currentUser.uid + '/allow_notifications')
   .set('on');
};
