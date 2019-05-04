import { firebase } from '@firebase/app';
import '@firebase/database';

// Firebase config for storing messages from the contact form.
import config from '../config';

const firebaseConfig = config.firebase;
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
