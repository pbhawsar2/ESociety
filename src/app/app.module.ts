import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminUserPageComponent } from './admin-user-page/admin-user-page.component';
import { SocietyMemberPageComponent } from './society-member-page/society-member-page.component';
import { ServiceProviderPageComponent } from './service-provider-page/service-provider-page.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminUserPageComponent,
    SocietyMemberPageComponent,
    ServiceProviderPageComponent,
    ProfileComponent,
  ],
  imports: [
    MatTabsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
