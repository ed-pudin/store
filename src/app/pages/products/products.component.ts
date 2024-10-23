import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from './interface/product.interface';
import { ShoppingService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //Ignorar la posibilidad que no este definida
  products!: Product[];

  constructor(private productSvc: ProductsService,
    private shoppingCartSvc: ShoppingService) { }

  ngOnInit(): void {
    this.productSvc.getProducts().subscribe({
      next: response =>{
        this.products = response;
      },
      error: (err:HttpErrorResponse) =>{
        console.log(err);
      }
    })
    /**
     * this.productSvc.getProducts().subscribe({
      next: response =>{
        console.log(response);
      },
      error: (err:HttpErrorResponse) =>{
        console.log(err);
      }
    })
     */
  }

  addToCart(product:Product): void{
    this.shoppingCartSvc.updateCart(product);
  }


}
