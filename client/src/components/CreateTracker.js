import React from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';


const FormCmp = () => {
    return (
        <Row>
            <Col md={12}>
                <Form>
                    <Form.Row>
                        <Col md={10}>
                            <Form.Control placeholder="Enter the URL to track" />
                        </Col>
                        <Col md={2}>
                            <Button variant="dark">Track</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Col>
        </Row>
    );
}
const CreateTracker = () => {

    return (
        <>
            <Row>
                <Col md={12}>
                    <FormCmp />
                </Col>
            </Row>

        </>
    )

}

export default CreateTracker;