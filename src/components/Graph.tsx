import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
  prefectures: {
    prefCode: number;
    prefName: string;
    populationDatas?: { year: number; value: number }[];
  }[];
  checkedCodes: number[];
};

export default function Graph({ prefectures, checkedCodes }: Props) {
  const series: Highcharts.SeriesOptionsType[] = [];
  const categories: string[] = [];

  checkedCodes.forEach((checkedCode) => {
    const data: number[] = [];
    const prefecture = prefectures.find(
      (value) => value.prefCode === checkedCode
    );
    prefecture?.populationDatas?.forEach((populationData) => {
      data.push(populationData.value);
      categories.push(String(populationData.year));
    });
    series.push({
      type: 'line',
      name: prefecture?.prefName,
      data: data,
    });
  });

  const options: Highcharts.Options = {
    title: {
      text: '人口推移グラフ',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    accessibility: {
      enabled: false,
    },
    series:
      series.length === 0
        ? [{ type: 'line', name: '都道府県名', data: [] }]
        : series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
