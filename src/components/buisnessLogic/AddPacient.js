import React,{useState,useEffect}from 'react';
import {useNavigate} from "react-router";
import {useUserAuth} from "../../context/UserAuthContext";
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
    query,Timestamp
} from "firebase/firestore";
import {db} from '../../firebase';
import pacientServices from '../services/pacient.services.';
import {Button} from "react-bootstrap";
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import '../modal/addTask.css'
import Modal from "../modal/Modal";
import {
    Form,
    Alert,
    InputGroup,
    
    ButtonGroup
} from "react-bootstrap";

function AddPacient({onClose, open,id}) {
    const [books, setBooks] = useState([]);

    console.log('IM iN ADDBOOK id in this', id)


    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            editHandler();
            getBooks();
           
        }
    }, [id]);
  
    const getBooks = async () => {
      const data = await pacientServices.getAllBooks();
      console.log(data.docs);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (Name === "" || LastName === "") {
            setMessage({error: true, msg: "Заполните Имя и Фамилию"});
            return;
        }
        const newBook = {
            Name,
            Age,
            LastName,
            Phone,
            Address,
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
                // setBookId("");
                
                setName("");
                setAge("");
                setLastName("")
                setPhone("");
                setAddress("")
                setZayavka("")
                setZayavkaTime("")
                
                setMessage({error: false, msg: "Updated successfully!"});
            } else {
                await pacientServices.addBooks(newBook);
                setMessage({error: false, msg: "New Book added successfully!"});
            }
        } catch (err) {
            setMessage({error: true, msg: err.message});
        }

     
        setName("");
        setAge("");
        setLastName("");
        setPhone("");
        setAddress("")
        setZayavka("")
        setZayavkaTime("")
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await pacientServices.getBook(id);
            console.log("the record is :", docSnap.data());
          
           
            setName(docSnap.data().Name);
            setAge(docSnap.data().Age);
            setLastName(docSnap.data().LastName);
            setPhone(docSnap.data().Phone);
            setAddress(docSnap.data().Address)
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

//select dropdown code------------------------

//end of select dropdown code





const [Address, setAddress] = useState('');
const [Age, setAge] = useState('');
const [LastName, setLastName] = useState('');
const [Name, setName] = useState('');
const [Phone, setPhone] = useState('');

const [zayavka,setZayavka]= useState('');
const [message, setMessage] = useState('');
const [zayavkaTime,setZayavkaTime]=useState('')

const addTodo = async (e) => {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(db, "pacients"), {
            name: Name,
            lname: LastName,
            phone: Phone,
            age: Age,
            address: Address,
            zayavka:zayavka,
            zayavkaTime:zayavkaTime,
            created: Timestamp.now()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}



return (
    
    <>
{console.log('this is books',books)}

<Modal modalLable='Add Task' onClose={onClose} open={open}>
    
    <Form onSubmit={handleSubmit}>
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

                    <Form.Group className="mb-3" controlId="formBookName">
                        <InputGroup>
                            <InputGroup.Text id="formBookName">set Address</InputGroup.Text>
                            <Form.Control type="text" placeholder="Address"
                                value={Address}
                                onChange={
                                    (e) => setAddress(e.target.value)
                                }/>
                        </InputGroup>
                    </Form.Group>


                  
               
                    <label>
                        Выберите врача:
                        <select name="selectedFruit" defaultValue="orange" onChange={handleChange}>
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                       
                            {books.map((doc, index) => {
                                return (
                                    <option value={doc.id}>
                                    Имя:{doc.Name}
                                    Фамилия:{doc.LastName} 
                                    {doc.Age}
                                    {doc.Phone}
                                    {doc.Schedule}
                                    Специализация:{doc.Specialization}
                                    Статус:{doc.status}
                                  
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

                   


                    {/* <ButtonGroup aria-label="Basic example" className="mb-3">
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
                    </ButtonGroup> */}
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Add/ Update
                        </Button>
                    </div>
    </Form>



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
            <input type="text" placeholder="Address?"
                onChange={
                    (e) => setAddress(e.target.value)
                }/>

        
                
           
                    <label>
                        Выберите врача:
                        <select name="selectedFruit" defaultValue="orange" onChange={handleChange}>
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                       
                            {books.map((doc, index) => {
                                return (
                                    <option value={doc.id}>
                                    Имя:{doc.name}
                                    Фамилия:{doc.LastName} 
                                   
                                    Специализация:{doc.Specialization}
                                    Статус:{doc.status}
                                  
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
                  
                     
                  

        <div className="btn-container">
            <Button type="submit" className="btn bordered" variant="dark edit"
                onClick={addTodo}>
                Submit
            </Button>
        </div>
        
        </Modal>

        <br/><br/>
       
        {/* {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>{doc.name}</td>
                <td>{doc.LastName}</td>
                <td>{doc.Age}</td>
                <td>{doc.Phone}</td>
                <td>{doc.Schedule}</td>
                <td>{doc.Specialization}</td>
                <td>{doc.status}</td>
               
              </tr>
            );
          })} */}
</>
)
}

export default AddPacient;








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

// function getAlldata() {
//     getDocs(collection(db, "pacients")).then(docSnap => {
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


