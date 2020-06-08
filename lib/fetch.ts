import nodeFetch from 'node-fetch';
import unfetch from 'unfetch';
export const getFetch = (req: any) => {
  return req ? nodeFetch : unfetch;
}
