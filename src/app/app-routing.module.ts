import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AllTasksComponent } from './composants/all-tasks/all-tasks.component';
import { InProcessTasksComponent } from './composants/in-process-tasks/in-process-tasks.component';
import { CompletedTasksComponent } from './composants/completed-tasks/completed-tasks.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  
  
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'password-resetd',
    loadChildren: () => import('./pages/password-resetd/password-resetd.module').then( m => m.PasswordResetdPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  { path: 'all-tasks', component: AllTasksComponent },
  { path: 'in-progress-tasks', component: InProcessTasksComponent},
  { path: 'completed-tasks', component: CompletedTasksComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'evenement',
    loadChildren: () => import('./evenement/evenement.module').then( m => m.EvenementPageModule)
  },
  
  
 
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
