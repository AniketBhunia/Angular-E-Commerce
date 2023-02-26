import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProduct: undefined | Product[]
  trendyProducts: undefined | Product[]
  constructor(private product: ProductService , private route:Router) {
  }
  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      // console.warn(data);
      this.popularProduct = data
    });
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data
    });
  }
  viewDetails(id:number){
    this.route.navigate(['/details/'+id])
  }
}
