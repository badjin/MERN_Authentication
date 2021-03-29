// bring in out firebase-admin
const admin = require('firebase-admin');
// our firebase certificate
const serviceAccount = require('./firebaseConfig.json');
// inialize the app with our cerificate and credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// let the app know we are using firestore.
const db = admin.firestore();
// export db and admin
module.exports  = { db, admin };