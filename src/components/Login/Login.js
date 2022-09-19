import React from 'react';
import { Card, Form, Input, Button } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import { LinkOutlined } from '@ant-design/icons';
import { getUserId } from '../../modules/common/utils';
import _ from 'lodash';

import LoginHeader from './LoginHeader';

import './login.scss';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Login = (props) => {
  const location = useLocation();
  const history = useHistory();

  // console.log(!_.isNil(getUserId()));

  if (!_.isNil(getUserId())) {
    history.push('/dashboard');
  }

  const handleLogin = (values) => {
    values.confirm && delete values.confirm;
    props.signin({ ...values });
  };

  return (
    <>
      <div className="main-container">
        <div className="login-container">
          <div className="form-container">
            <LoginHeader />
            <Card>
              <Form
                {...layout}
                name="login"
                initialValues={{
                  remember: true,
                }}
                onFinish={handleLogin}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  className="login-form-labels"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  className="login-form-labels"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                {location.pathname === '/verify' && (
                  <>
                    {' '}
                    <Form.Item
                      label="New password"
                      name="newPassword"
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
                            if (!value || getFieldValue('newPassword') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Confirm Password" />
                    </Form.Item>{' '}
                  </>
                )}

                {location.pathname !== '/verify' && (
                  <span className="lbl-forgot-password">
                    <a className="login-form-forgot" href="/forgot-password">
                      Forgot Password?
                    </a>
                  </span>
                )}
                <span className="btn-login">
                  <Button
                    type="custom"
                    htmlType="submit"
                    icon={<LinkOutlined />}
                    size="middle"
                    style={{ width: 200 }}
                    loading={props.loading}
                  >
                    {location.pathname === '/verify' ? 'Change Password' : 'Login'}
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

export default Login;
