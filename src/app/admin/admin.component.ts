import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users = null;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.getUsers();
  }


  getUsers(){
    this.authService.getData()
    .pipe(first())
    .subscribe(users => this.users = users);

    console.log(this.users);
};


  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}