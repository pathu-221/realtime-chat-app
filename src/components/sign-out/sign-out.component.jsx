import './signout.styles.css';
import {FiLogOut} from 'react-icons/fi';

function SignOut({auth}){
    return auth.currentUser && (
      <>
      <button className="logout-button" onClick={() => auth.signOut()}>
        <FiLogOut color={'white'} size={30} />
      </button>
      </>
    )
  }
  export default SignOut;