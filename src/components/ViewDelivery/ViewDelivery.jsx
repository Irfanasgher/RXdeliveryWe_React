import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { SubmitButton } from 'formik-antd';
import { Row, Card, Col, Button, message, Calendar, Descriptions, Spin, Form as AntForm } from 'antd';
import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import PhoneInput from 'react-phone-input-2';
import moment from 'moment';
import * as Yup from 'yup';
import * as _ from 'lodash';

import { getCoordinates } from '../../modules/common/utils';
import { StopCircle, Print, LinkIcon, Play } from '../../Icons';
import deliveryAPI from '../../services/delivery';
import ValuesTable from './ValuesTable';
import { AntInput, AntTextArea, AntSelect } from '../common/CreateAntField';
import { nextPickup, immediate, schedule } from '../../constants/strings';
import { REGEX_PHONE_NUMBER } from '../../constants';
import { ReceiptContent } from '../PrintReceipt';
import Map from '../GoogleMaps';
import { getWS } from '../../web-socket';

import './ViewDelivery.scss';

const viewDeliverySchema = Yup.object({
  name: Yup.string().required('Required'),
  phoneNumber: Yup.string().matches(REGEX_PHONE_NUMBER, 'Phone number is not valid'),
  streetAddress1: Yup.string().required('Required'),
  streetAddress2: Yup.string(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  deliveryType: Yup.string(),
  status: Yup.string(),
  deliveryInstruction: Yup.string(),
  sla: Yup.string(),
});

const ViewDelivery = (props) => {
  const client = getWS();
  const [delivery, setDelivery] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [isReadOnly, setReadOnly] = useState(true); //Read only values flag
  const [isActive, setActive] = useState(true);
  const [selectedSLA, setSelectedSLA] = useState({ sla: undefined, date: undefined });
  const [validateValues, setValidateValues] = useState({});

  useEffect(() => {
    client &&
      (client.onmessage = ({ data }) => {
        let parsedData = JSON.parse(data);
        let item = parsedData.Deliveries[0];
        if (item) {
          if (
            item?.deliveryId === delivery.deliveryId
            // item?.logs[item?.logs?.length - 1]?.event?.delivery_order_id ===
            //   delivery?.logs[delivery?.logs?.length - 1]?.event?.delivery_order_id
          ) {
            setDelivery(item);
          }
        }
      });
  });

  useEffect(() => {
    const { id, prescriptionReferenceNumber } = props.match.params;
    deliveryAPI.getDeliveryById({ id, prescriptionReferenceNumber }).then(({ data }) => {
      setDelivery(data);
      let latLng = {
        lat: data.latitude,
        lng: data.longitude,
      };
      setCoordinates(latLng);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function validateRequired(value) {
    return value ? undefined : 'Required';
  }

  let validateAddress = async (values) => {
    let address = `${values.streetAddress1} ${values.streetAddress2} ${values.city} ${values.state} ${values.zipCode}`;
    let coordinates = await getCoordinates(address);
    setCoordinates(coordinates);
    if (coordinates !== undefined) {
      setActive(false);
      setValidateValues(values);
      message.success('Location validated');
    } else {
      setActive(true);
      message.error('Please enter correct location');
    }
  };

  let getAddress = (latLng) => {
    if (latLng !== coordinates) {
      setCoordinates(latLng);
    }
  };

  let updateDelivery = async (values) => {
    values.id = delivery.id;
    values.tenant_id = delivery.tenant_id;
    values.prescriptionReferenceNumber = delivery.prescriptionReferenceNumber;
    values.latitude = coordinates.lat;
    values.longitude = coordinates.lng;

    values.deliveryStatus = values.deliveryInstruction;
    let response = await deliveryAPI.updateDelivery(values);
    response = response.data.data;
    response.id = delivery.id;

    response.prescriptionReferenceNumber = delivery.prescriptionReferenceNumber;
    response.tenant_id = delivery.tenant_id;
    setDelivery(response);
  };

  const printComponent = useRef();
  const handlePrint = useReactToPrint({
    content: () => printComponent.current,
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          prescriptionReferenceNumber: delivery?.prescriptionReferenceNumber,
          name: delivery?.name,
          phoneNumber: delivery?.phoneNumber,
          streetAddress1: delivery?.streetAddress1,
          streetAddress2: delivery?.streetAddress2,
          latitude: !_.isNil(coordinates) ? coordinates.lat : '',
          longitude: !_.isNil(coordinates) ? coordinates.lng : '',
          city: delivery?.city,
          state: delivery?.state,
          zipCode: delivery?.zipCode,
          status: delivery?.deliveryStatus?.replace('_', ' '),
          deliveryType: delivery?.schedule,
          schedule: delivery?.schedule,
          deliveryInstruction: delivery.pickup_verification?.toUpperCase() + '\n' + delivery.deliveryInstructions,
          date: '29-10-2020',
          sla: delivery.sla,
        }}
        validationSchema={viewDeliverySchema}
        onSubmit={async (values, actions) => {
          console.log(values);
          await updateDelivery(values);
          setReadOnly(true);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        validate={(values) => {
          if (
            validateValues.streetAddress1 !== values.streetAddress1 ||
            validateValues.streetAddress2 !== values.streetAddress2 ||
            validateValues.city !== values.city ||
            validateValues.zipCode !== values.zipCode ||
            validateValues.state !== values.state
          ) {
            setActive(true);
          }
          if (values.schedule !== 'schedule') {
            setSelectedSLA({ sla: undefined, date: undefined });
          }
          return {};
        }}
      >
        {({ handleSubmit, submitCount, isSubmitting, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div className="view-delivery-container">
              <Spin indicator={<LoadingOutlined />} spinning={Object.keys(delivery).length === 0}>
                <Card>
                  {!_.isEmpty(delivery?.logs) && (
                    <Row>
                      <Col span={23} style={{ margin: '10px 0px' }}>
                        <Card className="contact-driver">
                          <Descriptions title="Contact Driver:">
                            <Descriptions.Item label="Driver Name">
                              {delivery.logs[0].event.driver?.first_name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone No.">
                              {delivery.logs[0].event.driver?.phone_number}
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      </Col>
                    </Row>
                  )}
                  <Row style={{ marginBottom: '20px' }}>
                    <Col span={11}>
                      <Card className="form-continer">
                        <Field
                          component={AntInput}
                          name="status"
                          type="text"
                          label="Current Status"
                          submitCount={submitCount}
                          className="create-delivery-labels capitalize"
                          readOnly
                          hasFeedback
                        />
                        <Field
                          component={AntInput}
                          name="prescriptionReferenceNumber"
                          type="text"
                          label="Delivery Reference Number"
                          validate={validateRequired}
                          submitCount={submitCount}
                          className="create-delivery-labels"
                          disabled
                          hasFeedback
                        />

                        <Row>
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="name"
                              type="text"
                              label="Name"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              readOnly={isReadOnly}
                              hasFeedback
                            />
                          </Col>
                          <Col span={12}>
                            <AntForm.Item label="Phone number">
                              <PhoneInput
                                inputProps={{ name: 'phoneNumber', required: true }}
                                inputClass="ant-input custome-phone-input"
                                country={'us'}
                                placeholder="Enter Phone Number"
                                value={values.phoneNumber}
                                disabled={isReadOnly}
                                onChange={(phone) => setFieldValue('phoneNumber', phone)}
                              />
                            </AntForm.Item>
                          </Col>
                        </Row>
                        <Field
                          component={AntInput}
                          name="streetAddress1"
                          type="text"
                          label="Street Address "
                          validate={validateRequired}
                          submitCount={submitCount}
                          className="create-delivery-labels"
                          readOnly={isReadOnly}
                          hasFeedback
                        />
                        <Field
                          component={AntInput}
                          name="streetAddress2"
                          type="text"
                          label="Street Address 2"
                          submitCount={submitCount}
                          className="create-delivery-labels"
                          readOnly={isReadOnly}
                          hasFeedback
                        />
                        <Row>
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="latitude"
                              type="text"
                              label="Latitude"
                              value={_.isNil(coordinates) ? '' : coordinates.lat}
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                              disabled
                            />
                          </Col>
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="longitude"
                              type="text"
                              label="Longitutde"
                              value={_.isNil(coordinates) ? '' : coordinates.lng}
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                              disabled
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="city"
                              type="text"
                              label="City"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              readOnly={isReadOnly}
                              hasFeedback
                            />
                            <Field
                              component={AntInput}
                              name="state"
                              type="text"
                              label="State"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              readOnly={isReadOnly}
                              hasFeedback
                            />
                            <Field
                              component={AntInput}
                              name="zipCode"
                              type="text"
                              label="Zip Code"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              readOnly={isReadOnly}
                              hasFeedback
                            />

                            {isReadOnly && (
                              <Field
                                component={AntInput}
                                name="deliveryType"
                                type="text"
                                label="Delivery Type"
                                validate={validateRequired}
                                submitCount={submitCount}
                                className="create-delivery-labels"
                                readOnly
                                hasFeedback
                              />
                            )}
                            {!isReadOnly && (
                              <Field
                                component={AntSelect}
                                name="schedule"
                                type="select"
                                label="SCHEDULE"
                                selectOptions={[
                                  { id: 'nextPickup', name: nextPickup },
                                  { id: 'immediate', name: immediate },
                                  { id: 'schedule', name: schedule },
                                ]}
                                validate={validateRequired}
                                submitCount={submitCount}
                                hasFeedback
                              />
                            )}
                          </Col>
                          <Col span={12}>
                            <Field
                              component={AntTextArea}
                              name="deliveryInstruction"
                              type="text"
                              label="Delivery Instructions"
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              readOnly={isReadOnly}
                              rows={10}
                              hasFeedback
                            />
                          </Col>
                        </Row>
                        {!isReadOnly && !_.isNil(selectedSLA.sla) && (
                          <Row className="slaRow" align="middle">
                            <Col span={10}>{`${moment(selectedSLA.date).format('DD-MM-YYYY')} - ${
                              selectedSLA.sla
                            }`}</Col>
                            <Col span={3}>
                              <CloseCircleFilled
                                onClick={() => setSelectedSLA({ sla: undefined, date: undefined })}
                                className="closeIcon"
                              />
                            </Col>
                          </Row>
                        )}
                        <Row style={{ marginTop: 20 }}>
                          <Col span={8}>
                            {isReadOnly && (
                              <>
                                <div style={{ display: 'none' }}>
                                  <ReceiptContent delivery={delivery} ref={printComponent} pharmacy={props.pharmacy} />
                                </div>
                                <Button type="primary" onClick={handlePrint} className="RxButton" icon={<Print />}>
                                  RePrint
                                </Button>
                              </>
                            )}
                            {!isReadOnly && (
                              <Button type="primary" danger={true} icon={<LinkIcon />}>
                                CANCEL DELIVERY
                              </Button>
                            )}
                          </Col>
                          <Col span={8}>
                            {isReadOnly && (
                              <Button type="primary" onClick={() => setReadOnly(false)} className="RxButton">
                                Edit
                              </Button>
                            )}
                            {!isReadOnly && (
                              <Button
                                className="RxButton"
                                disabled={!isActive}
                                type="primary"
                                onClick={() => validateAddress(values)}
                              >
                                Validate
                              </Button>
                            )}
                          </Col>
                          <Col span={8}>
                            {!isReadOnly && (
                              <SubmitButton className="RxButton" disabled={isSubmitting || isActive} icon={<Play />}>
                                Update
                              </SubmitButton>
                            )}
                            {isReadOnly && (
                              <Button type="primary" className="RxButton" icon={<StopCircle />}>
                                Cancel
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col span={11} offset={1}>
                      <Card className="card-google-map">
                        {_.isNil(selectedSLA.sla) && values.schedule === 'schedule' ? (
                          <>
                            <h3>Date</h3>
                            <div className="site-calendar-demo-card">
                              <Calendar
                                fullscreen={false}
                                onSelect={(value) => {
                                  setFieldValue('date', value);
                                }}
                                disabledDate={(current) => {
                                  return current && current < moment().add(-1, 'day');
                                }}
                              />
                            </div>
                            <Field type="hidden" name="date" />
                            <Field
                              component={AntSelect}
                              name="sla"
                              label="Select SLA"
                              type="select"
                              selectOptions={[
                                { id: 'morning', name: 'Morning 9am' },
                                { id: 'afternoon', name: 'Afternoon 12pm' },
                                { id: 'evening', name: 'Evening 6pm' },
                              ]}
                              validate={validateRequired}
                              submitCount={submitCount}
                              hasFeedback
                            />
                            <Row justify="end" style={{ marginTop: 20 }}>
                              <Col span={8}>
                                <Button
                                  onClick={() => setSelectedSLA({ sla: values.sla, date: values.date })}
                                  type="primary"
                                  className="RxButton"
                                  icon={<Play />}
                                >
                                  Schedule
                                </Button>
                              </Col>
                              <Col>
                                <Button
                                  type="primary"
                                  className="RxButton"
                                  onClick={() => {
                                    setFieldValue('schedule', nextPickup);
                                    setFieldValue('sla', '');
                                  }}
                                  icon={<StopCircle />}
                                >
                                  Cancel
                                </Button>
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <Map
                            mapHeight="77vh"
                            mapCompHeight="75vh"
                            address={getAddress}
                            coordinates={coordinates}
                            driverLocation={
                              !_.isEmpty(delivery?.logs)
                                ? delivery.logs[delivery?.logs?.length - 1]?.event?.location
                                : {}
                            }
                          />
                        )}
                      </Card>
                    </Col>
                  </Row>
                  {!_.isEmpty(delivery?.logs) && (
                    <Row>
                      <Col span={23}>
                        <h2>Delivery Log</h2>
                        <ValuesTable delivery={delivery.logs} pharmacy={props.pharmacy} />
                      </Col>
                    </Row>
                  )}
                </Card>
              </Spin>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ViewDelivery;
