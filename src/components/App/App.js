import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import * as _ from 'lodash';

import PrivateRoute from '../privateRoute';

//Screens
import Login from '../Login';
import PrintReceipt from '../PrintReceipt';
import Dashboard from '../DashboardScreen';
import ViewDeliveries from '../ViewDeliveries';
import CreateDelivery from '../CreateDelivery';
import RegisterPharmacy from '../RegisterPharmacy';
import RegisterPharmacist from '../RegisterPharmacist';
import ViewDelivery from '../ViewDelivery';
import ReSubmitDelivery from '../ReSubmitDelivery';
import PageNotFound from '../PageNotFound';
import ForgotPassword from '../ForgotPassword';

import { getWS } from '../../web-socket';
import { roles } from '../../constants/strings';

//Styles
import './App.scss';

function App() {
  const client = getWS();
  useEffect(() => {
    return function cleanup() {
      !_.isNil(client) &&
        (client.onclose = () => {
          console.log('connection closed');
        });
    };
  });
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/verify" component={Login} />
        <Route path="/print" component={PrintReceipt} />
        <Route path="/not-found" component={PageNotFound} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          accessRight={[roles.tenantAdmin, roles.tenantUser]}
          title="Dashboard"
        />
        <PrivateRoute
          path="/registerPharmacy"
          accessRight={[roles.tenantAdmin]}
          component={RegisterPharmacy}
          title="Register Pharmacy"
        />
        <PrivateRoute
          path="/registerPharmacist"
          accessRight={[roles.tenantAdmin]}
          component={RegisterPharmacist}
          title="Register Pharmacist"
        />
        <PrivateRoute
          path="/createDelivery"
          accessRight={[roles.tenantUser]}
          component={CreateDelivery}
          title="Create Delivery"
        />
        <PrivateRoute
          path="/viewDeliveries/:type?"
          accessRight={[roles.tenantUser]}
          component={ViewDeliveries}
          title="View Deliveries"
        />
        <PrivateRoute
          path="/viewDelivery/:id/:prescriptionReferenceNumber"
          accessRight={[roles.tenantUser]}
          component={ViewDelivery}
          title="Delivery Details"
        />
        <PrivateRoute
          path="/reSubmitDelivery"
          accessRight={[roles.tenantUser]}
          component={ReSubmitDelivery}
          title="Resubmit Delivery"
        />
        <Redirect
          to={{
            pathname: '/not-found',
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
