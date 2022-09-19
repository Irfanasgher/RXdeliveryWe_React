import React from 'react';
import { Card, Form, Input, Button, Row, Col, Tooltip, Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import { LinkOutlined, RedoOutlined } from '@ant-design/icons';
import { getUserId } from '../../modules/common/utils';
import _ from 'lodash';

import LoginHeader from '../Login/LoginHeader';
import { authApi } from './../../services/auth';

import './ForgotPassword.scss';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ForgotPassword = (props) => {
  const history = useHistory();

  const [linkSend, setLinkSend] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  // console.log(!_.isNil(getUserId()));

  if (!_.isNil(getUserId())) {
    history.push('/dashboard');
  }

  const handleSubmit = async (values) => {
    setLoader(true);
    if (values.confirm) {
      delete values.confirm;
      try {
        const data = await authApi.confirmForgotPassword({ ...values });
        // console.log(data);
        setMessage(data.data.message);
        setError('');
      } catch (e) {
        setError(e.response.data.message);
      }
      setLoader(false);
    } else {
      try {
        let data = await authApi.requestForgotPassword(values);
        console.log(data);
        setMessage(data.data.data.message);
        setLinkSend(true);
        setError('');
      } catch (e) {
        setError(e.response.data.data.message);
      }
      setLoader(false);
    }
  };

  let onChangeEmail = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };

  let handleResendEmail = () => {
    authApi.requestForgotPassword({ username: email });
  };

  return (
    <>
      <div className="main-container">
        <div className="login-container">
          {error && <Alert message="Error" description={error} type="error" showIcon closable />}
          {message && <Alert message="Success" description={message} type="success" showIcon closable />}

          <div className="form-container">
            <LoginHeader />
            <Card>
              <Form
                {...layout}
                name="login"
                initialValues={{
                  remember: true,
                }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Email"
                  name="username"
                  className="login-form-labels"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please input your email!',
                    },
                  ]}
                  onChange={onChangeEmail}
                >
                  <Row justify="space-between">
                    <Col span={linkSend ? 20 : 24}>
                      <Input placeholder="Email" />
                    </Col>
                    {linkSend && (
                      <Col span={4} style={{ paddingLeft: '25px' }}>
                        <Tooltip title="Resend Verification Code">
                          <Button shape="circle" icon={<RedoOutlined />} onClick={handleResendEmail} />
                        </Tooltip>
                      </Col>
                    )}
                  </Row>
                </Form.Item>
                {linkSend && (
                  <>
                    <Form.Item
                      label="Confirmation Code"
                      name="confirmationCode"
                      className="login-form-labels"
                      rules={[
                        {
                          required: true,
                          max: 6,
                          message: 'Put cofirmation code here!',
                        },
                      ]}
                    >
                      <Input placeholder="Confirmation Code" />
                    </Form.Item>
                    <Form.Item
                      label="New password"
                      name="password"
                      className="login-form-labels"
                      rules={[
                        {
                          required: true,
                          min: 8,
                          pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
                          message:
                            'Password should be 8 characters long, at least one uppercase letter, one lowercase letter and one number.',
                        },
                      ]}
                    >
                      <Input.Password placeholder="New password" />
                    </Form.Item>
                    <Form.Item
                      label="Confirm password"
                      name="confirm"
                      className="login-form-labels"
                      rules={[
                        {
                          required: true,
                          message: 'Please repeat new password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Confirm Password" />
                    </Form.Item>
                  </>
                )}

                <span className="btn-login">
                  <Button
                    type="custom"
                    htmlType="submit"
                    icon={<LinkOutlined />}
                    size="middle"
                    style={{ width: 200 }}
                    loading={loader}
                  >
                    {linkSend ? 'Change password' : 'Send Verification Code'}
                  </Button>
                </span>
                {/* </Form.Item> */}
              </Form>
            </Card>
          </div>
        </div>
        <div>
          <a href="/" className="contact-support">
            Contact Support
          </a>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
