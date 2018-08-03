// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const context = 'http://ec2-18-216-205-109.us-east-2.compute.amazonaws.com:9999';
const bam = 'http://18.219.59.193:9001/api/v2';
export const environment = {
  production: false,
  caliberContext: 'http://ec2-18-216-205-109.us-east-2.compute.amazonaws.com:9999',
  context: context, // change for what the production environment would actually be
  bam: bam,
  url: 'http://localhost:8085/',
  msurl: 'http://34.227.178.103:',
  assets: 'http://52.87.205.55:8086/angular/assets/',

};
