import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { error } from 'util';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(res => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
      console.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged out successfully');
    this.router.navigate(['/']);
  }
}
