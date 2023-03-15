import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PhoneSignUp from "./components/PhoneSignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import {db} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import Home from "./components/buisnessLogic/Home";
import AddPacient from "./components/buisnessLogic/AddPacient";
import AddDoctor from './components/buisnessLogic/AddDoctor'
import DoctorsList from "./components/buisnessLogic/DoctorsList";
import PacientsList from "./components/buisnessLogic/PacientsList";
function App() {
  const [bookId, setBookId] = useState("");

  const getBookIdHandler = (id) => {
  
    setBookId(id);
    console.log("BookId -  ", bookId);
  };
  
  return (
    <Container className="container">
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/phonesignup" element={<PhoneSignUp />} />
              
            
              <Route path="/buisnessLogic/AddPacient" element={ <AddPacient/> } />
              <Route path="/buisnessLogic/AddDoctor" element={ <AddDoctor/> } />
              <Route path="/buisnessLogic/DoctorsList" element={ <DoctorsList/> } />
              <Route path="/buisnessLogic/PacientsList" element={ <PacientsList/> } />

            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
