import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  getUsers(){
    return this.httpClient.get(environment.api + '/users');
  }

  roleUpdate(id:any){
    return this.httpClient.put(environment.api +'/user/roleUpdate/'+id,this.httpOptions)
  }
}
