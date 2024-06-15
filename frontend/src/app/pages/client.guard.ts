import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(): boolean {
    const role = localStorage.getItem('role');

    // Assuming '0' represents the client role
    if (role == '0') {
      return true;
    } else {
      this.router.navigate(['/admin-home']);
      return false;
    }
  }
}
