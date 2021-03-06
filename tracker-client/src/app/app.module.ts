import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from "./services/auth.service";
import { SharedService } from "./services/auth.shared-service";
import { GeocodeService } from "./services/geocode.service";
import { MapService } from "./services/map.service";
import { SocketService } from "./services/socket.service";
import { UserService } from "./services/user.service";
import { SignupComponent } from './signup/signup.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';




const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: DeviceListComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    SignupComponent,
    DeviceListComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [MapService, AuthGuard, AuthService, GeocodeService, SocketService, UserService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
