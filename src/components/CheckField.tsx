import React from 'react';
import styled from 'styled-components';
import CheckBox from 'components/CheckBox';

type Props = {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];
  checkedCodes: number[];
  onChange: (prefCode: number) => void;
};

export default function CheckField({
  prefectures,
  checkedCodes,
  onChange,
}: Props) {
  return (
    <CheckFieldContainer>
      {prefectures &&
        prefectures.map((prefecture, i) => {
          return (
            <CheckBox
              prefCode={prefecture.prefCode}
              prefName={prefecture.prefName}
              key={i}
              onChange={onChange}
              checked={checkedCodes.includes(prefecture.prefCode)}
            />
          );
        })}
    </CheckFieldContainer>
  );
}

const CheckFieldContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;
