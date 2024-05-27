import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { UserRoutingModule } from './user/user-routing.module';
import { LogoutComponent } from './user/logout/logout.component';



export const routes: Routes = [
  {path: '',pathMatch:'full',redirectTo: 'user/login'},
  { path: 'user/login', component: LoginComponent  },
  { path: 'user/signup', component: SignupComponent},
  { path: 'user/logout', component: LogoutComponent }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true }),
    UserRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
