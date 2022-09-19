import React, { useRef } from 'react';
import { Row, Col, Descriptions, Button } from 'antd';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';

import { Print } from '../../Icons';
import './PrintReceipt.scss';

export class ReceiptContent extends React.Component {
  render() {
    const { delivery, pharmacy } = this.props;
    return (
      <div id="printPage">
        <h1>RXDELIVERY INSTRUCTIONS</h1>
        <Descriptions size="small" bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="PICKUP VERIFICATION">
            <h3>{delivery?.pickup_verification?.toUpperCase()}</h3>
          </Descriptions.Item>
          <Descriptions.Item label="Delivery Ref.#">{delivery?.prescriptionReferenceNumber}</Descriptions.Item>
          <Descriptions.Item label="Patient Name">{delivery?.name}</Descriptions.Item>
          <Descriptions.Item label="Address">{`${delivery?.streetAddress1} ${delivery?.streetAddress2} ${delivery?.city}, ${delivery?.zipCode} ${delivery?.state}`}</Descriptions.Item>
          <Descriptions.Item label="Phone#">{delivery?.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Date">{moment(delivery?.createdAt).format('dddd, MMMM Do YYYY')}</Descriptions.Item>
          <Descriptions.Item label="Order Time">{moment(delivery?.createdAt).format(' h:mm a')}</Descriptions.Item>
          <Descriptions.Item label="Pickup Location">
            {`${pharmacy?.streetAddress1} ${pharmacy?.streetAddress2} ${pharmacy?.city}, ${pharmacy?.zipCode} ${pharmacy?.state}`}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

const PrintReceipt = () => {
  const printComponent = useRef();
  const handlePrint = useReactToPrint({
    content: () => printComponent.current,
  });

  let delivery = {
    city: 'Queens',
    createdAt: 1604506758688,
    deliveryId: '1469749655046297890',
    deliveryInstructions: '',
    deliveryStatus: 'pending',
    id: '6687e5bd-b164-42a0-9ff1-78d596132108',
    latitude: 37.711994,
    longitude: -122.1449387,
    name: 'Zeke Rosenberg',
    pharmacyId: 'd8755d08-d689-4751-94e0-38ab5c257538',
    pharmacyName: 'Kaiser Permanente',
    phoneNumber: '6175641458',
    pickup_verification: 'discovery-draw',
    prescriptionReferenceNumber: '1469749655046297890',
    schedule: 'Next Pickup',
    state: 'NY',
    streetAddress1: '35-09 Crescent St',
    streetAddress2: 'Apt. # 1',
    tenant_id: 'f3b2df1a-d073-4177-a9fb-cdcb9a6d2e56',
    updatedAt: 1604506758688,
    zipCode: 11106,
  };

  return (
    <>
      <Row id="printReceiptSection" justify="center" align="middle">
        <Col>
          <ReceiptContent delivery={delivery} ref={printComponent} />
          <div className="printBtn">
            <Button type="primary" onClick={handlePrint} icon={<Print />}>
              Print Receipt
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PrintReceipt;
