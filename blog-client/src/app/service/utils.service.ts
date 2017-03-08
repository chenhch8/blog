import { Http, Response, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

export const BASE_API_URI: string = 'http://localhost:3000';

@Injectable()
export class HttpSearchService {
  constructor(private http: Http,
    @Inject(BASE_API_URI) private apiUrl: string) {}

  query(url: string): Observable<any> {
      return this.http.get(this.apiUrl + url, { withCredentials: true })
      .map(res => <any>res.json());
  }

  update(url: string, body?: string, requestOptions?: Object): Observable<any> {
    return this.http
      // withCredentials: true ——用于设置每次请求都带上cookie
      .post(this.apiUrl + url, body, Object.assign(requestOptions || {}, { withCredentials: true }))
      .map(res => <any>res.json());
  }

  updateByForm(url: string, body: string): Observable<any> {
    let headers = new Headers();
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    return this.update(url, body, { headers: headers });
  }
  
}

@Injectable()
export class Utils {
  rebuild(obj): string {
    return Object.keys(obj)
      .map(key => `${key}=${obj[key]}`).join('&');
  }
}

export const UtilsServicesInjectable: any[] = [
  { provide: BASE_API_URI, useValue: BASE_API_URI },
  { provide: HttpSearchService, useClass: HttpSearchService },
  { provide: Utils, useClass: Utils }
];
