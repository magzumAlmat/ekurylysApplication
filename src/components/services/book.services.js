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
import AddBook from "../buisnessLogic/AddBook";

const bookCollectionRef = collection(db, "doctorsList");

class BookDataService {
  addBooks = (newBook) => {
    console.log('Сработал ADD DOCTOR SERVICE  this is newBook',newBook)
    return addDoc(bookCollectionRef, newBook);
  };

  updateBook = (id, updatedBook) => {
    console.log('im in Doctor services id=',id,'updatedDoctor',updatedBook)
    
    const bookDoc = doc(db, "doctorsList", id);
    return updateDoc(bookDoc, updatedBook);
  };

  

  deleteBook = (id) => {
    const bookDoc = doc(db, "doctorsList", id);
    return deleteDoc(bookDoc);
  };

  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  getBook = (id) => {
    const bookDoc = doc(db, "doctorsList", id);
    return getDoc(bookDoc);
  };
}

export default new BookDataService();
