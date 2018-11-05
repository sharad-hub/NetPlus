import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { PaginationModule } from 'ngx-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { ErrorInterceptorProvider } from './infra/ErrorInterceptor';
import { appRoutes } from './infra/routes';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './members/lists/lists.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { UserService } from './services/User.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailResolver } from './resolvers/membre-detail.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { AlertifyService } from './services/alertify.service';
import { MemberEditResolver } from './resolvers/membre-edit.resolver';
import { MemberListResolver } from './resolvers/membre-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';

export function tokenGetter() {
    return localStorage.getItem('token');
  }
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      MemberEditComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailsComponent,
      PhotoEditorComponent,
      ChatBoxComponent,
      TimeAgoPipe,
      ChatRoomsComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      NgxGalleryModule,
      FileUploadModule,
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['localhost'],
          blacklistedRoutes: ['localhost/api/auth/']
        }
      }),
      BrowserAnimationsModule
   ],
   providers: [
       AuthService,
     UserService,
     MemberDetailResolver,
     MemberEditResolver,
     MemberListResolver,
     ErrorInterceptorProvider,
     PreventUnsavedChanges,
    AlertifyService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
