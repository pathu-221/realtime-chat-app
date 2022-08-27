import React, {useEffect, useState} from 'react'
import { resolveMessage } from '../../firebase/firebase.utils';

import ChatMessage from '../chatmessage/chatmessage.component';
import { sendMessage } from '../../firebase/firebase.utils';
import { useRef } from 'react';

function ChatRoom(auth) {

  const [messages, receiveMessages] = useState(null);
  const [formValue, setFormValue] = useState('');

  const dummy = useRef();

  useEffect(()=>{
    resolveMessage().then(data => receiveMessages(data));
    
  },[]);

  
  const handleSubmit = async e => {
    e.preventDefault();
    await sendMessage(formValue);
    setFormValue('');

    await resolveMessage().then(data => receiveMessages(data));
    dummy.current.scrollIntoView({behavior: "smooth"});
  }

  return (
    <>
    <main> 
      {
        messages ? messages.map(message => <ChatMessage key={message.createdAt} message={message}/>) : <p>loading</p>
      }
    <div ref={dummy}></div>
    </main>

    <form onSubmit={handleSubmit}>
      <input value={formValue} onChange={(e)=>setFormValue(e.target.value)}/>
      <button type='submit'>send</button>
    </form>

    </>
  )
}

export default ChatRoom;