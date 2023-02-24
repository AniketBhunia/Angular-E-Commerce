import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private product: ProductService,private route:Router) { }

  submit(data: Product) {
    // console.warn(data)
    this.product.addProduct(data).subscribe((res) => {
      console.warn(res)
      if (res) {
        this.addProductMessage = "Product added sucessfully"
        // this.route.navigate(['seller-home'])
      }
      setTimeout(() => {
      this.addProductMessage = undefined;
      this.route.navigate(['seller-home'])
      },3000)
    })
  }

}
