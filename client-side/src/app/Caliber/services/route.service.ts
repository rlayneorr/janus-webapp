import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from '../caliber.routes';

@Injectable()
export class RouteService {

  constructor() { }

  public getRoutes(): Routes {
    return routes;
  }

  public getRoutesWithData(): Routes {
    return this.getRoutes()
      .filter( (route) => route.hasOwnProperty('data'));
  }

  public getTopNavRoutes(): Routes {
    return this.getRoutesWithData()
      .filter( (route) => route.data.hasOwnProperty('position') )
      .filter((route) => route.data.hasOwnProperty('title'))
      .filter( (route) => route.data.position === 'top');
  }

}
