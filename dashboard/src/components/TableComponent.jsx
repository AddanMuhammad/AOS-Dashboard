// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Modal, Input,  } from 'antd';
import Pagination from './Pagination';
import { toast } from 'react-toastify';
import { newJSON } from '../json/Json';

const initialData = newJSON.features.map(feature => {
  const { properties } = feature;
  return {
      division: properties.Division,
      district: properties.District,
      tehsil: properties.Tehsil,
      location: properties.Grw__Name,
      date: properties.Father_Nam,
      phone: properties.Phone_no,
      area: parseFloat(properties.Area),
      ratoon: properties.Ratoon,
      february: properties.February,
      total: properties.Total,
      comments: properties.Comments,
      // Add more fields if required
  };
});



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
  const [currentData, setCurrentData] = useState(initialData.slice(0, 5));
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handlePageChange = (startIndex, endIndex) => {
      const slicedData = data.slice(startIndex, endIndex);
      setCurrentData(slicedData);
  };

  const showModal = (row) => {
      setSelectedRow(row);
      setIsModalOpen(true);
  };

  const handleOk = () => {
      const originalData = data.find((item) => item.id === selectedRow.id);
      const isUpdated = JSON.stringify(originalData) !== JSON.stringify(selectedRow);

      if (isUpdated) {
          const updatedData = data.map((item) =>
              item.id === selectedRow.id ? selectedRow : item
          );
          setData(updatedData);
          toast.success('Record updated successfully!');
      }

      setIsModalOpen(false);
      setSelectedRow(null);
  };

  const handleCancel = () => {
      setIsModalOpen(false);
      setSelectedRow(null);
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSelectedRow((prev) => ({
          ...prev,
          [name]: value,
      }));
  };

  const showDeleteModal = (id) => {
      setDeleteId(id);
      setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
      const updatedData = data.filter(item => item.id !== deleteId);
      setData(updatedData);
      setIsDeleteModalOpen(false);
      toast.error('Record deleted successfully!');
  };

  const handleDeleteCancel = () => {
      setIsDeleteModalOpen(false);
  };

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
      // Recalculate the current page data to reflect sorting
      handlePageChange(0, 5);
  };

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
      <div>
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
                                  <th
                                      key={header.key}
                                      onClick={() => sortTable(header.key)}
                                      className={header.key === 'actions' ? 'sticky-action' : ''}
                                  >
                                      {header.label}
                                  </th>
                              ))}
                          </tr>
                      </thead>
                      <tbody>
                          {currentData.map((row) => (
                              <tr key={row.id}>
                                  {headers.map((header) =>
                                      header.key !== "actions" ? (
                                          <td key={header.key}>{row[header.key]}</td>
                                      ) : (
                                          <td key={header.key} className="sticky-action">
                                              <button className="action-btn view-btn"><EyeOutlined /></button>
                                              <button className="action-btn edit-btn" onClick={() => showModal(row)}><EditOutlined /></button>
                                              <button className="action-btn delete-btn" onClick={() => showDeleteModal(row.id)}><DeleteOutlined /></button>
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
                    centered
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

            {/* Delete confirmation modal */}
            <Modal
                title="Are you sure?"
                open={isDeleteModalOpen}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Yes"
                cancelText="No"
                centered
                okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }}
            >
                <p>Do you really want to delete this record?</p>
            </Modal>
          </main>

          <Pagination array={data} itemsPerPage={5} onPageChange={handlePageChange} />
      </div>
  );
}

export default TableComponent;