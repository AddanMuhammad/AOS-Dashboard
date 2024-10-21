import React, { useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Modal, Input } from 'antd';
import { toast } from 'react-toastify';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);


  // Function to open the modal and set the selected row data
  const showModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleOk = () => {
    // Update the data array with the edited row
    const updatedData = data.map((item) =>
      item.id === selectedRow.id ? selectedRow : item
    );
    setData(updatedData);
    setIsModalOpen(false);
    setSelectedRow(null); // Clear selected data when modal closes

    // Show success notification
    toast.success(
      'Record update successfully!',
      
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  // Function to handle form input change inside the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to delete a row
  const handleDelete = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    toast.error('Record deleted successfully!');
};

  

  // Update logic for filtered and sorted data remains the same
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
                <input
                    type="search"
                    placeholder="Search Data..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <span>
                    <SearchOutlined style={{ fontSize: '24px' }} />
                </span>
            </div>
            <div className="export__file">
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
                            {headers.map((header) =>
                                header.key !== "actions" ? (
                                    <td key={header.key}>{row[header.key]}</td>
                                ) : (
                                    <td key={header.key} className="sticky-action">
                                        <button className="action-btn view-btn"><EyeOutlined /></button>
                                        <button className="action-btn edit-btn" onClick={() => showModal(row)}><EditOutlined /></button>
                                        <button className="action-btn delete-btn" onClick={() => handleDelete(row.id)}><DeleteOutlined /></button>
                                    </td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>

        {/* Modal for editing */}
        {selectedRow && (
            <Modal
                title="Edit Customer"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="modal-content">
                    {/* First row of fields */}
                    <div className="input-group">
                        <div className="input-wrapper">
                            <label>Customer Name</label>
                            <Input
                                name="customer"
                                value={selectedRow.customer}
                                onChange={handleInputChange}
                                placeholder="Customer Name"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label>Location</label>
                            <Input
                                name="location"
                                value={selectedRow.location}
                                onChange={handleInputChange}
                                placeholder="Location"
                            />
                        </div>
                    </div>

                    {/* Second row of fields */}
                    <div className="input-group">
                        <div className="input-wrapper">
                            <label>Phone Number</label>
                            <Input
                                name="phone"
                                value={selectedRow.phone}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label>CNIC</label>
                            <Input
                                name="cnic"
                                value={selectedRow.cnic}
                                onChange={handleInputChange}
                                placeholder="CNIC"
                            />
                        </div>
                    </div>

                    {/* Third row of fields */}
                    <div className="input-group">
                        <div className="input-wrapper">
                            <label>Date</label>
                            <Input
                                name="date"
                                value={selectedRow.date}
                                onChange={handleInputChange}
                                placeholder="Date"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label>Status</label>
                            <Input
                                name="status"
                                value={selectedRow.status}
                                onChange={handleInputChange}
                                placeholder="Status"
                            />
                        </div>
                    </div>

                    {/* Fourth row of fields */}
                    <div className="input-group">
                        <div className="input-wrapper">
                            <label>Amount</label>
                            <Input
                                name="amount"
                                value={selectedRow.amount}
                                onChange={handleInputChange}
                                placeholder="Amount"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label>Area</label>
                            <Input
                                name="area"
                                value={selectedRow.area}
                                onChange={handleInputChange}
                                placeholder="Area"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        )}
    </main>
);
}

export default TableComponent