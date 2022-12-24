import React from 'react'
import styled from 'styled-components'

export default function App() {
  return (
    <PageContainer>
      <Section>
        <SectionTitle>グラフに表示する都道府県を選択してください</SectionTitle>
      </Section>
      <Section>
        <p>グラフ</p>
      </Section>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const Section = styled.section`
  padding: 10px 5px 10px 5px;
`

const SectionTitle = styled.p`
  text-align: center;
  margin-bottom: 10px;
`
