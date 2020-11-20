import firebase from 'firebase/app';
// import '@firebase/analytics';
import 'firebase/analytics';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// export const initFirebase = () => {
// 	const firebaseConfig = {
// 		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// 		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// 		databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
// 		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// 		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// 		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// 		appId: process.env.REACT_APP_FIREBASE_APP_ID,
// 		measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
// 	  };
// 	firebase.initializeApp(firebaseConfig)
// }

const app = firebase.initializeApp(firebaseConfig)

export default app