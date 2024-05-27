import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { authGuard } from '../auth.guard';
const routes: Routes = [

    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule {
    
  }