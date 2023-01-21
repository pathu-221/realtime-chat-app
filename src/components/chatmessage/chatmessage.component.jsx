import React from 'react';
import {auth} from '../../firebase/firebase.utils';
import './chatmessage.styles.css';

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="dd" />
        <p>{text}</p>
    </div>
  )
}

export default ChatMessage;