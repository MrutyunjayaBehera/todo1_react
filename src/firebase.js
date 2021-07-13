import firebase from "firebase";


// initialize firebase
const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDImBH0Vq5_VyNV9l-ZixHMwUTPuWtwZDc",
	authDomain: "todo1react-493c9.firebaseapp.com",
	projectId: "todo1react-493c9",
	storageBucket: "todo1react-493c9.appspot.com",
	messagingSenderId: "847002139843",
	appId: "1:847002139843:web:793f60e5cffbd370ab3676",
	measurementId: "G-78VS220NWY"
})

// creating database & connecting it to our App's firestore
const db = firebaseApp.firestore();

// make db to be used globally
export default db;