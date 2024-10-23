import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, Details, DetailsOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiURL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  saveOrder(order:Order):Observable<Order>{
      return this.http.post<any>(`${this.apiURL}/orders`, order);
  }

  saveDetailsOrder(details:DetailsOrder):Observable<Details>{
    return this.http.post<any>(`${this.apiURL}/detailsOrders`, details);
  }
}
