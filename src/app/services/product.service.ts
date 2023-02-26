import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CartData, order, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Product[] | []>()
  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product)
  }
  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=4');
  }
  trendyProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=9');
  }
  searchProduct(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }
  localAddToCart(data: Product) {
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productID: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productID !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addtoCart(data: CartData) {
    return this.http.post('http://localhost:3000/cart', data);
  }
  getCartList(userID: number) {
    return this.http.get<Product[]>(`http://localhost:3000/cart?userId=`+userID,
    {observe:'response'}).subscribe((res)=>{
      if(res && res.body){
      this.cartData.emit(res.body);
      }
    });
  }
  removeTocart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+ cartId);
  }
  currentcart(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<CartData[]>('http://localhost:3000/cart?userId='+userData.id)
  }
  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data)
  }
  orderList(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+ userData.id)
  }
  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+ cartId,{observe:'response'}).subscribe((res)=>{
      this.cartData.emit([])
    });
  }
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+orderId)
  }
}