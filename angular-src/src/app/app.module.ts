import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// we imported this manuly to get our routes
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

// so we can imoirt appRoutes below in th emodule imports as an object 
//type of routes the = an array
// types are capitalilzed
//list of paths
const appRoutes: Routes = [
  //home path, uses HomeComponent imported from above
  {path:'', component: HomeComponent},
  //register path, uses HomeComponent imported from above
  {path:'register', component: RegisterComponent},
  //login path, uses HomeComponent imported from above
  {path:'login', component: LoginComponent},
  //dashboard path, uses HomeComponent imported from above
  {path:'dashboard', component: DashboardComponent},
  //profile path, uses HomeComponent imported from above
  {path:'profile', component: ProfileComponent}
];

@NgModule({
  //this is where u add your components
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent
  ],
  //this is where you add all your modules u are using
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  //this is where you add your services
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
