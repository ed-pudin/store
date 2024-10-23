import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../products/interface/product.interface';
//Servicio es una capa que añadiremos para manejar datos, mantiene logica de acceso y negocio

@Injectable({
  //El service esta disponible en toda la aplicacion
  providedIn: 'root'
})
//Modulo http
export class ProductsService {
  private apiURL:string = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  //oBSERVABLE es un flujo de datos en el tiempo, representan una coleccion de futuros valores o data
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL)
  }
  updateStock(productId:number, stock:number):Observable<any>{
    const body= {"stock": stock}
    return this.http.patch<any>(`${this.apiURL}/${productId}`, body)
  }
}
