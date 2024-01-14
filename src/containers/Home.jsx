import React from 'react'
import { Container, Card, Col, Row, CardGroup } from 'react-bootstrap';
import PageHeader from '../components/PageTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function Home() {
  return (
    <NewContainer style={{ position: 'relative' }}>
      <PageHeader text="VSDBM - Viral Sequence Database Manager" />
      <Col lg="12">
        <Row>
          <CardGroup>
            <NewCard aside>
              <Card.Body>
                <h4>
                  <NewCardTitle className="title-box">
                    What is VSDBM <FontAwesomeIcon icon={faQuestion} />
                  </NewCardTitle>
                </h4>
                <NewCardBody>
                  VSDBM is a high performance hybrid multi-platform multi-language tool to colect, analyse and store viral genomic sequences on demand. It is composed of three main modules:
                  <ul>
                    <li>Backend module</li>
                    <li>Database module</li>
                    <li>Frontend module</li>
                  </ul>
                    The Backend module runs all analysis on a week or demand basis. This module collect all new sequences from main primary biological databases; Process it by mapping it with the complete anotated genome; Subtyping it using subtype groups pre-determined in literature and map all epitopes contained in IEDB. All data is stored in Database model and can be accessed by the frontend via REST services.
                </NewCardBody>
              </Card.Body>
            </NewCard>
            <NewCard aside>
              <Card.Body>
                <h4>
                  <NewCardTitle className="title-box">
                    Who made it <FontAwesomeIcon icon={faQuestion} />
                  </NewCardTitle>
                </h4>
                <NewCardBody>
                  Many have contributed to the development, thinking, brainstorming, creation and availability of this tool. Unfortunately there is no way to get all names here. However, i will try to bring the main minds behind VSDBM and it´s tools.
                  <ul>
                    <li>Irahe Kasprzykowski - Developer</li>
                    <li>Helton Fábio - Developer</li>
                    <li>Artur Queiroz - Scientific Advisor</li>
                  </ul>
                    The Backend module runs all analysis on a week or demand basis. This module collect all new sequences from main primary biological databases; Process it by mapping it with the complete anotated genome; Subtyping it using subtype groups pre-determined in literature and map all epitopes contained in IEDB. All data is stored in Database model and can be accessed by the frontend via REST services.
                </NewCardBody>
              </Card.Body>
            </NewCard>
          </CardGroup>
        </Row>
      </Col>
      <Col lg="12" style={{ marginTop: '20px' }}>
        <Row>
          <CardGroup>
            <NewCard aside>
              <Card.Body>
                <h4>
                  <NewCardTitle className="title-box">
                    How can i contribute <FontAwesomeIcon icon={faQuestion} />
                  </NewCardTitle>
                </h4>
                <NewCardBody>
                  Please contact our main researcher at <a href="mailto:irahe22@gmail.com">irahe22@gmail.com</a>
                </NewCardBody>
              </Card.Body>
            </NewCard>
            <NewCard aside>
              <Card.Body>
                <h4>
                  <NewCardTitle className="title-box">
                    Who maintain it <FontAwesomeIcon icon={faQuestion} />
                  </NewCardTitle>
                </h4>
                <NewCardBody>
                  This software is maintained by PAH (High throughput Analysis Platform) group in association with FIOCRUZ (Oswaldo Cruz Foundation) - BA
                </NewCardBody>
              </Card.Body>
            </NewCard>
          </CardGroup>
        </Row>
      </Col>
    </NewContainer>
  )
}

const NewContainer = styled(Container)`
  @media (min-width: 1280px){
    max-width: 1200px;
  }
`;

const NewCard = styled(Card)`
  background-color: var(--color7);
  margin-bottom: 1.5rem;
`;

const NewCardTitle = styled(Card.Title)`
&:hover {
  text-shadow: 0px 0px 5px black;
}
`;

const NewCardBody = styled(Card.Text)`
padding-top: 10px;
border-top: 1px dotted grey;
color: #9aa0ac !important;
text-align: justify;
`;

const Title = styled.a`

`;