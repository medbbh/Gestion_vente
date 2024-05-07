import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  titre='Gestion de vente enlige'
 
  UserProfile!: User;
  constructor(public authService: AuthService,private router :Router) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
  }

goToHome() {
    localStorage.clear()
    this.router.navigate(['']);

}


}
