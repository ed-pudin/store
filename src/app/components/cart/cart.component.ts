import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../pages/services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  quantity$ = this.shoppingSvc.quantityAction$;
  total$ = this.shoppingSvc.totalAction$;
  cart$ = this.shoppingSvc.cartAction$;


  constructor(private shoppingSvc: ShoppingService){}

  ngOnInit(): void {
  }

}
