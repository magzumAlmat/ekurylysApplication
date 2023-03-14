import React, {useState, useEffect} from "react";
import {
    Form,
    Alert,
    InputGroup,
    Button,
    ButtonGroup
} from "react-bootstrap";
import BookDataService from "../services/book.services";
import '../modal/addTask.css'
import Modal from "../modal/Modal";

const AddBook = ({id, setBookId,onClose, open}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [status, setStatus] = useState("Available");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({error: false, msg: ""});
    const [name, setName] = useState("")
    const [Age, setAge] = useState('');
    const [LastName, setLastName] = useState('');

    const [Phone, setPhone] = useState('');
    const [Schedule, setSchedule] = useState('');
    const [Specialization, setSpecialization] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (name === "" || LastName === "") {
            setMessage({error: true, msg: "Заполните Имя и Фамилию"});
            return;
        }
        const newBook = {
            title,
            author,
            status,
            name,
            Age,
            LastName,
            Phone,
            Schedule,
            Specialization

        };
        console.log(newBook);

        try {
            if (id !== undefined && id !== "") {
                await BookDataService.updateBook(id, newBook);
                setBookId("");
                setMessage({error: false, msg: "Updated successfully!"});
            } else {
                await BookDataService.addBooks(newBook);
                setMessage({error: false, msg: "New Book added successfully!"});
            }
        } catch (err) {
            setMessage({error: true, msg: err.message});
        }

        setTitle("");
        setAuthor("");
        setName("");
        setAge("");
        setLastName("");
        setPhone("");
        setSchedule("");
        setSpecialization("");
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await BookDataService.getBook(id);
            console.log("the record is :", docSnap.data());
            setTitle(docSnap.data().title);
            setAuthor(docSnap.data().author);
            setStatus(docSnap.data().status);
            setName(docSnap.data().name);
            setAge(docSnap.data().Age);
            setLastName(docSnap.data().LastName);
            setPhone(docSnap.data().Phone);
            setSchedule(docSnap.data().Schedule);
            setSpecialization(docSnap.data().Specialization);

        } catch (err) {
            setMessage({error: true, msg: err.message});
        }
    };

    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [id]);
    return (
        <>
         <Modal modalLable='Add Task' onClose={onClose} open={open}>
   
            <div className="p-4 box">
                {
                message ?. msg && (
                    <Alert variant={
                            message ?. error ? "danger" : "success"
                        }
                        dismissible
                        onClose={
                            () => setMessage("")
                    }>
                        {
                        message ?. msg
                    } </Alert>
                )
            }

                <Form onSubmit={handleSubmit}>
                    {/* <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>


          </Form.Group> */}


                    <Form.Group className="mb-3" controlId="formBookName">
                        <InputGroup>
                            <InputGroup.Text id="formBookName">set Name</InputGroup.Text>
                            <Form.Control type="text" placeholder="Name"
                                value={name}
                                onChange={
                                    (e) => setName(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBookAuthor">
                        <InputGroup>
                            <InputGroup.Text id="formBookAuthor">Last name</InputGroup.Text>
                            <Form.Control type="text" placeholder="last name"
                                value={LastName}
                                onChange={
                                    (e) => setLastName(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <InputGroup>
                            <InputGroup.Text id="formBookAuthor">Phone</InputGroup.Text>
                            <Form.Control type="text" placeholder="Phone"
                                value={Phone}
                                onChange={
                                    (e) => setPhone(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBookName">
                        <InputGroup>
                            <InputGroup.Text id="formBookName">set Age</InputGroup.Text>
                            <Form.Control type="text" placeholder="Name"
                                value={Age}
                                onChange={
                                    (e) => setAge(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>


                  
                    <Form.Group className="mb-3" controlId="formBookAuthor">
                        <InputGroup>
                            <InputGroup.Text id="formBookAuthor">Specialization</InputGroup.Text>
                            <Form.Control type="text" placeholder="Specialization"
                                value={Specialization}
                                onChange={
                                    (e) => setSpecialization(e.target.value)
                                }/>
                        </InputGroup>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBookAuthor">
                        <InputGroup>
                            <InputGroup.Text id="formBookAuthor">Schedule</InputGroup.Text>
                            <Form.Control type="text" placeholder="Schedule"
                                value={Schedule}
                                onChange={
                                    (e) => setSchedule(e.target.value)
                                }/>
                        </InputGroup>

                    </Form.Group>

                   


                    <ButtonGroup aria-label="Basic example" className="mb-3">
                        <Button disabled={flag}
                            variant="success"
                            onClick={
                                (e) => {
                                    setStatus("Available");
                                    setFlag(true);
                                }
                        }>
                            Available
                        </Button>

                        <Button variant="danger"
                            disabled={
                                !flag
                            }
                            onClick={
                                (e) => {
                                    setStatus("Not Available");
                                    setFlag(false);
                                }
                        }>
                            Not Available
                        </Button>
                    </ButtonGroup>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Add/ Update
                        </Button>
                    </div>
                </Form>
            </div>
            </Modal>
        </>
    );
};

export default AddBook;

