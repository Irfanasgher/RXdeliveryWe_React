import React from 'react';
import { Space, Select } from 'antd';

import './DeliveriesFilter.scss';
const { Option } = Select;

export const filterOptions = [
  {
    key: 'today',
    title: 'Today',
  },
  {
    key: '7days',
    title: 'Last 7 days',
  },
  {
    key: '30days',
    title: 'Last 30 days',
  },
];

function DeliveriesFilter(props) {
  return (
    <Space size={12} className="mb-2 right-direction">
      <label>Filter Deliveries by</label>
      <Select
        defaultValue={props.filter}
        style={{ width: 300 }}
        onChange={(value) => {
          props.updateFilter({ filter: value });
        }}
      >
        {filterOptions.map((item) => (
          <Option key={item.key}>{item.title}</Option>
        ))}
      </Select>
    </Space>
  );
}

export default DeliveriesFilter;
