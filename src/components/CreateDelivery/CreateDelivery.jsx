import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { SubmitButton, ResetButton } from 'formik-antd';
import { notification, message, Row, Card, Col, Button, Calendar, Form as AntForm } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import PhoneInput from 'react-phone-input-2';
import moment from 'moment';
import * as Yup from 'yup';
import * as _ from 'lodash';

import deliveryAPI from '../../services/delivery';
import { getCoordinates } from '../../modules/common/utils';
import { AntInput, AntSelect, AntTextArea } from '../common/CreateAntField';
import AutoCompleteAddress from '../common/AutoCompleteAddress';
import { Play, StopCircle } from '../../Icons';
import { nextPickup, immediate, schedule } from '../../constants/strings';
import { DATE_ONLY, REGEX_PHONE_NUMBER } from '../../constants';
import { ReceiptContent } from '../PrintReceipt';
import Map from '../GoogleMaps';

import 'react-phone-input-2/lib/style.css';
import './CreateDelivery.scss';

const createDeliverySchema = Yup.object({
  name: Yup.string().required('Required'),
  phoneNumber: Yup.string().matches(REGEX_PHONE_NUMBER, 'Phone number is not valid'),
  streetAddress1: Yup.string().required('Required'),
  streetAddress2: Yup.string(),
  latitude: Yup.number().required('Required'),
  longitude: Yup.number().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  schedule: Yup.string().required('Required'),
  deliveryInstructions: Yup.string(),
  date: Yup.string(),
  sla: Yup.string(),
});

