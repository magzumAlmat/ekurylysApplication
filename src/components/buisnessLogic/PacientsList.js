import React, {useEffect, useState} from "react";
import {Table, Button} from "react-bootstrap";
import PacientDataService from "../services/pacient.services";
import AddBook from "./AddBook";
import { db } from "../../firebase";
import {collection, query, orderBy, onSnapshot, updateDoc,getDoc} from "firebase/firestore"
import {useParams} from 'react-router-dom'
import AddPacient from "./AddPacient";
import BookDataService from "../services/book.services";
import {Routes, Route, Outlet, NavLink} from 'react-router-dom';
import {
    Form,
    Alert,
    InputGroup,
    Dropdown ,
    ButtonGroup
} from "react-bootstrap";
import {
    doc,
  } from "firebase/firestore";
  import { auth } from "../../firebase"; // Assuming you have the Firebase auth instance available

const PacientsList = ({getBookId,id}) => {
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({error: false, msg: ""});
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState();
    const [status, setStatus] = useState("InProgress");
    const [openAddModal, setOpenAddModal] = useState(false)
    const [doctors, setDoctors] = useState([]);
    const [managers, setManagers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [usr,setUsr] = useState('');
    const [usrNAME,setUsrNAME] = useState('');
    const [timestamp, setTimestamp] = useState(null);
    
    // useEffect(() => {
    //     getBooks();
    //     getDoctors();
    //     updateStatus()
    // }, []);
    const getCurrentUserId = () => {
        const user = auth.currentUser;
        console.log('this is user= ',user)
        if (user) {
          const userId = user.uid;
          setUsr(userId);
          setUsrNAME(user)
          console.log("User UID====", userId);
          return userId;
        } else {
          console.log("No user is currently signed in.");
          return null;
        }
      };

    useEffect(() => {
        getAllm()
        getBooks();
        getCurrentUserId();
       
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
        setBooks(data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        })));

    };

   
    const getAllm=async()=>{
        const da= await PacientDataService.getAllM();
        console.log('2',da)
        setManagers(da.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        })));
        console.log(managers)
    }

  
    const deleteHandler = async (id) => {
        const bookRef = doc(db, "pacients", id);
        const bookSnapshot = await getDoc(bookRef);
        const bookData = bookSnapshot.data();

        console.log('bootData.manager= ',bookData.manager,'THIS IS USER= ',THISUSER)
        console.log()
        if(bookData.manager==THISUSER){
        await PacientDataService.deleteBook(id);
        getBooks();
    }
    else{
        alert('Вы не можете удалить данную заявку!')
      }
    };

    const updateStatus = async (id, newStatus) => {
        try {

          const bookRef = doc(db, "pacients", id); // Replace "your-collection-name" with the actual collection name
          const bookSnapshot = await getDoc(bookRef);
          const bookData = bookSnapshot.data();

          console.log('bootData.manager= ',bookData.manager,'THIS IS USER= ',THISUSER)
          console.log()
          if(bookData.manager==THISUSER){

          await updateDoc(bookRef, { status: newStatus });
          getBooks();}
          else{
            alert('Вы не обрабатываете данную заявку!')
          }
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
      };


      const managedBy = async (id, THISUSER) => {
       
        

        try {
          const bookRef = doc(db, "pacients", id); // Replace "your-collection-name" with the actual collection name
          console.log('this is bookRef',bookRef)
          
            const bookSnapshot = await getDoc(bookRef);
            const bookData = bookSnapshot.data();

            if (bookData && !bookData.manager) {
            await updateDoc(bookRef, { manager: THISUSER });
            getBooks();
            } else {
                console.log('The manager field is already populated or the document does not exist.');
                alert('Данная запись уже отрабатывается менеджером.Поэтому ее нельзя выбрать')
            }

     
        
        } catch (err) {
          setMessage({ error: true, msg: err.message });
        }
      };

      const handleStatusFilter = (status) => {
        setSelectedStatus(status);
      };

    
      const filteredBooks = selectedStatus === "All" ? books : books.filter((book) => book.status === selectedStatus);
    
      const statusOptions = ["All", "inProgress", "finished"];
     
      let THISUSER=''
      for(let i=0 ;i<managers.length;i++){
        console.log('this is user=',usr)
        

        if(usr==managers[i].uid){
            THISUSER=managers[i].firstName
        }
    }
    console.log('THIS USER=',THISUSER)

  

   

    return (<> 
    {/* {    openAddModal && 
        <AddPacient id={bookId}
                 setBookId={setBookId}
                 onClose={ () => setOpenAddModal(false)}
                 open={openAddModal}
                 />
   } */}


            {/* <NavLink to="/buisnessLogic/AddPacient">
                    Add pacient
            </NavLink> */}

        <div className="mb-2">
            <Button variant="dark edit"
                onClick={getBooks}>
                Обновить заявки
            </Button>
        </div>

        {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
        <Table striped bordered hover size="sm">
            <thead>
                <tr> 
                    <th>Действие</th>
                    <th>Менеджер</th>
                    <th>Название компании</th>
                    <th>БИН компании</th>
                    <th>ФИО </th>
                    <th>Наименование обьекта</th>
                    <th>Телефон</th>
                    <th>Время заявки</th>
                    <th>
                   
                        Статус</th>
                    <th>Редактировать запись</th>
                </tr>
            </thead>
            <tbody>
                 {
                filteredBooks.map((doc, index) => {
                    return (
                        <tr key={
                            doc.id
                        }>
                            {/* <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td> */}
                            {/* <td key={index}>{
                                doc.Name
                            }</td> */}
                            <td>
                              
                                {<Button size="sm"
                                    disabled={false}
                                    variant="success"
                                    onClick={() => {
                                    managedBy(doc.id,THISUSER);
                                    
                                    }}
                                >
                              Выбрать заявку
                               </Button>
                                }
                            </td>
                            <td>{
                                doc.manager
                            }</td>
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
                                 doc.zayavkaTime.toDate().toLocaleString()
                                
                            }</td>
                            <td>{
                                doc.status
                            }</td>
                            <td>
                            <ButtonGroup aria-label="Basic example" className="mb-3">
                  <Button size="sm"
                    disabled={false}
                    variant="success"
                    onClick={() => {
                      updateStatus(doc.id, "inProgress");
                      setStatus("inProgress");
                      setFlag(true);
                    }}
                  >
                    В работе
                  </Button>
                  <Button size="sm"
                    variant="danger"
                    disabled={false}
                    onClick={() => {
                      updateStatus(doc.id, "finished");
                      setStatus("finished");
                      setFlag(false);
                    }}
                  >
                    Завершено
                  </Button>
                  <Button variant="danger" className="delete" size="sm"
                                    onClick={
                                        (e) => deleteHandler(doc.id)
                                }>
                                    Delete
                                </Button>
                </ButtonGroup>

                              
                            </td>
                        </tr>
                    );
                })
            } </tbody>
        </Table>
    </>
    );
    };
    
    export default PacientsList;

