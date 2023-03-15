import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
// import BookDataService from "./services/book.services";
import pacientServices from "../services/pacient.services.";
import AddPacient from "./AddPacient";

const BooksList2 = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  useEffect(() => {
    getBooks();
  }, []);

  const [openAddModal, setOpenAddModal] = useState(false)
    useEffect(() => {
        getBooks();
    }, []);
    
    const getBookIdHandler = (getBookId) => {
      console.log("The ID of document to be edited: ", getBookId);
      setBookId(getBookId);
  };

  const getBooks = async () => {
    console.log('this is hetBookID',getBookId)
    const data = await pacientServices.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await pacientServices.deleteBook(id);
    getBooks();
  };
  return (
    <>
    {openAddModal && <AddPacient id={bookId} 
            setBookId={setBookId}
            onClose={
                () => setOpenAddModal(false)
            }
            open={openAddModal}/>
    }
      <div className="mb-2">
        <Button variant="dark edit" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {/* <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th> */}
            
            <th>Name</th>
            <th>Last name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Doctor choise</th>
            <th>Order time</th>
          
            
            
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                {/* <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td> */}
                <td>{doc.Name}</td>
                <td>{doc.LastName}</td>
                <td>{doc.Age}</td>
                <td>{doc.Phone}</td>
                <td>{doc.Address}</td>
                <td>{doc.zayavka}</td>
                <td>{doc.zayavkaTime}</td>
              
                <td>
                <Button variant="secondary" className="edit"
                  onClick={(e) => (getBookId(doc.id),
                                   setOpenAddModal(true),
                                   getBookIdHandler(doc.id))
                                }>
                                  
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BooksList2;
