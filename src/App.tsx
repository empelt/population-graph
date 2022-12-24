import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckField from 'components/CheckField';

const getPrefectures = async () => {
  const response = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    {
      headers: {
        'X-API-KEY': process.env.REACT_APP_API_KEY ?? '',
      },
    }
  );
  const res = await response.json();
  return res;
};

export default function App() {
  const [prefectures, setPrefectures] = useState<
    {
      prefCode: number;
      prefName: string;
      populationDatas?: { year: number; value: number }[];
    }[]
  >([]);

  // チェックされた都道府県のCodeを管理する
  const [checkedCodes, setCheckedCodes] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getPrefectures();
      setPrefectures(res.result);
    })();
  }, []);

  // チェックリストの更新
  const handleChangeCheckBox = (prefCode: number) => {
    if (checkedCodes.includes(prefCode)) {
      setCheckedCodes(checkedCodes.filter((value) => value !== prefCode));
    } else {
      setCheckedCodes([...checkedCodes, prefCode]);
    }
  };
  return (
    <PageContainer>
      <Section>
        <SectionTitle>グラフに表示する都道府県を選択してください</SectionTitle>
        {prefectures && (
          <CheckField
            prefectures={prefectures}
            checkedCodes={checkedCodes}
            onChange={handleChangeCheckBox}
          />
        )}
      </Section>
      <Section>
        <p>グラフ</p>
      </Section>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  padding: 10px 5px 10px 5px;
`;

const SectionTitle = styled.p`
  text-align: center;
  margin-bottom: 10px;
`;
