import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{
  productData:undefined | Product
  productMessage:undefined | string;
  constructor(private route:ActivatedRoute,private product:ProductService,private router:Router){

  }
  ngOnInit():void{
    let productId = this.route.snapshot.paramMap.get('id')
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data)
      this.productData=data
    })
  }
  submit(data:Product){
    console.warn(data)
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((res)=>{
      if(res){
        this.productMessage="Product Has Updated"
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
      this.router.navigate(['seller-home'])
    },3000)
  }

}
