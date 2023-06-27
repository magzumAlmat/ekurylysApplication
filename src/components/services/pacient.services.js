import { db } from "../../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const managersCollectionRef = collection(db, "users");
const bookCollectionRef = collection(db, "pacients");
const bookCollectionRefDoctors = collection(db, "doctorsList");

class PacientDataService {
  addBooks = (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  };

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "pacients", id);
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id) => {
    const bookDoc = doc(db, "pacients", id);
    return deleteDoc(bookDoc);
  };

  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };
  getAllM = () => {
    return getDocs(managersCollectionRef);
  };
  
  getAllDcotors = () => {
    return getDocs(bookCollectionRefDoctors);
  };

  getBook = (id) => {
    const bookDoc = doc(db, "pacients", id);
    return getDoc(bookDoc);
  };
}

export default new PacientDataService();
