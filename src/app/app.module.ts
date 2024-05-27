import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'
import { ProjetService } from './projet/projet.service';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './user/user.service';
import { AoService } from './ao/ao.service';
import { ContratService } from './contrat/contrat.service';
import { FactureService } from './facture/facture.service';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ProjetRoutingModule } from './projet/projet-routing.module';
import { FactureRoutingModule } from './facture/facture-routing.module';
import { AoRoutingModule } from './ao/ao-routing.module';
import { ContractRoutingModule } from './contrat/contrat-routing.module';
import { UserRoutingModule } from './user/user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DxDashboardControlModule } from 'devexpress-dashboard-angular';
import { HeaderComponent } from './header/header.component';
import { authGuard } from './auth.guard';
import { LogoutComponent } from './user/logout/logout.component';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/user/login',
    pathMatch: 'full',
  },
  {
    path: 'user/login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    
  },
  {
    path: 'projet',
    loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule),
    canActivate: [authGuard]
  },
  {
    path: 'ao',
    loadChildren: () => import('./ao/ao.module').then(m => m.AoModule),
    canActivate: [authGuard]
  },
  
  {
    path: 'Contrat',
    loadChildren: () => import('./contrat/contrat.module').then(m => m.ContratModule),
    canActivate: [authGuard]
  },
  
  {
    path: 'facture',
    loadChildren: () => import('./facture/facture.module').then(m => m.FactureModule),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard', 
    component: DashboardComponent ,
    canActivate: [authGuard]
  },

]
@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        LoginComponent,
        LogoutComponent,
        DashboardComponent
      ],
    providers: [UserService, ProjetService, AoService, ContratService, FactureService],
    bootstrap: [AppComponent],
    imports: [
        RouterModule.forRoot(AppRoutes),
        CommonModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ProjetRoutingModule,
        RouterModule,
        FactureRoutingModule,
        AoRoutingModule,
        ContractRoutingModule,
        UserRoutingModule,
        DxDashboardControlModule,
        HeaderComponent
    ]
})
export class AppModule {}
