import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../services/data-store.service';
import { Store } from '../interfaces/store.interface';
import { NgForm } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Details } from '../interfaces/order.interface';
import { Product } from '../products/interface/product.interface';
import { ShoppingService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  model = {
    name: 'Edna',
    store: '',
    shippingAddress: '',
    city: ''
  }
  isDelivery:boolean = false;
  stores:Store[] = [];
  cart:Product[] = [];

  constructor(private storeSvc:DataStoreService,
    private orderSvc: OrderService,
    private shoppingSvc: ShoppingService,
    private productSvc: ProductsService,
    private router:Router) {
      this.checkIfCartIsEmpty();
    }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickup(value:boolean): void{
   this.isDelivery = value;
   console.log(this.isDelivery);
  }
  onSubmit({value: formData}: NgForm){
    console.log(formData);

    const data= {
      ...formData,
      date: this.getCurrentDate(),
      isDelivery: this.isDelivery,
    }
    this.orderSvc.saveOrder(data)
    .pipe(
      switchMap( (res:any)=>{
        const orderId = res.id
        const details = this.prepareDetails();
        console.log(details)
        return this.orderSvc.saveDetailsOrder({details, orderId});
      }),
      tap(()=>this.router.navigate(['/checkout/thank-you'])),
      //Transparently perform actions or side-effects,
      delay(2000),
      tap(()=>this.shoppingSvc.resetCart())
    )
    .subscribe({
      next: (res:any) =>{
        console.log(res);
      },
      error: (err:HttpErrorResponse) =>{
        console.log(err);
      }
    })
  }

  getCurrentDate():string{
    return new Date().toLocaleDateString();
  }

  getStores():void{
    this.storeSvc.getStore().subscribe({
      next: res =>{
        this.stores = res;
      },
      error: (err:HttpErrorResponse) =>{
        console.log(err);
      }
    })
  }

  prepareDetails(): Details[]{
    const details:Details[] = [];
    this.cart.forEach((product:Product) =>{
      const {id:productId, name:productName, qty:quantity, stock} = product;
      const updateStock = stock - quantity;
      this.productSvc.updateStock(productId, updateStock)
      .pipe(
        tap(()=> details.push({productId, productName, quantity}))
      )
      .subscribe();
      details.push({productId, productName, quantity});
    })
    return details;
  }

  getDataCart():void{
    this.shoppingSvc.cartAction$.subscribe({
      next: res=>{
        this.cart = res;
      },
      error: (err:HttpErrorResponse) =>{
        console.log(err);
      }
    })
  }

  checkIfCartIsEmpty(){
    this.shoppingSvc.cartAction$.pipe(
      tap((res:Product[]) => {
        if (Array.isArray(res) && !res.length){
          this.router.navigate(['/products'])
        }
      })
    ).subscribe()
  }
}
