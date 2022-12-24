import React from 'react';
import styled from 'styled-components';

export default function NabVar() {
  return (
    <NabvarContainer>
      <NabvarTitle>都道府県別 総人口推移</NabvarTitle>
    </NabvarContainer>
  );
}

const NabvarContainer = styled.div`
  height: 50px;
  background-color: #1a202c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NabvarTitle = styled.p`
  font-size: 24px;
  color: white;
`;
