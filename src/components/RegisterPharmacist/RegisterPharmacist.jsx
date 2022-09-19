import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { SubmitButton, ResetButton } from 'formik-antd';
import { notification, Row, Card, Col, Button, message, Spin, Form as AntForm } from 'antd';
import PhoneInput from 'react-phone-input-2';
import * as _ from 'lodash';
import * as Yup from 'yup';

import Map from '../GoogleMaps';

import { getCoordinates } from '../../modules/common/utils';
import PharmacistAPI from '../../services/pharmacist';
import { AntInput, AntTextArea, AntSelect } from '../common/CreateAntField';
import AutoCompleteAddress from '../common/AutoCompleteAddress';
import { REGEX_PHONE_NUMBER } from '../../constants';
import { Play, StopCircle } from '../../Icons';

import './RegisterPharmacist.scss';

const registerPharmacistSchema = Yup.object({
  pharmacies: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  phone: Yup.string().matches(REGEX_PHONE_NUMBER, 'Phone number is not valid'),
  email: Yup.string().email('Invalid email').required('Required'),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  streetAddress1: Yup.string().required('Required'),
  streetAddress2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  notes: Yup.string(),
});

const RegisterPharmacist = (props) => {
  const [coordinates, setCoordinates] = useState({ lat: 37.7064926, lng: -122.1648144 });
  const [isActive, setActive] = useState(true);
  const [validateValues, setValidateValues] = useState({});
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    props.getAllPharmacies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory();

  if (props?.allPharmacies?.length > 0 && pharmacies.length === 0) {
    const pharmacies = [];

    props.allPharmacies.forEach((item) => {
      pharmacies.push({
        id: JSON.stringify({ id: item.id, name: item.name, locationName: item.locationName }),
        name: item.locationName,
      });
    });
    setPharmacies(pharmacies);
  }

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

  async function onSubmitApiCall(values, actions) {
    try {
      actions.setSubmitting(true);
      const { data } = await PharmacistAPI.registerPharmacist(values);

      notification.success({
        message: 'Success',
        description: data.message,
      });
      actions.setSubmitting(false);
      setTimeout(() => history.push(`/dashboard`), 5000);
    } catch (err) {
      actions.setSubmitting(false);
      notification.error({
        message: 'Error',
        description: err.message,
      });

      actions.setSubmitting(true);
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          pharmacies: [],
          name: '',
          phone: '',
          email: '',
          latitude: !_.isNil(coordinates) ? coordinates.lat : '',
          longitude: !_.isNil(coordinates) ? coordinates.lng : '',
          streetAddress1: '',
          streetAddress2: '',
          city: '',
          state: '',
          zipCode: '',
          notes: '',
        }}
        validationSchema={registerPharmacistSchema}
        onSubmit={(values, actions) => {
          let newValues = JSON.parse(JSON.stringify(values));
          newValues.latitude = coordinates.lat;
          newValues.longitude = coordinates.lng;
          let allPharmacies = [];
          for (let item of newValues.pharmacies) {
            allPharmacies.push(JSON.parse(item));
          }
          newValues.pharmacies = allPharmacies;
          onSubmitApiCall(newValues, actions);
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
        }}
        onReset={() => {
          history.push(`/dashboard`);
        }}
      >
        {(formProps) => {
          const { handleSubmit, submitCount, values, isSubmitting, setFieldValue } = formProps;
          return (
            <Form onSubmit={handleSubmit}>
              <div className="register-pharmacist-container">
                <Card>
                  <Row>
                    <Col span={11}>
                      <Card className="form-continer">
                        <Spin spinning={pharmacies.length === 0}>
                          <Field
                            component={AntSelect}
                            name="pharmacies"
                            label="Pharmacy"
                            selectOptions={pharmacies}
                            validate={validateRequired}
                            submitCount={submitCount}
                            mode="multiple"
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
                                hasFeedback
                              />
                            </Col>
                            <Col span={12}>
                              <AntForm.Item label="Phone number">
                                <PhoneInput
                                  inputProps={{ name: 'phone', required: true }}
                                  inputClass="ant-input custome-phone-input"
                                  country={'us'}
                                  placeholder="Enter Phone Number"
                                  value={values.phone}
                                  onChange={(phoneNumber) => setFieldValue('phone', phoneNumber)}
                                />
                              </AntForm.Item>
                            </Col>
                          </Row>
                          <Row>
                            <Col span={12}>
                              <Field
                                component={AntInput}
                                name="email"
                                type="text"
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
                            </Col>
                            <Col span={12}>
                              <Field
                                component={AntTextArea}
                                name="notes"
                                type="text"
                                label="Notes"
                                submitCount={submitCount}
                                className="create-delivery-labels"
                                rows={7}
                                hasFeedback
                              />
                            </Col>
                          </Row>
                          <Row style={{ marginTop: 20 }}>
                            <Col span={8}>
                              <Button
                                className="RxButton"
                                disabled={!isActive}
                                type="primary"
                                onClick={() => validateAddress(values)}
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
                        </Spin>
                      </Card>
                    </Col>
                    <Col span={11}>
                      <Card className="card-google-map">
                        <Map mapCompHeight="72vh" mapHeight="70vh" address={getAddress} coordinates={coordinates} />
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

export default RegisterPharmacist;
