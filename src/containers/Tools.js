import React from 'react';
import { Container, Card } from 'react-bootstrap';
import PageHeader from '../components/PageTitle.js';

import styled from 'styled-components';
import colors from '../static/colors.js';

export default function Tools() {
  return (
    <Container className="mb-5 my-5">
      <PageHeader text="VSDBM - Viral Sequence Database Manager" />
      <BlackCard>
        <Card.Header>
          <CardTitle>Tools</CardTitle>
        </Card.Header>
        <Card.Body>
          Here you can use our tools, like the lucifrequency
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