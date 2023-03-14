import React, {useEffect, useState} from "react";
import {Table, Button} from "react-bootstrap";
import BookDataService from "../services/book.services";
import AddBook from "./AddBook";
const BooksList = ({getBookId}) => {
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState("");

    const [openAddModal, setOpenAddModal] = useState(false)
    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        const data = await BookDataService.getAllBooks();
        console.log(data.docs);
        setBooks(data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        })));
    };

    const deleteHandler = async (id) => {
        await BookDataService.deleteBook(id);
        getBooks();
    };
    return (<> {
        openAddModal && <AddBook id={bookId}
            setBookId={setBookId}
            onClose={
                () => setOpenAddModal(false)
            }
            open={openAddModal}/>
    }


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

                    <th>Name</th>
                    <th>Last name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Schedule</th>
                    <th>Specialization</th>
                    <th>Status</th>


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
                                doc.name
                            }</td>
                            <td>{
                                doc.LastName
                            }</td>
                            <td>{
                                doc.Age
                            }</td>
                            <td>{
                                doc.Phone
                            }</td>
                            <td>{
                                doc.Schedule
                            }</td>
                            <td>{
                                doc.Specialization
                            }</td>
                            <td>{
                                doc.status
                            }</td>
                            <td>
                                <Button variant="secondary" className="edit"
                                    onClick={
                                        (e) => (getBookId(doc.id), setOpenAddModal(true))
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
    
    export default BooksList;

