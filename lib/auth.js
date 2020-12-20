import React, { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from './db';
// import queryString from 'query-string';
import firebase from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  // const signin = (email, password) => {
  //   return firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       setUser(res.user);
  //       return res.user;
  //     });
  // };
  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((res) => {
        handleUser(res.user);
        return res.user;
      });
  };

  // const signup = (email, password) => {
  //   return firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((res) => {
  //       setUser(res.user);
  //       return res.user;
  //     });
  // };

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  // const sendPasswordResetEmail = (email) => {
  //   return firebase
  //     .auth()
  //     .sendPasswordResetEmail(email)
  //     .then(() => {
  //       return true;
  //     });
  // };

  // const confirmPasswordReset = (password, code) => {
  //   const resetCode = code || getFromQueryString('oobCode');

  //   return firebase
  //     .auth()
  //     .confirmPasswordReset(resetCode, password)
  //     .then(() => {
  //       return true;
  //     });
  // };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    // signup,
    signOut,
    // sendPasswordResetEmail,
    // confirmPasswordReset,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoURL,
    provider: user.providerData[0].providerId,
  };
};
