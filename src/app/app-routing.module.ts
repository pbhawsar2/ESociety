import { NgModule,Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminUserPageComponent } from './admin-user-page/admin-user-page.component'
import {ProfileComponent} from './profile/profile.component'
import { from } from 'rxjs';
import { SocietyMemberPageComponent } from './society-member-page/society-member-page.component';
import { ServiceProviderPageComponent } from './service-provider-page/service-provider-page.component';

const routes: Routes = [
  {path: 'loginPage', component: LoginPageComponent},
  {path: 'AdminPage',component: AdminUserPageComponent},
  {path: 'ProfilePage', component: ProfileComponent},
  {path: 'SocietyMemberPage', component: SocietyMemberPageComponent},
  {path: 'ServiceProviderPage', component: ServiceProviderPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
