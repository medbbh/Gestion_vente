import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../interfaces/stocks';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }
  // ======================== Stocks ==========================

  addStock(stock: FormData): Observable<HttpResponse<Stock>> {
    return this.http.post<Stock>(`${environment.api}/auth/stocks`, stock, {
      observe: 'response',
    });
  }

  listStock(): Observable<HttpResponse<Stock[]>> {
    return this.http.get<Stock[]>(`${environment.api}/auth/stocks`, {
      observe: 'response',
    });
  }

 updateStock(id: number, formData: FormData) {
  // Ajouter le champ _method pour simuler PUT
  formData.append('_method', 'PUT');

  // URL de l'API
  const url = `${environment.api}/auth/stocks/${id}`;

  // Envoyer la requête POST qui est traitée comme PUT
  return this.http.post(url, formData);
}

getProduitById(id: number): Observable<HttpResponse<Stock>> {
return this.http.get<Stock>(`${environment.api}/auth/stocks/${id}`, {
  observe: 'response'
});
}
 delete(stock:Stock){
  return this.http.delete(`${environment.api}/auth/stocks/${stock.id}`, {
    observe: 'response',
  });
}
}
