

import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "AIzaSyAmdDPWLTbBzFiIswoiQenyLzXWbmdoNEA",
    authDomain: "gmc-task.firebaseapp.com",
    projectId: "gmc-task",
    storageBucket: "gmc-task.appspot.com",
    messagingSenderId: "76945794903",
    appId: "1:76945794903:web:d7d83de274d3871be3c012"
  };
    
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
  
export default database;