
function SignOut({auth}){
    return auth.currentUser && (
      <>
      <button onClick={() => auth.signOut()}>Sign out</button>
      </>
    )
  }
  export default SignOut;