import React from 'react';
import { Container, Card } from 'react-bootstrap';
import PageHeader from '../components/PageTitle.js';

import styled from 'styled-components';
import colors from '../static/colors.js';

export default function Retrieve() {
  return (
    <Container className="mb-5 my-5">
      <PageHeader text="VSDBM - Viral Sequence Database Manager" />
      <BlackCard>
        <Card.Header className="title-box">
          <CardTitle>Retrieve data</CardTitle>
        </Card.Header>
        <Card.Body>
          Here you can download stuff
        </Card.Body>
      </BlackCard>
    </Container>
  )
}


const BlackCard = styled(Card)`
  background-color: ${colors.color7};
`;

const CardTitle = styled.h2`
  color: ${colors.color2};
`;