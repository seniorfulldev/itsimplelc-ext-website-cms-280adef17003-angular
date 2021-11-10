import { environment as envProd } from './environment.prod';


export const environment = {
  ...envProd,
  initTenant: 'baldwin-ga',
};
