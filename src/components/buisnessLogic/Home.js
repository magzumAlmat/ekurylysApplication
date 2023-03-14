import React, {useState} from "react";
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
import AddPacient from "./AddPacient";
import AddBook from "./AddBook";
import bookServices from "../services/book.services";
import BooksList from './BooksList'
import PacientList from "./PacientsList";
const Home = () => {
    const [bookId, setBookId] = useState("");

    const getBookIdHandler = (id) => {
      console.log("The ID of document to be edited: ", id);
      setBookId(id);
    };


    const {logOut, user} = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };
    return (

        <>
        {/* <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container> */}

            <nav>
                <NavLink to="/Home">
                    Home
                </NavLink>
                <NavLink to="/buisnessLogic/AddPacient">
                    Add pacient
                </NavLink>
                <NavLink to="/buisnessLogic/AddDoctor">
                    Add doctor
                </NavLink>
                <NavLink to="/buisnessLogic/DoctorsList">
                    Doctors List
                </NavLink>
                <NavLink to="/buisnessLogic/PacientsList">
                    Pacients List
                </NavLink>
            </nav>

        {/* <DoctorsList/> */}

            <div className="p-4 box mt-3 text-center">
                Hello Welcome
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

