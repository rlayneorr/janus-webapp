import { Injectable } from '@angular/core';

/**
 * Utility service that holds the base url for the Zuul gateway.
 * Any component or service that needs to communicate with anything else
 * in the Gambit ecosystem must access Zuul
 * through the URL provided by this service.
 *
 * The primary benefit is that if the Zuul gateway changes,
 * only a single line of code needs to be changed in response
 *
 * @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Danny S Chhun | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
 *
 * For consistency added a forward slash to the end of zullEndpoint
 */
@Injectable()
export class UrlUtilService {

  // base url to get to the zuul gateway
  readonly zuulEndpoint = 'http://ec2-35-182-210-106.ca-central-1.compute.amazonaws.com:10000/';

  constructor() { }

  public getBase(): string {
    return this.zuulEndpoint;
  }

}
