import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {RegisterService} from "../register.service";

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}

  private user_id;
  private name;
  private header = 'Instruction';

  ngOnInit() {
      this.registerService.getUserDetail()
      .then (res => {
        console.log("res--",res);
        if(res.not_verified) {
          this.router.navigate(['login']);
        } else {
          this.user_id = res.data.user_id;
          console.log(typeof(this.user_id));
          this.name = res.data.user_name;
          // localStorage.setItem('user_id',this.user_id);
          console.log(this.user_id,this.name);
        }

       })
      .catch(error => console.log("error--",error))
  }

  logout() {
    console.log('asdf');
    localStorage.setItem('token','');
    this.router.navigate(['/login']);
  }

  text(num) {
    if(num == 1) {
      this.header = 'Instruction';
    } else if(num == 2) {
       this.header = 'Question';
       this.router.navigate(['home/question', this.user_id]);
    } else 
      this.header = 'Leaderboard';
    }

}

