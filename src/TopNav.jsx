import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const TopNav=()=>{
  const [input, setInput]=useState({});

  const [userid, setUserid]=useState("");
  const [pwd, setPwd]= useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showlogin, setShowlogin] = useState(false);
  const handleCloselogin = () => setShowlogin(false);
  const handleShowlogin = () => setShowlogin(true);

  const mynav= useNavigate();


   const handleInput=(e)=>{
     let name=e.target.name;
     let value= e.target.value;
      setInput(values=>({...values, [name]:value}))
    console.log(input);
   }

    const handleSubmit=()=>{
    let url="http://localhost:3000/customer";
    axios.post(url, input).then((res)=>{
      setShow(false);
      toast.success("You are Succesfully Regitered!!!");
    })
    }

   const handleLogin=()=>{
     let api=`http://localhost:3000/customer?userid=${userid}`
     axios.get(api).then((res)=>{
        if (res.data.length>=1)
        {
           if (res.data[0].password==pwd)
           {
             localStorage.setItem("uname", res.data[0].name) 
             localStorage.setItem("uemail", res.data[0].email)

            mynav("/dashboard");
            setShowlogin(false)
           }
           else 
           {
            alert("Wrong Password!!!")
           }
        }
        else 
        {
          alert("Galat user")
        }

     })
   }





    return(
        <>
          <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Login System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="home">Home</Nav.Link>
            <Nav.Link href="#features" onClick={handleShowlogin}>Login</Nav.Link>
            <Nav.Link href="#pricing" onClick={handleShow}>Registration</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Registration Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter name</Form.Label>
              <Form.Control
                type="text" name="name" onChange={handleInput} autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"  name="email" onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter UserID</Form.Label>
              <Form.Control
                type="text"  name="userid" onChange={handleInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"   name="password" onChange={handleInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Registered
          </Button>
        </Modal.Footer>
      </Modal>





      <Modal show={showlogin} onHide={handleCloselogin}>
        <Modal.Header closeButton>
          <Modal.Title>User Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter UserID</Form.Label>
              <Form.Control
                type="text"  name="userid"  value={userid} onChange={(e)=>{setUserid(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"   name="password"  value={pwd} onChange={(e)=>{setPwd(e.target.value)}}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloselogin}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin} >
           Login
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />

        </>
    )
}

export default TopNav;