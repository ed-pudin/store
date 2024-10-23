import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  //Input porque es un valor que se introduce al componente
  @Input() product!: Product;
  //Output son eventos que van a dar informacion a la persona afuera
  @Output() addToCartClick= new EventEmitter<Product>()
  constructor() { }

  ngOnInit(): void {
  }

  onclick(): void{
    this.addToCartClick.emit(this.product);
  }


}
