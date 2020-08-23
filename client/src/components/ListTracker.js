import React, { useEffect } from 'react';
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Modal from './Modal';
const GET_TRACKER_LIST = gql`
{
    getTracklist{url
        productName
        startDate
        startPrice
        todayPrice
        _id
        productImage    
        priceList{
          date
          price
        }
    }
  }
`;

const DELETE_TRACKER = gql`
mutation DeleteTracker($id:String!){
    deleteTracker(id:$id){        
        productName
    }
}

`

const DeleteProductBtn = (props) => {
    const { productId } = props;
    let [deleteTracker] = useMutation(DELETE_TRACKER, {
        update() {
            props.setRefetch(true)
        }
    });
    const deleteProduct = () => {
        const isDelete = window.confirm("Are you sure want to delete the product ?");
        if (isDelete) {
            deleteTracker({ variables: { id: productId } });
        }
    }
    return (
        <>
            <Button
                variant="link"
                onClick={deleteProduct}
            >
                Delete
            </Button>
        </>
    );
}


const CardCmp = (props) => {
    return (
        <>
            <Card>
                <Card.Body>
                    {/*<span className="float-right pointer" aria-hidden="true">×</span>*/}
                    <Row>
                        <Col md={2}>
                            <Image src={props.productImage} fluid />
                        </Col>
                        <Col md={10}>
                            <h6>{props.productName}</h6>
                            <div className="float-left">
                                <div>Start Price:{props.startPrice}</div>
                                <div>Current Price:{props.todayPrice}</div>
                            </div>
                            <div className="float-right">
                                <DeleteProductBtn productId={props._id} setRefetch={props.setRefetch} />
                                <Modal product={props} />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

const TrackerCmp = (props) => {
    let data = props.getTrackerList;
    return data.map((tracker) => {
        if (tracker)
            return <Col md={6} ><CardCmp {...tracker} key={tracker._id} setRefetch={props.setRefetch} /></Col>
        return null;
    });
}
const ListTracker = (props) => {
    let { loading, error, data, refetch } = useQuery(GET_TRACKER_LIST);
    let { isRefetch, setRefetch } = props;
    useEffect(() => {
        if (isRefetch) {
            refetch();
        }
        setRefetch(false);
    }, [isRefetch, refetch, setRefetch]);

    if (loading)
        return <div>Loading...</div>
    else if (error)
        return <div>Got some error</div>
    else {
        return (
            <>
                <Row>

                    <TrackerCmp getTrackerList={data.getTracklist} setRefetch={setRefetch} />


                </Row>

            </>
        )
    }
}

export default ListTracker;


/*
https://www.amazon.in/dp/B07D17R2PP
https://www.amazon.in/dp/B01J82IYLW
*/