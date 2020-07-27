import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from  './user';
import { JwtResponse } from  './jwt-response';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private authSubject: BehaviorSubject<boolean>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private httpClient: HttpClient
        
  ) {
    this.authSubject = new BehaviorSubject(false);
   }

   public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
  


  getData(){
    debugger;

    return this.httpClient.get<User[]>(`${environment.apiUrl}/api/v1/user/data`);

  }

    signIn(user: User): Observable<JwtResponse> {
      return this.httpClient.post(`${environment.apiUrl}/api/v1/user/login`, user).pipe(
        tap(async (res: JwtResponse) => {
          console.log(res);
          if (res.user) {
            localStorage.setItem("ACCESS_TOKEN", res.user.access_token);
            this.authSubject.next(true);
           
          }
          return user;
        })
      );
    }
}