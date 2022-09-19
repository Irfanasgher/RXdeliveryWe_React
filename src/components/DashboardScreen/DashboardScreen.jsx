import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import TopCards from '../TopCards';
import PendingDeliveries from '../PendingDeliveries';
import CompletedDeliveries from '../CompletedDeliveries';
import { getUserRole, getStartUnix } from '../../modules/common/utils';
import { roles } from '../../constants/strings';
import DeliveriesFilter from './../common/DeliveriesFilter';

import './DashboardScreen.scss';

const { Option } = Select;
const DashboardScreen = ({
  pendingDeliveries,
  recentDeliveries,
  loadingCompleted,
  filter,
  pharmacy,
  getRecentDeliveries,
  getPendingDeliveries,
  updateFilter,
}) => {
  const userRole = getUserRole();

  React.useEffect(() => {
    if (userRole === roles.tenantAdmin) {
      getPendingDeliveries({ status: 'in_progress' });
      getRecentDeliveries({ status: 'delivered' });
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    let endTime = moment().valueOf();
    let startTime = getStartUnix(filter);
    getPendingDeliveries({ status: 'in_progress', pharmacyId: pharmacy.id, startTime, endTime });
    getRecentDeliveries({ status: 'delivered', pharmacyId: pharmacy.id, startTime, endTime });

    // eslint-disable-next-line
  }, [pharmacy, filter]);

  return (
    <div>
      <DeliveriesFilter filter={filter} updateFilter={updateFilter} />
      {userRole !== roles.tenantAdmin && (
        <Row gutter={[20, 20]}>
          <TopCards span={8} />
        </Row>
      )}

      <Row gutter={[20, 20]}>
        <Col span={8}>
          <CompletedDeliveries
            deliveries={recentDeliveries}
            loading={loadingCompleted}
            scrollBarHeight={{ height: `${userRole !== roles.tenantAdmin ? '50vh' : '70vh'}`, marginTop: '1rem' }}
          />
        </Col>
        <Col span={16}>
          <PendingDeliveries
            deliveries={pendingDeliveries}
            scrollBarStyle={{ height: `${userRole !== roles.tenantAdmin ? '50vh' : '70vh'}`, marginTop: '1rem' }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardScreen;

DashboardScreen.propTypes = {
  getDeliveries: PropTypes.func.isRequired,
  getPendingDeliveries: PropTypes.func.isRequired,
  getRecentDeliveries: PropTypes.func.isRequired,
};
