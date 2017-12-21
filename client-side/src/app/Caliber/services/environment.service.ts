import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class EnvironmentService {

  constructor() { }

  public buildUrl(url: string, parameters = [] ): string {
    const rootUrl = [ environment.context, url ].join('');
    const params = parameters.join('/');

    return [ rootUrl, params ].join('');
  }

}
