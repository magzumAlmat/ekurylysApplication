import React, {useState, useEffect, useRef} from "react";
import {
    Form,
    Alert,
    InputGroup,
    Button,
    ButtonGroup
} from "react-bootstrap";
import BookDataService from '../services/book.services'
import '../modal/addTask.css'
import Modal from "../modal/Modal";
import DoctorsList from "./DoctorsList";
import pacientServices from "../services/pacient.services";


const AddPacient = ({ id,setBookId,onClose, open}) => {

    const [doctors, setDoctors] = useState([]);
    
    const [status, setStatus] = useState("Available");
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({error: false, msg: ""});
    const [Name, setName] = useState("")
    const [Age, setAge] = useState('');
    const [LastName, setLastName] = useState('');

    const [Phone, setPhone] = useState('');
    const [zayavka,setZayavka]= useState('null');
   
    const [zayavkaTime,setZayavkaTime]=useState('null')

    

    console.log('IM iN ADDBOOK id in this', id)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (Name === "" || LastName === "") {
            setMessage({error: true, msg: "Заполните Имя и Фамилию"});
            return;
        }
        const newBook = {
            
            status,
            Name,
            Age,
            LastName,
            Phone,
            zayavka,
            zayavkaTime

        };
        console.log('this is newBook from Addbook',newBook);

        try {
            console.log('Im in AddBook  id=  ',id)
            console.log('e target ',e.target.getBookId)
            if (id !== undefined && id !== "") {
                console.log('FUNCTION UPDATE STARTED')
                await pacientServices.updateBook(id, newBook);
                setBookId("");
                setStatus('')
                setName("");
                setAge("");
                setLastName("");
                setPhone("");
                setZayavka("");
                setZayavkaTime("");
                setMessage({error: false, msg: "Updated successfully!"});
            } else {
                await pacientServices.addBooks(newBook);
                setMessage({error: false, msg: "New Book added successfully!"});
            }
        } catch (err) {
            setMessage({error: true, msg: err.message});
        }

        // setTitle("");
        // setAuthor("");
        // setName("");
        setStatus('');
        setAge("");
        setLastName("");
        setPhone("");
        setZayavka("");
        setZayavkaTime("");
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await pacientServices.getBook(id);
            console.log("the record is :", docSnap.data());
          
            setStatus(docSnap.data().status);
            setName(docSnap.data().Name);
            setAge(docSnap.data().Age);
            setLastName(docSnap.data().LastName);
            setPhone(docSnap.data().Phone);
            setZayavka(docSnap.data().zayavka)
            setZayavkaTime(docSnap.data().zayavkaTime)

        } catch (err) {
            setMessage({error: true, msg: err.message});
        }
    };

    function handleChange(e){
        
        console.log('iam in function handle Change  e target=  ',e.target.value); // for ex. will print USD
        // const form = e.target;
        // const formData = new FormData(form);
        // const formJson = Object.fromEntries(formData.entries());
        // console.log(' formJson= ',formJson)
        
        setZayavka(e.target.value) 
   
    }
    
    function handleChange2(e){
        
        console.log('iam in function handle Change2  e target=  ',e.target.value); // for ex. will print USD
        // const form = e.target;
        // const formData = new FormData(form);
        // const formJson = Object.fromEntries(formData.entries());
        // console.log(' formJson= ',formJson)
        
        setZayavkaTime(e.target.value)

    }

    const getDoctors = async () => {
        const data = await BookDataService.getAllBooks()
        console.log('ALL DOCTORS',data.docs);
        setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
  


    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            getDoctors();
            editHandler();
           
        }
    }, [id]);

    return (
        <>
   
         
   
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
                {doctors.map((doc, index) => {
                                console.log('doc name=',doc.name)
                                return (
                                    <li value={doc.id} key={index}>
                                    Имя:{doc.Name}
                                    Фамилия:{doc.LastName} 
                                    {/* {doc.Age}
                                    {doc.Phone}
                                    {doc.Schedule} */}
                                    Специализация:{doc.Specialization}
                                    {/* Статус:{doc.status} */}
                                  
                                </li>
                                );
                            })}
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
                                value={Name}
                                onChange={
                                    (e) => setName(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBookAuthor">
                        <InputGroup>
                            <InputGroup.Text id="formBookAuthor2">Last name</InputGroup.Text>
                            <Form.Control type="text" placeholder="last name"
                                value={LastName}
                                onChange={
                                    (e) => setLastName(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <InputGroup>
                            <InputGroup.Text id="formBookAuthor3">Phone</InputGroup.Text>
                            <Form.Control type="text" placeholder="Phone"
                                value={Phone}
                                onChange={
                                    (e) => setPhone(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBookName">
                        <InputGroup>
                            <InputGroup.Text id="formBookName4">set Age</InputGroup.Text>
                            <Form.Control type="text" placeholder="Name"
                                value={Age}
                                onChange={
                                    (e) => setAge(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>
                    
                    <label>
                        Выберите врача:
                        <select name="selectedFruit" defaultValue="orange" onChange={handleChange} key='index'>
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                       
                            {doctors.map((doc, index) => {
                                console.log('doc name=',doc.name)
                                return (
                                    <option value={doc.id} key={index}>
                                    Имя:{doc.Name}
                                    Фамилия:{doc.LastName} 
                                    {/* {doc.Age}
                                    {doc.Phone}
                                    {doc.Schedule} */}
                                    Специализация:{doc.Specialization}
                                    {/* Статус:{doc.status} */}
                                  
                                </option>
                                );
                            })}
                        
                        </select>
                    </label>


                    <label>
                        Выберите Предпочитаемое время:
                        <select name="selectedFruit2" defaultValue="Выберите время" onChange={handleChange2}>
                        <option value="10:00-10:30">10:00-10:30</option>
                        <option value="10:30-11:00">10:30-11:00</option>
                        <option value="11:30-12:00">11:30-12:00</option>
                       
                           
                        
                        </select>
                    </label>

                  


               

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
           
        </>
    );
};

export default AddPacient;

