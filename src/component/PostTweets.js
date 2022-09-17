import React from 'react'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaStickyNote } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router';
import { url } from './Url.js';
import SuccessBody2 from './SucessBody2.js';
const PostTweets = (props) => {
    const [tweetContent, setTweetContent] = useState('')
    let navigate = useNavigate();
    const handlePost = (event) => {
        event.preventDefault()
        if (props.userName === undefined) {
            alert("Something went wrong , please login again")
            navigate('/')
        }
        else {
            if (tweetContent === '') {
                alert("enter tweet content")
            }
            else {
                fetch(`${url}/username/${props.userName}/add`, {
                    method: 'POST',
                    headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization':`Bearer ${localStorage.getItem("jwt")}`
                    },
                    body: JSON.stringify({
                        discription: tweetContent
                    })
                }).then((res) => {
                    if (res.status === 200) {
                        alert('posted ur tweet')
                        props.updateList();
                    }
                    else {
                        alert('something went wrong')
                    }
                })
            }
        }
    }

    

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card className='p-1 mt-5'>
                            <Card.Header className='text-center font-weight-bold bg-secondary text-white'>Post New Tweet</Card.Header>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label className='p-2'>Enter Tweet Content:</Form.Label>
                                    <Form.Control className='p-2' type="text" name="tweetContent" placeholder="Enter tweet to post..." onChange={e => setTweetContent(e.target.value)} required></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <center><Button className="bg-danger border border-2 border-danger" type="danger" onClick={handlePost}><FaStickyNote className='m-1' />Post Tweet</Button></center>
                                </Form.Group>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PostTweets