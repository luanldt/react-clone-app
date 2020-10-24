import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDeKUaBlFXTAjIxif-XyNDXEzxOgmm4Luw',
  authDomain: 'clone-trello-4f2e9.firebaseapp.com',
  databaseURL: 'https://clone-trello-4f2e9.firebaseio.com',
  projectId: 'clone-trello-4f2e9',
  storageBucket: 'clone-trello-4f2e9.appspot.com',
  messagingSenderId: '432354353819',
  appId: '1:432354353819:web:16914b5d52ca6ccd035c3e',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
