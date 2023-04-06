import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../services/helper';


const TutorsList = ({ tutor }) => {
    return (
        <Card className='m-3 shadow' style={{ width: '18rem' }}>
            <Card.Img className='m-auto mt-2' style={{ borderRadius: "50%", width: "60%", height: "15vh" }} variant="top  " src={`${BASE_URL}/uploads/${tutor.profile}`} />
            <Card.Body>
                <Card.Title>{tutor.firstname} {tutor.lastname}</Card.Title>
                <Card.Text>
                    Address : {tutor.address} ,
                    Age : {tutor.age} <br />
                    Phone: {tutor.phone}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush text-center">
                <ListGroup.Item>Specialization : {tutor.specialization}</ListGroup.Item>
                <ListGroup.Item>Experience : {tutor.experience}</ListGroup.Item>
                <ListGroup.Item>Timings : {tutor.timings}</ListGroup.Item>
                <ListGroup.Item>Fees Per Student : {tutor.feesPerStudent}</ListGroup.Item>
                <ListGroup.Item className='text-center'><NavLink className='text-decoration-none' to={`/tutor/book-appointment/${tutor._id}`}>Book Tutor</NavLink></ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default TutorsList