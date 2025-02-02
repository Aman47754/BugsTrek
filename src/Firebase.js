import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDqdDMT7J9m9Q-y8rl7lEulvqIswfR8iX8",
  authDomain: "bugstrek-65c46.firebaseapp.com",
  projectId: "bugstrek-65c46",
  storageBucket: "bugstrek-65c46.appspot.com",
  messagingSenderId: "286257804849",
  appId: "1:286257804849:web:6f890d48ba0e7e4d4ec710",
  measurementId: "G-9V2GDJZ9V2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Add this line

// Functions
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      leetcodeId: '',
      codechefId: '',
      codeforcesId: '',
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { auth, db, login, signup, logout ,storage };