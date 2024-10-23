import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping-cart.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  quantity$ = this.shoppingSvc.quantityAction$;
  total$ = this.shoppingSvc.totalAction$;
  cart$ = this.shoppingSvc.cartAction$;

  constructor(private shoppingSvc: ShoppingService) { }

  ngOnInit(): void {
  }

}
