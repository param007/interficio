import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['instruction.component.css']
})

export class InstructionComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  private token;

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if(!this.token) {
      this.router.navigate(['login']);  
    }
  }
}

