import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../interfaces/commande';
import { environment } from 'src/environments/environment';
import { Panier } from '../interfaces/panier';
import { Produit } from '../interfaces/produit';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient,private httpClient:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  placeOrder(commande: Commande) {
    return this.http.post(`${environment.api}/auth/commandes/`, commande);
  }

  listCommande(): Observable<HttpResponse<Commande[]>> {
    return this.http.get<Commande[]>(`${environment.api}/auth/commandes`, {
      observe: 'response',
    });
  }
  userCommande(id:any): Observable<HttpResponse<Commande[]>> {
    return this.http.get<Commande[]>(`${environment.api}/auth/getcommandes/${id}`, {
      observe: 'response',
    });
  }

  getCommandeById(id: number): Observable<HttpResponse<Commande[]>> {
    return this.http.get<Commande[]>(`${environment.api}/auth/commandes/${id}`, {
      observe: 'response'
    });
  }
  delete(id: number) {
    return this.http.delete(`${environment.api}/auth/commandes/${id}`, {
      observe: 'response',
    });
  }

  getMontant(id:any){
    return this.http.get<any>(`${environment.api}/auth/user/montant/${id}`,{
      observe: 'response'
    })
  }

  payer(montant:any ,id:any){
    return this.http.put(`${environment.api}/auth/user/editMontant/${id}`,{ new_montant: montant });
  }
  
  statusUpdate(id:any){
    return this.httpClient.put(environment.api +'/auth/statusUpdate/'+id,this.httpOptions)
  }
}
