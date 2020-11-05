import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import snapshotToArray from "../helpers/snapshotToArray";
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

export const getUserByUID = ({ uid }) => {
  const userRef = db.ref(USER_COLLECTION).child(uid);
  return userRef;
};

const POST_COLLECTION = "posts";

export const savePost = ({ uid, content }) => {
  const postRef = db.ref(POST_COLLECTION).push();
  postRef.update({
    uid,
    content,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
  return postRef.key;
};

export const updatePostFile = ({ uid, postId, downloadURL, fileName }) => {
  const fileRef = db.ref(POST_COLLECTION).child(postId).child("files").push();
  fileRef.set({
    fileURL: downloadURL,
    fileName: fileName,
  });
};

export const fetchListPost = ({ uid, lastKey }) => {
  const postRef = db
    .ref(POST_COLLECTION)
    .orderByChild("createAt")
    .startAt(lastKey ? lastKey : "")
    .ref.orderByChild("uid")
    .equalTo(uid)
    .limitToFirst(11);
  return postRef;
};

export const deletePost = ({ uid, key }) => {
  const postRef = db.ref(POST_COLLECTION).child(uid).child(key);
  let val;
  postRef.once("value", (snapshot) => {
    val = snapshot.val();
    if (val.files) {
      const files = snapshotToArray(val.files);
      files.forEach((file) => {
        storage.refFromURL(file.fileURL).delete();
        storage.ref(POST_FOLDER).child(uid).child(key).delete();
      });
    }
    postRef.remove();
  });
  return val;
};

export const likePost = ({ uid, key }) => {
  const postRef = db.ref(POST_COLLECTION).child(key).child("likes").child(uid);
  postRef.once("value", (snapshot) => {
    const liked = snapshot.val();
    postRef.set(!liked);
  });
};

export const checkLikePost = ({ uid, key }) => {
  const postLikeRef = db
    .ref(POST_COLLECTION)
    .child(key)
    .child("likes")
    .child(uid);
  return postLikeRef;
};

export const commentPost = ({ uid, key, content }) => {
  const postCommentRef = db
    .ref(POST_COLLECTION)
    .child(key)
    .child("comments")
    .push();
  postCommentRef.set({
    uid,
    content,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
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
