import React from 'react'
import Card from './components/Card'
import HomeCard from './components/HomeCard'

function Home() {
  const cardsData = [
    {
      title: 'Total Farmers',
      startDate: '12345',

    
      bgColor: '#6B8E23', // Olive green      
    },
    {
      title: 'Total Area',
      startDate: '12345',

      bgColor: '#6B8E23', // Olive green      
     
    },
    {
      title: 'Constructed Area',
      startDate: '12345',

      
      bgColor: '#6B8E23', // Olive green      
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