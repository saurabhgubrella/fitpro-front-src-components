// import logo from './logo.svg';

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Navbar,
  Row,
  Stack,
} from "react-bootstrap";
import "./Profile.css";
import Booking from "../Booking/Booking";
import { minLengthValidation } from "../functions/validations";
import ExpertNavbar from "../NavBar/ExpertNavbar";
import FooterComponent from "../FooterComponent";
function Profile() {
  const [firstName, setFirstName] = useState("");
  const [data, setData] = useState("")
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [toggle, setToggle] = useState(true);
  // const [toggle, setToggle] = useState(true)

  const email = window.localStorage.getItem("EmailID");

  const myfun = () => {
    // fetch(`http://localhost:3003/user-service/api/v1/Expertprofile/${email}`)
    fetch(`http://localhost:8080/user-service/api/v1/Expertprofile/${email}`)
      .then((res) => res.json())
      .then(
        (response) => (
          setFirstName(response.data.firstName),
          setLastName(response.data.lastName),
          setEmailId(response.data.emailId),
          setSpecialization(response.data.specialization),
          setAbout(response.data.aboutMe),
          setEducation(response.data.educationalQualification),
          setExperience(response.data.experience),
          setPhoneNumber(response.data.phoneNumber)
        )
      )
      .catch((err) => console.log(err));
  };

  console.log(firstName,"123");

  useEffect(() => {
    myfun();
  }, []);

  const handleChangefirstName = (e) => {
    setFirstName(e.target.value);
  };
  console.log(firstName,"8989");
  const handleChangelastName = (e) => {
    setLastName(e.target.value);
  
    // var query={emailId:req.params.emailId}
    
    // dataObj = req.body;
    // expertModel.findOneAndUpdate(query,{$set : dataObj },(err, docs)=>{
    //     if(err)
    //     {
    //         res.status(404).json({
    //             message: "Error In Getting Details",
    //             err : err,
    //             isSuccess: false,
    //         });
    //     }
    //   else if(docs != null)
    //     {
    //         res.status(200).json({
    //             message: "Updated Expert Details Successfully..",
    //             isSuccess: true,
    //         });
             
    //     }
    //     else{
    //         res.status(400).json({
    //             message: "Error In Deleted Details",
    //             isSuccess: false,
    //         });
    //     }
    // })
  }
  
 //  function getExpertByEmail(req,res){
   
 //     expertModel.find({emailId:req.params.emailId}
 
 //     ).then(expert=>{
 //         res.send(expert)

  const handleChangeEducation = (e) => {
    setEducation(e.target.value);
  };
  const handleChangephonenumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleChangeAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleChangeExperience = (e) => {
    setExperience(e.target.value);
  };
  const handleChangespecialization = (e) => {
    setSpecialization(e.target.value);
  };

  const handleValidationFirstName = () => {
    let validation = false;
    if (!minLengthValidation(firstName, 3)) {
      setFirstNameError("Please enter a Name");
      validation = false;
    } else {
      validation = true;
    }
    return validation;
  };

  const JsonData = {
    id: "1001",
    expert_FirstName: firstName,
    expert_LastName: lastName,
    expert_EmailId: emailId,
    expert_Specialization: specialization,
    expert_Role: "1",
    expert_PhoneNumber: phoneNumber,
    expert_Educational: education,
    expert_AboutMe: about,
    expert_Experience: experience,
  };

  const handleSubmit = (e) => {
    setToggle(false)
    e.preventDefault();
    console.log(JSON.stringify(JsonData));
    const id = JsonData.id;
    const json = JSON.stringify(JsonData);
    const res = axios.put(`http://localhost:8080/user-service/api/v1/expert/${email}`, {
      firstName: firstName,
      lastName: lastName,
      specialization: specialization,
      emailId: emailId,
      phoneNumber: phoneNumber,
      education: education,
      aboutMe: about,
      experience: experience,
      role: "",
      avatarUrl: "",
      photo: ""
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setToggle(true)
  };
  
  const handleEdit = ()=>{
    setToggle(false)
  }

  return (
    <>
    <ExpertNavbar/>
    <div className="my-3">
      <Container>
        <Row>
          <Col>
            <Card className="text-center">
              <Row>
                <Col>
                  <Card.Body>
                    <Card.Img
                      src="https://cdn.pixabay.com/photo/2014/07/09/10/04/man-388104_960_720.jpg"
                      alt="Admin"
                      className="rounded-circle p-1 bg-primary"
                      style={{ width: "400px" }}
                    />
                    <h4>{firstName} {lastName}</h4>
                    <p>
                      {specialization}
                      <br></br>
                    </p>
                    <h6>{experience + "Yrs"}</h6>
                    <h6>{about}</h6>

                    <Button as="a" variant="info">
                      Follow
                    </Button>
                  </Card.Body>
                </Col>
                <Col>
                  <Card.Body>
                      <Row>
                        <Col>
                          <Button
                            variant="outline-primary"
                            type="submit"
                            onClick={handleEdit}
                          >
                            Edit
                          </Button>
                        </Col>
                      </Row>
                     
                       <div>
                      <Row>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicFirstName"
                          >
                            <Form.Label>FirstName:</Form.Label>
                            <Form.Control
                              type="text"
                              disabled={toggle}
                              placeholder="Enter FirstName"
                              value={firstName}
                              onChange={handleChangefirstName}
                              // onBlur={handleValidationFirstName}
                            />
                           
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicLastName"
                          >
                            <Form.Label>LastName:</Form.Label>
                            <Form.Control
                            disabled={toggle}
                              type="text"
                              placeholder="Enter LastName"
                              value={lastName}
                              onChange={handleChangelastName}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          readOnly
                          value={emailId}
                          
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPhoneNumber"
                      >
                        <Form.Label>PhoneNumber:</Form.Label>
                        <Form.Control
                          type="text"
                          disabled={toggle}
                          placeholder="Enter number"
                          value={phoneNumber}
                          onChange={handleChangephonenumber}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicExperience"
                      >
                        <Form.Label> Experience:</Form.Label>
                        <Form.Control
                          type="text"
                          disabled={toggle}
                          placeholder="Experience"
                          value={experience}
                          onChange={handleChangeExperience}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEdu">
                        <Form.Label>Education Qualification:</Form.Label>
                        <Form.Control
                          type="email"
                          disabled={toggle}
                          placeholder="Enter Qualification"
                          value={education}
                          onChange={handleChangeEducation}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicSpec">
                        <Form.Label>Specialization:</Form.Label>
                        <Form.Control
                        disabled={toggle}
                          type="email"
                          placeholder="Enter Specialization"
                          value={specialization}
                          onChange={handleChangespecialization}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicAbout">
                        <Form.Label>AboutMe:</Form.Label>
                        <Form.Control
                          type="text"
                          disabled={toggle}
                          placeholder="About"
                          value={about}
                          onChange={handleChangeAbout}
                        />
                      </Form.Group>
                      
                      </div>
                   
                      <div>
                        <Button
                          variant="outline-primary"
                          className="mb-2"
                          
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
        <Booking />
        </Row>
      </Container>
    </div>
    </>
  );
}
<FooterComponent/>
export default Profile;



// <div className="invalid-feedback">
// {firstNameError
//   ? firstNameError
//   : console.log("invalid credentials")}
// </div>


 // {data.map((dataItem,index)=>(

  // ))}



  // <Form.Group
  //                       className="mb-3"
  //                       controlId="formBasicPhoneNumber"
  //                     >
  //                       <Form.Label>PhoneNumber:</Form.Label>
  //                       <Form.Control
  //                         type="text"
  //                         disabled={toggle}
  //                         placeholder="Enter number"
  //                         value={dataItem.expert_PhoneNumber}
  //                         onChange={handleChangephonenumber}
  //                       />
  //                     </Form.Group>

  //                     <Form.Group
  //                       className="mb-3"
  //                       controlId="formBasicExperience"
  //                     >
  //                       <Form.Label> Experience:</Form.Label>
  //                       <Form.Control
  //                         type="text"
  //                         disabled={toggle}
  //                         placeholder="Experience"
  //                         value={dataItem.expert_Experience}
  //                         onChange={handleChangeExperience}
  //                       />
  //                     </Form.Group>

  //                     <Form.Group className="mb-3" controlId="formBasicEdu">
  //                       <Form.Label>Education Qualification:</Form.Label>
  //                       <Form.Control
  //                         type="email"
  //                         disabled={toggle}
  //                         placeholder="Enter Qualification"
  //                         value={dataItem.expert_Educational}
  //                         onChange={handleChangeEducation}
  //                       />
  //                     </Form.Group>

  //                     <Form.Group className="mb-3" controlId="formBasicSpec">
  //                       <Form.Label>Specialization:</Form.Label>
  //                       <Form.Control
  //                       disabled={toggle}
  //                         type="email"
  //                         placeholder="Enter Specialization"
  //                         value={dataItem.expert_Specialization}
  //                         onChange={handleChangespecialization}
  //                       />
  //                     </Form.Group>

  //                     <Form.Group className="mb-3" controlId="formBasicAbout">
  //                       <Form.Label>AboutMe:</Form.Label>
  //                       <Form.Control
  //                         type="text"
  //                         disabled={toggle}
  //                         placeholder="About"
  //                         value={dataItem.expert_AboutMe}
  //                         onChange={()=>handleChangeAbout}
  //                       />
  //                     </Form.Group>