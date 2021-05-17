import React, { useContext } from 'react';
import AuthContext from '../context/auth';
import * as firebase from 'firebase';

export default function () {
  const { setIsSignedIn } = useContext(AuthContext);

  React.useEffect(() => {
    setIsSignedIn(false);
    firebase.auth().signOut();
  }, []);

  return <></>;
}
