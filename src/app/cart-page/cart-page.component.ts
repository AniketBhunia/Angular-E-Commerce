import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartData, PriceSummery } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: CartData[] | undefined
  priceSummary: PriceSummery = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService,private router:Router) {

  }
  ngOnInit(): void {
    this.loadDetails()
 
   }
 
   removeToCart(cartId:number|undefined){
     cartId && this.cartData && this.product.removeTocart(cartId)
     .subscribe((result)=>{
       this.loadDetails();
     })
   }
 
   loadDetails(){
     this.product.currentcart().subscribe((result) => {
       this.cartData = result;
       console.warn(this.cartData);
       let price = 0;
       result.forEach((item) => {
         if (item.quantity) {
           price = price + (+item.price * +item.quantity)
         }
       })
       this.priceSummary.price = price;
       this.priceSummary.discount = (price / 100)*20;
       this.priceSummary.tax = price / 10;
       this.priceSummary.delivery = 40;
       this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount;
 
     if(!this.cartData.length){
       this.router.navigate(['/'])
     }
 
     })
   }
 
 
 
 
   checkout() {
     this.router.navigate(['/checkout'])
   }
 }
