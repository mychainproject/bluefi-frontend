import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyD5gy8ZbiXWU9f6p3BtfPjLEDVvnrCFH7Y",
//   authDomain: "nfts-realm.firebaseapp.com",
//   projectId: "nfts-realm",
//   storageBucket: "nfts-realm.appspot.com",
//   messagingSenderId: "927074973650",
//   appId: "1:927074973650:web:eabf9237be61146d14fa0b",
//   measurementId: "G-P4JMRL6767"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBAx4UrktSRrEh2V1t9IZVpOWekzAuCCT0",
  authDomain: "bleufi.firebaseapp.com",
  projectId: "bleufi",
  storageBucket: "bleufi.appspot.com",
  messagingSenderId: "407674210629",
  appId: "1:407674210629:web:ed27263a027f002c32962c",
  measurementId: "G-5TQYQL1XH8"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
