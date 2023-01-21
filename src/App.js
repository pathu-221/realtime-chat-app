
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';

import ChatRoom from './components/chatroom/chatroom.component';
import SignIn from './components/sign-in/sign-in.component';
import { auth } from './firebase/firebase.utils';
import SignOut from './components/sign-out/sign-out.component';

function App() { 

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
      <h1>Hello, {auth.currentUser ? auth.currentUser.displayName : 'Guest'}</h1>
        <SignOut auth={auth}/>
      </header>
      <section>
        {
          user ? <ChatRoom /> : <SignIn />
        }
      </section>
    </div>
  );
}

export default App;
