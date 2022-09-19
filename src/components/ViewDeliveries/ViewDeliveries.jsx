import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Space } from 'antd';
import moment from 'moment';

import PendingDeliveries from '../PendingDeliveries';
import DeliveriesFilter from './../common/DeliveriesFilter';
import { getStartUnix } from '../../modules/common/utils';
import TopCards from '../TopCards';

import './ViewDeliveries.scss';

const { Option } = Select;

const ViewDeliveries = ({
  pharmacy,
  filter,
  inProgressDeliveries,
  completedDeliveries,
  exceptionDeliveries,
  getRecentDeliveries,
  getPendingDeliveries,
  getExceptionDeliveries,
  updateFilter,
  match,
}) => {
  useEffect(() => {
    if (Object.keys(pharmacy).length > 0) {
      let endTime = moment().valueOf();
      let startTime = getStartUnix(filter);
      getPendingDeliveries({ status: 'in_progress', pharmacyId: pharmacy.id, startTime, endTime });
      getRecentDeliveries({ status: 'delivered', pharmacyId: pharmacy.id, startTime, endTime });
      getExceptionDeliveries({ status: 'exception', pharmacyId: pharmacy.id, startTime, endTime });
    }
  }, [pharmacy, filter]); // eslint-disable-line react-hooks/exhaustive-deps

  let checkDeliveryType = (type) => {
    let deliveriesVariations = {
      'in-progress': inProgressDeliveries,
      delivered: completedDeliveries,
      exceptions: exceptionDeliveries,
    };
    let result = deliveriesVariations[type] || inProgressDeliveries;
    return result;
  };

  return (
    <div className="viewDeliveries">
      <DeliveriesFilter filter={filter} updateFilter={updateFilter} />
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <Row gutter={[20, 20]}>
            <TopCards type={match?.params?.type} span={24} />
          </Row>
        </Col>
        <Col span={16}>
          <PendingDeliveries
            type={match?.params?.type}
            deliveries={checkDeliveryType(match?.params?.type)}
            height="65vh"
            scrollBarStyle={{ height: '65vh', marginTop: '1rem' }}
          />
        </Col>
      </Row>
    </div>
  );
};

ViewDeliveries.propTypes = {
  getDeliveries: PropTypes.func.isRequired,
  getPendingDeliveries: PropTypes.func.isRequired,
};

export default ViewDeliveries;
