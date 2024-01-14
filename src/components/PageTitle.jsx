import React from 'react';
import styled from 'styled-components';

export default function PageTitle({ text }) {
  return (
    <PageHeader>
      <h1>
        <span>{text}</span>
      </h1>
    </PageHeader>
  );
}


const PageHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 20px;
  flex-wrap: wrap;
  > h1 {
    margin: 0;
    margin-left: 20%;
    font-family: 'Ubuntu', sans-serif;
    text-shadow: 0px 0px 1px black;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 2.5rem;
    color: white !important;
  }
  > h1 > span {
    display: inline-box;
  }
`