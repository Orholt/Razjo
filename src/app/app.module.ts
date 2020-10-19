import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main/main.component';
import { MasterMainComponent } from './master-main/master-main.component';
import { AuthComponent } from './auth/auth.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { from } from 'rxjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ForgetComponent } from './forget/forget.component';
import { MatIconModule } from '@angular/material/icon';
import { NotesComponent } from './main/notes/notes.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { AllnotesComponent } from './allnotes/allnotes.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MasterMainComponent,
    AuthComponent,
    AuthRegisterComponent,
    ForgetComponent,
    NotesComponent,
    CalendarComponent,
    AddnoteComponent,
    AllnotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SweetAlert2Module,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
