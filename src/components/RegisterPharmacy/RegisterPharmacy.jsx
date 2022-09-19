import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import { SubmitButton, ResetButton } from 'formik-antd';
import { notification, Row, Card, Col, Button, message, Form as AntForm } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import PhoneInput from 'react-phone-input-2';
import * as Yup from 'yup';
import moment from 'moment';
import * as _ from 'lodash';

import Map from '../GoogleMaps';

import PharmacyAPI from '../../services/pharmacy';
import { AntInput, AntSelect, AntTextArea, AntTimePicker } from '../common/CreateAntField';
import AutoCompleteAddress from '../common/AutoCompleteAddress';
import { getCoordinates } from '../../modules/common/utils';
import { REGEX_PHONE_NUMBER } from '../../constants';
import { Play, StopCircle } from '../../Icons';

import './RegisterPharmacy.scss';

const registerPharmacySchema = Yup.object({
  name: Yup.string().min(6).required('Required'),
  locationName: Yup.string().required('Required'),
  primaryContact: Yup.string().required('Required'),
  primaryPhoneNumber: Yup.string().matches(REGEX_PHONE_NUMBER, 'Phone number is not valid'),
  email: Yup.string().email('Invalid email').required('Required'),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  streetAddress1: Yup.string().required('Required'),
  streetAddress2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  locationPickupNotes: Yup.string(),
  slas: Yup.array().required('Required'),
});

