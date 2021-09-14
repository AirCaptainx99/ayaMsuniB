const Firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDfz7E7atVPGm5XwsBobIy5ZibUZqycU1E",
    authDomain: "ayamsunib.firebaseapp.com",
    databaseURL: "https://ayamsunib-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const firebase = Firebase.default.initializeApp(firebaseConfig);

module.exports = {
    firebase,
}