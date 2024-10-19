import React, { useState } from 'react';
import SearchBar from './SearchBar';


const initialData = [
    {
        id: 1,
        customer: "Zinzu Chan Lee",
        location: "Seoul",
        date: "17 Dec, 2022",
        status: "delivered",
        amount: "$128.90",
       
      },
      {
        id: 2,
        customer: "Maria Gonzalez",
        location: "Madrid",
        date: "23 Jan, 2023",
        status: "pending",
        amount: "$99.50",
       
      },
      {
        id: 3,
        customer: "John Doe",
        location: "New York",
        date: "1 Feb, 2023",
        status: "shipped",
        amount: "$149.00",
        
      },
      {
        id: 4,
        customer: "Amina Al-Jabari",
        location: "Dubai",
        date: "10 Mar, 2023",
        status: "cancelled",
        amount: "$180.75",
        
      },
      {
        id: 5,
        customer: "Alexey Ivanov",
        location: "Moscow",
        date: "12 Apr, 2023",
        status: "delivered",
        amount: "$78.99",

      },
      {
        id: 6,
        customer: "Emma Smith",
        location: "London",
        date: "25 May, 2023",
        status: "pending",
        amount: "$255.50",
       
      },
      {
        id: 7,
        customer: "Sophia Zhang",
        location: "Beijing",
        date: "3 Jun, 2023",
        status: "shipped",
        amount: "$199.99",
 
      },
      {
        id: 8,
        customer: "Hans Müller",
        location: "Berlin",
        date: "15 Jul, 2023",
        status: "delivered",
        amount: "$89.50",
       
      },
      
    
  ];
  

function TableComponent() {

    const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filtered and searched data
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Sorting functionality
  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setData(sortedData);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data
      .map((row) => Object.values(row).map((value) => `"${value}"`).join(","))
      .join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "customer_orders.csv";
    link.click();
  };

  return (
    <main className="table">
      <section className="table__header">
        <h1>Customer Orders</h1>
        <div className="input-group">
          {/* <input
            type="search"
            placeholder="Search Data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <SearchBar search={search} setSearch={setSearch}/>
          
        </div>
        <div className="export__file">
          <button onClick={exportToCSV}>Export to CSV</button>
        </div>
      </section>
      <section className="table__body">
        <table>
          <thead>
            <tr>
              {["id", "customer", "location", "date", "status", "amount"].map((header) => (
                <th key={header} onClick={() => sortTable(header)}>
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                  <span className={`icon-arrow ${sortConfig.key === header ? sortConfig.direction : ""}`}>&UpArrow;</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                
                  {row.customer}
                </td>
                <td>{row.location}</td>
                <td>{row.date}</td>
                <td>
                  <p className={`status ${row.status}`}>{row.status}</p>
                </td>
                <td>
                  <strong>{row.amount}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default TableComponent