const RegisterPharmacy = () => {
  const [coordinates, setCoordinates] = useState({ lat: 37.7064926, lng: -122.1648144 });
  const [isActive, setActive] = useState(true);
  const [validateValues, setValidateValues] = useState({});

  const history = useHistory();

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

  const onSubmitApiCall = async (values, actions) => {
    try {
      actions.setSubmitting(true);
      const { data } = await PharmacyAPI.registerPharmacy(values);
      actions.setSubmitting(false);

      if (data.errors) {
        data.errors.map((error) =>
          notification.error({
            message: 'Error',
            description: error,
          })
        );
      } else {
        notification.success({
          message: 'Success',
          description: data.message,
        });
        setTimeout(() => actions.resetForm(), 2000);
      }
    } catch (err) {
      actions.setSubmitting(false);
      notification.error({
        message: 'Error',
        description: err.message,
      });
    }
  };

  const prepareSLA = async (sla) => {
    return sla.map((item) => {
      // console.log(item.slaSpan);
      return {
        slaSpan: parseInt(item.slaSpan.toString().replace(/\D/g, '')),
        time: moment(item.time).format('hh:mm:ss a'),
        key: item.key,
        day: item.day,
      };
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          locationName: '',
          primaryContact: '',
          primaryPhoneNumber: '',
          email: '',
          latitude: !_.isNil(coordinates) ? coordinates.lat : '',
          longitude: !_.isNil(coordinates) ? coordinates.lng : '',
          streetAddress1: '',
          streetAddress2: '',
          city: '',
          state: '',
          zipCode: '',
          locationPickupNotes: '',
          slas: [],
        }}
        validationSchema={registerPharmacySchema}
        onSubmit={async (values, actions) => {
          let newValues = JSON.parse(JSON.stringify(values));
          newValues.sla = await prepareSLA(values.slas);
          newValues.latitude = coordinates.lat;
          newValues.longitude = coordinates.lng;
          delete newValues.slas;
          newValues.schedule = '';
          // console.log(newValues);
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
          return {};
        }}
      >
        {(formProps) => {
          const { handleSubmit, submitCount, values, isSubmitting, setFieldValue } = formProps;
          return (
            <Form onSubmit={handleSubmit}>
              <div className="register-pharmacy-container">
                <Card>
                  <Row>
                    <Col span={11}>
                      <Card className="form-continer">
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
                        <Field
                          component={AntInput}
                          name="locationName"
                          type="text"
                          label="Location Name"
                          validate={validateRequired}
                          submitCount={submitCount}
                          className="create-delivery-labels"
                          hasFeedback
                        />

                        <Row>
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="primaryContact"
                              type="text"
                              label="Primary Contact"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                            />
                          </Col>
                          <Col span={12}>
                            <AntForm.Item label="Primary Phone Number">
                              <PhoneInput
                                inputProps={{ name: 'primaryPhoneNumber', required: true }}
                                inputClass="ant-input custome-phone-input"
                                country={'us'}
                                placeholder="Enter Phone Number"
                                value={values.primaryPhoneNumber}
                                onChange={(phone) => setFieldValue('primaryPhoneNumber', phone)}
                              />
                            </AntForm.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="email"
                              type="email"
                              label="Email Address"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                            />
                          </Col>
                        </Row>
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
                        <AutoCompleteAddress
                          defaultCoordinates={coordinates}
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
                              type="number"
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
                          </Col>
                          <Col span={12}>
                            <Field
                              component={AntTextArea}
                              name="locationPickupNotes"
                              type="text"
                              label="Location Pickup Notes"
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              rows={7}
                              hasFeedback
                            />
                          </Col>
                        </Row>
                        <FieldArray
                          name="slas"
                          render={({ insert, remove, push }) => (
                            <React.Fragment>
                              {values.slas.length > 0 &&
                                values.slas.map((s, index) => (
                                  <Row key={index} align="middle">
                                    <Col>
                                      <Field
                                        component={AntInput}
                                        name={`slas.${index}.key`}
                                        placeholder="Key"
                                        type="text"
                                        validate={validateRequired}
                                        submitCount={submitCount}
                                        hasFeedback
                                      />
                                    </Col>
                                    <Col>
                                      <Field
                                        component={AntSelect}
                                        name={`slas.${index}.day`}
                                        placeholder="Select Day"
                                        style={{ minWidth: '141px' }}
                                        selectOptions={[
                                          { id: 'Monday', name: 'Monday' },
                                          { id: 'Tuesday', name: 'Tuesday' },
                                          { id: 'Wednesday', name: 'Wednesday' },
                                          { id: 'Thursday', name: 'Thursday' },
                                          { id: 'Friday', name: 'Friday' },
                                          { id: 'Saturday', name: 'Saturday' },
                                          { id: 'Sunday', name: 'Sunday' },
                                        ]}
                                        validate={validateRequired}
                                        submitCount={submitCount}
                                        hasFeedback
                                      />
                                    </Col>
                                    <Col>
                                      <Field
                                        component={AntTimePicker}
                                        name={`slas.${index}.time`}
                                        validate={validateRequired}
                                        submitCount={submitCount}
                                        format="hh:mm a"
                                        className="create-delivery-labels"
                                        rows={10}
                                        hasFeedback
                                      ></Field>
                                    </Col>
                                    <Col>
                                      <Field
                                        component={AntSelect}
                                        name={`slas.${index}.slaSpan`}
                                        placeholder="Select Hours"
                                        selectOptions={[
                                          { id: 1, name: '1hrs' },
                                          { id: 2, name: '2hrs' },
                                          { id: 3, name: '3hrs' },
                                          { id: 4, name: '4hrs' },
                                          { id: 5, name: '5hrs' },
                                          { id: 6, name: '6hrs' },
                                          { id: 7, name: '7hrs' },
                                          { id: 8, name: '8hrs' },
                                          { id: 9, name: '9hrs' },
                                          { id: 10, name: '10hrs' },
                                          { id: 11, name: '11hrs' },
                                          { id: 12, name: '12hrs' },
                                        ]}
                                        validate={validateRequired}
                                        submitCount={submitCount}
                                        hasFeedback
                                      />
                                    </Col>
                                    <Col>
                                      <Button
                                        style={{ marginRight: '20px' }}
                                        shape="circle"
                                        size="small"
                                        icon={<CloseOutlined />}
                                        onClick={() => remove(index)}
                                        danger
                                      />
                                    </Col>
                                  </Row>
                                ))}

                              <Button
                                style={{ marginRight: '20px' }}
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={() => push({ key: '' })}
                              >
                                Add SLA
                              </Button>
                            </React.Fragment>
                          )}
                        ></FieldArray>
                        <Row style={{ marginTop: 20 }}>
                          <Col span={8}>
                            <Button
                              disabled={!isActive}
                              type="primary"
                              onClick={() => validateAddress(values)}
                              className="RxButton"
                            >
                              Validate
                            </Button>
                          </Col>
                          <Col span={8}>
                            <SubmitButton disabled={isSubmitting || isActive} className="RxButton" icon={<Play />}>
                              Submit
                            </SubmitButton>
                          </Col>
                          <Col span={8}>
                            <ResetButton type="primary" className="RxButton" icon={<StopCircle />}>
                              Cancel
                            </ResetButton>
                          </Col>
                        </Row>
                        {/* <pre
                          style={{
                            background: '#f6f8fa',
                            fontSize: '.65rem',
                            padding: '.5rem',
                          }}
                        >
                          <strong>props</strong> = {JSON.stringify(formProps, null, 2)}
                        </pre> */}
                      </Card>
                    </Col>
                    <Col span={11}>
                      <Card className="card-google-map">
                        <Map mapCompHeight="78vh" mapHeight="79vh" address={getAddress} coordinates={coordinates} />
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterPharmacy;
