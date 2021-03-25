// const firebase = require('firebase')
// require('firebase/auth')
// require('firebase/firestore')
// const admin = require('firebase-admin')

// const firebaseConfig = {
//   apiKey: "AIzaSyCRU5EjnwwQb6JT6ZnPGb03sp-Jnflg1Z8",
//   authDomain: "daisy-8a6da.firebaseapp.com",
//   projectId: "daisy-8a6da",
//   storageBucket: "daisy-8a6da.appspot.com",
//   messagingSenderId: "276874432478",
//   appId: "1:276874432478:web:69765112134b96f854574f"
// }

// firebase.initializeApp(firebaseConfig)
// const db = firebase.firestore()

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://daisy.firebaseio.com'
// })

// module.exports = db

// bring in out firebase-admin
const admin = require('firebase-admin');
// our firebase certificate
const serviceAccount = require('./serviceAccount.json');
// inialize the app with our cerificate and credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// let the app know we are using firestore.
const db = admin.firestore();
// export db and admin
module.exports  = { db, admin };