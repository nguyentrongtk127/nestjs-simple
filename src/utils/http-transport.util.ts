import * as axios from 'axios';
import * as https from 'https';

export function requestPOST(
  url: string,
  data: any,
  headers: any,
): Promise<any> {
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });
  return new Promise((resolve, reject) => {
    axios.default
      .post(url, data, {
        httpsAgent: agent,
        headers,
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        const dataError = handleError(error);
        reject(dataError);
      });
  });
}

export function requestPUT(url: string, data: any, headers: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.default
      .put(url, data, {
        headers,
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        const dataError = handleError(error);
        reject(dataError);
      });
  });
}
export function requestGET(url: string, headers: any): Promise<any> {
  return new Promise((resolve, reject) => {
    axios.default
      .get(url, {
        headers,
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        const dataError = handleError(error);
        reject(dataError);
      });
  });
}
function handleError(error) {
  if (error.response) {
    if (typeof error.response.data == 'object') {
      return JSON.stringify(error.response.data);
    }
    return error.response.data;
  }
  return error.message;
}
