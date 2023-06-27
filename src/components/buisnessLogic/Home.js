import React, {useState,useEffect} from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {useUserAuth} from "../../context/UserAuthContext";
import { Container, Navbar, Row, Col } from "react-bootstrap";

import {
    collection,
    doc,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    where,
    query
} from "firebase/firestore";
import {db} from '../../firebase';
import {Routes, Route, Outlet, NavLink} from 'react-router-dom';
import DoctorsList from "./DoctorsList";

import AddBook from "./AddBook";
import bookServices from "../services/book.services";
import BooksList from './BooksList'
import AddPacient from "./AddPacient";
import PacientsList from "./PacientsList";
import { auth } from "../../firebase";

const Home = () => {
    const [bookId, setBookId] = useState("");
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
  
    
    const getBookIdHandler = (id) => {
      console.log("The ID of document to be edited: ", id);
      setBookId(id);
    };


  
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };


 
    
    
    // const uid = signedInUser.uid;
    // console.log(uid)
    
    useEffect(() => {
        const getUsername = async () => {
          const signedInUser = auth.currentUser;
          console.log(signedInUser)
          if (signedInUser) {
            const uid = signedInUser.uid;
            try {
              const userSnapshot = await db.collection("users").where("uid", "==", uid).get();
              console.log(userSnapshot)
              if (!userSnapshot.empty) {
                const userDoc = userSnapshot.docs[0];
                setUsername(userDoc.data().username);
              }
            } catch (error) {
              console.error("Error getting user by UID:", error);
            }
          }
        };
    
        getUsername();
      
      }, []);
        
  

    return (

        <>
       

            <nav>
                <NavLink to="/Home">
                    Home
                </NavLink>
                <br />
                {/* <NavLink to="/buisnessLogic/AddPacient">
                    Add pacient
                </NavLink>
                <br />
              <NavLink to="/buisnessLogic/AddDoctor">
                    Add doctor
                </NavLink> */}
                <br />
                {/*   <NavLink to="/buisnessLogic/DoctorsList">
                    Doctors List
                </NavLink> */}
               
                <NavLink to="/buisnessLogic/PacientsList">
                    Заявки
                </NavLink>
                <br />
                {/* <NavLink to="/buisnessLogic/RegisterOrderList">
                    Register Order List
                </NavLink>
                <br />
                <NavLink to="/buisnessLogic/AddRegisterOrder">
                    Create Register Order
                </NavLink> */}
                
            </nav>

        {/* <DoctorsList/> */}

            <div className="p-4 box mt-3 text-center">
                Hello {
                    
                }
                <br/> {
                user && user.email
            } </div>
            <div className="d-grid gap-2">
                <Button variant="primary"
                    onClick={handleLogout}>
                    Log out
                </Button>

            </div>
        </>
    );


};

export default Home;