const CreateDelivery = (props) => {
  let demoCoordinates = { lat: 38, lng: 97 };
  const [coordinates, setCoordinates] = useState({});
  const [isActive, setActive] = useState(true);
  const [selectedSLA, setSelectedSLA] = useState({ sla: undefined, date: undefined });
  const [validateValues, setValidateValues] = useState({});
  const [response, setResponse] = useState(undefined);
  const [currentSla, setCurrentSla] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  if (Object.keys(props.pharmacy).length > 0 && _.isEmpty(coordinates)) {
    setCoordinates({ lat: props?.pharmacy?.latitude, lng: props?.pharmacy?.longitude });
  }
  useEffect(() => {
    if (!_.isNil(props?.pharmacy?.sla) && currentSla.length === 0) {
      setCoordinates({ lat: props.pharmacy.latitude, lng: props.pharmacy.longitude });
      slaChange(moment());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  function validateRequired(value) {
    return value ? undefined : 'Required';
  }

  let validateAddress = async (values, formProps) => {
    let address = `${values.streetAddress1} ${values.streetAddress2} ${values.city} ${values.state} ${values.zipCode}`;
    let coordinates = await getCoordinates(address);

    setCoordinates(coordinates);
    formProps.setFieldValue('latitude', coordinates.lat);
    formProps.setFieldValue('longitude', coordinates.lng);

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

  const printComponent = useRef();
  const handlePrint = useReactToPrint({
    content: () => printComponent.current,
  });

  const onSubmitApiCall = async (values, actions) => {
    try {
      const { data } = await deliveryAPI.createDelivery(values);
      setResponse(data.data);
      notification.success({
        message: 'Success',
        description: data.message,
      });
      handlePrint();
      setTimeout(() => history.push(`/dashboard`), 5000);
    } catch (err) {
      setLoading(false);
      notification.error({
        message: 'Error',
        description: err.message,
      });

      if (err?.data?.errors) {
        err.data.errors.map((error) =>
          notification.error({
            message: 'Error',
            description: error,
          })
        );
      }
    }
  };
  let slaChange = (value) => {
    let SLA = props.pharmacy.sla.filter((item) => item.day === value.format('dddd'));
    let formatedSLA = [];
    for (let s of SLA) {
      let sla = { id: JSON.stringify(s), name: s.key };
      formatedSLA.push(sla);
    }
    // SLA.forEach((item) => {
    //   let sla = { id: JSON.stringify(item), name: item.key };
    // });
    setCurrentSla(formatedSLA);
  };

  return (
    <>
      <div style={{ display: 'none' }}>
        <ReceiptContent delivery={response} ref={printComponent} pharmacy={props.pharmacy} />
      </div>
      <Formik
        initialValues={{
          name: '',
          phoneNumber: '',
          streetAddress1: '',
          streetAddress2: '',
          latitude: !_.isNil(coordinates) ? coordinates.lat : '',
          longitude: !_.isNil(coordinates) ? coordinates.lng : '',
          city: '',
          state: '',
          zipCode: '',
          schedule: nextPickup,
          deliveryInstructions: '',
          date: moment(),
          sla: '',
        }}
        validationSchema={createDeliverySchema}
        onSubmit={async (values, actions) => {
          setLoading(true);
          let newValues = _.cloneDeep(values);
          newValues.deliveryStatus = 'pending';
          newValues.pharmacyId = props.pharmacy.id;
          newValues.pharmacyName = props.pharmacy.name;
          newValues.zipCode = newValues.zipCode.replace(/^0+/, '');
          newValues.date = moment(newValues.date).format('YYYY-MM-DD');
          if (newValues.schedule !== schedule) {
            delete newValues.sla;
            delete newValues.date;
          }
          newValues.schedule === schedule && (newValues.sla = JSON.parse(newValues.sla));
          onSubmitApiCall(newValues, actions);
        }}
        onReset={() => {
          history.push(`/dashboard`);
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
          if (values.schedule !== schedule) {
            setSelectedSLA({ sla: undefined, date: undefined });
          }
        }}
      >
        {(formProps) => {
          const { handleSubmit, submitCount, values, isSubmitting, setFieldValue } = formProps;
          return (
            <Form id="createDeliveryForm" onSubmit={handleSubmit}>
              <div className="create-delivery-container">
                <Card>
                  <Row>
                    <Col span={11}>
                      <Card className="form-continer">
                        <Row align="bottom">
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="name"
                              type="text"
                              label="Name"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                            />
                          </Col>
                          <Col span={12}>
                            <AntForm.Item label="Phone number">
                              <PhoneInput
                                inputProps={{ name: 'phoneNumber', required: true }}
                                inputClass="ant-input custome-phone-input"
                                country={'us'}
                                onlyCountries={['us', 'ca']}
                                placeholder="Enter Phone Number"
                                value={values.phoneNumber}
                                onChange={(phone) => setFieldValue('phoneNumber', phone)}
                              />
                            </AntForm.Item>
                          </Col>
                        </Row>
                        <AutoCompleteAddress
                          defaultCoordinates={coordinates}
                          searchRadius={200000}
                          streetAddress1={values.streetAddress1}
                          setFieldValue={setFieldValue}
                          setCoordinates={setCoordinates}
                        />
                        <Field
                          component={AntInput}
                          name="streetAddress2"
                          type="text"
                          label="Street Address 2"
                          submitCount={submitCount}
                          className="create-delivery-labels"
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
                              hasFeedback
                            />
                            <Field
                              component={AntSelect}
                              name="schedule"
                              label="Schedule"
                              selectOptions={[
                                { id: nextPickup, name: nextPickup },
                                { id: immediate, name: immediate },
                                { id: schedule, name: schedule },
                              ]}
                              validate={validateRequired}
                              submitCount={submitCount}
                              hasFeedback
                            />
                          </Col>
                          <Col span={12}>
                            <Field
                              component={AntTextArea}
                              name="deliveryInstructions"
                              type="text"
                              label="Delivery Instructions"
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              rows={10}
                              value={
                                !_.isNil(response)
                                  ? `Pickup Verification: ${response.pickup_verification.toUpperCase()} \n ${
                                      values.deliveryInstructions
                                    }`
                                  : values.deliveryInstructions
                              }
                              hasFeedback
                            />
                          </Col>
                        </Row>
                        {!_.isNil(selectedSLA.sla) && (
                          <Row className="slaRow" align="middle">
                            <Col span={10}>{`${moment(selectedSLA.date).format(DATE_ONLY)} - ${selectedSLA.sla}`}</Col>
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
                            <Button
                              className="RxButton"
                              disabled={!isActive}
                              type="primary"
                              onClick={() => validateAddress(values, formProps)}
                            >
                              Validate
                            </Button>
                          </Col>
                          <Col span={8}>
                            <SubmitButton
                              className="RxButton"
                              loading={loading}
                              disabled={isSubmitting || isActive}
                              icon={<Play />}
                            >
                              Submit
                            </SubmitButton>
                          </Col>
                          <Col span={8}>
                            <ResetButton className="RxButton" type="primary" icon={<StopCircle />}>
                              Cancel
                            </ResetButton>
                          </Col>
                        </Row>
                      </Card>
                      {!_.isNil(response) && (
                        <Row>
                          <Col span={24} style={{ paddingTop: '1rem', paddingLeft: '0.5rem' }}>
                            <h4 style={{ fontSize: '14px' }}>Response: </h4>
                          </Col>
                          <Card className="form-continer">
                            <Col span={24}>
                              <h3>Delivery Reference Number: {response?.prescriptionReferenceNumber} </h3>
                              {/* <h3 style={{ display: 'inline' }}>Pickup Verification:</h3>{' '}
                              <h2 style={{ display: 'inline', textTransform: 'uppercase' }}>
                                {response.pickup_verification}
                              </h2> */}
                            </Col>
                          </Card>
                        </Row>
                      )}
                    </Col>
                    <Col span={11} offset={1}>
                      <Card className="card-google-map">
                        {_.isNil(selectedSLA.sla) && values.schedule === schedule ? (
                          <>
                            <h3>Date</h3>
                            <div className="site-calendar-demo-card">
                              <Calendar
                                fullscreen={false}
                                onSelect={(value) => {
                                  setFieldValue('date', value);
                                  slaChange(value);
                                }}
                                disabledDate={(current) => {
                                  return (
                                    !_.uniq(props?.pharmacy?.sla?.map((item) => item.day)).includes(
                                      current.format('dddd')
                                    ) ||
                                    (current && current < moment().add(-1, 'day')) ||
                                    (current && current > moment().add(+7, 'day'))
                                  );
                                }}
                              />
                            </div>
                            <Field type="hidden" name="date" />
                            <Field
                              component={AntSelect}
                              name="sla"
                              label="Select SLA"
                              selectOptions={currentSla}
                              validate={validateRequired}
                              submitCount={submitCount}
                              hasFeedback
                            />
                            <Row justify="end" style={{ marginTop: 20 }}>
                              <Col span={8}>
                                <Button
                                  onClick={() => setSelectedSLA({ sla: JSON.parse(values.sla).key, date: values.date })}
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
                            mapCompHeight="67vh"
                            mapHeight="66vh"
                            address={getAddress}
                            coordinates={!_.isEmpty(coordinates) ? coordinates : demoCoordinates}
                            setFieldValue={setFieldValue}
                            showAutoComplete={true}
                          />
                        )}
                      </Card>
                    </Col>
                  </Row>
                </Card>
                {/* <pre
                  style={{
                    background: '#f6f8fa',
                    fontSize: '.65rem',
                    padding: '.5rem',
                  }}
                >
                  <strong>props</strong> = {JSON.stringify(formProps, null, 2)}
                </pre> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateDelivery;
