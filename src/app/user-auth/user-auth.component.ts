import { Component } from '@angular/core';
import { CartData, LogIn, Product, SignUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogIn: boolean = true;
  authError: string = "";
  constructor(private user: UsersService,private product:ProductService) { }
  ngOnInit() {
    this.user.userAuthReload()
  }
  signUp(data: SignUp) {
    // console.warn(data)
    this.user.userSignup(data)
  }
  logIn(data: LogIn) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((res) => {
      if (res) {
        this.authError = "Please Enter a Valid User Details"
      } else {
        setTimeout(() => {
          this.localCartToRemoteCart()
        }, 300);
      }
    })
  }
  openSignIn() {
    this.showLogIn = false
  }
  openLogin() {
    this.showLogIn = true
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
    if (data) {
      let cartDataList: Product[] = JSON.parse(data)
      cartDataList.forEach((product: Product,index) => {
        let cartData: CartData = {
          ...product,
          productId: product.id,
          userId,
        }
        delete cartData.id
       setTimeout(() => {
        this.product.addtoCart(cartData).subscribe((res)=>{
          if(res){
            console.warn("Intem submitted")
          }
        })
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart')
        }
       }, 500);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
    // this.product.getCartList(userId)
  }
}
