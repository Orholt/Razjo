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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MasterMainComponent,
    AuthComponent,
    AuthRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
