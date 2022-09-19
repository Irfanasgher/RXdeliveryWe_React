import React from 'react';
import { Layout, Spin } from 'antd';

import * as _ from 'lodash';
//Components
import TopBar from './TopBar';
import TitleBar from './TitleBar';
import SideBar from './Sidebar';
import Support from './Support';

import { inprogressStatus } from '../../constants/strings';
import { openStatusSocket, getWS } from '../../web-socket';
import { getTenantId } from '../../modules/common/utils';

import './Layout.scss';

const LayoutWrapper = ({
  children,
  title,
  pharmacy,
  titleColor,
  getStatistics,
  updateInprogress,
  updateDelivered,
  updateExcetpions,
  pharmacyLoader,
  pharmacistLoader,
}) => {
  const { Header, Content, Sider } = Layout;

  let listenWebSocket = (client) => {
    return (
      !_.isNil(client) &&
      (client.onmessage = ({ data }) => {
        console.log('on message called');
        let parsedData = JSON.parse(data);
        getStatistics(parsedData.Statuses);
        if (parsedData.Deliveries?.length > 0) {
          let delivery = parsedData.Deliveries[0];
          if (inprogressStatus.includes(delivery.deliveryStatus)) {
            updateInprogress(delivery);
          } else if (delivery.deliveryStatus === 'dropped_off') {
            updateDelivered(delivery);
          } else {
            updateExcetpions(delivery);
          }
        }
      })
    );
  };

  React.useEffect(() => {
    const client = getWS();
    listenWebSocket(client);
  });

  React.useEffect(() => {
    if (!_.isNil(getTenantId())) {
      openStatusSocket(getTenantId());
    }

    const client = getWS();
    listenWebSocket(client);

    return () => {
      !_.isNil(client) &&
        (client.onclose = () => {
          console.log('WebSocket connection closed');
        });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Layout id="MainLayout">
        <Spin
          spinning={pharmacyLoader || pharmacistLoader}
          // indicator={<LoadingOutlined spin />}
          delay={500}
          size="large"
        >
          <Header className="header">
            <TopBar></TopBar>
          </Header>
          <Content id="contentLayout">
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <Sider style={{ paddingTop: '4rem' }} id="SideBarLayout" className="site-layout-background" width={200}>
                <SideBar />
                <Support />
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <TitleBar title={title} titleColor={titleColor} pharmacyProps={pharmacy} loader={pharmacyLoader} />
                <div>{children}</div>
              </Content>
            </Layout>
          </Content>
        </Spin>
      </Layout>
    </>
  );
};

export default LayoutWrapper;
