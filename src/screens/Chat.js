import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import * as fromNotification from "../Notification";

export default class Chat extends React.Component {
	state = {
	    messages: [],
		name: '123',
	  };


	  get uid() {
   return (firebase.auth().currentUser || {}).uid;
 }
 get ref() {
	 const { navigation } = this.props;
	 const listing = navigation.getParam('listingId', 'NO-ID');
   return firebase.database().ref('messages/' + listing);
 }

 get timestamp() {
     return firebase.database.ServerValue.TIMESTAMP;
   }

setName() {
	var that = this;
	this.currentUser = firebase.auth().currentUser;
	var fer = firebase.database().ref('users/' + this.uid + '/first_name');
	fer.once("value")
	 .then(function(snapshot) {
		 const first_name = snapshot.val();
	   that.setState({ name: first_name });
	   //console.log(snapshot.val());
	 });

}

 parse = snapshot => {
   const { timestamp: numberStamp, text, user } = snapshot.val();
   const { key: _id } = snapshot;
   const timestamp = new Date(numberStamp);
   const message = {
	 _id,
	 timestamp,
	 text,
	 user,
   };
   return message;
 };


 on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

	  send = messages => {

	      for (let i = 0; i < messages.length; i++) {
	        const { text, user } = messages[i];
	        const message = {
	          text,
	          user,
	          timestamp: this.timestamp,
	        };
			var body = message.text
	        this.append(message);
	      }

		  const { navigation } = this.props;
		  const seller = navigation.getParam('sellerId', 'NO-ID');
		  if(this.uid != seller )
		  {
			  fromNotification.sendPushNotification(this.state.name + ' says:', body, seller );
		  }
	    };

		append = message => this.ref.push(message);

		off() {
  this.ref.off();
}


get user() {

  return {
	name: this.state.name,
	_id: this.uid,
  };
}

componentDidMount() {

this.setName();



  this.on(message =>
	this.setState(previousState => ({
	  messages: GiftedChat.append(previousState.messages, message),
	}))
  );
}

	  onSend(messages = []) {

	    this.setState((previousState) => ({
	      messages: GiftedChat.append(previousState.messages, messages),
	    }));

	  }

	  render() {

	    return (
	      <GiftedChat
	        messages={this.state.messages}
	        onSend={this.send}
	        user={
	          this.user
	        }
	      />
	    );
	  }
	}
