import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotfoundComponent } from './welcome/page-notfound.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { FlightModule } from './flight/flight.module';
import { ScheduledFlightModule } from './scheduled-flight/scheduled-flight.module';
import { BookingModule } from './booking/booking.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './authentication/logout.component';
import { HeaderComponent } from './navbar/header.component';
import { FooterComponent } from './navbar/footer.component';
import { AboutusComponent } from './navbar/aboutus.component';
import { ContactusComponent } from './navbar/contactus.component';
import { LoginComponent } from './authentication/login.component';
import { SignupComponent } from './authentication/signup.component';
import { AuthenticationService } from './service/authentication.service';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { HttpClientService } from './service/httpclient.service';
import { AuthInterceptor } from './service/AuthInterceptor';

import { Error401Component } from './welcome/error401.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotfoundComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    ContactusComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    Error401Component    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,
    AdminModule,
    FlightModule,
    ScheduledFlightModule,
    BookingModule,
    FormsModule
  ],
  providers: [AuthenticationService, AuthGaurdService, HttpClientService,AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
