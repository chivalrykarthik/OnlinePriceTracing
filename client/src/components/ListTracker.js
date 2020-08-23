import React, { useEffect } from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
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
                                <Modal product = {props}/>
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
            return <Col md = {6} ><CardCmp {...tracker} key={tracker._id} /></Col>
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
                    
                        <TrackerCmp getTrackerList={data.getTracklist} />
                    
                    
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