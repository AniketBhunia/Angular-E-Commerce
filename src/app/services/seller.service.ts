import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { LogIn, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient,private router: Router ) { }
  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }
    ).subscribe((result) => {
      if(result){
      // this.isSellerLoggedIn.next(true)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
      // console.warn('result', result)
    }
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:LogIn){
    console.warn(data)
    // api called code will be here
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
   {observe:'response'}).subscribe((res:any) => {
    // console.warn(res)
    if(res && res.body && res.body.length){
      this.isLoginError.emit(false)
      console.warn("User Logged In")
      localStorage.setItem('seller',JSON.stringify(res.body))
      this.router.navigate(['seller-home'])
    }
    else{
      console.warn("Fuck off")
      this.isLoginError.emit(true)
    }
   })
  }
}
