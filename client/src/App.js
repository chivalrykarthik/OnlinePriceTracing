import React,{useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';

import Header from './components/Header';
import CreateTracker from './components/CreateTracker';
import ListTracker from './components/ListTracker';
const client = new ApolloClient({
  uri: "http://localhost:4000/"
})
function App() {
  let [isRefetch,setRefetch] = useState(false);
  return (
    <ApolloProvider client={client} >
      <Container>
        <Row >
          <Col md={12}>
            <Header />
          </Col>
        </Row>
        <Router>
          <Route exact path='/'>
            <CreateTracker isRefetch = {isRefetch} setRefetch = {setRefetch} />
            <ListTracker  isRefetch = {isRefetch} setRefetch = {setRefetch} />
          </Route>
        </Router>
      </Container>
    </ApolloProvider>
  );
}

export default App;
