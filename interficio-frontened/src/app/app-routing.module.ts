import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstructionComponent } from './instruction/instruction.component';
import { QuestionComponent } from './question/question.component';
import { LeaderBoardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent ,
    children: [
      { path: '', redirectTo: 'instruction'},
      { path: 'instruction', component: InstructionComponent},
      { path: 'question/:id', component: QuestionComponent },
      { path: 'leaderboard', component: LeaderBoardComponent }
    ]
  }
];

export const navigatableComponents = [
  LoginComponent,
  HomeComponent,
  InstructionComponent,
  QuestionComponent,
  LeaderBoardComponent
];
