import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
// import BookDataService from "./services/book.services";
import pacientServices from "../services/pacient.services.";
const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
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
                <td>{doc.name}</td>
                <td>{doc.LastName}</td>
                <td>{doc.Age}</td>
                <td>{doc.Phone}</td>
                <td>{doc.Address}</td>
              
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getBookId(doc.id)}
                  >
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

export default BooksList;
