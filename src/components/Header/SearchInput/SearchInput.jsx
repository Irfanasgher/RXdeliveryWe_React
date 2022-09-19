import React from 'react';
import { Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchInput = () => {
  return (
    <Row>
      <Col>
        <Input placeholder="Search" style={{ width: 500, borderRadius: 10 }} prefix={<SearchOutlined />} />
      </Col>
    </Row>
  );
};

export default SearchInput;
