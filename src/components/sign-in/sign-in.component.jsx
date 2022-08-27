import React from 'react';

import { signinwithgoogle } from '../../firebase/firebase.utils';

function SignIn() {
  return (
    <>
    <button onClick={signinwithgoogle}>Sign in with google</button>
    </>
  )
}

export default SignIn;