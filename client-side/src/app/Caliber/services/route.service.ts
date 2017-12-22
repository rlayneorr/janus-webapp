import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from '../caliber.routes';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// components
import { CaliberComponent } from '../caliber.component';


/**
 * this class converts the contents of the Routes array
 * into a stack of observables that can be subscribed to
 * in order to recieve routes from various percepctives
 *
 * @see caliber-nav.component.ts for usage example
 */
@Injectable()
export class RouteService {
  private all: BehaviorSubject<Routes>;
  private allWithData: BehaviorSubject<Routes>;
  private allWithTitles: BehaviorSubject<Routes>;
  private allNavRoutes: BehaviorSubject<Routes>;
  private allTopNav: BehaviorSubject<Routes>;

  /**
   * delegates bootstraping to the initialize function
   */
  constructor() {
    this.initialize();
  }

  /**
   * returns a BehaviorObservable of all
   * defined Caliber component child routes
   *
   * @return Observable<Routes>
   */
  public getAllRoutes(): Observable<Routes> {
    return this.all.asObservable();
  }

  public getRoutesWithData(): Observable<Routes> {
    return this.allWithData.asObservable();
  }

  public getRoutesWithTitles(): Observable<Routes> {
    return this.allWithTitles.asObservable();
  }

  public getNavRoutes(): Observable<Routes> {
    return this.allTopNav.asObservable();
  }

  public getTopNavRoutes(): Observable<Routes> {
    return this.allTopNav.asObservable();
  }

  /**
   *
   */
  private fetchAll(): void {
    this.all.next( routes.find( (route) => route.component === CaliberComponent ).children );
  }

  private fetchWithData(routes: Routes): void {
    this.allWithData.next( routes.filter( (route) => route.hasOwnProperty('data') ) );
  }

  private fetchWithTitles(routes: Routes): void {
    this.allWithTitles.next(routes.filter( (route) => route.data.hasOwnProperty('title') ) );
  }

  private fetchNavRoutes(routes: Routes): void {
    this.allNavRoutes.next( routes.filter( (route) => route.data.hasOwnProperty('position') ) );
  }

  private fetchTopNavRoutes(routes: Routes): void {
    this.allTopNav.next( (routes.filter( (route) => route.data.position === 'top') ) );
  }

  private initialize(): void {
    this.initializeSubjects();
    this.initializeSubscriptions();

    /*
    * start the subscription daisy chain
    */
    this.fetchAll();
  }

  private initializeSubjects(): void {
    this.all = new BehaviorSubject([]);
    this.allWithData = new BehaviorSubject([]);
    this.allWithTitles = new BehaviorSubject([]);
    this.allNavRoutes = new BehaviorSubject([]);
    this.allTopNav = new BehaviorSubject([]);
  }

  private initializeSubscriptions(): void {
    this.all.subscribe((routes) => this.fetchWithData(routes));
    this.allWithData.subscribe((routes) => this.fetchWithTitles(routes));
    this.allWithTitles.subscribe((routes) => this.fetchNavRoutes(routes));

    /*
    * this subscription is the point where we may want to expand with multiple
    * actions take place at some point like if we want side nav routes
    * or footer nav routes
    */
    this.allNavRoutes.subscribe( (routes) => {
      this.fetchTopNavRoutes(routes);
      // fetch side nav
      // fetch footer nav
      // fetch some other nav
    });
  }

}
