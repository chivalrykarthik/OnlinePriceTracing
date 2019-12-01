import React from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import { gql } from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';


const ADD_TRACKER = gql`
mutation AddTracker($url:String!){
    addTracker(url:$url){
        url
    }
}
`;
const FormCmp = (props) => {
    let [addTracker] = useMutation(ADD_TRACKER,{
        update(){
            props.setRefetch(true)
        }
    });
    const formik = useFormik({
        initialValues: {
            "trackerTxt": ""
        },
        onSubmit: (values) => {            
            addTracker({variables:{url:values.trackerTxt}});
        }
    });
    return (
        <Row>
            <Col md={12}>
                <Form onSubmit = {formik.handleSubmit} >
                    <Form.Row>
                        <Col md={10}>
                            <Form.Control
                                placeholder="Enter the URL to track"
                                name = "trackerTxt"
                                value = {formik.values.trackerTxt}
                                onChange = {formik.handleChange}
                            />
                        </Col>
                        <Col md={2}>
                            <Button type="submit" variant="dark">Track</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>
        </Row>
    );
}
const CreateTracker = (props) => {

    return (
        <>
            <Row>
                <Col md={12}>
                    <FormCmp {...props} />
                </Col>
            </Row>

        </>
    )

}

export default CreateTracker;