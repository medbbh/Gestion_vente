import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private router: Router) { }

  token: any;
  role:any

  canActivate(){

    this.token = localStorage.getItem('auth_token');
    this.role = localStorage.getItem('role');

    // console.log(this.data.user_type)

    if(this.role == 1){
      return true;
    }
    else{
      return this.router.navigate([''])
    }

  }

}