import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/User';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../Models/Pagination';
import { UserService } from '../../services/User.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  constructor(private alertify: AlertifyService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data['users']);
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.currentPage;
    this.loadUsers();
  }
 loadUsers() {
   this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe((res: PaginatedResult<User[]>) => {
     this.users = res.result;
     this.pagination = res.pagination;
   }, error => {
     this.alertify.error(error);
   });
 }
}
