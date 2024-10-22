import React from 'react';
import Card from './components/Card';
import TableComponent from './components/TableComponent';



const Details = () => {
  return (
    <Card>
      {/* <div className="header">
        <div>
          <h1 className="title">Farmer Info</h1>
          <a href="#" className="link">
            Data Entry
          </a>
        </div>
        <div className="search-container">
          <SearchBar />
          <div className="drop-down-button">
            <DropDownButton />
          </div>
        </div>
      </div> */}
      <TableComponent/>
      
    </Card>
  );
};

export default React.memo(Details);
