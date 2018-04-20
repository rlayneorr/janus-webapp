import { Observable } from 'rxjs/Observable';

// TODO: 1802Java-Nick says: WHY IS IT NAMED FETCH INSTEAD OF READ??!
export interface CRUD<T> {
    fetchAll(object?: any): Observable<T[]>;
    create(object: T): Observable<T>;
    update(object: T): Observable<T>;
    delete(object: T): Observable<T>;
}

export interface Fetch<T> {
    fetchAll(): Observable<T[]>;
}
