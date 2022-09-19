import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { SubmitButton, ResetButton } from 'formik-antd';
import { message, Row, Card, Col } from 'antd';
import * as Yup from 'yup';

import { AntInput, AntTextArea } from '../common/CreateAntField';
import { Play, StopCircle } from '../../Icons';

import './RegisterCompany.scss';

const registerCompanySchema = Yup.object({
  companyName: Yup.string().required('Required'),
  administrativeContactName: Yup.string().required('Required'),
  primaryPhoneNumber: Yup.number().required('Required'),
  emailAddress: Yup.string().email().required('Required'),
  streetAddress1: Yup.string().required('Required'),
  streetAddress2: Yup.string(),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.number().required('Required'),
  companyNotes: Yup.string(),
});

const RegisterCompany = () => {
  const history = useHistory();

  function validateRequired(value) {
    return value ? undefined : 'Required';
  }
  return (
    <>
      <Formik
        initialValues={{
          companyName: '',
          administrativeContactName: '',
          primaryPhoneNumber: '',
          emailAddress: '',
          streetAddress1: '',
          streetAddress2: '',
          city: '',
          state: '',
          zipCode: '',
          companyNotes: '',
        }}
        validationSchema={registerCompanySchema}
        onSubmit={(values, actions) => {
          message.info(JSON.stringify(values, null, 4));
          actions.setSubmitting(false);
          setTimeout(() => history.push(`/dashboard`), 5000);
        }}
        validate={(values) => {
          return {};
        }}
        onReset={() => {
          history.push(`/dashboard`);
        }}
      >
        {(formProps) => {
          const { handleSubmit, submitCount, isSubmitting } = formProps;
          return (
            <Form onSubmit={handleSubmit}>
              <div className="register-company-container">
                <Card>
                  <Row>
                    <Col span={24}>
                      <Card className="form-continer">
                        <Row>
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="companyName"
                              type="text"
                              label="Company Name"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                            />
                          </Col>
                        </Row>
                        <Row gutter={20}>
                          <Col span={6}>
                            <Field
                              component={AntInput}
                              name="administrativeContactName"
                              type="text"
                              label="Administrative Contact Name"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                            />
                          </Col>
                          <Col span={6}>
                            <Field
                              component={AntInput}
                              name="primaryPhoneNumber"
                              type="text"
                              label="Primary Phone Number"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                            />
                          </Col>
                          <Col span={6}>
                            <Field
                              component={AntInput}
                              name="emailAddress"
                              type="text"
                              label="Email Address"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                            />
                          </Col>
                        </Row>
                        <Row gutter={20}>
                          <Col span={12}>
                            <Field
                              component={AntInput}
                              name="streetAddress1"
                              type="text"
                              label="Street Address 1"
                              validate={validateRequired}
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              hasFeedback
                            />
                          </Col>
                          <Col span={6}>
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
                          </Col>
                        </Row>
                        <Row gutter={20}>
                          <Col span={6}>
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
                          </Col>
                          <Col span={6}>
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
                          </Col>
                          <Col span={6}>
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
                        </Row>
                        <Row>
                          <Col span={12}>
                            <Field
                              component={AntTextArea}
                              name="companyNotes"
                              type="text"
                              label="Company Notes"
                              submitCount={submitCount}
                              className="create-delivery-labels"
                              rows={10}
                              hasFeedback
                            />
                          </Col>
                        </Row>
                        <Row justify="end" style={{ marginTop: 20 }}>
                          <Col span={3}>
                            <SubmitButton disabled={isSubmitting} className="RxButton" icon={<Play />}>
                              Submit
                            </SubmitButton>
                          </Col>
                          <Col span={3}>
                            <ResetButton type="primary" className="RxButton" icon={<StopCircle />}>
                              Cancel
                            </ResetButton>
                          </Col>
                        </Row>
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

export default RegisterCompany;
