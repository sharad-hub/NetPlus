import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { ErrorInterceptorProvider } from './infra/ErrorInterceptor';
import { BsDropdownModule } from 'ngx-bootstrap';
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BsDropdownModule.forRoot()
   ],
   providers: [AuthService, ErrorInterceptorProvider ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
