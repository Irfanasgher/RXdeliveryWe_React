import { w3cwebsocket as W3CWebSocket } from 'websocket';
import * as _ from 'lodash';

import { WS_PROTOCOL, WS_URL } from '../constants/config';
import { getUserId } from '../modules/common/utils';

var client;

export const sendCredientials = (tenantId) => {
  if (client.readyState === client.OPEN && getUserId()) {
    client.send(
      JSON.stringify({
        action: 'delivery-order-status',
        tenant_id: tenantId,
      })
    );
  }
};

export const getWS = () => client;

export const openStatusSocket = (tenantId) => {
  if (_.isNil(client)) {
    client = new W3CWebSocket(`${WS_URL}/?tenantId=${tenantId}`, WS_PROTOCOL);
  }

  client.onopen = function () {
    sendCredientials(tenantId);
    console.log('WebSocket Client Connected');
  };

  client.onclose = function () {
    console.log('WebSocket Client Reconnecting...');
    client = new W3CWebSocket(`${WS_URL}/?tenantId=${tenantId}`, WS_PROTOCOL);
    console.log('WebSocket Client Sending Credentials...');
    sendCredientials(tenantId);
    console.log('WebSocket Client Reconnected');
  };
};

export const receiveStatus = () => {
  client.onmessage = ({ data }) => {
    console.log(data, 'outside');
    return data;
  };
};
