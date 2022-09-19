import React from 'react';
import { Row, Col, Space, Input, Menu, Dropdown, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Search, ChevronDown } from '../../../Icons';
import { roles } from '../../../constants/strings';
import { getUserRole, getUser } from '../../../modules/common/utils';

import './TopBar.scss';

//Logos
import carieLogo from '../../../images/carie-rx.svg';

const TopBar = (props) => {
  React.useEffect(() => {
    if (getUserRole() === roles.tenantUser && Object.keys(props.pharmacist).length < 1) {
      props.getPharmacist(getUser()['cognito:username']);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let changePharmacy = (data) => {
    const payload = {
      id: props.pharmacist.id,
      data: {
        activePharmacy: data,
      },
    };

    props.switchPharmacy(payload);
  };

  const menu = (
    <Menu selectedKeys={[`${props.pharmacy?.id}`]}>
      {getUserRole() !== roles.tenantAdmin &&
        props?.pharmacist?.pharmacies?.map((pharmacy) => (
          <Menu.Item key={pharmacy.id} onClick={() => changePharmacy(pharmacy)}>
            <span>{pharmacy.locationName}</span>
          </Menu.Item>
        ))}
      <Menu.Item key="Signout" onClick={() => props.signout()}>
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Row id="TopBar">
        <Col span={8}>
          <Row justify="space-around" align="middle">
            <Link to="/">
              <img className="Carie RX Logo" src={carieLogo} alt="Bonsa health logo" />
            </Link>
            <div className="lyftLogo">
              <svg width="55" viewBox="0 0 74 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M70.2284 25.7798V22.6331H73.6557V11.594H69.892C68.4472 4.96637 62.504 0 55.3965 0C47.2085 0 40.5712 6.59015 40.5712 14.7191V40.4988C42.9039 40.8243 45.6829 40.4584 48.0474 38.5117C50.5015 36.4908 51.6178 33.1686 51.6178 30.0432V29.0934H57.2301V18.0543H51.6178V14.7191H51.6313C51.6313 12.6548 53.3168 10.9812 55.3965 10.9812C57.4757 10.9812 59.168 12.6548 59.168 14.7191V25.7798C59.168 33.9087 65.8124 40.4988 74 40.4988V29.5176C71.9208 29.5176 70.2284 27.8441 70.2284 25.7798ZM0 0.907463H11.2373V30.8497C11.2373 35.5882 13.4204 38.4108 15.1468 39.6207C13.3191 41.2337 7.73413 42.6452 3.57081 39.2173C1.11625 37.1967 0 33.8742 0 30.7487V0.907463ZM27.6689 27.7951V11.594H38.7876V37.1507C38.7876 44.6617 34.4939 50.3072 27.6906 51.6178C23.9418 52.34 20.1112 51.9975 16.4896 50.9371V40.8422C17.9108 41.4471 20.7602 42.1798 22.9882 41.9512C25.9328 41.6487 27.7608 40.2372 28.0427 38.3102C28.0427 38.3102 24.9485 41.2352 19.6148 39.8222C14.2866 38.4108 13.1158 34.0757 13.1158 30.6481V11.594H24.2349V27.7951C24.2349 28.7148 25.0035 29.4605 25.9519 29.4605C26.9003 29.4605 27.6689 28.7148 27.6689 27.7951Z"
                  fill="#EA0B8C"
                />
              </svg>
            </div>
            <div>
              <strong>Prescription Delivery</strong>
            </div>
          </Row>
        </Col>
        <Col span={9}>
          <Row justify="center" align="middle">
            <Col>
              <Input className="searchInput" size="large" placeholder="Search" prefix={<Search />} />
            </Col>
          </Row>
        </Col>
        <Col span={7}>
          <Row className="profilePic" justify="end" align="middle">
            <Space size={20}>
              <Col>
                <img src="/images/UI-User-Picture.png" alt="user-profile" />
              </Col>
              {getUserRole() !== roles.tenantAdmin && (
                <Spin
                  spinning={props.pharmacyLoader || props.pharmacistLoader}
                  indicator={<LoadingOutlined spin />}
                  delay={500}
                >
                  <Col>
                    <p>{props?.pharmacy?.locationName}</p>
                    <p>{props?.pharmacy?.streetAddress1}</p>
                  </Col>
                </Spin>
              )}
              <Col>
                <Dropdown overlay={menu} trigger={['click']}>
                  <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    <ChevronDown className="downArrow" />
                  </span>
                </Dropdown>
              </Col>
            </Space>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TopBar;
