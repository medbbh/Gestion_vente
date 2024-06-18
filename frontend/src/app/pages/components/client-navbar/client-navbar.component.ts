import { Component } from '@angular/core';
import { Produit } from '../../interfaces/produit';
import { PanierService } from '../../services/panier.service';
import { TokenService } from '../../services/token.service';
import { AuthService, User } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.css']
})
export class ClientNavbarComponent {

  carts:Produit[] = []
  cartItemCount: number = 0;
  isLoggedIn = false
  profile: any = {};
  editing: boolean = false;
  newPassword: string = '';
  confirmNewPassword: string = '';
  UserProfile!: User;

  constructor(private panierService: PanierService,private authService:TokenService,public authService2: AuthService, private router: Router) {
    this.authService2.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
  }

  editProfile() {
    this.editing = true;
  }

  updateProfile() {
    // Vérifie si les nouveaux mots de passe correspondent
    if (this.newPassword !== this.confirmNewPassword) {
      console.error("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    // Met à jour le profil avec les nouvelles informations, y compris le mot de passe
    this.profile.newPassword = this.newPassword;
    this.authService2.updateProfile(this.UserProfile).subscribe((data: any) => {
      console.log('Profil mis à jour avec succès');
      this.editing = false;
    }, (error: any) => {
      console.error('Erreur lors de la mise à jour du profil', error);
    });
  }

  cancelEdit() {
    this.editing = false;

  }

  

  ngOnInit(): void {
    this.panierService.cartItems$.subscribe(count => {
      this.cartItemCount = count;
    });
    this.isLoggedIn = localStorage.getItem('auth_token') ? true : false
  }
  logOut(){
    this.authService.removeToken()
    this.router.navigate(['/client'])
  }
}
