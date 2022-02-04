import firebase from "firebase/app";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBPzu1DWHkZrzxe1V1fh4Vhmo9T2vwEL8U",
//   authDomain: "fir-10c03.firebaseapp.com",
//   projectId: "fir-10c03",
//   storageBucket: "fir-10c03.appspot.com",
//   messagingSenderId: "708717598444",
//   appId: "1:708717598444:web:f7b43c38cf3c03aae477c9",
//   measurementId: "G-FJZLLXGP4S"
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
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const myfirebase = firebase.firestore();

export default myfirebase;
