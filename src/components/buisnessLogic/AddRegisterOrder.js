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
import BookDataService from "../services/book.services";
import {Button} from "react-bootstrap";
import { Routes, Route, Outlet, NavLink } from 'react-router-dom';
import pacientServices from '../services/pacient.services';
import Container from 'react-bootstrap';
function AddRegisterOrder({getBookId}) {

    const [Address, setAddress] = useState('');
    const [Age, setAge] = useState('');
    const [LastName, setLastName] = useState('');
    const [Name, setName] = useState('');
    const [Phone, setPhone] = useState('');

    const [zayavka,setZayavka]= useState('');
    const [message, setMessage] = useState('');
    const [zayavkaTime,setZayavkaTime]=useState('')

    const [books, setBooks] = useState([]);
    const [pacient, setPacient] = useState([]);


    const [status, setStatus] = useState("Available");
    const [flag, setFlag] = useState(true);
    const [Vrachmessage, setVrachMessage] = useState({error: false, msg: ""});
    const [VrachName, setVrachName] = useState("")
    const [VrachAge, VrachsetAge] = useState('');
    const [VrachLastName, VrachsetLastName] = useState('');

    const [VrachPhone, VrachsetPhone] = useState('');
    const [VrachSchedule, setVrachSchedule] = useState('');
    const [VrachSpecialization, setVrachSpecialization] = useState('');


    
    useEffect(() => {
      getBooks();getPacient()
    }, []);
  
    const getBooks = async () => {
      const data = await BookDataService.getAllBooks();
      console.log(data.docs);
      setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getPacient = async () => {
        const data = await pacientServices.getAllBooks();
        console.log(data.docs);
        setPacient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };



    function handleChange(e){
        
        console.log(' setZayavka  iam in function handleChange  e target=  ',e.target); // for ex. will print USD
        // const form = e.target;
        // const formData = new FormData(form);
        // const formJson = Object.fromEntries(formData.entries());
        // console.log(' formJson= ',formJson)
        setVrachName(e.target.value)
        
    
   
    }
    
    function handleChange2(e){
        
        console.log('iam in function handleChange2  e target=  ',e.target); // for ex. will print USD
        // const form = e.target;
        // const formData = new FormData(form);
        // const formJson = Object.fromEntries(formData.entries());
        // console.log(' formJson= ',formJson)
        setZayavka(e.target.value) 
        setZayavkaTime(e.target.value)

    }

//select dropdown code------------------------

//end of select dropdown code






const addTodo = async (e) => {
    e.preventDefault();
    console.log('this is e ',e.target)
    try {
        const docRef = await addDoc(collection(db, "doctorSchedule"), {
            VrachName:VrachName,
            VrachsetLastName:VrachLastName,
            VrachAge:VrachAge,
            VrachPhone:VrachPhone,
            VrachSpecialization:VrachSpecialization,

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

                    <label>
                        Выберите врача:
                        <select name="selectedFruit" defaultValue="banana" onChange={handleChange}>
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                       
                            {books.map((doc, index) => {
                                return (
                                    <option value={doc.id}>
                                    Имя:{doc.name}
                                    Фамилия:{doc.LastName} 
                                    {/* {doc.Age}
                                    {doc.Phone}
                                    {doc.Schedule} */}
                                    Специализация:{doc.Specialization}
                                    Статус:{doc.status}
                                  
                                </option>
                                );
                            })}
                        
                        </select>
                    </label>

                    <label>
                        Выберите Пациента:
                        <select name="selectedFruit2" defaultValue="orange" onChange={handleChange2}>
                        <option value="apple">Apple</option>
                        <option value="banana">Banana</option>
                        <option value="orange">Orange</option>
                       
                            {pacient.map((doc, index) => {
                                return (
                                    <option value={doc.id}>
                                        Имя:{doc.Name}
                                        {/* Время заявки на врача: {doc.zayavkaTime}
                                        Фамилия:{doc.LastName} 
                                        Заявка создана:{doc.created}
                                        Телефон:{doc.Phone} */}
                                        Статус Заявки:{doc.status}
                                        Заявка на врача : {doc.zayavka}
                                        Время заявки на врача: {doc.zayavkaTime}
                                    
                                </option>
                                );
                            })}
                        
                        </select>
                    </label>


                    {/* {books.map((doc, index) => {
                                return (
                                    <p value={doc.id}>
                                    Имя:{doc.name}
                                    Фамилия:{doc.LastName} 
                                    
                                    Специализация:{doc.Specialization}
                                    Статус:{doc.status}
                                  
                                </p>
                                );
                            })}
<br /><br />
<br />
<br />
<br />
<br />


                {pacient.map((doc, index) => {
                                return (
                                    <p value={doc.id}>
                                    Имя:{doc.name}
                                    Фамилия:{doc.LastName} 
                                  
                                    Статус Заявки:{doc.status}
                                    Заявка на врача : {doc.zayavka}
                                    Время заявки на врача: {doc.zayavkaTime}
                                  
                                </p>
                                );
                            })}  */}

        
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

        
                
           
                    {/* <label>
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
                    </label> */}


                    {/* <label>
                        Pick all your favorite vegetables:
                        <select
                        name="selectedVegetables"
                        multiple={true}
                        defaultValue={['corn', 'tomato']}
                        >
                        <option value="cucumber">Cucumber</option>
                        <option value="corn">Corn</option>
                        <option value="tomato">Tomato</option>
                        </select>
                    </label> */}
                    <hr />
                    {/* <button type="reset">Reset</button> */}
                     
                  

        <div className="btn-container">
            <Button type="submit" className="btn bordered" variant="dark edit"
                onClick={addTodo}>
                Submit
            </Button>
        </div>
        
        

        <br/><br/>
        <p>--------------------exit------------------------------------------------</p>

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

export default AddRegisterOrder;








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


