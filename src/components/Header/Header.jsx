import React from 'react';
import { Row } from 'antd';
import HeaderLogos from './HeaderLogos';
import SearchInput from './SearchInput';

import UserInfoPanel from './UserInfoPanel';

function Header() {
  return (
    <>
      <Row className="header-container">
        <HeaderLogos />
        <SearchInput />
        <UserInfoPanel />
      </Row>
    </>
  );
}

export default Header;
