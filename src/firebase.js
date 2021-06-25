import firebase from "firebase/app";
import "firebase/firestore";

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
const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true,
});

export default db;
