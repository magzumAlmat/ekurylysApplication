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
    } catch (err) {
      setError(err.message);
    }
    
  };
  const NumberAndCode = {}


  const signIn = (e) => {
    e.preventDefault();
    
    //if (this.props.otp===""|| this.props.otp === null) return;
    // try{
    //   await result.confirm(otp);
    //   console.log('this is otp',otp)
    //   console.log('this is code from NumberAndCode','-',NumberAndCode.value)
    // } catch (err) {
    //   setError(err.message);
    // }
    console.log('Я внутри SIGNIN',e)
    console.log('SignIN')
    }
  

  var val = Math.floor(1000 + Math.random() * 9000);
  console.log('рандомайз выдал',val);

  let NumbersDBB=''
  
  const addRecordNumberToDb = (otp) =>{
    console.log('Номер водителя number- ',number)
    // setNumbersDB(number)
    NumbersDBB=number
    NumberAndCode[number] = otp 
    console.log('Записанный в бд номер водителя',NumberAndCode)
  }

 
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
        

       <h2>Войти в систему с имеющимся кодом</h2>
        <Form onSubmit={signIn} style={{ display: !flag ? "block" : "none" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="otp"
              placeholder="Введите ранее вам выданный код "
              
              

            />
            </Form.Group>
              &nbsp;
              <Button type="submit" variant="primary" onClick={(e) => signIn(e.target.value)}>
                Отправить
              </Button>
           
          </Form> 
      </div>
    </>
  );
};

export default PhoneSignUp;
