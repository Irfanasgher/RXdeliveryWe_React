import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Row, Col, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { Taxi } from '../../../Icons';
import { roles } from '../../../constants/strings';
import { getUserRole } from '../../../modules/common/utils';

import './TitleBar.scss';

const TitleBar = ({ title = 'Dashboard', titleColor = '#54626c', pharmacyProps, loader }) => {
  const [path, setPath] = useState(false);
  useHistory().listen((location, action) => {
    location.pathname === '/createDelivery' ? setPath(true) : setPath(false);
  });

  return (
    <>
      <Row id="TitleBar" gutter={[0, 20]} justify="space-between">
        <Col>
          <h1 style={{ color: titleColor }}>{title}</h1>
        </Col>
        {getUserRole() !== roles.tenantAdmin && (
          <Col>
            <Row gutter={16} align="middle">
              <Col>
                <Spin spinning={loader} indicator={<LoadingOutlined spin />} delay={500}>
                  <h1>{pharmacyProps?.locationName}</h1>
                </Spin>
              </Col>
              <Col>
                <Link to="/createDelivery">
                  <Button disabled={path} className="createDeliveryButton" type="primary" icon={<Taxi />}>
                    CREATE DELIVERY
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
};

export default TitleBar;
