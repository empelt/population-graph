import React from 'react';
import styled from 'styled-components';

type Props = {
  checked?: boolean;
  onChange: (prefCode: number) => void;
  prefCode: number;
  prefName: string;
};

export default function CheckBox({
  checked = false,
  onChange,
  prefCode,
  prefName,
}: Props) {
  return (
    <Label>
      <Input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(prefCode)}
      />
      <Span checked={checked}>{prefName}</Span>
    </Label>
  );
}

const Label = styled.label`
  display: contents;
`;

const Span = styled.span<{ checked: boolean }>`
  color: ${({ checked }) => (checked ? 'white' : '#1a202c')};
  font-size: 20px;
  background-color: ${({ checked }) => (checked ? '#1a202c' : 'white')};
  box-shadow: 0px 0px 15px -7px #777777;
  border-radius: 20px;
  padding: 5px 20px;
  transition: box-shadow 0.2s ease-out 0s;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 15px -3px #777777;
  }
`;

const Input = styled.input`
  display: none;
`;
