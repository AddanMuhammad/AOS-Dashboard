import React from 'react';
import Card from './components/Card';
import HomeCard from './components/HomeCard';

function Home() {
  const cardsData = [
    {
      title: 'Total Farmers',
      startDate: '12345',
      bgColor: '#6B8E23',
    },
    {
      title: 'Total Area',
      startDate: '12345',
      bgColor: '#6B8E23',
    },
    {
      title: 'Constructed Area',
      startDate: '12345',
      bgColor: '#6B8E23',
    },
  ];

  return (
    <Card style={styles.cardContainer}>
      <div style={styles.headerText}>Dashboard</div>
      <div style={styles.subHeaderText}>Hi, Farmer. Welcome back to Admin!</div>
      <div style={styles.homeCardContainer}>
        <HomeCard cardsData={cardsData} cardHeight="30vh" cardWidth="100%" />
      </div>
    </Card>
  );
}

const styles = {
  cardContainer: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  headerText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subHeaderText: {
    fontSize: '1rem',
    textAlign: 'left',
  },
  homeCardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
  },
};


export default Home;
