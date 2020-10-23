import { FamilyComponent } from './family/family.component';
import { CalendarviewComponent } from './calendarview/calendarview.component';
import { CalendarComponent } from './main/calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddnoteComponent } from './addnote/addnote.component';
import { AllnotesComponent } from './allnotes/allnotes.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthComponent } from './auth/auth.component';
import { ForgetComponent } from './forget/forget.component';
import { MainComponent } from './main/main.component';
import { MasterMainComponent } from './master-main/master-main.component';


const routes: Routes = [
  {path: 'userMain', component: MainComponent},
  {path: 'masterMain', component: MasterMainComponent},
  {path: 'authRegister', component: AuthRegisterComponent},
  {path: 'forget', component: ForgetComponent},
  {path: 'home', component: AuthComponent},
  {path: 'addNote', component: AddnoteComponent},
  {path: 'allNotes', component: AllnotesComponent},
  {path: 'calendar', component: CalendarviewComponent},
  {path: 'family', component: FamilyComponent},
  {path: '**', pathMatch: 'full', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
