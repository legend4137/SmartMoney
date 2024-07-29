const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');  // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();  // Use Firestore

module.exports = { db };
