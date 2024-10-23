import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../products/interface/product.interface';
//Servicio es una capa que añadiremos para manejar datos, mantiene logica de acceso y negocio

@Injectable({
  //El service esta disponible en toda la aplicacion
  providedIn: 'root'
})
//Modulo http
export class ShoppingService {

   products: Product[] = [];
   private cartSubject = new BehaviorSubject<Product[]>([]);
   private totalSubject = new BehaviorSubject<number>(0);
   private quantitySubject = new BehaviorSubject<number>(0);

   get totalAction$(): Observable<number>{
    return this.totalSubject.asObservable();
   }

   get cartAction$(): Observable<Product[]>{
    return this.cartSubject.asObservable();
   }

   get quantityAction$(): Observable<number>{
    return this.quantitySubject.asObservable();
   }

   updateCart(product: Product){
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
   }

   resetCart():void{
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.products = [];
   }
   private calcTotal():void{
    const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
    this.totalSubject.next(total);
   }
   private quantityProducts(): void{
    const quantity = this.products.reduce((acc, prod) => acc += prod.qty, 0);
    this.quantitySubject.next(quantity);
   }
   private addToCart(product:Product): void{
    const isProductInCart= this.products.find(({id}) => id == product.id);
    if(isProductInCart){
      isProductInCart.qty += 1;
    }else{
      this.products.push({...product,  qty:1});
    }
    this.cartSubject.next(this.products);
   }
}
