import React from 'react';
import { Card, Spin, Row, Col, Button, Progress } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import { CheckCircle, LinkIcon } from '../../Icons';
import { getUserRole, getLocalTime } from '../../modules/common/utils';
import { roles } from '../../constants/strings';
import { FULL_DATE_TIME } from '../../constants';

import './PendingDeliveries.scss';

const PendingDeliveries = ({ type, deliveries, scrollBarStyle, pharmacy, loadingPending }) => {
  let history = useHistory();
  const userRole = getUserRole();

  let getDetail = (delivery) => {
    history.push(`/viewDelivery/${delivery.id}/${delivery.prescriptionReferenceNumber}`);
  };

  const checkStatus = (deliveryStatus) => {
    switch (deliveryStatus) {
      case 'pending':
        return 17;
      case 'accepted':
        return 34;
      case 'arrived_pickup':
        return 51;
      case 'picked_up':
        return 68;
      case 'arrived_dropoff':
        return 85;
      case 'dropped_off':
        return 100;
      default:
        break;
    }
    return false;
  };

  const typeToTitle = (type) => {
    switch (type) {
      case 'delivered':
        return 'Completed Deliveries';
      case 'exceptions':
        return 'Exceptions';
      default:
        return 'In Progress Deliveries';
    }
  };

  return (
    <>
      <Card id="pendingDeliveriesCard">
        <Spin spinning={loadingPending} indicator={<LoadingOutlined spin />} delay={500}>
          <h4 style={{ textTransform: 'capitalize' }}>{typeToTitle(type)}</h4>
          <Scrollbars style={scrollBarStyle}>
            {_.sortBy(deliveries, 'createdAt')
              .reverse()
              .map((item, index) => (
                <div className="delivery-card" key={`pending-delivery-${index}`}>
                  <Row className="clientDetails" justify="space-between">
                    <Col span={8}>
                      <LinkIcon /> <span>{item.name}</span>
                    </Col>
                    <Col span={8}>
                      <Progress
                        id="delivery-progress"
                        percent={checkStatus(item.deliveryStatus)}
                        steps={6}
                        size="default"
                        strokeColor="#7ED321"
                        strokeLinecap="round"
                        strokeWidth={5}
                        showInfo={false}
                      />
                    </Col>
                    <Col span={8}>
                      <div className="status">
                        <CheckCircle />
                        <span className="capitalize">{item.deliveryStatus?.replace('_', ' ')}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row className="prescriptionDetails" justify="space-between" align="middle">
                    <Col span={20}>
                      <p>{item.deliveryId || item?.logs[item?.logs.length - 1]?.event?.delivery_order_id}</p>
                      <Row align="middle">
                        {item?.deliveryStatus !== 'dropped_off' && (
                          <Col span={8}>
                            <p className="timings">{`Ordered: ${getLocalTime(item?.createdAt, pharmacy)?.format(
                              FULL_DATE_TIME
                            )}`}</p>
                          </Col>
                        )}

                        {['pending', 'accepted', 'arrived_pickup'].includes(item?.deliveryStatus) && (
                          <>
                            <Col span={8}>
                              <p className="timings">
                                {`Scheduled: ${
                                  item?.scheduledTime?.pickup_after_ms
                                    ? getLocalTime(item?.scheduledTime?.pickup_after_ms, pharmacy)?.format(
                                        FULL_DATE_TIME
                                      )
                                    : 'ASAP'
                                }`}
                              </p>
                            </Col>

                            <Col span={8}>
                              <p className="timings">
                                {`Deliver By: ${
                                  item?.scheduledTime?.pickup_after_ms
                                    ? getLocalTime(item?.scheduledTime?.dropoff_by_ms, pharmacy)?.format(FULL_DATE_TIME)
                                    : 'ASAP'
                                }`}
                              </p>
                            </Col>
                          </>
                        )}
                        {item?.deliveryStatus === 'picked_up' && (
                          <Col span={8}>
                            <p className="timings">
                              {`Picked Up: ${getLocalTime(
                                item?.logs[item?.logs.length - 1]?.occurred_at_ms,
                                pharmacy
                              )?.format(FULL_DATE_TIME)}`}
                            </p>
                          </Col>
                        )}
                      </Row>
                    </Col>

                    <Col span={4} className="detailsBtnCol">
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
        </Spin>
      </Card>
    </>
  );
};

export default PendingDeliveries;
