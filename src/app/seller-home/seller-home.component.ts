import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productList:undefined | Product[]
  deleteMessage:undefined | string;
  delicon=faTrash;
  editicon=faEdit;
  constructor(private product:ProductService){

  }
  ngOnInit():void{
    this.list()

  }
  deleteProduct(id:number){
    console.warn(id)
    this.product.deleteProduct(id).subscribe((res)=>{
      if(res){
        this.deleteMessage="Product is Deleted"
        this.list()

      }
    })
    setTimeout(()=>{this.deleteMessage=undefined
    },3000)
  }

  list(){
    this.product.productList().subscribe((res)=>{
      // console.warn(res)
      if(res){this.productList=res}
    })
  }

}
