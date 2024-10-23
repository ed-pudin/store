import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private apiURL = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getStore(): Observable<Store[]>{
    return this.http.get<Store[]>(`${this.apiURL}/stores`)
  }
}
