import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { routes, navigatableComponents } from './app-routing.module';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { RegisterService} from './register.service';
import { QuestionService } from './question.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  entryComponents: [ ],
  providers: [QuestionService, RegisterService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
