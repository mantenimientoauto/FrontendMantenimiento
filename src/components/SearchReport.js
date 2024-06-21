import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SearchReport({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Container>
      <Row>
        <Col md={12} className='d-flex justify-content-center mt-5'>
          <Image src="https://i.imgur.com/DzS1R1X.jpg" alt='Logo' thumbnail />
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Label className="sr-only" htmlFor="searchQuery">Search</Form.Label>
          <Row className='d-flex justify-content-md-end justify-content-center mt-2 pt-3'>
            <Col xs={6} md={4}>
              <Form.Control
                id="searchQuery"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                className="mr-sm-2"
              />
            </Col>
            <Col xs={2}>
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
}

export default SearchReport;
