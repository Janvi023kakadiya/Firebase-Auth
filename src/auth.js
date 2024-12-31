import { useDispatch } from 'react-redux';
import { setUser  } from '../actions/authActions'; // Adjust the import path
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth

const AuthComponent = () => {
  const dispatch = useDispatch();

  // Assuming you have initialized Firebase auth
  const auth = getAuth(); // Replace with your Firebase auth initialization

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Dispatch the action with the serialized user data
      dispatch(setUser (user));
    } else {
      // Handle user sign-out
      dispatch(setUser (null));
    }
  });

  return (
    <div>
      {/* Your authentication UI */}
    </div>
  );
};

export default AuthComponent;