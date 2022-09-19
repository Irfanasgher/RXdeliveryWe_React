import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LayoutWrapper from './Layout';
import _ from 'lodash';
import { getUserId, getUserRole } from '../modules/common/utils';

export default function PrivateRoute({ component: Component, title, accessRight, titleColor, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (accessRight.includes(getUserRole()) && !_.isNil(getUserId())) {
          return (
            <LayoutWrapper title={title} titleColor={titleColor}>
              <Component {...props} />
            </LayoutWrapper>
          );
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}
