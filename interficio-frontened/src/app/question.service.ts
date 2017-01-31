import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { config } from './config';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class QuestionService {

  constructor(private http: Http) { }
  private getSetUrl = config.url + 'api/v1/question/fetchSet';
  private getQuestionUrl = config.url + 'api/v1/question/fetchQuestion';
  private answerSubmitUrl = config.url + 'api/v1/question/answerSubmit';
  private storySubmitUrl = config.url + 'api/v1/question/storySubmit';
  private getScoreUrl = config.url + 'api/v1/question/fetchScore';

  private headers = new Headers({'Content-Type': 'application/json'});
//   private token = localStorage.getItem("token");

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  fetchSet(user_id) : Promise<any> {
    return this.http
    .get(this.getSetUrl + '?user_id=' + user_id ,{headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  fetchQuestion(set_id): Promise<any> {
    return this.http
    .get(this.getQuestionUrl+ '?set_id_=' + set_id , {headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  onAnswerSubmit(form_data): Promise<any> {
    //  console.log(form_data);
     return this.http
    .post(this.answerSubmitUrl , JSON.stringify(form_data), {headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError); 
  }

  onStorySubmit(form_data): Promise<any> {
    console.log(form_data);
    return this.http
    .post(this.storySubmitUrl , JSON.stringify(form_data), {headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError); 
  }

  fetchScore(): Promise<any> {
    return this.http
   .get(this.getScoreUrl, {headers: this.headers})
   .toPromise()
   .then(res => res.json())
   .catch(this.handleError);
 }
}


