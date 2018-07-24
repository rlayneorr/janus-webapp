const context = 'http://ec2-35-182-210-106.ca-central-1.compute.amazonaws.com:10000/';
//const context = 'http://ec2-18-216-205-109.us-east-2.compute.amazonaws.com:9999/'
const bam = 'http://18.219.59.193:9001/api/v2';
export const environment = {
  production: true,
  // gambitContext: 'http://ec2-35-182-210-106.ca-central-1.compute.amazonaws.com:10000/',
<<<<<<< HEAD
  localhostcontext: 'http://localHostContext:3000/',
=======
  localHostContext: 'http://localHostContext:3000/',
  //caliberContext : 'http://ec2-18-216-205-109.us-east-2.compute.amazonaws.com:9999/',
>>>>>>> Changing context and endpoints to use mock data from JSON service for testing -Tyerra Smith and Michael Brumley
  context: context, // change for what the production environment would actually be
  bam: bam,
  url: 'http://54.166.255.85:8085/',
  msurl: 'http://34.227.178.103:',
  assets: 'http://52.87.205.55:8086/angular/assets/',
};

