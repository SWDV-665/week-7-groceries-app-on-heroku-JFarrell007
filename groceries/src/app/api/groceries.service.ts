import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { throwError, concat, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  items: any = [];
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = 'https://groceries-server-demo-jfarrell.herokuapp.com';

  constructor(public http: HttpClient) {
    console.log('Hello GroceriesService Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    console.log('getItems() called .....');
    return this.http.get<object[]>(this.baseURL + '/api/groceries').pipe(
      catchError(this.handleError)
      );
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  removeItem(id) {
    console.log('#### Remove Item - Id = ', id);
    this.http.delete(this.baseURL + '/api/groceries/' + id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  addItem(item) {
    this.http.post(this.baseURL + '/api/groceries', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item, index) {
    console.log('editItem ' + item.id);
    console.log('editItem '  + item);
    this.http.put(this.baseURL + '/api/groceries/' + item.id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }
}
