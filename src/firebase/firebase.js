import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDFb3BrquscKTBf8EORzawb7kXhV5_NlKc",
    authDomain: "my-firebase-auth-app-99449.firebaseapp.com",
    projectId: "my-firebase-auth-app-99449",
    storageBucket: "my-firebase-auth-app-99449.appspot.com",
    messagingSenderId: "911275679604",
    appId: "1:911275679604:web:6072cedaebff9f35b31621",
    measurementId: "G-WZSF3QFV8H"
  };

const provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};