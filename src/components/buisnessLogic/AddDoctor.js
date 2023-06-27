import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {useUserAuth} from "../../context/UserAuthContext"
import {
    collection,

    setDoc,
    addDoc,

    deleteDoc,
    getDoc,
    getDocs,
    where,
    query,
    Timestamp
} from "firebase/firestore";
import {

   
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
  } from "firebase/firestore";
import {db} from '../../firebase';
import {Routes, Route, Outlet, NavLink} from 'react-router-dom';

function AddDoctor(props) {


    const [Age, setAge] = useState('');
    const [LastName, setLastName] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');
    const [Schedule, setSchedule] = useState('');
    const [Specialization, setSpecialization] = useState('');
    const [tasks, setTasks] = useState([])

    // function getAlldata() {
    //     getDocs(collection(db, "doctorsList")).then(docSnap => {
    //         let users = [];
    //         docSnap.forEach((doc) => {
    //             users.push({
    //                 ...doc.data(),
    //                 id: doc.id
    //             })
    //         });
    //         console.log("Document data:", users);
    //     });
    // }


 
    const addTodo = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "doctorsList"), {
                name: Name,
                lname: LastName,
                phone: Phone,
                age: Age,
                schedule: Schedule,
                specialization: Specialization,
                created: Timestamp.now()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <>

            <div>
                <input type="text" placeholder="Name"
                    onChange={
                        (e) => setName(e.target.value)
                    }/>
                <input type="text" placeholder="LastName"
                    onChange={
                        (e) => setLastName(e.target.value)
                    }/>
                <input type="text" placeholder="Set your Age"
                    onChange={
                        (e) => setAge(e.target.value)
                    }/>
                <input type="text" placeholder="Phone?"
                    onChange={
                        (e) => setPhone(e.target.value)
                    }/>
                <input type="text" placeholder="Specialization"
                    onChange={
                        (e) => setSpecialization(e.target.value)
                    }/>


            </div>

            <div className="btn-container">
                <button type="submit" className="btn"
                    onClick={addTodo}>
                    Submit
                </button>
            </div>
            

            

            <br/><br/>
           

        </>
    )
}

export default AddDoctor;


// function getSepcificDataWithID() {
//     getDoc(doc(db, "users", 'IMx2OXMCR0WD7upXNcKq')).then(docData => {

//         if (docData.exists()) {
//             console.log(docData.data());

//             setName(docData.data().name);
//             setPhone(docData.data().phone);
//             setLastName(docData.data().lname);
//             setAge(docData.data().age);
//             setAddress(docData.data().address);

//         } else {
//             console.log('No such a data!');
//         }

//     }).catch((error) => {
//         console.log(error);
//     })
// }

// function update() {
//     updateDoc(doc(db, "pacients"), {
//       name: Name,
//       phone: Phone,
//       lname: LastName,
//       age: Age,
//       address: Address
//     }).then(() => {
//         console.log('data submitted');

//     }).catch((error) => {
//         console.log(error);
//     });
// }

// function deleteData() {
//     deleteDoc(doc(db, "pacients", 'LA'));
// }



// function getDataWithQuery() {
//     getDocs(query(collection(db, "users"), where('email', '==', 'NewUser@gmail.com'))).then(docSnap => {
//         let users = [];
//         docSnap.forEach((doc) => {
//             users.push({
//                 ...doc.data(),
//                 id: doc.id
//             })
//         });
//         console.log("Document data:", users[0].username);
//     });
// }

