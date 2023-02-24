import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined|Product[]
  constructor(private acitvateRoutte: ActivatedRoute,private product:ProductService) {

  }
  ngOnInit(): void {
    let query = this.acitvateRoutte.snapshot.paramMap.get('query')
    // console.warn(query)
    query && this.product.searchProduct(query).subscribe((res)=>{
      this.searchResult=res
    })
  }

}
