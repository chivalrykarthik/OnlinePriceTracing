import React from 'react';
import { Row, Col, Card, Image } from 'react-bootstrap';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_TRACKER_LIST = gql`
{
    getTracklist{
        _id
          url
      startDate
      startPrice
      priceList{
        date
          price
      }
    }
  }
`;


const CardCmp = () => {
    return (
        <>

            <Card>
                <Card.Body>
                    <Row>
                        <Col md={1}>
                            <Image src="https://images-na.ssl-images-amazon.com/images/I/41ghaqnIbTL._AC_SR38,50_.jpg" />
                        </Col>
                        <Col md={11}>
                            <h4>Product Title</h4>
                            <div className="float-left">
                                <div>Start Price:</div>
                                <div>Current Price:</div>
                            </div>
                            <div className="float-right">
                                <div>Link</div>
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
    console.log("data===", JSON.stringify(data));
    return data.map((tracker) => {
        return <CardCmp key={tracker._id} />
    });
}
const ListTracker = () => {
    let { loading, error, data } = useQuery(GET_TRACKER_LIST);

    if (loading)
        return <div>Loading...</div>
    else if (error)
        return <div>Got some error</div>
    else {
        return (
            <>
                <Row>
                    <Col md={6}>
                        <TrackerCmp getTrackerList={data.getTracklist} />
                    </Col>
                    <Col md={6}>
                        <TrackerCmp getTrackerList={[data.getTracklist[0]]} />
                    </Col>
                </Row>

            </>
        )
    }
}

export default ListTracker;