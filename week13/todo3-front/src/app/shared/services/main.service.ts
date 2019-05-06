import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import * as moment from 'moment';


@Injectable()
export class MainService {

  constructor(protected http: HttpClient) {
  }

  formatDate(date: Date) {
    console.log("DATe");
    console.log(date);

    return moment(date).format('YYYY-MM-DDThh:mm');
  }

  get(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    const pars = this.getUrlParams(body);
    return this.http.get(uri, {params: pars}).toPromise().then(res => res);
  }

  post(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.post(uri, body).toPromise().then(res => res);
  }

  delete(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.delete(uri, body).toPromise().then(res => res);
  }

  put(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.put(uri, body).toPromise().then(res => res);
  }

  protected normalBody(body: any): any {
    if (!body) {
      body = {};
    }
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }

      console.log("has own key: ");
      console.log(key);
      console.log(typeof body[key]);

      if (body[key] instanceof Date) {
        body[key] = this.formatDate(body[key]);
      }
    }
    return body;
  }

  private getUrlParams(body: any): HttpParams {
    let params = new HttpParams();
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }
      params = params.append(key, body[key]);
    }
    return params;
  }

}
