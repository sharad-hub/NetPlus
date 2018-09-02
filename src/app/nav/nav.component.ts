import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { error } from 'util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(res => {
       console.log(res);
    }, error => {
      console.error('failed to logon');
    });
  }
  loggedIn() {
    const token = localStorage.getItem('token');
    return !! token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged-out');
  }
}
