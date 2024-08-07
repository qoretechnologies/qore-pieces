import { QorusRequest } from '@qoretechnologies/ts-toolkit';
import { ZENDESK_AUTH, ZENDESK_DOMAIN } from './configs';

export const getAccessToken = async () => {
  // const uri = '/oauth/tokens';

  // try {
  //   const response = QorusRequest.post({
  //     path: uri,
  //     headers: {
  //       grant_type: 'authorization_code',
  //       code: 
  //     }

  //   })
  // } catch (error) {
    
  // }
}

export const zendeskRequest = async (endpoint: string, method: string, body?: object) => {
  const uri = `/api/v2${endpoint}`;
  let response: Record<string, any> | undefined;

  try {
    switch (method) {
      case 'GET':
        response = await QorusRequest.get(
          {
            path: uri,
            ...(body && { data: body }),
          },
          {
            url: ZENDESK_DOMAIN,
            endpointId: '5',
          }
        );
        break;
      default:
        response = await QorusRequest.post(
          {
            path: uri,
            ...(body && { data: body }),
            headers: {
              Authorization: `Basic ${ZENDESK_AUTH}`,
            },
          },
          {
            url: ZENDESK_DOMAIN,
            endpointId: '5',
          }
        );
        break;
    }
    return response.data;
  } catch (error) {
    console.error('Error with Zendesk request:', error);
    throw error;
  }
};
