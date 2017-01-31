import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { config } from './config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }
  private authenticateUrl = config.url + 'api/v1/register/login';
  private getUserDetailUrl = config.url + 'api/v1/register/getUserDetail'
  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  dbCheck(object) : Promise<any> {
    object.date = Date.now();
    console.log('dncheck',object);
    return this.http
    .post(this.authenticateUrl ,JSON.stringify(object), {headers: this.headers})
    .toPromise()
    .then(res => {
     localStorage.setItem("token",res.json().token);
     return res.json();
    })
    .catch(this.handleError);
  }

  getUserDetail() : Promise<any> {
    let token = localStorage.getItem('token');
    return this.http
    .get(this.getUserDetailUrl + '?token=' + token, {headers: this.headers})
    .toPromise()
    .then(res => {
      console.log(res.json());
      return res.json();
    })
    .catch(this.handleError);
  }


}

