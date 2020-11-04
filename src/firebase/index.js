import firebase from "firebase";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCL-0u9ZVxk8HLnoYGKY38xl_Q50HAq99I",
  authDomain: "clone-instagram-cc3dc.firebaseapp.com",
  databaseURL: "https://clone-instagram-cc3dc.firebaseio.com",
  projectId: "clone-instagram-cc3dc",
  storageBucket: "clone-instagram-cc3dc.appspot.com",
  messagingSenderId: "429983563664",
  appId: "1:429983563664:web:85037d8c80dcf72013bd15",
  measurementId: "G-ZJ0PKZRCV1",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

/* auth */
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const signInWithGooglePopup = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const signInWithFacebookPopup = () =>
  auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());

export const onAuthStateChanged = (cb) => auth.onAuthStateChanged(cb);

export const signOut = () => auth.signOut();
/* end auth */

/* db */
const USER_COLLECTION = "users";

const db = firebase.database();

export const saveUser = ({
  uid,
  displayName,
  email,
  username,
  phone,
  photoURL,
}) => {
  db.ref(USER_COLLECTION)
    .child(uid)
    .once("value")
    .then((snapshot) => {
      if (!snapshot.exists()) {
        db.ref(USER_COLLECTION)
          .child(uid)
          .set({ displayName, email, username, phone, photoURL });
      }
    });
};

const POST_COLLECTION = "posts";

export const savePost = ({ uid, content }) => {
  const postRef = db.ref(POST_COLLECTION).child(uid).push();
  postRef.update({
    content,
  });
  return postRef.key;
};

export const updatePostFile = ({ uid, postId, downloadURL, fileName }) => {
  const fileRef = db
    .ref(POST_COLLECTION)
    .child(uid)
    .child(postId)
    .child("files")
    .push();
  fileRef.set({
    fileURL: downloadURL,
    fileName: fileName,
  });
};

export const fetchListPost = ({ uid, lastKey }) => {
  const postRef = db
    .ref(POST_COLLECTION)
    .child(uid)
    .orderByKey()
    .startAt(lastKey ? lastKey : "")
    .limitToFirst(11);
  return postRef;
};
/* end db */

/* storage */
const storage = firebase.storage();

const POST_FOLDER = "post";

export const uploadPostFile = ({ uid, post, fileName, fileContent }) => {
  const fileRef = storage
    .ref(POST_FOLDER)
    .child(uid)
    .child(post)
    .child(fileName);
  return fileRef.put(fileContent);
};

export const getURLDownload = ({ uid, post, fileName }) => {
  return storage
    .ref(POST_FOLDER)
    .child(uid)
    .child(post)
    .child(fileName)
    .getDownloadURL();
};

/* end storage */
