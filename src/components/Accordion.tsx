import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};
export default function Accordion({ children }: Props) {
  const [isActive, setActiveState] = useState(false);

  const toggleAccordion = () => {
    setActiveState(!isActive ? true : false);
  };

  return (
    <AccordionContainer>
      <AccordionContent isActive={isActive}>{children}</AccordionContent>
      <AaccordionButton onClick={toggleAccordion}>
        {isActive ? '閉じる' : '開く'}
      </AaccordionButton>
    </AccordionContainer>
  );
}

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccordionContent = styled.div<{ isActive: boolean }>`
  overflow: hidden;
  transition: max-height 0.5s ease, padding-top 0.8s ease;
  max-height: ${({ isActive }) => (isActive ? '800px' : '0px')};
  padding-top: ${({ isActive }) => (isActive ? '10px' : '0px')};
  padding-bottom: ${({ isActive }) => (isActive ? '15px' : '0px')};
`;

const AaccordionButton = styled.button`
  color: #1a202c;
  background: white;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: solid 1px #1a202c;
  font-size: 20px;
`;
