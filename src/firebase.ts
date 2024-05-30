import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyB0vi4zru5E1zlvi4k0UdBawcs1IiB5iLE",
  authDomain: "pokemon-910ff.firebaseapp.com",
  databaseURL: "https://pokemon-910ff-default-rtdb.firebaseio.com",
  projectId: "pokemon-910ff",
  storageBucket: "pokemon-910ff.appspot.com",
  messagingSenderId: "620126515672",
  appId: "1:620126515672:web:525dbf7c5918c5daa302ad",
  measurementId: "G-2PCQ2F7L7B"
});

// used for the database refs
export const db = getDatabase(firebaseApp);