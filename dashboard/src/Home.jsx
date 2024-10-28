import React from 'react'
import Card from './components/Card'
import HomeCard from './components/HomeCard'

function Home() {
  const cardsData = [
    {
      title: 'Total Farmer\'s',
      startDate: '15.10.2024',

      bgColor: '#FF6347',
    },
    {
      title: 'Total Area',
      startDate: '22.10.2024',

      bgColor: '#4682B4',
    },
    {
      title: 'Constructed Area',
      startDate: '29.10.2024',

      bgColor: '#FFBF00',
    },
  ];
  return (
    <Card >
      <div style={{
        fontSize: '30px',
        fontWeight: 'bold',
      }}> Dashboard </div>
      <div style={{ fontSize: '17px' }}> Hi, Farmer. Welcome back to Admin! </div>
      <div>
        <HomeCard cardsData={cardsData} cardHeight="30vh" cardWidth="21vw" />
      </div>
    </Card>
  )
}

export default Home