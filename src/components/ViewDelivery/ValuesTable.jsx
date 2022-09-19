import React from 'react';
import { Image, Typography, Table } from 'antd';

import { getLocalTime } from '../../modules/common/utils';
import { TIME_ONLY } from '../../constants';

const ValuesTable = ({ delivery, pharmacy }) => {
  const columns = [
    {
      title: 'Status',
      width: 200,
      fixed: 'left',
      render: (text, record) => <b className="capitalize">{record.deliveryStatus?.replace('_', ' ')}</b>,
    },
    {
      title: 'Time',
      width: 200,
      fixed: 'left',
      render: (text, record) => getLocalTime(record.occurred_at_ms, pharmacy)?.format(TIME_ONLY),
    },
    {
      title: 'ETA',
      width: 200,
      fixed: 'left',
      render: (text, record, index) => (
        <div>
          {record.deliveryStatus !== 'dropped_off' && `${(record.event.dropoff_stop.eta_seconds / 60).toFixed(1)} mins`}
        </div>
      ),
    },
    {
      title: 'Event Detail',
      width: 400,
      fixed: 'left',
      render: (text, record, index) => <div>{index !== 0 ? logRender(record) : ''}</div>,
    },
  ];

  let logRender = (log) => {
    let response = '';
    switch (log.deliveryStatus) {
      case 'accepted':
        response = '';
        break;
      case 'arrived_pickup':
        response = (
          <span>
            Lat: {log.event.location.lat} <br />
            Lng: {log.event.location.lng}
          </span>
        );
        break;
      case 'picked_up':
        response = (
          <span>
            Lat: {log.event.location.lat} <br />
            Lng: {log.event.location.lng}
          </span>
        );
        break;
      case 'arrived_dropoff':
        response = (
          <span>
            Lat: {log.event.location.lat} <br />
            Lng: {log.event.location.lng}
          </span>
        );
        break;
      case 'dropped_off':
        response = (
          <Image
            width={300}
            src={log.event.dropoff_image_url}
            placeholder={<Image src={log.event.dropoff_image_url} width={200} />}
          />
        );
        break;
      case 'failed':
        response = (
          <p>
            <Typography.Text type="danger">
              <b>Delivery Failed</b>
            </Typography.Text>{' '}
            <br />
            <b>Failure Reason: </b> {log.event.failure_reason}
          </p>
        );
        break;
      default:
        break;
    }
    return response;
  };

  return (
    <>
      <Table
        bordered
        rowKey={(record) => record.event_id}
        showHeader={false}
        columns={columns}
        dataSource={delivery}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};

export default ValuesTable;
