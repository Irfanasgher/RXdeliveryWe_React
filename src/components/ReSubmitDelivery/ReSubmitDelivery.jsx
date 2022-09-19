import React from 'react';
import { Formik, Form, Field } from 'formik';
import { SubmitButton } from 'formik-antd';
import { message, Row, Card, Col } from 'antd';
import * as Yup from 'yup';

import Map from '../GoogleMaps';
import { AntInput, AntSelect, AntTextArea } from '../common/CreateAntField';
import { LinkIcon } from '../../Icons';

import './ReSubmitDelivery.scss';

const ReSubmitDelivery = () => {
  function validateRequired(value) {
    return value ? undefined : 'Required';
  }

  const ReSubmitDeliverySchema = Yup.object({
    name: Yup.string().required('Required'),
    phoneNumber: Yup.number().required('Required'),
    streetAddress1: Yup.string().required('Required'),
    streetAddress2: Yup.string(),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zipCode: Yup.number().required('Required'),
    schedule: Yup.string().required('Required'),
    deliveryStatus: Yup.string().required('Required'),
  });

  return (
    <>
      <div className="create-delivery-container">
        <Card>
          <Row>
            <Col span={11}>
              <Card className="form-continer">
                <Formik
                  initialValues={{
                    prescriptionReferenceNumber: '',
                    name: '',
                    phoneNumber: '',
                    streetAddress1: '',
                    streetAddress2: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    schedule: 'Next Pickup',
                    deliveryStatus: '',
                  }}
                  validationSchema={ReSubmitDeliverySchema}
                  onSubmit={(values, actions) => {
                    message.info(JSON.stringify(values, null, 4));
                    actions.setSubmitting(false);
                    actions.resetForm();
                  }}
                  validate={(values) => {
                    if (!values.name) {
                      return { name: 'Required' };
                    }
                    return {};
                  }}
                >
                  {({ handleSubmit, submitCount, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
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
                            hasFeedback
                          />
                        </Col>
                        <Col span={12}>
                          <Field
                            component={AntInput}
                            name="phoneNumber"
                            type="number"
                            label="Phone Number"
                            validate={validateRequired}
                            submitCount={submitCount}
                            className="create-delivery-labels"
                            hasFeedback
                          />
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
                        hasFeedback
                      />
                      <Field
                        component={AntInput}
                        name="streetAddress2"
                        type="text"
                        label="Street Address 2"
                        validate={validateRequired}
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
                          <Field
                            component={AntSelect}
                            name="schedule"
                            label="Schedule"
                            defaultValue={'value1'}
                            type="select"
                            selectOptions={[
                              { id: 'value1', name: 'Value 1' },
                              { id: 'value2', name: 'Value 2' },
                            ]}
                            validate={validateRequired}
                            submitCount={submitCount}
                            style={{ width: 200 }}
                            hasFeedback
                          />
                        </Col>
                        <Col span={12}>
                          <Field
                            component={AntTextArea}
                            name="deliveryStatus"
                            type="text"
                            label="Delivery Instructions"
                            validate={validateRequired}
                            submitCount={submitCount}
                            className="create-delivery-labels"
                            rows={10}
                            hasFeedback
                          />
                        </Col>
                      </Row>
                      <Row justify="end" style={{ marginTop: 20 }}>
                        <Col span={6}>
                          <SubmitButton className="RxButton">Validate</SubmitButton>
                        </Col>
                        <Col span={6}>
                          <SubmitButton
                            style={{ backgroundColor: '#ED0423', borderColor: '#ED0423' }}
                            disabled={isSubmitting}
                            className="RxButton"
                            icon={<LinkIcon />}
                          >
                            ReSubmit
                          </SubmitButton>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Card>
              <Row>
                <Col span={24} style={{ paddingTop: '1rem', paddingLeft: '0.5rem' }}>
                  <h4 style={{ fontSize: '14px' }}>Response: </h4>
                </Col>
                <Card className="form-continer">
                  <Col span={24}>
                    <h2>ECHO - GENERAL</h2>
                  </Col>
                </Card>
              </Row>
            </Col>
            <Col span={11}>
              <Card className="card-google-map">
                <Map />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default ReSubmitDelivery;
