import { Injectable } from '@angular/core';

/**
 * Utility service that holds the base url for the Zuul gateway.
 * Any component or service that needs to communicate with anything else
 * in the Hydra ecosystem must access Zuul
 * through the URL provided by this service.
 *
 * The primary benefit is that if the Zuul gateway changes,
 * only a single line of code needs to be changed in response
 *
 * Last modified by the Avengers
 *
 * Alex Pich | 1803-USF-MAR26 | Wezley Singleton
 *
 * Danny S Chhunn | 1803-USF-MAR26 | Wezley Singleton
 *
 * Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
 *
 * Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
 *
 * For consistency added a forward slash to the end of zullEndpoint
 */
@Injectable()
export class UrlUtilService {

  // base url to get to the zuul gateway
  readonly zuulEndpoint = 'https://hydra-gateway-service.cfapps.io/';

  constructor() { }

  public getBase(): string {
    return this.zuulEndpoint;
  }

}
