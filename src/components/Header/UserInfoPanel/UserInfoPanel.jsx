import React from 'react';
import { Row, Col, Avatar } from 'antd';
import NotificationIcon from '../NotificationIcon';

import avatar from '../../../images/dummy-member-avatar.jpg';

const UserInfoPanel = () => {
  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <NotificationIcon />
        <Avatar src={avatar} />
        <h2>New York Hospital</h2>
      </div>
    </>
  );
};

export default UserInfoPanel;
