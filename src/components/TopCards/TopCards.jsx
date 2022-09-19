import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { useHistory } from 'react-router-dom';

import { Taxi, Home, ExclamationTriangle } from '../../Icons';

import './TopCards.scss';

const TopCards = ({ span, type, statistics }) => {
  const history = useHistory();
  const [inProgressCount, setInProgressCount] = useState(0);

  useEffect(() => {
    let totalInProgress =
      parseInt(statistics?.pending || 0) +
      parseInt(statistics?.accepted || 0) +
      parseInt(statistics?.arrived_pickup || 0) +
      parseInt(statistics?.picked_up || 0);

    setInProgressCount(totalInProgress);
  }, [statistics]); // eslint-disable-line react-hooks/exhaustive-deps

  let Cards = [
    {
      id: 1,
      iconName: <Taxi />,
      heading: inProgressCount,
      desc: 'In Progress Deliveries',
      color: '#ffcb01',
      type: 'in-progress',
    },
    {
      id: 2,
      iconName: <Home />,
      heading: parseInt(statistics?.dropped_off || 0),
      desc: 'Completed Deliveries',
      color: '#34D1BF',
      type: 'delivered',
    },
    {
      id: 3,
      iconName: <ExclamationTriangle />,
      heading: parseInt(statistics?.failed || 0),
      desc: 'Exceptions',
      color: '#ED0423',
      type: 'exceptions',
    },
  ];

  const viewDeliveries = (type) => {
    history.push(`/viewDeliveries/${type}`);
  };

  return (
    <>
      {Cards.map((item) => (
        <Col key={item.id} span={span}>
          <Card
            className={`SingleCard ${type === item.type ? 'selectedCard' : ''}`}
            onClick={() => viewDeliveries(item.type)}
          >
            <Row>
              <Col span={6}>
                <div className="cardIcon" style={{ backgroundColor: item.color }}>
                  {item.iconName}
                </div>
              </Col>
              <Col span={18}>
                <div className="cardContent">
                  <h1>{item.heading}</h1>
                  <p>{item.desc}</p>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </>
  );
};
export default TopCards;
