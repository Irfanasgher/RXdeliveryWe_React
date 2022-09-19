import React from 'react';
import './Support.scss';
import { Button } from 'antd';
import { SlidersV } from '../../../Icons';

const Support = () => {
  return (
    <Button id="SupportButton" type="text" icon={<SlidersV />}>
      Support
    </Button>
  );
};

export default Support;
