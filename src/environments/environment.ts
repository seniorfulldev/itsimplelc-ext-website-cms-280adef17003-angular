// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  initTenant: null,
  production: false,
  prefix: 'dev',
  // apiUrl: 'http://localhost:3000',
  apiUrl: 'https://data-entry-api-dot-its-my-town-dev.appspot.com',
  reportUrl: 'https://311service-dot-its-my-town-dev.appspot.com',
  aisAppId: 'T8GTVZ3CXW',
  aisApiKey: 'e8a7aee8da7c0f47e6679ba581912449',
  mapBoxApiKey: 'pk.eyJ1IjoiaXRzaW1wbGUtYXBpIiwiYSI6ImNraG9ibHE3MzAxd3UydW1zanowbmQweTgifQ.z8uAVcGk6irH4QOOoIm5hQ',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
