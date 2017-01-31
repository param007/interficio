import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  moduleId: module.id,
  selector: 'leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['leaderboard.component.css']
})

export class LeaderBoardComponent implements OnInit {

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
  private users: Object;
  private prevButton = false;
  private nextButton = true;
  private array_length: any;

  constructor(
    private router: Router,
     private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData = function() {
    this.questionService.fetchScore()
      .then( data => {
        console.log('data---',data);
        this.array_length = data.length;
        this.users = data;
        for(var i=1; i<= this.array_length; i++) {
          this.users[i-1].rank = i;
        }
      })
      .catch( this.handleError);
  }
}

