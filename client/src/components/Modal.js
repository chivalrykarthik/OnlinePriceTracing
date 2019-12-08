import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
const ModalHeader = props => {
    return (
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <span>{props.product.productName}</span>
            </Modal.Title>
        </Modal.Header>
    );
}
const useGetProductData = ({ product }) => {
    if (!product || !product.priceList || !product.priceList.length) {
        return null;
    }
    let label = [], data = [], months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    product.priceList.forEach(row => {
        let dtObj = new Date(parseInt(row.date));
        let dt = dtObj.getDate() + '-' + months[dtObj.getMonth()] + '-' + dtObj.getFullYear();
        label.push(dt);
        data.push(row.price);
    });
    return [label, data];
}
const ModalBoday = props => {
    let [label, data] = useGetProductData(props);
    return (
        <Modal.Body>
            <Line
                data={
                    {
                        labels: label,
                        datasets: [{
                            label: 'Price',
                            //backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: data
                        }]
                    }
                }
            />
        </Modal.Body>
    )
}
const ModalFooter = props => {
    return (
        <Modal.Footer>
            <a
                href={props.product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
            >
                Goto Site
          </a>
        </Modal.Footer>
    )
}
const ModalCmp = (props) => {
    return (
        <>
        <Modal
            show={props.show}
            onHide={props.handleshow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalHeader product={props.product} />
            <ModalBoday product={props.product} />
            <ModalFooter product={props.product} />
        </Modal>
        </>
    );
}



const LoadModal = props => {
    let [show, setShow] = useState(false);
    let handleShow = show => setShow(show);
    return (
        <>
            <Button
                variant="link"
                onClick={handleShow.bind(null, true)}
            >
                More
            </Button>
            <ModalCmp
                show={show}
                {...props}
                handleshow={handleShow.bind(null, false)}
            />
        </>
    )
}

export default LoadModal;