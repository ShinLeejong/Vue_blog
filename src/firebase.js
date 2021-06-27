import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0Wqllm5ccd04byamzgXKnZN44IxwK6LU",
  authDomain: "vue-blog-41edb.firebaseapp.com",
  projectId: "vue-blog-41edb",
  storageBucket: "vue-blog-41edb.appspot.com",
  messagingSenderId: "689793856092",
  appId: "1:689793856092:web:f8ce22f726cfc1df14ec99",
  measurementId: "G-8L0GVYKHBH",
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true,
});

export const author = firebase.auth;
export const authentication = firebase.auth();
export const storage = firebase.storage();
