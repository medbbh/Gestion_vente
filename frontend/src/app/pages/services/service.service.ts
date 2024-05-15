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
    return this.http.post<Produit>(`${environment.api}/auth/products`, produit, {
      observe: 'response',
    });
  }

  produitById(id:any){
    return this.http.get<Produit>(`${environment.api}/auth/products/`+id, {
      observe: 'response',
    });
  }

  listProduit(): Observable<HttpResponse<Produit[]>> {
    return this.http.get<Produit[]>(`${environment.api}/auth/products`, {
      observe: 'response',
    });
  }

  delete(id: number){
    return this.http.delete(`${environment.api}/auth/products/${id}`, {
      observe: 'response',
    });
  }
  
  
  // updateProduit(id: number, formData: FormData): Observable<HttpResponse<Produit>> {
  //   return this.http.put<Produit>(`${environment.api}/auth/products/${id}`, formData, {
  //     observe: 'response'
      
  //   });

  // }
  updateProduit(id: number, formData: FormData) {
    // Ajouter le champ _method pour simuler PUT
    formData.append('_method', 'PUT');

    // URL de l'API
    const url = `${environment.api}/auth/products/${id}`;

    // Envoyer la requête POST qui est traitée comme PUT
    return this.http.post(url, formData);
  }
  
  getProduitById(id: number): Observable<HttpResponse<Produit>> {
  return this.http.get<Produit>(`${environment.api}/auth/products/${id}`, {
    observe: 'response'
  });
}
  
}
