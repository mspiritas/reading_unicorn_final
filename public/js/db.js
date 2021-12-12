import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyDUfoXOEs5b-v4NNWTcZJj0aLkVQuS-DYc",
  
    authDomain: "books-35efc.firebaseapp.com",
  
    projectId: "books-35efc",
  
    storageBucket: "books-35efc.appspot.com",
  
    messagingSenderId: "868432664300",
  
    appId: "1:868432664300:web:d42eb265eb0ff81fe7f7c9",
  
    measurementId: "${config.measurementId}"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function Books(db) {
  const booksCol = collection(db, "books");
  const bookSnapshot = await getDocs(booksCol);
  const bookList = bookSnapshot.docs.map((doc) => doc);
  return bookList;
}

const unsub = onSnapshot(collection(db, "books"), (doc) => {
  //   console.log(doc.docChanges());
  doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Call render function in UI
      renderbook(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      //do something
      removeBook(change.doc.id);
    }
  });
});

//add new book
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  addDoc(collection(db, "books"), {
    title: form.title.value,
    description: form.description.value,
  }).catch((error) => console.log(error));
  form.title.value = "";
  form.description.value = "";
});

//delete book
const bookContainer = document.querySelector(".books");
bookContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "books", id));
  }
});