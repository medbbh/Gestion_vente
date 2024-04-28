import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produit } from '../interfaces/produit';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
// ======================== Produits ==========================
  addProduit(produit: FormData): Observable<HttpResponse<Produit>> {
    return this.http.post<Produit>(`${environment.api}/products`, produit, {
      observe: 'response',
    });
  }

  listProduit(): Observable<HttpResponse<Produit[]>> {
    return this.http.get<Produit[]>(`${environment.api}/products`, {
      observe: 'response',
    });
  }

  delete(produit:Produit){
    return this.http.delete(`${environment.api}/products/${produit.id}`, {
      observe: 'response',
    });
  }
  
  
  updateProduit(id: number, formData: any): Observable<HttpResponse<Produit>>{
    return this.http.put<Produit>(`${environment.api}/products/${id}`, formData, {
      observe: 'response'
    });
 }
  
  
}
