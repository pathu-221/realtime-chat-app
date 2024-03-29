import React, {useEffect, useState} from 'react'
import { onSnapshot, collection, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase.utils';
import ChatMessage from '../chatmessage/chatmessage.component';
import { sendMessage } from '../../firebase/firebase.utils';
import { useRef } from 'react';

import './chatroom.styles.css';

function ChatRoom(auth) {

  const [messages, receiveMessages] = useState();
  const [formValue, setFormValue] = useState('');

  const dummy = useRef();
  const scrollto = () => {
    dummy.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  useEffect(()=>{
    //resolveMessage().then(data => receiveMessages(data));
    const collectionRef = collection(db, 'messages');
    const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(25));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach(doc => {
        const message = doc.data();
        data.push(message);
      })
      data.reverse();
      receiveMessages(data);
   
    })
    scrollto();
    return () => {
      console.log('unsubscribe');
      unsubscribe();
    }
  },[]);

  
  const handleSubmit = async e => {

    e.preventDefault();
    await sendMessage(formValue);
    setFormValue('');
    scrollto();
  }

 
  return (
    <>
    <main className='chat-messages'> 
      {
        messages ? messages.map(message => 
        <ChatMessage key={message.createdAt} message={message}/>) : <p>loading...</p>
      }
      <div ref={dummy}></div>
    </main>

    <form className='message-form' onSubmit={handleSubmit}>
      <div className="input-group">
      <input placeholder='Message' value={formValue} onChange={(e)=>setFormValue(e.target.value)}/>
      <button className='sent-button' type='submit'>
        <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.0361 13.2207H12.0354" stroke="#9398A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26.036 13.2207L8.85333 21.4939L12.0353 13.2207L8.85333 4.94757L26.036 13.2207Z" 
        stroke="#9398A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      </div>
    </form>

    </>
  )
}

export default ChatRoom;