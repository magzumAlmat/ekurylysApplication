import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";


const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptha } = useUserAuth();
  const [NumbersDB, setNumbersDB] = useState("");
  const [OtpDB, setOtpDB] = useState("");
  
  const navigate = useNavigate();


  const getOtp = async (e) => {
    e.preventDefault();
    console.log(number);
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      addRecordNumberToDb(otp)
      navigate("/home");
      

      localStorage.setItem("localStoragePhone", JSON.stringify(number));
      localStorage.setItem("localStorageOtp", JSON.stringify(otp));


      NumberAndCode[number] = otp 
      console.log('Записанный в бд номер водителя и его код',NumberAndCode)

    } catch (err) {
      setError(err.message);
    }
    
  };
  const NumberAndCode = {}








  const phoneSignIn = async (e) => {
    e.preventDefault();
    console.log('Я внутри phoneSIGNIN')
    console.log('otp number',NumbersDB)
    console.log('otp code',OtpDB)

    
    // console.log('NumberAndCode number',NumberAndCode)
    // console.log('NumberAndCode code',NumberAndCode)
  
    setError("");

    const n=localStorage.getItem('localStoragePhone')
    const nn = JSON.parse(n);
    const c=localStorage.getItem('localStorageOtp')
    const cc = JSON.parse(c);
    
    console.log('localStoragePhone number',nn)
    console.log('localStorageOtp code',cc)

    if (nn === "" || nn === null) return;
    
    try {
      const isEqual = (nn===NumbersDB & cc===OtpDB);
      console.log(' isEqual ',isEqual)
        if (isEqual==1) {
          // const response = await setUpRecaptha(NumbersDB);
          // setResult(response);
          // setFlag(true);
          // await result.confirm(OtpDB);
          // addRecordNumberToDb(OtpDB)
          navigate("/home");
          console.log('Отработался вход по сохраненным логину и паролю')
        }
        else{
        return console.log('NOOOOOOO');
        }

      // if(NumberAndCode.key===NumbersDB and NumberAndCode.value===OtpDB) 
      // {
      // const response = await setUpRecaptha(NumbersDB);
      // setResult(response);
      // setFlag(true);
      // await result.confirm(OtpDB);
      // addRecordNumberToDb(OtpDB)
      // navigate("/home");
      // }
      // else{}
  
    
    
    } catch (err) {
      setError(err.message);
    }
    

    // setError("");
    // if (otp === "" || otp === null) return;
    // try {
    //   await result.confirm(otp);
    //   addRecordNumberToDb(otp)
    //   navigate("/home");
    // } catch (err) {
    //   setError(err.message);
    // }  
  }

  const addRecordNumberToDb = (props,otp) =>{
    
    console.log('Я внутри addRecordNumberToDb ')
    // setNumbersDB(number)
    
    

   
  }



  // var val = Math.floor(1000 + Math.random() * 9000);
  // console.log('рандомайз выдал',val);

  let NumbersDBB=''
  

 
  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Phone Auth</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <Button type="submit" variant="primary">
              Send Otp
            </Button>
          </div>
        </Form>


        <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}


            />
          </Form.Group>

          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            <h3>Ваш код {NumberAndCode.value}</h3>
            <Button type="submit" variant="primary" >
              Verify
            </Button>
          </div>
        </Form>
        

        <br/>
        <br/>
        <br/>
        <br/>
        
        <h4> SignIN </h4>
        <h5>Войти в систему с имеющимся кодом</h5>
       
       
      
       
       
       <Form onSubmit={phoneSignIn} >
      
       <Form.Group className="mb-3" controlId="sfsdfgd">
            <PhoneInput
              defaultCountry="IN"
              value={NumbersDB}
              onChange={setNumbersDB}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container"></div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="otp"
              placeholder="Enter your OTP code "
              
              
              onChange={(e) => setOtpDB(e.target.value)}

            />
          </Form.Group>

          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>
            &nbsp;
            {/* <h3>Ваш код {NumbersDB}</h3>
            <h3>Ваш код {OtpDB}</h3> */}
            <br/>
           
            <Button type="submit" variant="primary" >
              PUSH
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneSignUp;
