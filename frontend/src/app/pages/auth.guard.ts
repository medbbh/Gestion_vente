import { Injectable } from "@angular/core";
import { CanActivate, Router ,ActivatedRoute} from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private route: ActivatedRoute) { }

  token: any;

  canActivate(){
    this.token = localStorage.getItem('auth_token');

    if (this.token) {
      return true;
    }
    else {
      return this.router.navigate(['/login'])
    }


  }

}