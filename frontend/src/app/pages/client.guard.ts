import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class ClienGuard implements CanActivate {
  constructor(private router: Router) { }

  token: any;
  role:any

  canActivate(){

    this.token = localStorage.getItem('auth_token');
    this.role = localStorage.getItem('role');


    if(this.role == 0){
      return true;
    }
    else{
      return this.router.navigate(['admin-home'])
    }

  }

}