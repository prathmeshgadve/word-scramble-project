import { useContext } from 'react';
import AuthContext from '../../store/authContext';

// This is a custom hook that makes it easy to access the auth context
// from any component.
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;