import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckField from 'components/CheckField';
import Graph from 'components/Graph';

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

const getPopulation = async (prefCode: number) => {
  const response = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=' +
      String(prefCode),
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

  // チェックリストに変更が合った時に、人口データを更新する
  useEffect(() => {
    const tmp_prefectures = prefectures.slice();
    checkedCodes.forEach(async (prefCode) => {
      const updateIdx = tmp_prefectures.findIndex(
        (value) => value.prefCode === prefCode
      );
      if (!tmp_prefectures[updateIdx].populationDatas) {
        const res = await getPopulation(prefCode);
        tmp_prefectures[updateIdx].populationDatas = res.result.data[0].data;
        setPrefectures(tmp_prefectures);
      }
    });
  }, [checkedCodes]);

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
        <Graph prefectures={prefectures} checkedCodes={checkedCodes} />
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
