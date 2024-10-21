import React, { useState } from 'react';
// import SearchBar from './SearchBar';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined  } from '@ant-design/icons';
import { Button } from 'antd';

const initialData = [
    {
        id: 1,
        customer: "Zinzu Chan Lee",
        location: "Seoul",
        date: "17 Dec, 2022",
        status: "delivered",
        amount: "$128.90",
       february: "23",
       total: "77",
       phone: "1234567890",
       cnic: "0000000000000",
       area: "N.A"
      },
      {
        id: 2,
        customer: "Maria Gonzalez",
        location: "Madrid",
        date: "23 Jan, 2023",
        status: "pending",
        amount: "$99.50",
        february: "23",
        total: "77",
        phone: "1234567890",
        cnic: "0000000000000",
        area: "N.A"
      },
      {
        id: 3,
        customer: "John Doe",
        location: "New York",
        date: "1 Feb, 2023",
        status: "shipped",
        amount: "$149.00",
        february: "23",
       total: "77",
       phone: "1234567890",
       cnic: "0000000000000",
       area: "N.A"
      },
      {
        id: 4,
        customer: "Amina Al-Jabari",
        location: "Dubai",
        date: "10 Mar, 2023",
        status: "cancelled",
        amount: "$180.75",
        february: "23",
       total: "77",
       phone: "1234567890",
       cnic: "0000000000000",
       area: "N.A"
      },
      {
        id: 5,
        customer: "Alexey Ivanov",
        location: "Moscow",
        date: "12 Apr, 2023",
        status: "delivered",
        amount: "$78.99",
        february: "23",
        total: "77",
        phone: "1234567890",
        cnic: "0000000000000",
        area: "N.A"
      },
      {
        id: 6,
        customer: "Emma Smith",
        location: "London",
        date: "25 May, 2023",
        status: "pending",
        amount: "$255.50",
        february: "23",
        total: "77",
        phone: "1234567890",
        cnic: "0000000000000",
        area: "N.A"
      },
      {
        id: 7,
        customer: "Sophia Zhang",
        location: "Beijing",
        date: "3 Jun, 2023",
        status: "shipped",
        amount: "$199.99",
        february: "23",
        total: "77",
        phone: "1234567890",
        cnic: "0000000000000",
        area: "N.A"
      },
      {
        id: 8,
        customer: "Hans Müller",
        location: "Berlin",
        date: "15 Jul, 2023",
        status: "delivered",
        amount: "$89.50",
        february: "25",
       total: "77",
       phone: "1234567890",
       cnic: "0000000000000",
       area: "N.A"
       
      },
      
    
  ];



  const headers = [
    { label: "Sr.", key: "id" },
    { label: "Grw.code", key: "customer" },
    { label: "Grw.name", key: "location" },
    { label: "Father name", key: "date" },
    { label: "September", key: "status" },
    { label: "Ratoon", key: "amount" },
    { label: "February", key: "february" },
    { label: "Total", key: "total" },
    { label: "Phone", key: "phone" },
    { label: "CNIC", key: "cnic" },
    { label: "Area", key: "area" },
    { label: "Actions", key: "actions" } 
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




//   return (
//     <main className="table">
//       <section className="table__header">
//         <h1>Customer Orders</h1>
//         <div className="input-group">
//           <input
//             type="search"
//             placeholder="Search Data..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{
//               height: '50px',
//               padding: '10px',
//               fontSize: '16px',
              
//             }}
//           />
//           <span style={{ height: '40px', paddingRight: '10px', display: 'flex', alignItems: 'center' }}>
//         <SearchOutlined style={{ fontSize: '24px' }} />
//       </span>
//           {/* <SearchBar search={search} setSearch={setSearch}/> */}
          
//         </div>
//         <div className="export__file">
//           <button onClick={exportToCSV}>Export to CSV</button>
//         </div>
//       </section>
//       <section className="table__body">
//         {/* <table>
//           <thead>
//             <tr>
//               {["sr.", "Grw.code", "Grw.name", "father name", "september", "ratoon", "february", "total", "phone", "cnic", "area"].map((header) => (
//                 <th key={header} onClick={() => sortTable(header)}>
//                   {header.charAt(0).toUpperCase() + header.slice(1)}
//                   <span className={`icon-arrow ${sortConfig.key === header ? sortConfig.direction : ""}`}>&UpArrow;</span>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row) => (
//               <tr key={row.id}>
//                 <td>{row.id}</td>
//                 <td>
                
//                   {row.customer}
//                 </td>
//                 <td>{row.location}</td>
//                 <td>{row.date}</td>
//                 <td>
//                   <p className={`status ${row.status}`}>{row.status}</p>
//                 </td>
//                 <td>
//                   <strong>{row.amount}</strong>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table> */}


// <table>
//           <thead>
//             <tr>
//               {headers.map((header) => (
//                 <th key={header.key} onClick={() => sortTable(header.key)}>
//                   {header.label.charAt(0).toUpperCase() + header.label.slice(1)}
//                   {/* <span className={`icon-arrow ${sortConfig.key === header.key ? sortConfig.direction : ""}`}>&UpArrow;</span> */}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row) => (
//               <tr key={row.id}>
//                 {headers.map((header) => (
//                   <td key={header.key}>
//                     {row[header.key]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </main>
//   )


return (
  <main className="table">
    <section className="table__header">
      <h1>Customer Orders</h1>
      <div className="input-group">
        <input
          type="search"
          placeholder="Search Data..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            height: '50px',
            padding: '10px',
            fontSize: '16px',
          }}
        />
        <span style={{ height: '40px', paddingRight: '10px', display: 'flex', alignItems: 'center' }}>
          <SearchOutlined style={{ fontSize: '24px' }} />
        </span>
      </div>
      <div className="export__file">
        {/* <button onClick={exportToCSV}>Export to CSV</button> */}
        <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={exportToCSV}>
            Download
          </Button>
      </div>
    </section>
    <section className="table__body">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} onClick={() => sortTable(header.key)} className={header.key === 'actions' ? 'sticky-action' : ''}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              {headers.map((header) => (
                header.key !== "actions" ? (
                  <td key={header.key}>
                    {row[header.key]}
                  </td>
                ) : (
                  <td key={header.key} className="sticky-action">
                    <button className="action-btn edit-btn"><EyeOutlined /></button>
                    <button className="action-btn view-btn"><EditOutlined /></button>
                    <button className="action-btn delete-btn"><DeleteOutlined /></button>
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
    </section>
  </main>
);
}

export default TableComponent