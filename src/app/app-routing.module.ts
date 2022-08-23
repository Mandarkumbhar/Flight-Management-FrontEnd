import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login.component';
import { LogoutComponent } from './authentication/logout.component';
import { SignupComponent } from './authentication/signup.component';
import { AboutusComponent } from './navbar/aboutus.component';
import { ContactusComponent } from './navbar/contactus.component';
import { AdminGuard } from './service/admin.guard';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { UserGuard } from './service/user.guard';
import { Error401Component } from './welcome/error401.component';
import { PageNotfoundComponent } from './welcome/page-notfound.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'error', component: Error401Component},
  {path: 'ContactUs', component: ContactusComponent},
  {path: 'AboutUs', component: AboutusComponent},
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService]},
  
  { path: 'welcome', component: WelcomeComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  {
    path: 'user',
   
    loadChildren: () =>
      import('./user/user-routing.module').then(m => m.UserRoutingModule)
  },
  {
    path: 'admin',
   
    loadChildren: () =>
      import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
  },
      { path: '**', component:  PageNotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
