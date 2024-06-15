import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(private router: Router) { }

  role: any

  canActivate(): boolean {
    this.role = localStorage.getItem('role');
    console.log("hellooooo")

    if (this.role == 1) {
      return true;
    }
    else {
      this.router.navigate(['/client/'])
      return false
    }

  }

}