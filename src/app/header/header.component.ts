import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default'
  sellerName: string = ''
  userName: string= ''
  searchSuggestion: undefined | Product[]
  cartValue = 0
  constructor(private route: Router, private product: ProductService) {
  }
  ngOnInit(): void {
    this.route.events.subscribe((value: any) => {
      if (value.url) {
        // console.warn(value.url)
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          // console.warn('In seller area')
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.name
            this.menuType = "seller"
          }
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name
          this.menuType='user'
          this.product.getCartList(userData.id)
        }
        else {
          // console.warn('outside seller')
          this.menuType = 'default'
        }
      }
    })
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartValue=JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((res)=>{
      this.cartValue=res.length
    })
  }
  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
    this.product.cartData.emit([])
  }
  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.product.searchProduct(element.value).subscribe((res) => {
        if(res.length>5){
          res.length=length
        }
        this.searchSuggestion = res
      })

    }
  }
  hideSearch(){
    this.searchSuggestion=undefined
  }
  submitSearch(val:string){
    console.warn(val)
    this.route.navigate([`search/${val}`])
  }
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id])
  }

}
