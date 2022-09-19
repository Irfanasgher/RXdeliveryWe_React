import React from 'react';
import { Card, Row, Col, Button, Spin } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { LoadingOutlined } from '@ant-design/icons';

import { LinkIcon, Clock } from '../../Icons';
import { getUserRole, getLocalTime } from '../../modules/common/utils';
import { roles } from '../../constants/strings';
import { TIME_ONLY, MID_DATE } from '../../constants';

import './CompletedDeliveries.scss';

const CompletedDeliveries = ({ deliveries = [], scrollBarHeight, pharmacy, loading }) => {
  let history = useHistory();
  const userRole = getUserRole();

  let getDetail = (delivery) => {
    history.push(`/viewDelivery/${delivery.id}/${delivery.prescriptionReferenceNumber}`);
  };

  return (
    <>
      <Spin spinning={loading} indicator={<LoadingOutlined spin />} delay={500}>
        <Card id="completedDeliveriesCard">
          <h4>Completed Deliveries</h4>
          <Scrollbars style={scrollBarHeight}>
            {_.sortBy(deliveries, 'updatedAt')
              .reverse()
              .map((item, index) => (
                <div className="completedDelivery" key={index}>
                  <Row>
                    <Col span={2}>
                      <LinkIcon />
                    </Col>
                    <Col className="customerName">{item.name}</Col>
                  </Row>
                  <Row align="middle">
                    <Col className="prescriptionNO" span={20}>
                      DRN #{item.deliveryId || item?.logs[item?.logs?.length - 1]?.event?.delivery_order_id}
                    </Col>
                    <Col className="deliveryTime">
                      {getLocalTime(
                        item?.createdAt || item?.logs[item?.logs?.length - 1]?.occurred_at_ms,
                        pharmacy
                      )?.format(TIME_ONLY)}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={2}>
                      <Clock />
                    </Col>
                    <Col span={18}>
                      {getLocalTime(
                        item?.createdAt || item?.logs[item?.logs.length - 1]?.occurred_at_ms,
                        pharmacy
                      )?.format(MID_DATE)}
                    </Col>
                    <Col span={2}>
                      {userRole !== roles.tenantAdmin && (
                        <Button className="detailsButton" shape="round" onClick={() => getDetail(item)}>
                          Details
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              ))}
          </Scrollbars>
        </Card>
      </Spin>
    </>
  );
};

export default CompletedDeliveries;
