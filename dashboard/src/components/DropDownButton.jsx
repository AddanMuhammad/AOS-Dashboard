import React from 'react';
import { Select, Space } from 'antd';

const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

function DropDownButton() {
  return (
    <Space wrap>
    <Select
      defaultValue="Newest"
      style={{ width: 120 }}
      onChange={handleChange}
      options={[
        { value: 'Newest', label: 'Newest' },
        { value: 'Oldest', label: 'Oldest' },
        
      ]}
      
    />
   
  </Space>
  )
}

export default DropDownButton