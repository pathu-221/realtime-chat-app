import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy, setDoc, serverTimestamp, doc } from "firebase/firestore";

export const app = initializeApp({
  apiKey: "AIzaSyBdfPuV3eNgdlqfa7r-ode1_Y1xanPkKac",
  authDomain: "chat-app-6f118.firebaseapp.com",
  projectId: "chat-app-6f118",
  storageBucket: "chat-app-6f118.appspot.com",
  messagingSenderId: "947640684967",
  appId: "1:947640684967:web:da8dee65efd40c38a6e682"
});


export const db = getFirestore(app);
export const resolveMessage = async () => {

  let messages = [];
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createdAt'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    messages.push(doc.data());
  })


  return messages ;
}

export const sendMessage = async (message) => {
  const collectionRef = doc(collection(db, 'messages'));
  await setDoc(collectionRef, {
    text: message,
    createdAt: serverTimestamp(),
    uid: auth.currentUser.uid,
    photoURL: auth.currentUser.photoURL
  })
}

const provider = new GoogleAuthProvider();

export const signinwithgoogle =  () => signInWithPopup(auth, provider); 
export const auth = getAuth();// TODO: Add SDKs for Firebase products that you want to use
