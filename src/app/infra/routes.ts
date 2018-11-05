import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MessagesComponent } from '../messages/messages.component';
import { AuthGuard } from '../_guard/auth.guard';
import { ListsComponent } from '../members/lists/lists.component';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailsComponent } from '../members/member-details/member-details.component';
import { MemberDetailResolver } from '../resolvers/membre-detail.resolver';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { MemberListResolver } from '../resolvers/membre-list.resolver';
import { MemberEditResolver } from '../resolvers/membre-edit.resolver';
import { ChatRoomsComponent } from '../chat-rooms/chat-rooms.component';
export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent,
       resolve: { users: MemberListResolver } },
      { path: 'members/:id', component: MemberDetailsComponent ,
      resolve: { user: MemberDetailResolver }},
      {path: 'member/edit' , component: MemberEditComponent,
       resolve: { user: MemberEditResolver } },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'chat', component: ChatRoomsComponent }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
