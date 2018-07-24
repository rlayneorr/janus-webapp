import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

/**
 * this service handles logic associated with references to
 * environment variables
 */
@Injectable()
export class EnvironmentService {

  constructor() { }

  /**
   * takes a root URL and an object to build
   * an URL that includs the prefix set for the
   * current environment and assembles the object
   * passed as the second argument as get parameters
   *
   * @param url: string
   * @param parameters: any
   *
   * @return string
   */
  public buildUrl(url: string, parameters = {} ): string {
<<<<<<< HEAD
    let rootUrl = [ environment.localhostcontext, url ].join('');

=======
    //let rootUrl = [ environment.gambitContext, url ].join('');
    let rootUrl = [ environment.localHostContext, url ].join('');
>>>>>>> 256fa418cfdcc716366b81eb1b38302bde4d1773
    if ( this.isEmptyObject(parameters) === false ) {
      rootUrl += '/?';

      for (const prop in parameters ) {
        if ( parameters.hasOwnProperty(prop) ) {
          rootUrl += `${prop}=${parameters[prop]}&`;
        }
      }
    }

    return rootUrl;
  }

  /**
   * returns true if the object passed has
   * properties, false if not
   *
   * @param object: any
   *
   * @return boolean
   */
  private isEmptyObject(object: any): boolean {
    const props = Object.keys(object);

    return ( props.length === 0 );
  }

}
