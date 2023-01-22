import React from 'react';
import './signin.styles.css';
import { signinwithgoogle } from '../../firebase/firebase.utils';
import { BsGoogle } from 'react-icons/bs';
function SignIn() {
  return (
    <>
    <button className='sign-in-button' onClick={signinwithgoogle}>
     <BsGoogle size={24} color={'white'} />
     Sign in with google
      </button>
    </>
  )
}

export default SignIn;