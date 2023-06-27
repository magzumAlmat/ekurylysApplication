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

const bookCollectionRef = collection(db, "clients");
const bookCollectionRefDoctors = collection(db, "doctorsList");
const registerOrderCollectionRefDoctors = collection(db,'ZdoctorSchedule')
class RegisterOrderDataService {
  addBooks = (newBook) => {
    return addDoc(registerOrderCollectionRefDoctors, newBook);
  };

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "doctorSchedule", id);
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id) => {
    const bookDoc = doc(db, "doctorSchedule", id);
    return deleteDoc(bookDoc);
  };

  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  getAllDcotors = () => {
    return getDocs(bookCollectionRefDoctors);
  };

  getBook = (id) => {
    const bookDoc = doc(db, "doctorSchedule", id);
    return getDoc(bookDoc);
  };
}

export default new PRegisterOrderDataService();
