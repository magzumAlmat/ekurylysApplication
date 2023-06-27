import React, {useEffect, useState} from "react";
import {Table, Button} from "react-bootstrap";
import PacientDataService from "../services/pacient.services";
import AddBook from "./AddBook";
import { db } from "../../firebase";
import {collection, query, orderBy, onSnapshot, updateDoc} from "firebase/firestore"
import {useParams} from 'react-router-dom'
import AddPacient from "./AddPacient";
import BookDataService from "../services/book.services";
import AddRegisterOrder from "./AddRegisterOrder";
import Container from "react-bootstrap";
const RegisterOrderList = ({getBookId}) => {
    
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState();
    const [openAddModal, setOpenAddModal] = useState(false)
    const [doctors, setDoctors] = useState([]);
    
    useEffect(() => {
        getBooks();
        getDoctors();
    }, []);

    // useEffect(() => {
    //   const taskColRef = query(collection(db, 'doctorsList'))
    //   onSnapshot(taskColRef, (snapshot) => {
    //     getBooks(snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       data: doc.data()
    //     })))})
    // },[])
    const getBookIdHandler = (getBookId) => {
        console.log("The ID of document to be edited: ", getBookId);
        setBookId(getBookId);
    };

    const getDoctors = async (id) => {
        const dataDoctors = await BookDataService.getAllBooks();
        console.log(dataDoctors.docs);
        setDoctors(dataDoctors.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        })));
    };



    const getBooks = async (id) => {
        const data = await PacientDataService.getAllBooks();
        console.log('QUERY to db  ',data.docs);
        // setBooks(data.docs.map((doc) => ({
        //     ...doc.data(),
        //     id: doc.id
        // })));
    };

  
    const deleteHandler = async (id) => {
        await PacientDataService.deleteBook(id);
        getBooks();
    };


    return (<> 
        
        {/* <AddRegisterOrder id={bookId}
                 setBookId={setBookId}
                 onClose={ () => setOpenAddModal(false)}
                 open={openAddModal}
                 /> */}
        

        <div className="mb-2">
            <Button variant="dark edit"
                onClick={getBooks}>
                Refresh List
            </Button>
        </div>

        {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
        <Table striped bordered hover size="sm">
            <thead>
                <tr> {/* <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th> */}
                  
                  
                  <th>Название компании</th>
                    <th>БИН компании</th>
                    <th>ФИО </th>
                    <th>Наименование обьекта</th>
                    <th>Телефон</th>
                    <th>zayavka time</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody> {
                books.map((doc, index) => {
                    return (
                        <tr key={
                            doc.id
                        }>
                            {/* <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td> */}
                              <td>{
                                doc.companyName
                            }</td>
                            <td>{
                                doc.companyBin
                            }</td>
                            <td>{
                                doc.fio
                            }</td>
                            <td>{
                                doc.objectName
                            }</td>
                            <td>{
                                doc.phone
                            }</td>
                            <td>{
                                doc.zayavkaTime
                            }</td>
                            <td>{
                                doc.status
                            }</td>
                            <td>
                                <Button variant="secondary" className="edit"
                                    onClick={
                                        (e) => (getBookId(doc.id), 
                                        setOpenAddModal(true),
                                        getBookIdHandler(doc.id)
                                        )
                                        
                                }>
                                    Edit
                                </Button>

                                <Button variant="danger" className="delete"
                                    onClick={
                                        (e) => deleteHandler(doc.id)
                                }>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    );
                })
            } </tbody>
        </Table>
    </>
    );
    };
    
    export default RegisterOrderList;

