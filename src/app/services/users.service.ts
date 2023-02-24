import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private route: Router) {
  }
  userSignup(user: SignUp) {
    this.http.post("http://localhost:3000/users", user, { observe: 'response' })
      .subscribe((res) => {
        // console.warn(res);
        if (res) {
          localStorage.setItem('user', JSON.stringify(res.body))
          this.route.navigate(['/'])
        }
      })
  }
  userLogin(data: LogIn) {
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((res: any) => {
        if (res && res.body?.length) {
          this.invalidUserAuth.emit(false)
          localStorage.setItem('user', JSON.stringify(res.body[0]))
          this.route.navigate(['/'])
        }else{
          this.invalidUserAuth.emit(true)
        }
      })
  }
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/'])
    }
  }
}

